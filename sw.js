const CACHE_NAME = 'my-pwa-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './comments.html',
  './edit.html',
  './forgot-password.html',
  './home.html',
  './login.html',
  './memories.html',
  './message.html',
  './onboarding.html',
  './otp_verify.html',
  './payment.html',
  './profile.html',
  './reset_password.html',
  './s_test.html',
  './search.html',
  './signup.html',
  './social.html',
  './manifest.json',
  './icon.png',
  './pwa-loader.js'
];

// 安裝：下載所有頁面
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(err => console.error('檔案路徑可能有錯，請檢查 sw.js 列表:', err))
  );
});

// 啟動：刪除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// 攔截：沒網路時給快取，有網路時順便備份圖片
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // 1. 如果快取有，直接給
      if (response) return response;
      
      // 2. 如果快取沒有，上網抓，抓完順便存起來(給圖片用)
      return fetch(event.request).then(networkResponse => {
        if(networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
           const clone = networkResponse.clone();
           caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
