import { PushPermissionStatus, pushSupported } from ".";
import { logger } from "../client/logger";

/**
 * Request permission for push notifications
 * @returns Promise that resolves to the permission status
 */
export async function requestPushPermission(): Promise<PushPermissionStatus> {
  if (!pushSupported()) {
    logger.warn("Push notifications are not supported in this browser");
    return "unsupported";
  }

  try {
    const permission = await Notification.requestPermission();
    logger.info(`Push permission status: ${permission}`);
    return permission as PushPermissionStatus;
  } catch (error) {
    logger.error("Error requesting notification permission:", error);
    throw error;
  }
}
