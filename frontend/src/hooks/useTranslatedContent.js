import useMultilingualStore from '../stores/useMultilingualStore';

export const useTranslatedContent = () => {
  const getTranslatedText = useMultilingualStore(state => state.getTranslatedText);
  const currentLanguage = useMultilingualStore(state => state.currentLanguage);

  const tContent = (category, key) => {
    return getTranslatedText(category, key, currentLanguage);
  };

  return {
    tContent,
    currentLanguage
  };
};
