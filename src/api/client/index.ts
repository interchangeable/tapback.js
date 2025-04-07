import { setClientConfig, config } from "@client/config";
import { request, setApiConfig, ApiResponse } from "@client/request";
import { logger } from "@client/logger";

export {
  setClientConfig,
  setApiConfig,
  request,
  config as clientConfig,
  logger,
};

export type { ApiResponse };
