// 這是 pwa-loader.js
// 1. 幫每個頁面自動加上 manifest 連結
const link = document.createElement('link');
link.rel = 'manifest';
link.href = './manifest.json'; // 確保路徑正確
document.head.appendChild(link);

// 2. 註冊 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA 啟動成功！', reg))
      .catch(err => console.error('PWA 啟動失敗：', err));
  });
}
