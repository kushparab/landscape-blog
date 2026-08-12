const { chromium } = require('playwright')

const BASE = 'https://kushparab.github.io/landscape-blog/'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = []

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('[console] ' + msg.text())
  })
  page.on('pageerror', err => errors.push('[pageerror] ' + err.message))
  page.on('requestfailed', req => {
    if (!req.url().includes('google') && !req.url().includes('fonts.googleapis')) {
      errors.push('[reqfail] ' + req.url() + ' ' + (req.failure()?.errorText || ''))
    }
  })

  // 1. Home page
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000)
  const homeTitle = await page.title()
  const cardCount = await page.locator('.card-spotlight').count()
  const hasHeroText = await page.getByText('High Sierra', { exact: false }).first().isVisible().catch(() => false)
  console.log('HOME title:', homeTitle, '| spotlight cards:', cardCount, '| hero title visible:', hasHeroText)

  // screenshot home
  await page.screenshot({ path: '/tmp/shot-home.png', fullPage: false })

  // click first post card
  await page.getByRole('button', { name: /Read High Sierra/ }).click().catch(() => {})
  await page.waitForTimeout(2500)
  const postTitle = await page.getByRole('heading', { level: 1 }).first().textContent().catch(() => '(none)')
  console.log('POST page h1:', postTitle)
  await page.screenshot({ path: '/tmp/shot-post.png' })

  // 2. Admin login
  await page.goto(BASE + '#/admin', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2000)
  console.log('ADMIN login page visible:', await page.getByText("Editor's Hut").isVisible().catch(() => false))
  await page.screenshot({ path: '/tmp/shot-admin-login.png' })

  // wrong credentials
  await page.fill('input[autocomplete="username"]', 'kushblog')
  await page.fill('input[autocomplete="current-password"]', 'wrong')
  await page.click('button[type="submit"]')
  await page.waitForTimeout(1500)
  console.log('WRONG pw shows error:', await page.getByText('Incorrect username or password.').isVisible().catch(() => false))

  // correct credentials
  await page.fill('input[autocomplete="current-password"]', 'yokush18')
  await page.click('button[type="submit"]')
  await page.waitForTimeout(2500)
  console.log('URL after login:', page.url())
  console.log('DASHBOARD shown:', await page.getByText('Journal Dashboard').isVisible().catch(() => false))
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 300))
  console.log('BODY after login:', JSON.stringify(bodyText))
  await page.screenshot({ path: '/tmp/shot-admin-dash.png' })

  // 3. Create a new note
  await page.getByRole('button', { name: '+ New note' }).click()
  await page.waitForTimeout(1500)
  console.log('EDITOR shown:', await page.getByText('A New Trail Note').first().isVisible().catch(() => false))
  const titleInput = page.locator('label:has-text("Title") input').first()
  await titleInput.fill('A Test Recon')
  await page.getByLabel('Excerpt', { exact: false }).fill('edited excerpt from headless test').catch(() => {})
  await page.getByRole('button', { name: 'Save note' }).click()
  await page.waitForTimeout(2500)
  console.log('Saved and back to dashboard:', await page.getByText('Journal Dashboard').isVisible().catch(() => false))
  await page.screenshot({ path: '/tmp/shot-admin-saved.png' })

  // 4. Verify post exists in list and reset content
  await page.getByRole('button', { name: 'Reset to defaults' }).click()
  await page.waitForTimeout(700)
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const stillThere = await page.getByText('A Test Recon').isVisible().catch(() => false)
  console.log('After reload+reset, test post present:', stillThere, '(note: reset only applied if yes → storage read works)')

  await browser.close()

  if (errors.length) {
    console.log('\n--- ERRORS ---')
    errors.forEach(e => console.log(e))
  } else {
    console.log('\nNo console/page errors detected.')
  }
}

main().catch(e => {
  console.error('SCRIPT FAILED:', e.message)
  process.exit(1)
})