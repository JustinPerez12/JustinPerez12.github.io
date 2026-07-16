/**
 * Renders the résumé from src/data/ and prints it to PDF.
 *
 * Single source of truth: edit src/data/*.js and both the site and this PDF
 * update. Run with `npm run resume`.
 *
 * Uses puppeteer-core against the system Chrome rather than `puppeteer`, so the
 * repo doesn't carry a ~130MB browser download for one script. Override the
 * binary with CHROME_PATH if it isn't at a standard location.
 */
import { existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { PDFDocument } from 'pdf-lib'
import { renderResume } from './resume-template.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PDF_OUT = resolve(ROOT, 'src/Assets/Justin_Perez_Resume.pdf')
const HTML_OUT = resolve(ROOT, 'scripts/.resume-preview.html')

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

/**
 * Page count from the PDF itself. Parsed properly rather than regexed: Chrome
 * compresses its object streams, so grepping for `/Type /Page` finds nothing.
 */
async function countPdfPages(buffer) {
  const doc = await PDFDocument.load(buffer)
  return doc.getPageCount()
}

function findChrome() {
  const found = CHROME_CANDIDATES.find((path) => existsSync(path))
  if (!found) {
    throw new Error(
      `Could not find Chrome. Set CHROME_PATH to the binary. Looked in:\n  ${CHROME_CANDIDATES.join('\n  ')}`,
    )
  }
  return found
}

async function main() {
  const html = renderResume()

  // Keep the intermediate HTML around — it's the fastest way to debug layout,
  // and `file://` loading lets the webfonts resolve.
  mkdirSync(dirname(HTML_OUT), { recursive: true })
  writeFileSync(HTML_OUT, html, 'utf8')

  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true })

  try {
    const page = await browser.newPage()
    await page.goto(`file://${HTML_OUT.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' })
    await page.evaluateHandle('document.fonts.ready')

    const pdf = await page.pdf({
      path: PDF_OUT,
      format: 'letter',
      printBackground: true,
      margin: { top: '0.45in', bottom: '0.45in', left: '0.55in', right: '0.55in' },
    })

    // Count pages in the artifact we actually produced. An earlier version of
    // this script estimated from document.scrollHeight and confidently reported
    // one page while the real PDF was two — screen layout is not print layout.
    const pages = await countPdfPages(pdf)

    console.log(`Wrote ${PDF_OUT}`)
    console.log(`Pages: ${pages}`)
    if (pages > 1) {
      console.warn(
        `WARNING: résumé is ${pages} pages — trim BULLET_LIMIT / CONDENSED_PROJECTS in resume-template.js`,
      )
      process.exitCode = 1
    }
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
