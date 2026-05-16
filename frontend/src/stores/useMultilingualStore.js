import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTranslation } from 'react-i18next';

const useMultilingualStore = create(
  persist(
    (set, get) => ({
      currentLanguage: 'fr',

      setLanguage: (lang) => set({ currentLanguage: lang }),

      translations: {
        parcels: {
          'Parcel A-12': {
            fr: 'Parcelle A-12',
            en: 'Parcel A-12',
            ar: 'القطعة A-12',
            zgh: 'Tiɣsa A-12'
          },
          'Parcel B-5': {
            fr: 'Parcelle B-5',
            en: 'Parcel B-5',
            ar: 'القطعة B-5',
            zgh: 'Tiɣsa B-5'
          },
          'Parcel C-8': {
            fr: 'Parcelle C-8',
            en: 'Parcel C-8',
            ar: 'القطعة C-8',
            zgh: 'Tiɣsa C-8'
          },
          'Parcel D-3': {
            fr: 'Parcelle D-3',
            en: 'Parcel D-3',
            ar: 'القطعة D-3',
            zgh: 'Tiɣsa D-3'
          },
          'Parcel E-1': {
            fr: 'Parcelle E-1',
            en: 'Parcel E-1',
            ar: 'القطعة E-1',
            zgh: 'Tiɣsa E-1'
          },
          'Parcelle Nord A1': {
            fr: 'Parcelle Nord A1',
            en: 'North A1 Parcel',
            ar: 'القطعة الشمالية A1',
            zgh: 'Tiɣsa n ufella A1'
          },
          'Parcelle Sud B2': {
            fr: 'Parcelle Sud B2',
            en: 'South B2 Parcel',
            ar: 'القطعة الجنوبية B2',
            zgh: 'Tiɣsa n ifella B2'
          },
          'Parcelle Est C3': {
            fr: 'Parcelle Est C3',
            en: 'East C3 Parcel',
            ar: 'القطعة الشرقية C3',
            zgh: 'Tiɣsa n uzzal C3'
          },
          'Parcelle Ouest D4': {
            fr: 'Parcelle Ouest D4',
            en: 'West D4 Parcel',
            ar: 'القطعة الغربية D4',
            zgh: 'Tiɣsa n uɣrib D4'
          }
        },
        crops: {
          'Tomatoes': {
            fr: 'Tomates',
            en: 'Tomatoes',
            ar: 'طماطم',
            zgh: 'Timat'
          },
          'Wheat': {
            fr: 'Blé',
            en: 'Wheat',
            ar: 'قمح',
            zgh: 'Tɣalt'
          },
          'Corn': {
            fr: 'Maïs',
            en: 'Corn',
            ar: 'ذرة',
            zgh: 'Tɣawsa'
          },
          'Lettuce': {
            fr: 'Laitue',
            en: 'Lettuce',
            ar: 'خس',
            zgh: 'Lattus'
          },
          'Barley': {
            fr: 'Orge',
            en: 'Barley',
            ar: 'شعير',
            zgh: 'Tmurt'
          }
        },
        machines: {
          'Tracteur John Deere': {
            fr: 'Tracteur John Deere',
            en: 'John Deere Tractor',
            ar: 'جرار جون دير',
            zgh: 'Tractor John Deere'
          },
          'Pulvérisateur agricole': {
            fr: 'Pulvérisateur agricole',
            en: 'Agricultural Sprayer',
            ar: 'مرش زراعي',
            zgh: 'Tasert n tɣawsa'
          },
          'Moissonneuse-batteuse': {
            fr: 'Moissonneuse-batteuse',
            en: 'Combine Harvester',
            ar: 'حصادة',
            zgh: 'Tasert n taggart'
          },
          'Système d\'irrigation': {
            fr: 'Système d\'irrigation',
            en: 'Irrigation System',
            ar: 'نظام ري',
            zgh: 'Tasert n asif'
          },
          'Semoir de précision': {
            fr: 'Semoir de précision',
            en: 'Precision Seeder',
            ar: 'مزارع دقيق',
            zgh: 'Tasert n tɣurt'
          }
        },
        interventions: {
          'Pest Control Application': {
            fr: 'Application de lutte antiparasitaire',
            en: 'Pest Control Application',
            ar: 'تطبيق مكافحة الآفات',
            zgh: 'Tasert n tɣawsa n tɣawtin'
          },
          'Fertilization': {
            fr: 'Fertilisation',
            en: 'Fertilization',
            ar: 'تسميد',
            zgh: 'Tasert n tmurt'
          },
          'Soil Testing': {
            fr: 'Analyse du sol',
            en: 'Soil Testing',
            ar: 'فحص التربة',
            zgh: 'Tasert n tmalat'
          },
          'Harvesting': {
            fr: 'Récolte',
            en: 'Harvesting',
            ar: 'حصاد',
            zgh: 'Taggart'
          }
        },
        users: {
          'Youssef El Idrissi': {
            fr: 'Youssef El Idrissi',
            en: 'Youssef El Idrissi',
            ar: 'يوسف الإدريسي',
            zgh: 'Yusef n Idrissi'
          },
          'Mohammed Alami': {
            fr: 'Mohammed Alami',
            en: 'Mohammed Alami',
            ar: 'محمد العلمي',
            zgh: 'Muhammad n Alami'
          },
          'Youssef Chakir': {
            fr: 'Youssef Chakir',
            en: 'Youssef Chakir',
            ar: 'يوسف شاكير',
            zgh: 'Yusef n Chakir'
          },
          'Amina Berrada': {
            fr: 'Amina Berrada',
            en: 'Amina Berrada',
            ar: 'أمينة برادة',
            zgh: 'Amina n Berrada'
          }
        }
      },

      getTranslatedText: (category, key, lang = get().currentLanguage) => {
        const store = get();
        const categoryData = store.translations[category];
        if (categoryData && categoryData[key]) {
          return categoryData[key][lang] || categoryData[key]['fr'] || key;
        }
        return key;
      }
    }),
    {
      name: 'multilingual-storage'
    }
  )
);

export default useMultilingualStore;
