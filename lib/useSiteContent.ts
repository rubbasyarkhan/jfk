'use client';

import { useState, useEffect } from 'react';
import type { SiteContent } from '@/types';
import { DEFAULT_SITE_CONTENT } from './initialData';
import {
  getSiteContent,
  getInstantSiteContent,
  ensureRealtimeSync,
} from './firestore';

export function useSiteContent(initialContent?: SiteContent): SiteContent {
  const [content, setContent] = useState<SiteContent>(
    initialContent || DEFAULT_SITE_CONTENT
  );

  useEffect(() => {
    ensureRealtimeSync();
    setContent(getInstantSiteContent());

    let active = true;

    // Immediate update when onSnapshot or admin save updates memorySiteContent
    function handleLiveMemoryUpdate() {
      if (active) {
        setContent(getInstantSiteContent());
      }
    }

    // Direct server fetch bypassing all caches on mount and tab focus
    async function fetchFromServer() {
      try {
        const latest = await getSiteContent();
        if (active && latest) {
          setContent(latest);
        }
      } catch {
        // Ignore
      }
    }

    fetchFromServer();

    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        fetchFromServer();
      }
    }

    window.addEventListener('jfk-site-content-updated', handleLiveMemoryUpdate);
    window.addEventListener('focus', fetchFromServer);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      active = false;
      window.removeEventListener(
        'jfk-site-content-updated',
        handleLiveMemoryUpdate
      );
      window.removeEventListener('focus', fetchFromServer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return content;
}
