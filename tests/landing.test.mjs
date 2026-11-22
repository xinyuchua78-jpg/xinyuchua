import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const testSource = readFileSync(new URL('./landing.test.mjs', import.meta.url), 'utf8');

test('renders Cai Xinyu personal brand identity and required sections', () => {
  assert.match(html, /蔡欣渝/);
  assert.match(html, /让人生拥有更多可能/);
  for (const id of ['home', 'domains', 'about', 'services', 'philosophy', 'blog', 'contact']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test('includes four accessible domain tabs and matching panels', () => {
  const tabs = html.match(/class="domain-tab(?:\s|")/g) ?? [];
  const panels = html.match(/class="domain-panel(?:\s|")/g) ?? [];
  assert.equal(tabs.length, 4);
  assert.equal(panels.length, 4);
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /AI 智能应用/);
  assert.match(html, /健康与美容/);
  assert.match(html, /灵性探索/);
  assert.match(html, /公益与社会影响力/);
});

test('uses project-local brand imagery with meaningful alternative text', () => {
  assert.match(html, /assets\/xinyu-hero\.png/);
  assert.match(html, /assets\/xinyu-domains\.png/);
  assert.match(html, /alt="蔡欣渝/);
});

test('does not publish invented contact data or third-party brand copy', () => {
  assert.doesNotMatch(html, /purplesalon|Purple Salon/i);
  assert.doesNotMatch(html, /href="mailto:[^"]+"/);
  assert.doesNotMatch(html, /href="tel:[^"]+"/);
});

test('defines the approved luxury palette and accessible interaction states', () => {
  assert.match(css, /--obsidian:/);
  assert.match(css, /--aubergine:/);
  assert.match(css, /--champagne:/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /overflow-x:\s*hidden/);
});

test('provides responsive and reduced-motion layouts', () => {
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('domain interaction updates selected tab and hidden panels', () => {
  assert.match(js, /function\s+activateDomain\s*\(/);
  assert.match(js, /aria-selected/);
  assert.match(js, /panel\.hidden/);
  assert.match(js, /ArrowRight/);
  assert.match(js, /ArrowLeft/);
});

test('enhances mobile navigation and scroll reveals without external libraries', () => {
  assert.match(js, /menuToggle/);
  assert.match(js, /IntersectionObserver/);
  assert.doesNotMatch(js, /jquery|gsap/i);
});

test('tests the committed deployment files instead of an untracked source copy', () => {
  assert.doesNotMatch(testSource, /new URL\('\.\.\/Xinyu Website Contain/);
});

test('keeps core content and mobile navigation available without JavaScript', () => {
  assert.doesNotMatch(css, /(?:^|})\[data-reveal\]\{opacity:0/m);
  assert.match(css, /\.js\s+\[data-reveal\]/);
  assert.match(css, /\.js\s+\.site-header\s+nav/);
  assert.match(js, /documentElement\.classList\.add\(['"]js['"]\)/);
});

test('retains the original blog topics without dead read-article links', () => {
  assert.match(html, /大语言模型到底在做什么/);
  assert.match(html, /三个步骤，写出更有效的提示词/);
  assert.match(html, /为什么做项目比收藏教程更重要/);
  assert.doesNotMatch(html, /href="#blog">阅读文章/);
});

test('releases mobile menu scroll lock when viewport becomes desktop', () => {
  assert.match(js, /matchMedia\(['"]\(max-width:\s*900px\)['"]\)/);
  assert.match(js, /addEventListener\(['"]change['"],\s*[^)]*closeMenu/);
});
