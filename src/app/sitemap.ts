import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://santoshadabala.com',
      lastModified: new Date('2026-05-03'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
