import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generateMetaTags,
  generateStructuredData,
  defaultSEOConfig,
  SEOConfig,
} from '../utils/seo';

interface SEOProps {
  config?: Partial<SEOConfig>;
}

export const SEO: React.FC<SEOProps> = ({ config = {} }) => {
  const seoConfig = { ...defaultSEOConfig, ...config };
  const metaTags = generateMetaTags(seoConfig);
  const structuredData = generateStructuredData();

  return (
    <Helmet>
      <title>{metaTags.title}</title>

      {/* Basic Meta Tags */}
      {metaTags.meta.map((tag, index) => {
        if ('name' in tag) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        } else if ('property' in tag) {
          return (
            <meta key={index} property={tag.property} content={tag.content} />
          );
        }
        return null;
      })}

      {/* Canonical URL */}
      <link rel="canonical" href={seoConfig.url} />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      <script type="application/ld+json">{structuredData}</script>

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.linkedin.com" />
      <link rel="dns-prefetch" href="https://github.com" />
    </Helmet>
  );
};

export default SEO;
