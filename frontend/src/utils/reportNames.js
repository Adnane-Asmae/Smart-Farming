export function getReportName(report, lang) {
  const types = {
    monthly: { fr: 'Rapport mensuel', ar: 'تقرير شهري', en: 'Monthly Report', tz: 'Aneɣlaf ayyurur', zgh: 'Aneɣlaf ayyurur' },
    weekly: { fr: 'Rapport hebdomadaire', ar: 'تقرير أسبوعي', en: 'Weekly Report', tz: 'Aneɣlaf n yimalass', zgh: 'Aneɣlaf n yimalass' },
    annual: { fr: 'Rapport annuel', ar: 'تقرير سنوي', en: 'Annual Report', tz: 'Aneɣlaf aseggas', zgh: 'Aneɣlaf aseggas' },
  };

  const months = {
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    tz: ['Yennayer', 'Fuṛar', 'Meɣres', 'Yebrir', 'Mayyu', 'Yunyu', 'Yulyuz', 'Ɣuct', 'Ctembeṛ', 'Tubeṛ', 'Nunembeṛ', 'Dujembeṛ'],
    zgh: ['Yennayer', 'Fuṛar', 'Meɣres', 'Yebrir', 'Mayyu', 'Yunyu', 'Yulyuz', 'Ɣuct', 'Ctembeṛ', 'Tubeṛ', 'Nunembeṛ', 'Dujembeṛ']
  };

  const baseName = types[report.type][lang] || types[report.type]['en'];
  
  if (report.month) {
    const monthName = months[lang][report.month - 1] || months['en'][report.month - 1];
    return `${baseName} – ${monthName} ${report.year}`;
  } else if (report.week) {
    const weekLabels = {
      fr: `Semaine ${report.week}`,
      ar: `الأسبوع ${report.week}`,
      en: `Week ${report.week}`,
      tz: `Imalass ${report.week}`,
      zgh: `Imalass ${report.week}`
    };
    return `${baseName} – ${weekLabels[lang]}`;
  } else if (report.year) {
    return `${baseName} – ${report.year}`;
  } else {
    return baseName;
  }
}
