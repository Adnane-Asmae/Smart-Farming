import { Dropdown, Button, Space, Tag } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'zgh', name: 'ⵜⴰⵎⵉⴼⵉⵜ', flag: '🇲🇦' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  const items = languages.map(lang => ({
    key: lang.code,
    label: (
      <Space>
        <span>{lang.flag}</span>
        <span>{lang.name}</span>
      </Space>
    ),
    onClick: () => changeLanguage(lang.code)
  }));

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button 
        type="text" 
        icon={<GlobalOutlined />}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          height: '40px'
        }}
      >
        <Tag style={{ margin: 0 }}>
          {getCurrentLanguage().flag} {getCurrentLanguage().name}
        </Tag>
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
