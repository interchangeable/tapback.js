import { pushSupported } from "../notification";
import { requestPushPermission } from "../notification/requestPushPermission";
import { logger, request } from "../client";

export type PushSubscriptionData = {
  endpoint: string;
  expirationTime: number | null;
  userAgent: string;
  createdAt: number;
  keys: {
    p256dh: string;
    auth: string;
  };
  tags: string[];
};

/**
 * Subscribe the user to push notifications
 * @param tags Optional tags to categorize this subscription
 * @returns Promise with the subscription data
 */
export async function subscribeToPush(tags: string[] = []) {
  if (!pushSupported()) {
    return {
      error: "Push notifications are not supported in this browser",
    };
  }

  // First ensure we have permission
  const permission = await requestPushPermission();
  if (permission !== "granted") {
    return {
      error: `Push permission not granted: ${permission}`,
    };
  }

  try {
    // Register service worker if needed
    const registration = await registerServiceWorker();

    // Get the subscription or create a new one
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // Get application server key from backend
      const response = await request<{ publicKey: string }>("/vapidPublicKey");

      const publicKey = await response.text();
      const options: PushSubscriptionOptionsInit = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      };

      subscription = await registration.pushManager.subscribe(options);
    }

    const body = {
      subscription: {
        endpoint: subscription.endpoint,
        expirationTime: subscription.expirationTime,
        keys: {
          p256dh: arrayBufferToBase64(
            subscription.getKey("p256dh") as ArrayBuffer,
          ),
          auth: arrayBufferToBase64(subscription.getKey("auth") as ArrayBuffer),
        },
        userAgent: navigator.userAgent,
        createdAt: Date.now(),
        tags,
      },
    };
    // Send subscription to backend
    const result = await request("/register", {
      method: "POST",
      body,
    });

    return result;
  } catch (error) {
    logger.error("Error subscribing to push:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unknown error subscribing to push",
    };
  }
}

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

// convert URL base64 to Uint8Array, required for applicationServerKey
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
