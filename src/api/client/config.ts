export let config: ClientConfig = {
  debug: false,
};

export type ClientConfig = {
  debug: boolean;
};

export const setClientConfig = (config: ClientConfig) => {
  config = config;
};
