import fs from 'node:fs'
import http from 'node:http'
import url from 'node:url'
import dotenv from 'dotenv'
import { google } from 'googleapis'

dotenv.config()

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const TOKEN_PATH = './token.json'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback'
)

async function getAuthClient() {
  if (fs.existsSync(TOKEN_PATH)) {
    oauth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8')))
    return oauth2Client
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  })

  console.log('\nApri questo URL nel browser e autorizza:')
  console.log(authUrl)
  console.log('\nIn attesa callback su http://localhost:3000/oauth2callback ...')

  const code = await new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const q = url.parse(req.url, true).query
      if (q.code) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Autorizzazione completata. Torna in terminale.')
        server.close()
        resolve(q.code)
      } else {
        res.writeHead(400)
        res.end('Codice non trovato')
      }
    })
    server.listen(3000)
  })

  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
  return oauth2Client
}

async function ensureCRMSpreadsheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  let spreadsheetId = null
  if (fs.existsSync('./crm_sheet.json')) {
    spreadsheetId = JSON.parse(fs.readFileSync('./crm_sheet.json', 'utf-8')).spreadsheetId
  }

  if (!spreadsheetId) {
    const createRes = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title: 'Lombardia CRM LeadGen' },
        sheets: [{ properties: { title: 'Leads' } }]
      }
    })
    spreadsheetId = createRes.data.spreadsheetId
    fs.writeFileSync('./crm_sheet.json', JSON.stringify({ spreadsheetId, url: createRes.data.spreadsheetUrl }, null, 2))

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Leads!A1:J1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'created_at_utc', 'business_name', 'city', 'sector', 'status',
          'phone', 'email', 'website_check', 'offer_price', 'notes'
        ]]
      }
    })
  }

  return spreadsheetId
}

async function appendDemoLead(auth, spreadsheetId) {
  const sheets = google.sheets({ version: 'v4', auth })
  const row = [[
    new Date().toISOString(),
    'DEMO LEAD',
    'Bergamo',
    'Parrucchiere',
    'site_created_email_ready',
    'N/A',
    'N/A',
    'NO-SITO v2 PASS',
    '490',
    'Inserimento test automatico CRM'
  ]]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:J',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: row }
  })
}

async function main() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Config mancante: crea .env partendo da .env.example')
  }

  const auth = await getAuthClient()
  const spreadsheetId = await ensureCRMSpreadsheet(auth)
  await appendDemoLead(auth, spreadsheetId)

  const { url } = JSON.parse(fs.readFileSync('./crm_sheet.json', 'utf-8'))
  console.log('\n✅ CRM Google Sheets pronto e riga demo inserita')
  console.log('Spreadsheet:', url)
}

main().catch((err) => {
  console.error('Errore:', err.message)
  process.exit(1)
})
