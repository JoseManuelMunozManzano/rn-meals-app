import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { fetchFonts } from '../helpers/fetchFonts';

export const useSplashScreen = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dataLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [dataLoaded]);

  return {
    dataLoaded,
    onLayoutRootView,
  };
};
