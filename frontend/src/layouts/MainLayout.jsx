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
  PlusOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { logout } from '../api';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  const rtlLanguages = ['ar', 'zgh'];

  useEffect(() => {
    setIsRTL(rtlLanguages.includes(i18n.language));
  }, [i18n.language]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('common.dashboard'),
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
  ];

  const userMenu = {
    items: [
      {
        key: '1',
        label: t('common.myProfile'),
        icon: <UserOutlined />,
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={220}
        theme="dark"
        style={{ order: isRTL ? 2 : 1 }}
      >
        <div style={{
          height: 70,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}>
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
            background: '#c6ff50',
            borderRadius: '16px',
            padding: '20px',
            color: '#0c4a2f',
            textAlign: 'center'
          }}>
            <img 
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cartoon%20farmer%20with%20plants%20in%20greenhouse%20flat%20design&image_size=square" 
              alt="Add form" 
              style={{ width: '100%', borderRadius: '12px', marginBottom: '12px' }}
            />
            <Button type="text" icon={<PlusOutlined />} style={{ color: '#0c4a2f', fontWeight: '600' }}>
              + {t('common.add')}
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
              textAlign: 'left',
              justifyContent: 'flex-start'
            }}
          >
            {t('common.logout').toUpperCase()}
          </Button>
        </div>
      </Sider>
      
      <Layout style={{ order: isRTL ? 1 : 2, background: '#f0fdf4' }}>
        <Header style={{
          background: 'transparent',
          padding: '0 24px 24px',
          display: 'flex',
          justifyContent: isRTL ? 'space-between' : 'space-between',
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
                    {user ? `${user.prenom || user.first_name} ${user.nom || user.last_name}` : `${t('common.defaultFirstName')} ${t('common.defaultLastName')}`}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    {user?.role ? t(`common.${user.role.toLowerCase()}`) : ''}
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
