// 截图简历页（强制整页加载，避免 hash 导航竞态）
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

const shotDesigner = async (template, file) => {
  // 路径加随机 query 强制整页加载，直接以目标 hash 启动
  await page.goto(BASE + '/?r=' + Math.random() + '#/designer?template=' + template, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  })
  const t0 = Date.now()
  while (Date.now() - t0 < 30000) {
    if (await page.$('.material-model-box')) break
    await new Promise((r) => setTimeout(r, 500))
  }
  await new Promise((r) => setTimeout(r, 1000))
  const el = await page.$('.design')
  if (el) {
    await el.screenshot({ path: OUT + '/' + file })
    console.log(file + ' 已截图')
  } else {
    console.log(file + ' 未找到元素')
  }
}

await page.goto(BASE + '/#/', { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.evaluate(() => localStorage.removeItem('myresume-draft'))

await shotDesigner('classic-blue', 'layout-classic.png')
await shotDesigner('modern-split', 'layout-split.png')
await shotDesigner('dark-sidebar', 'layout-dark.png')

await browser.close()
console.log('done')
