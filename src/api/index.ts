import {
  checkPushPermission,
  requestPushPermission,
  subscribeToPush,
  testNotification,
  unsubscribeFromPush,
} from "./notification";

import { setClientConfig, setApiConfig } from "./client";

// Main Type Export
export type { PushPermissionStatus } from "./notification";

// Main API export
export const Tapback = {
  Notifications: {
    checkPushPermission,
    requestPushPermission,
    subscribeToPush,
    testNotification,
    unsubscribeFromPush,
  },
  Client: {
    setClientConfig,
    setApiConfig,
  },
};

// @ts-ignore
window.Tapback = Tapback;
