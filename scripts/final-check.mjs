// 最终综合验收：对生产构建跑完整流程（真实导航方式）
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const BASE = process.env.VERIFY_URL || 'http://localhost:5175'
const OUT = path.resolve('shots')
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const client = await page.createCDPSession()
await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: OUT })

const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message.slice(0, 200)))
page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text().slice(0, 200)))

// 可靠的 SPA 导航：直接设 location.hash 触发 hashchange
const nav = async (hash) => {
  await page.evaluate((h) => { location.hash = h }, hash)
  await new Promise((r) => setTimeout(r, 3000))
}
const waitFor = async (sel, timeout = 30000) => {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    if (await page.$(sel)) return true
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}
const clickByText = async (container, text) =>
  page.evaluate(
    (c, t) => {
      const els = Array.from(document.querySelectorAll(c))
      const el = els.find((x) => x.textContent.includes(t))
      if (el) { el.click(); return true }
      return false
    },
    container,
    text
  )

// ========== 1. 首页 ==========
await page.goto(BASE + '/#/', { waitUntil: 'domcontentloaded', timeout: 60000 })
await waitFor('.template-card')
console.log('1. 首页模板数:', await page.$$eval('.template-card', (e) => e.length))
await page.evaluate(() => localStorage.clear())

// ========== 2. 点卡片进设计器（经典蓝） ==========
await nav('/designer?template=classic-blue')
await waitFor('.material-model-box')
const classic = await page.evaluate(() => ({
  modules: document.querySelectorAll('.material-model-box').length,
  lines: document.querySelectorAll('.lines').length,
  title: document.querySelector('.nav-center .title-text')?.textContent?.trim(),
}))
console.log('2. 经典蓝设计器:', JSON.stringify(classic))
await page.screenshot({ path: OUT + '/final-classic.png' })

// ========== 3. 自动保存 ==========
await new Promise((r) => setTimeout(r, 5000))
const draft = await page.evaluate(() => {
  const d = localStorage.getItem('myresume-draft')
  return d ? JSON.parse(d).COMPONENTS?.length : null
})
console.log('3. 自动保存草稿模块数:', draft)

// ========== 4. 双栏模板 ==========
await nav('/designer?template=modern-split')
await waitFor('.right-box .material-model-box')
const split = await page.evaluate(() => ({
  left: document.querySelector('.left-box')?.offsetWidth,
  right: document.querySelector('.right-box')?.offsetWidth,
  modules: document.querySelectorAll('.material-model-box').length,
}))
console.log('4. 双栏设计器:', JSON.stringify(split))
await page.screenshot({ path: OUT + '/final-split.png' })

// ========== 5. 添加模块 ==========
await nav('/designer?template=classic-blue')
await waitFor('.module-catalog')
await clickByText('.el-tabs__item', '添加模块')
await waitFor('.cat-title')
await page.evaluate(() => document.querySelector('.cat-title')?.click())
await waitFor('.variant-item')
const before = await page.$$eval('.material-model-box', (e) => e.length)
await page.evaluate(() => document.querySelector('.variant-item')?.click())
await new Promise((r) => setTimeout(r, 1500))
const after = await page.$$eval('.material-model-box', (e) => e.length)
console.log('5. 添加模块:', before, '->', after)

// ========== 6. 导出 ==========
await nav('/designer?template=classic-blue')
await waitFor('.material-model-box')
await new Promise((r) => setTimeout(r, 1500))
for (const [label, text, ext, wait] of [
  ['json', '导出JSON', '.json', 2000],
  ['pdf', '一键下载PDF', '.pdf', 8000],
  ['docx', '导出Word', '.docx', 5000],
]) {
  await clickByText('.nav-right .el-button', text)
  await new Promise((r) => setTimeout(r, wait))
  const f = fs.readdirSync(OUT).find((x) => x.endsWith(ext))
  console.log('6. 导出' + label.toUpperCase() + ':', f ? f : '未下载')
}

// ========== 7. 无参数进入加载草稿 ==========
await nav('/designer')
await waitFor('.material-model-box')
const loaded = await page.evaluate(() => ({
  modules: document.querySelectorAll('.material-model-box').length,
  title: document.querySelector('.nav-center .title-text')?.textContent?.trim(),
}))
console.log('7. 加载草稿:', JSON.stringify(loaded))

console.log('ERRORS:', errors.length ? errors : 'none')
await browser.close()
