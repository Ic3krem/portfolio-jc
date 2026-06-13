import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioPath = new URL('../portfolio/portfolio.html', import.meta.url);
const html = await readFile(portfolioPath, 'utf8');

test('automation workflows panel shows platform-specific totals', () => {
  const panel = html.match(
    /<!-- Automation Stats -->([\s\S]*?)<!-- Featured: HeronsHub/,
  )?.[1];

  assert.ok(panel, 'automation workflows panel should be present');
  assert.match(panel, /class="auto-stats-title">Automation Workflows</);

  for (const [platform, total] of [
    ['n8n', '35'],
    ['Zapier', '12'],
    ['Make', '16'],
    ['GHL', '5'],
  ]) {
    assert.match(
      panel,
      new RegExp(
        `<span class="auto-stat-num">${total}</span>\\s*<span class="auto-stat-label">${platform}</span>`,
      ),
    );
  }

  assert.doesNotMatch(panel, /Total Workflows|Management|RAG Systems|Personalized Systems/);
  assert.doesNotMatch(panel, /class="auto-tool"/);
});
