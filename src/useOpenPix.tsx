import { useEffect } from 'react';

import { useScript } from './useScript';
import config from './config';

export type IOpenPixApi = {
  generateStatic: (options: any) => any;
  status: () => void;
  addEventListener: () => void;
};

declare global {
  interface Window {
    $openpix: unknown[] & IOpenPixApi;
  }
}

export const useOpenPix = () => {
  useEffect(() => {
    window.$openpix = [];
    window.$openpix.push(['config', { appID: config.OPEN_PIX_APP_ID }]);
  }, []);

  const scriptURL = config.OPEN_PIX_URL;

  // eslint-disable-next-line
  const [loaded, error] = useScript(scriptURL);

  useEffect(() => {
    if (!error) {
      return;
    }

    // eslint-disable-next-line
    console.log('OpenPix not loaded');
  }, [error]);
};
