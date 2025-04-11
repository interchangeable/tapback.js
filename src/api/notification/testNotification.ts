import { logger, request } from "../client";

export const testNotification = async () => {
  try {
    // Register service worker if needed
    const registration = await registerServiceWorker();
    // Get the subscription or create a new one
    let subscription = await registration.pushManager.getSubscription();

    const body = {
      subscription,
      title: "Test Notification",
      message: "This is a test notification",
      userId: "user123",
    };

    const response = await request("/sendNotification", {
      method: "POST",
      body,
    });

    if (response.status === 200) {
      logger.info("Notification test successful");
    } else {
      logger.error("Notification test failed");
    }
  } catch (error) {
    logger.error("Notification test failed", error);
  }
};

/**
 * Register the service worker needed for push notifications
 */
async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const swPath = "/service-worker.js";

  try {
    return await navigator.serviceWorker.register(swPath);
  } catch (error) {
    logger.error("Service Worker registration failed:", error);
    throw error;
  }
}
