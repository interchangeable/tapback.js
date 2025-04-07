import { requestPushPermission } from "@notification/requestPushPermission";
import { checkPushPermission } from "@notification/checkPushPersmission";
import { subscribeToPush } from "@notification/subscribeToPush";
import { unsubscribeFromPush } from "@notification/unsubscribeFromPush";

// Types for push notifications
export type PushPermissionStatus =
  | "granted"
  | "denied"
  | "default"
  | "unsupported";

/**
 * Check if the browser supports push notifications
 */
export function pushSupported(): boolean {
  return !!(
    window.Notification /* W3C Specification */ ||
    // @ts-ignore
    window.webkitNotifications /* old WebKit Browsers */ ||
    // @ts-ignore
    navigator.mozNotification /* Firefox for Android and Firefox OS */
  );
}

export {
  checkPushPermission,
  requestPushPermission,
  subscribeToPush,
  unsubscribeFromPush,
};
