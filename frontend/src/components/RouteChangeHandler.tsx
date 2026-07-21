import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export function RouteChangeHandler() {
  const location = useLocation();
  const { stopLoading } = useLoading();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't show/stop loader logic on the very first mount of the app
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // New route has committed — stop the loader (respecting min display time)
    stopLoading();
  }, [location.pathname, stopLoading]);

  return null;
}