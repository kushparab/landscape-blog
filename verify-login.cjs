const { chromium } = require('playwright')

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', err => errors.push(err.message))
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })

  await page.goto('https://kushparab.github.io/landscape-blog/#/admin', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1500)

  await page.fill('input[autocomplete="username"]', 'kushblog')
  await page.fill('input[autocomplete="current-password"]', 'yokush18')
  await page.click('button[type="submit"]')
  await page.waitForTimeout(2500)
  console.log('URL:', page.url())
  console.log('Dashboard visible:', await page.getByText('Journal Dashboard').isVisible().catch(() => false))
  console.log('Body:', JSON.stringify(await page.evaluate(() => document.body.innerText.slice(0, 200))))
  await page.screenshot({ path: '/tmp/shot2.png' })
  console.log('ERRORS:', errors)
  await browser.close()
}
main().catch(e => { console.error('FAIL', e.message); process.exit(1) })