// Replaces the old quick-court service worker: clears its caches, unregisters itself and
// sends open pages to the app, so installed phones don't stay on the cached old page.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key)
      await self.registration.unregister()
      for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate('https://app.vybe.monster/')
    })(),
  )
})
