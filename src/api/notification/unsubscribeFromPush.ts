import { pushSupported } from "@notification";
import { logger, ApiResponse, request } from "@client";

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPush(): Promise<ApiResponse> {
  if (!pushSupported()) {
    return {
      error: "Push notifications are not supported in this browser",
    };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      return {
        data: { message: "No subscription found to unsubscribe" },
      };
    }

    // Unsubscribe locally
    const result = await subscription.unsubscribe();

    if (result) {
      // Notify backend
      const endpoint = subscription.endpoint;
      const res = await request("/push/subscriptions", {
        method: "DELETE",
        body: { endpoint },
      });

      return res;
    } else {
      return {
        error: "Failed to unsubscribe from push notifications",
      };
    }
  } catch (error) {
    logger.error("Error unsubscribing from push:", error);
    return {
      error:
        error instanceof Error ? error.message : "Unknown error unsubscribing",
    };
  }
}
