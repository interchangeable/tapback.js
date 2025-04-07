import { logger } from "./logger";

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

// Configuration options
export interface ApiConfig {
  baseUrl: string | Error;
  apiKey: string | Error;
}

const config: ApiConfig = {
  baseUrl: "http://localhost:3000",
  apiKey: "do-i-even-need-this",
};

export const setApiConfig = (opts: ApiConfig) => {
  if (!opts.baseUrl) throw new Error("baseUrl is required");
  if (!opts.apiKey) throw new Error("apiKey is required");

  config.baseUrl = opts.baseUrl;
  config.apiKey = opts.apiKey;

  logger.info(
    `API config updated: baseUrl=${config.baseUrl}, apiKey=${config.apiKey}`,
  );
};

export async function request<T = any>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {},
): Promise<ApiResponse<T>> {
  try {
    const { method = "GET", body, headers = {} } = options;

    const url = `${config.baseUrl}${endpoint}`;

    // Add default headers
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Add API key if configured
    if (config.apiKey && !(config.apiKey instanceof Error)) {
      requestHeaders["X-Api-Key"] = config.apiKey as string;
    }

    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "same-origin",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return {
      data,
    };
  } catch (error) {
    logger.error("API request error:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown API error",
    };
  }
}
