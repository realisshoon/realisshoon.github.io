import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/content/analytics.json', import.meta.url), 'utf8'));
if (!/^G-[A-Z0-9]+$/.test(config.measurementId) || !/^[a-z0-9.-]+$/.test(config.hostname)) {
  throw new Error('Invalid Google Analytics measurement ID or production hostname');
}

// Only the published site collects analytics. Local previews and PDF exports do not.
export const googleTag = `<!-- Google tag (gtag.js) -->
<script>
(function () {
  if (location.protocol !== 'https:' || location.hostname !== ${JSON.stringify(config.hostname)}) return;
  // Browser-local opt-out. Must run before loading or configuring gtag.
  var params = new URLSearchParams(location.search);
  var optOut = params.get('analytics_off') === '1';
  var optIn = params.get('analytics_on') === '1';
  var excluded = false;
  try {
    if (optOut) localStorage.setItem('hsh_analytics_optout_v1', '1');
    else if (optIn) localStorage.removeItem('hsh_analytics_optout_v1');
    excluded = localStorage.getItem('hsh_analytics_optout_v1') === '1';
  } catch (err) {
    // Storage can be unavailable (for example in restricted browsing modes).
    excluded = optOut && !optIn;
  }
  if (optOut || optIn) {
    params.delete('analytics_off');
    params.delete('analytics_on');
    try {
      history.replaceState(history.state, '', location.pathname +
        (params.toString() ? '?' + params.toString() : '') + location.hash);
    } catch (err) {}
  }
  if (excluded) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ${JSON.stringify(config.measurementId)});
  var googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=${config.measurementId}';
  document.head.appendChild(googleTag);
})();
</script>`;
