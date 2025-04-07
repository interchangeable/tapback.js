export let client: ClientConfig = {
  debug: false,
};

export type ClientConfig = {
  debug: boolean;
};

export const setClientConfig = (config: ClientConfig) => {
  client = config;
};
