import { Layout, Menu, Avatar, Dropdown, Button, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  TruckOutlined,
  ToolOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  LogoutOutlined,
  TeamOutlined,
  SettingOutlined,
  BarChartOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { logout } from '../api';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useState, useEffect } from 'react';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();

  const rtlLanguages = ['ar', 'zgh'];
  const [isRTL, setIsRTL] = useState(rtlLanguages.includes(i18n.language));

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setIsRTL(rtlLanguages.includes(lng));
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userRole = user?.role || 'FARMER';

  const getMenuItems = () => {
    const commonItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: t('common.dashboard'),
      }
    ];

    switch(userRole) {
      case 'ADMIN':
        return [
          ...commonItems,
          {
            key: '/users',
            icon: <TeamOutlined />,
            label: t('common.manageUsers'),
          },
          {
            key: '/parcelles',
            icon: <EnvironmentOutlined />,
            label: t('common.parcelles'),
          },
          {
            key: '/cultures',
            icon: <ExperimentOutlined />,
            label: t('common.cultures'),
          },
          {
            key: '/machines',
            icon: <TruckOutlined />,
            label: t('common.machines'),
          },
          {
            key: '/interventions',
            icon: <ToolOutlined />,
            label: t('common.interventions'),
          },
          {
            key: '/demandes',
            icon: <FileTextOutlined />,
            label: t('common.demandes'),
          },
          {
            key: '/irrigation',
            icon: <ThunderboltOutlined />,
            label: t('common.irrigation'),
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: t('common.systemSettings'),
          },
          {
            key: '/reports',
            icon: <BarChartOutlined />,
            label: t('common.generateReports'),
          },
        ];
      
      case 'FARMER':
        return [
          ...commonItems,
          {
            key: '/parcelles',
            icon: <EnvironmentOutlined />,
            label: t('common.parcelles'),
          },
          {
            key: '/cultures',
            icon: <ExperimentOutlined />,
            label: t('common.cultures'),
          },
          {
            key: '/machines',
            icon: <TruckOutlined />,
            label: t('common.machines'),
          },
          {
            key: '/interventions',
            icon: <ToolOutlined />,
            label: t('common.interventions'),
          },
          {
            key: '/demandes',
            icon: <FileTextOutlined />,
            label: t('common.demandes'),
          },
          {
            key: '/irrigation',
            icon: <ThunderboltOutlined />,
            label: t('common.irrigation'),
          },
        ];
      
      case 'TECHNICIEN':
      case 'Agronomist':
        return [
          ...commonItems,
          {
            key: '/interventions',
            icon: <FileTextOutlined />,
            label: t('common.myInterventions'),
          },
          {
            key: '/parcelles',
            icon: <EnvironmentOutlined />,
            label: t('common.parcelles'),
          },
          {
            key: '/cultures',
            icon: <ExperimentOutlined />,
            label: t('common.cultures'),
          },
          {
            key: '/irrigation',
            icon: <ThunderboltOutlined />,
            label: t('common.irrigation'),
          },
          {
            key: '/machines',
            icon: <TruckOutlined />,
            label: t('common.machines'),
          },
          {
            key: '/history',
            icon: <HistoryOutlined />,
            label: t('common.history'),
          },
          {
            key: '/reports',
            icon: <BarChartOutlined />,
            label: t('common.generateReports'),
          },
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: t('common.myProfile'),
          },
        ];
      
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const userMenu = {
    items: [
      {
        key: '1',
        label: t('common.myProfile'),
        icon: <UserOutlined />,
        onClick: () => navigate('/profile'),
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: t('common.logout'),
        icon: <LogoutOutlined />,
        onClick: handleLogout,
        danger: true,
      },
    ],
  };

  const getUserName = () => {
    if (!user) return `${t('common.defaultFirstName')} ${t('common.defaultLastName')}`;
    return `${user.prenom || user.first_name || t('common.defaultFirstName')} ${user.nom || user.last_name || t('common.defaultLastName')}`;
  };

  return (
    <Layout style={{ minHeight: '100vh', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
      <Sider width={220} theme="dark">
        <div style={{ height: 70, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
          <span style={{ color: '#c6ff50', fontWeight: 'bold', fontSize: '20px' }}>
            🌾 Smart Farming
          </span>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ border: 'none', marginTop: '20px' }}
        />
        
        <div style={{ padding: '20px' }}>
          <div style={{
            background: '#4a7c59',
            borderRadius: '16px',
            padding: '20px',
            color: '#fff',
            textAlign: 'center'
          }}>
            <img 
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cartoon%20farmer%20with%20plants%20in%20greenhouse%20flat%20design&image_size=square" 
              alt="Profile" 
              style={{ width: '100%', borderRadius: '12px', marginBottom: '12px' }}
            />
            <Button 
              type="text" 
              icon={<UserOutlined />} 
              onClick={() => navigate('/profile')}
              style={{ color: '#fff', fontWeight: '600' }}
            >
              {t('common.myProfile')}
            </Button>
          </div>
        </div>
        
        <div style={{ padding: '0 20px 20px' }}>
          <Button 
            type="text" 
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ 
              color: '#a3b8a9', 
              width: '100%', 
              textAlign: isRTL ? 'right' : 'left',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}
          >
            {t('common.logout').toUpperCase()}
          </Button>
        </div>
      </Sider>
      
      <Layout style={{ background: '#f0fdf4' }}>
        <Header style={{
          background: 'transparent',
          padding: '0 24px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 'auto',
          lineHeight: 'normal'
        }}>
          <div></div>
          <Space size="large" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <LanguageSwitcher />
            <Dropdown menu={userMenu}>
              <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar icon={<UserOutlined />} />
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>
                    {getUserName()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    {user?.role ? t(`common.${
                      user.role === 'ADMIN' ? 'admin' :
                      user.role === 'FARMER' ? 'farmer' :
                      user.role === 'TECHNICIEN' || user.role === 'Agronomist' ? 'technician' :
                      'user'
                    }`) : ''}
                  </div>
                </div>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ padding: '0 24px 24px', margin: 0 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
