self.addEventListener("install", (event) => {
  console.log("Push notification service worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Push notification service worker activated");
  return self.clients.claim();
});

self.addEventListener("push", (event) => {
  console.log("Push notification received", event);

  if (!event.data) {
    console.warn("Push event has no data");
    return;
  }

  try {
    const data = event.data.json();

    const title = data.title || "Notification";
    const options = {
      body: data.body || "",
      icon: data.icon || "/notification-icon.png",
      badge: data.badge || "/notification-badge.png",
      data: {
        url: data.url || "/",
        ...data.data,
      },
      tag: data.tag || "default",
      actions: data.actions || [],
      vibrate: data.vibrate || [200, 100, 200],
      requireInteraction: data.requireInteraction || false,
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error("Error showing notification:", error);
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked", event);

  event.notification.close();

  // Get the URL to open from notification data
  const urlToOpen = event?.notification?.data?.url || "/";

  // Track which action was clicked (if any)
  const clickedAction = event.action;

  event.waitUntil(
    // Try to find an open window and navigate it
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Track notification click
        trackEvent("notification_click", {
          action: clickedAction || "default",
          url: urlToOpen,
        });

        // Try to find an already open window
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }

        // If no matching window, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      }),
  );
});
