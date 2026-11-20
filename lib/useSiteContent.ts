'use client';

import { useState, useEffect } from 'react';
import type { SiteContent } from '@/types';
import { DEFAULT_SITE_CONTENT } from './initialData';
import { getSiteContent, getInstantSiteContent } from './firestore';

export function useSiteContent(initialContent?: SiteContent): SiteContent {
  const [content, setContent] = useState<SiteContent>(
    initialContent || DEFAULT_SITE_CONTENT
  );

  useEffect(() => {
    // 1. Synchronous instant load from localStorage
    setContent(getInstantSiteContent());

    // 2. Async load from Firebase Firestore
    let active = true;
    async function syncFromFirestore() {
      try {
        const latest = await getSiteContent();
        if (active && latest) {
          setContent(latest);
        }
      } catch {
        // Fallback already set
      }
    }

    syncFromFirestore();

    window.addEventListener('jfk-site-content-updated', syncFromFirestore);
    window.addEventListener('storage', syncFromFirestore);
    return () => {
      active = false;
      window.removeEventListener('jfk-site-content-updated', syncFromFirestore);
      window.removeEventListener('storage', syncFromFirestore);
    };
  }, []);

  return content;
}
