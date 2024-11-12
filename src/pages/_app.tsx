import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initData = window.Telegram.WebApp.initData;

      axios
        .post('/api/validate-hash', { hash: initData })
        .then((response) => {
          setIsHashValid(response.status === 200);
          if (response.status === 200) {
            setUsername(window.Telegram.WebApp.initDataUnsafe?.user?.first_name || null);
          }
        })
        .catch(() => setIsHashValid(false));
    }
  }, []);

  if (!isHashValid) {
    return null;
  }

  return <Component {...pageProps} username={username} />;
}

export default MyApp;
