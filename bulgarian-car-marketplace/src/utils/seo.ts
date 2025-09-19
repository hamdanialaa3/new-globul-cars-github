// src/utils/seo.ts
// SEO utilities for Bulgarian Car Marketplace

import { BulgarianCar } from '../firebase';

// Generate meta tags for car pages
export const generateCarMetaTags = (car: BulgarianCar) => {
  const title = `${car.make} ${car.model} ${car.year} - ${car.price}€ | Globul Cars`;
  const description = `${car.make} ${car.model} ${car.year} година, ${car.mileage.toLocaleString('bg-BG')} км, ${car.fuelType}, ${car.transmission}. Цена: ${car.price}€. ${car.location.city}, ${car.location.region}, България.`;

  return {
    title,
    description,
    keywords: `${car.make}, ${car.model}, ${car.year}, кола, автомобил, продажба, ${car.location.city}, България`,
    og: {
      title,
      description,
      image: car.mainImage,
      url: `${window.location.origin}/cars/${car.id}`,
      type: 'product'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: car.mainImage
    }
  };
};

// Generate structured data (JSON-LD) for cars
export const generateCarStructuredData = (car: BulgarianCar) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.make} ${car.model} ${car.year}`,
    description: car.description,
    brand: {
      '@type': 'Brand',
      name: car.make
    },
    model: car.model,
    vehicleIdentificationNumber: car.vinNumber,
    dateVehicleFirstRegistered: car.firstRegistrationDate?.toISOString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileage,
      unitCode: 'KMT'
    },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    color: car.color,
    numberOfDoors: 4, // Default for most cars
    vehicleEngine: {
      '@type': 'EngineSpecification',
      engineDisplacement: {
        '@type': 'QuantitativeValue',
        value: car.engineSize,
        unitCode: 'CMQ'
      },
      enginePower: {
        '@type': 'QuantitativeValue',
        value: car.power,
        unitCode: 'BHP'
      }
    },
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'EUR',
      availability: car.isSold ? 'SoldOut' : 'InStock',
      seller: {
        '@type': 'Person',
        name: car.ownerName,
        telephone: car.ownerPhone,
        email: car.ownerEmail
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    },
    image: car.images,
    address: {
      '@type': 'PostalAddress',
      addressLocality: car.location.city,
      addressRegion: car.location.region,
      postalCode: car.location.postalCode,
      addressCountry: car.location.country
    },
    datePosted: car.createdAt.toISOString(),
    dateModified: car.updatedAt.toISOString()
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${window.location.origin}${crumb.url}`
    }))
  };
};

// Generate organization structured data
export const generateOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Globul Cars',
    description: 'Bulgaria\'s largest car marketplace - buy and sell cars with confidence',
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    sameAs: [
      'https://www.facebook.com/globulcars',
      'https://www.instagram.com/globulcars',
      'https://www.linkedin.com/company/globulcars'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+359-2-123-4567',
      contactType: 'customer service',
      areaServed: 'BG',
      availableLanguage: ['Bulgarian', 'English']
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sofia',
      addressRegion: 'Sofia',
      postalCode: '1000',
      addressCountry: 'BG'
    }
  };
};

// Update document meta tags
export const updateMetaTags = (metaTags: {
  title?: string;
  description?: string;
  keywords?: string;
  og?: Record<string, string>;
  twitter?: Record<string, string>;
}) => {
  // Update title
  if (metaTags.title) {
    document.title = metaTags.title;
  }

  // Update meta description
  if (metaTags.description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metaTags.description);
  }

  // Update keywords
  if (metaTags.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', metaTags.keywords);
  }

  // Update Open Graph tags
  if (metaTags.og) {
    Object.entries(metaTags.og).forEach(([property, content]) => {
      const ogProperty = `og:${property}`;
      let metaTag = document.querySelector(`meta[property="${ogProperty}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', ogProperty);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
  }

  // Update Twitter Card tags
  if (metaTags.twitter) {
    Object.entries(metaTags.twitter).forEach(([name, content]) => {
      const twitterName = `twitter:${name}`;
      let metaTag = document.querySelector(`meta[name="${twitterName}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', twitterName);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
  }
};

// Add structured data to page
export const addStructuredData = (data: object) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]#structured-data');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'structured-data';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Generate sitemap URLs
// Generate sitemap URLs
export const generateSitemapUrls = (cars: BulgarianCar[]) => {
  const baseUrl = window.location.origin;

  interface SitemapUrl {
    url: string;
    priority: number;
    changefreq: 'daily' | 'monthly';
    lastmod?: string;
  }

  const urls: SitemapUrl[] = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/cars', priority: 0.9, changefreq: 'daily' },
    { url: '/sell', priority: 0.8, changefreq: 'monthly' },
    { url: '/about', priority: 0.6, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' }
  ];

  // Add car URLs
  cars.forEach(car => {
    urls.push({
      url: `/cars/${car.id}`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: car.updatedAt.toISOString()
    });
  });

  return urls.map(({ url, ...rest }) => ({
    url: `${baseUrl}${url}`,
    ...rest
  }));
};