// SEO utility functions
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  url?: string;
  image?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export const generateMetaTags = (config: SEOConfig) => {
  const {
    title,
    description,
    keywords = [],
    author = 'Harsimran jeet Singh',
    url = 'https://h4harsimran.github.io',
    image = 'https://h4harsimran.github.io/og-image.jpg',
    type = 'website',
    siteName = 'Harsimran jeet Singh Portfolio',
    locale = 'en_US',
  } = config;

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'author', content: author },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'theme-color', content: '#1e3a8a' },
      { name: 'msapplication-TileColor', content: '#1e3a8a' },
      { name: 'application-name', content: siteName },

      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      {
        property: 'og:image:alt',
        content: `${author} - Professional Portfolio`,
      },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      {
        name: 'twitter:image:alt',
        content: `${author} - Professional Portfolio`,
      },
      { name: 'twitter:creator', content: '@harsimranjeet' },

      // LinkedIn specific
      {
        property: 'article:author',
        content: 'https://www.linkedin.com/in/hs10',
      },

      // Additional SEO
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: siteName },
    ],
  };
};

export const generateStructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Harsimran jeet Singh',
    jobTitle: 'Manufacturing Sciences & Technology Leader',
    description:
      'CAR-T manufacturing specialist with 8+ years of biotech experience in scale-up, technology transfer, and process engineering',
    url: 'https://h4harsimran.github.io',
    image: 'https://h4harsimran.github.io/og-image.jpg',
    email: 'harsimranjeetsingh4@gmail.com',
    telephone: '+1-587-937-3631',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hamilton',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    sameAs: ['https://www.linkedin.com/in/hs10'],
    worksFor: {
      '@type': 'Organization',
      name: 'OmniaBio Inc',
      description: 'Biotechnology company specializing in CAR-T manufacturing',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Alberta',
        description: 'MEng Chemical Engineering (Process Control)',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Panjab University Chandigarh',
        description: 'BEng Chemical Engineering',
      },
    ],
    knowsAbout: [
      'CAR-T Manufacturing',
      'Technology Transfer',
      'Process Engineering',
      'Scale-up Operations',
      'Risk Assessment',
      'Biotech Manufacturing',
      'Pharmaceutical Manufacturing',
      'Process Optimization',
      'Quality Assurance',
      'Regulatory Compliance',
      'FMEA',
      'HAZOP Studies',
      'TFF',
      'Chromatography',
      'Sterile Filtration',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Master of Engineering in Chemical Engineering',
        educationalLevel: 'Graduate',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'University of Alberta',
        },
      },
    ],
  };

  return JSON.stringify(structuredData);
};

export const defaultSEOConfig: SEOConfig = {
  title:
    'Harsimran jeet Singh - Manufacturing Sciences & Technology Leader | CAR-T Specialist',
  description:
    'Manufacturing Sciences & Technology Leader specializing in CAR-T manufacturing, scale-up, and technology transfer. 8+ years of biotech experience with 300+ equipment validated and 10+ projects led. Expert in process engineering, risk assessment, and regulatory compliance.',
  keywords: [
    'CAR-T manufacturing',
    'biotech manufacturing',
    'pharmaceutical manufacturing',
    'technology transfer',
    'scale-up operations',
    'process engineering',
    'manufacturing sciences',
    'biotech specialist',
    'process optimization',
    'quality assurance',
    'regulatory compliance',
    'FMEA',
    'HAZOP studies',
    'TFF',
    'chromatography',
    'sterile filtration',
    'viral filtration',
    'formulation',
    'reactors',
    'biotechnology',
    'biopharma',
    'Harsimran Singh',
    'Hamilton Ontario',
    'OmniaBio',
    'University of Alberta',
  ],
  author: 'Harsimran jeet Singh',
  type: 'profile',
  siteName: 'Harsimran jeet Singh - Professional Portfolio',
  url: 'https://h4harsimran.github.io',
  image: 'https://h4harsimran.github.io/og-image.jpg',
};
