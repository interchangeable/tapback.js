// src/api/index.ts
import {
  checkPushPermission,
  requestPushPermission,
  subscribeToPush,
  unsubscribeFromPush,
} from "./notifications";

import { setClientConfig } from "./client/client";
import { setApiConfig } from "./client/request";

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

window.Tapback = Tapback;

export type { PushPermissionStatus } from "./notifications";
