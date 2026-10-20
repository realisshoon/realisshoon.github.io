import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/content/analytics.json', import.meta.url), 'utf8'));
if (!/^G-[A-Z0-9]+$/.test(config.measurementId) || !/^[a-z0-9.-]+$/.test(config.hostname)) {
  throw new Error('Invalid Google Analytics measurement ID or production hostname');
}

// Only the published site collects analytics. Local previews and PDF exports do not.
export const googleTag = `<!-- Google tag (gtag.js) -->
<script>
if (location.protocol === 'https:' && location.hostname === ${JSON.stringify(config.hostname)}) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ${JSON.stringify(config.measurementId)});
  var googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=${config.measurementId}';
  document.head.appendChild(googleTag);
}
</script>`;
