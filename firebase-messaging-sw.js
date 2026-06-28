// ══════════════════════════════════════════════════════════════════════
// EVP Palace CRM — Firebase Messaging Service Worker
// Place this file alongside index.html in your GitHub repo
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

// Background push — fires when phone is LOCKED or app is CLOSED
messaging.onBackgroundMessage(function(payload) {
  const title = (payload.notification && payload.notification.title) || '🏛️ EVP Palace';
  const body  = (payload.notification && payload.notification.body)  || 'New notification';

  return self.registration.showNotification(title, {
    body:     body,
    icon:     '/evp-crm/icon.png',
    badge:    '/evp-crm/icon.png',
    sound:    'default',
    vibrate:  [300, 100, 300, 100, 300],   // strong vibration pattern
    tag:      'evp-crm',
    renotify: true,                          // always play sound even if tag same
    requireInteraction: true,               // stays on screen until dismissed
    data:     payload.data || {}
  });
});

// Tap notification → open CRM (works even from locked screen)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = 'https://yokesh707.github.io/evp-crm/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.includes('evp-crm') && 'focus' in list[i]) {
          return list[i].focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
