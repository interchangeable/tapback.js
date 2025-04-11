import { clientConfig } from "../client";

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (clientConfig.debug) {
      console.debug(`[Tapback] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: any[]) => {
    if (clientConfig.debug) {
      console.info(`[Tapback] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[Tapback] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[Tapback] ${message}`, ...args);
  },
};
