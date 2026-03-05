export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Spilled Coffee Syndicate',
    url: 'https://spilledcoffeesyndicate.com',
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Spilled Coffee Syndicate',
    url: 'https://spilledcoffeesyndicate.com',
  };
}
