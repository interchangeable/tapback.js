import { PushPermissionStatus, pushSupported } from "../notification";

/**
 * Get the current push notification permission status
 */
export function checkPushPermission(): PushPermissionStatus {
  if (!pushSupported()) {
    return "unsupported";
  }

  return Notification.permission as PushPermissionStatus;
}
