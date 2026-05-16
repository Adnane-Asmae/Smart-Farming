export function formatDate(dateString, lang) {
  const localeMap = {
    fr: 'fr-FR',
    ar: 'ar-MA',
    en: 'en-US',
    tz: 'tzm-MA',
    zgh: 'tzm-MA'
  };

  const locale = localeMap[lang] || 'en-US';
  
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  } catch (e) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  }
}
