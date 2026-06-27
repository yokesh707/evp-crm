// ══════════════════════════════════════════════════════════════════════
// EVP Palace CRM — Firebase Cloud Messaging Service Worker
// Upload this file to GitHub alongside index.html
// ══════════════════════════════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyC2c1V3cYDX5Njc78BGvbr43caM089IuiE",
  authDomain:        "evp-crm.firebaseapp.com",
  databaseURL:       "https://evp-crm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "evp-crm",
  storageBucket:     "evp-crm.firebasestorage.app",
  messagingSenderId: "78324247402",
  appId:             "1:78324247402:web:f4060a2bf5b04baf411313"
});

const messaging = firebase.messaging();

// Handle background push notifications (app is CLOSED or in background)
messaging.onBackgroundMessage(function(payload) {
  const title   = (payload.notification && payload.notification.title) || '🏛️ EVP Palace';
  const body    = (payload.notification && payload.notification.body)  || 'New notification';
  const options = {
    body:    body,
    icon:    'https://yokesh707.github.io/evp-crm/icon.png',
    badge:   'https://yokesh707.github.io/evp-crm/icon.png',
    sound:   'default',
    vibrate: [200, 100, 200, 100, 200],
    data:    payload.data || {},
    actions: [{ action: 'open', title: '📋 Open CRM' }],
    tag:     'evp-crm-notif',
    renotify: true
  };
  return self.registration.showNotification(title, options);
});

// Tap notification → open the CRM app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      var crmUrl = 'https://yokesh707.github.io/evp-crm/';
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.includes('evp-crm') && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      return clients.openWindow(crmUrl);
    })
  );
});
