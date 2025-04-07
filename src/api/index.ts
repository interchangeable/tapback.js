// src/api/index.ts
import {
  checkPushPermission,
  requestPushPermission,
  subscribeToPush,
  unsubscribeFromPush,
} from "@notification";

import { setClientConfig, setApiConfig } from "@client";

// Main Type Export
export type { PushPermissionStatus } from "@notification";

// Main API export
export const Tapback = {
  Notifications: {
    checkPushPermission,
    requestPushPermission,
    subscribeToPush,
    unsubscribeFromPush,
  },
  Client: {
    setClientConfig,
    setApiConfig,
  },
};

// @ts-ignore
window.Tapback = Tapback;
