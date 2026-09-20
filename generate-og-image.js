const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const width = 1200;
const height = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <radialGradient id="feltGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1b6b3b"/>
      <stop offset="55%" stop-color="#134e27"/>
      <stop offset="100%" stop-color="#072212"/>
    </radialGradient>

    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="35%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>

    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>

    <filter id="cardShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- Background Felt -->
  <rect width="${width}" height="${height}" fill="url(#feltGrad)"/>

  <!-- Ornate Border Frame -->
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="url(#goldBorder)" stroke-width="3" stroke-opacity="0.5"/>
  <rect x="34" y="34" width="${width - 68}" height="${height - 68}" rx="18" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

  <!-- Corner Suit Emblems -->
  <g fill="url(#goldBorder)" opacity="0.35" font-size="28" font-family="serif">
    <text x="50" y="70">♠</text>
    <text x="${width - 70}" y="70">♥</text>
    <text x="50" y="${height - 50}">♣</text>
    <text x="${width - 70}" y="${height - 50}">♦</text>
  </g>

  <!-- Left Side: Cascading Hand of 4 Cards (A♠, K♥, Q♦, J♣) -->
  <g id="cardsHand" transform="translate(180, 70)">
    
    <!-- Jack of Clubs (Rotated -18 deg) -->
    <g transform="translate(40, 240) rotate(-18)" filter="url(#cardShadow)">
      <rect x="-80" y="-120" width="160" height="240" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="-64" y="-76" font-family="-apple-system, sans-serif" font-size="28" font-weight="900" fill="#0f172a">J</text>
      <text x="-64" y="-52" font-family="-apple-system, sans-serif" font-size="20" fill="#0f172a">♣</text>
      <circle cx="0" cy="5" r="32" fill="none" stroke="#0f172a" stroke-width="2"/>
      <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="30" font-weight="900" fill="#0f172a" text-anchor="middle">J</text>
    </g>

    <!-- Queen of Diamonds (Rotated -6 deg) -->
    <g transform="translate(120, 230) rotate(-6)" filter="url(#cardShadow)">
      <rect x="-80" y="-120" width="160" height="240" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="-64" y="-76" font-family="-apple-system, sans-serif" font-size="28" font-weight="900" fill="#dc2626">Q</text>
      <text x="-64" y="-52" font-family="-apple-system, sans-serif" font-size="20" fill="#dc2626">♦</text>
      <circle cx="0" cy="5" r="32" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="30" font-weight="900" fill="#dc2626" text-anchor="middle">Q</text>
    </g>

    <!-- King of Hearts (Rotated 6 deg) -->
    <g transform="translate(200, 235) rotate(6)" filter="url(#cardShadow)">
      <rect x="-80" y="-120" width="160" height="240" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="-64" y="-76" font-family="-apple-system, sans-serif" font-size="28" font-weight="900" fill="#dc2626">K</text>
      <text x="-64" y="-52" font-family="-apple-system, sans-serif" font-size="20" fill="#dc2626">♥</text>
      <circle cx="0" cy="5" r="32" fill="none" stroke="#dc2626" stroke-width="2"/>
      <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="30" font-weight="900" fill="#dc2626" text-anchor="middle">K</text>
    </g>

    <!-- Ace of Spades (Rotated 18 deg, in front) -->
    <g transform="translate(280, 255) rotate(18)" filter="url(#cardShadow)">
      <rect x="-80" y="-120" width="160" height="240" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="-64" y="-76" font-family="-apple-system, sans-serif" font-size="28" font-weight="900" fill="#0f172a">A</text>
      <text x="-64" y="-52" font-family="-apple-system, sans-serif" font-size="20" fill="#0f172a">♠</text>
      <text x="0" y="24" font-family="-apple-system, sans-serif" font-size="70" fill="#0f172a" text-anchor="middle">♠</text>
    </g>
  </g>

  <!-- Right Side: Content & Branding -->
  <g transform="translate(680, 150)">
    <!-- Small Category Pill -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="190" height="34" rx="17" fill="#022c14" stroke="url(#goldBorder)" stroke-width="1.5"/>
      <text x="95" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#fef08a" text-anchor="middle" letter-spacing="2">CLASSIC PWA GAME</text>
    </g>

    <!-- Main Title -->
    <text x="0" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="url(#goldText)" letter-spacing="1">
      SOLITAIRE
    </text>

    <!-- Subtitle -->
    <text x="0" y="138" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="700" fill="#ffffff">
      Klondike • Offline • Installable
    </text>

    <!-- Description Lines -->
    <text x="0" y="190" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="#94a3b8" font-weight="500">
      Play the classic card game anywhere. Touch-optimized,
    </text>
    <text x="0" y="218" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" fill="#94a3b8" font-weight="500">
      smooth animations, audio effects, and 100% offline.
    </text>

    <!-- Badges Row -->
    <g transform="translate(0, 270)">
      <!-- Badge 1: Android & iPhone -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="180" height="42" rx="12" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1"/>
        <text x="90" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">
          📱 iOS &amp; Android
        </text>
      </g>

      <!-- Badge 2: Offline Ready -->
      <g transform="translate(195, 0)">
        <rect x="0" y="0" width="165" height="42" rx="12" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1"/>
        <text x="82" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#34d399" text-anchor="middle">
          ⚡ 100% Offline
        </text>
      </g>
    </g>
  </g>
</svg>
`;

fs.writeFileSync('og-image.svg', svg.trim());

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${width}px; height: ${height}px; overflow: hidden; background: #072212; }
  img { width: 100%; height: 100%; display: block; }
</style>
</head>
<body>
<img src="og-image.svg" />
</body>
</html>`;

fs.writeFileSync('render-og.html', html);

async function captureOg() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  try {
    const versionRes = await fetch('http://127.0.0.1:9223/json/version');
    const versionData = await versionRes.json();
    const wsUrl = versionData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const { targetId } = await send('Target.createTarget', { url: 'file:///' + __dirname.replace(/\\/g, '/') + '/render-og.html' });
    const pageWs = new WebSocket(`ws://127.0.0.1:9223/devtools/page/${targetId}`);
    await new Promise(r => pageWs.onopen = r);

    function sendPage(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            pageWs.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        pageWs.addEventListener('message', handler);
        pageWs.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await sendPage('Page.enable');
    await sendPage('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 800));

    // Capture JPEG quality 85 (optimal for WhatsApp under 300KB)
    const jpgRes = await sendPage('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync('og-image.jpg', Buffer.from(jpgRes.data, 'base64'));
    const jpgStats = fs.statSync('og-image.jpg');
    console.log(`og-image.jpg saved: ${jpgStats.size} bytes (${Math.round(jpgStats.size / 1024)} KB)`);

    // Also capture PNG for platforms that prefer PNG
    const pngRes = await sendPage('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('og-image.png', Buffer.from(pngRes.data, 'base64'));
    const pngStats = fs.statSync('og-image.png');
    console.log(`og-image.png saved: ${pngStats.size} bytes (${Math.round(pngStats.size / 1024)} KB)`);

    pageWs.close();
    ws.close();
  } finally {
    chrome.kill();
    if (fs.existsSync('render-og.html')) fs.unlinkSync('render-og.html');
  }
}

captureOg();
