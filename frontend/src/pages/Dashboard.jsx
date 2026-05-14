import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Avatar, Input, Space, Badge, Tag, Statistic } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FullscreenOutlined,
  SwapOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  TruckOutlined,
  ToolOutlined,
  ClockCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import useAuthStore from '../stores/useAuthStore';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  const rtlLanguages = ['ar', 'zgh'];

  useEffect(() => {
    setIsRTL(rtlLanguages.includes(i18n.language));
  }, [i18n.language]);

  const userRole = user?.role || 'Agronomist';

  const getDashboardData = () => {
    switch(userRole) {
      case 'Admin':
        return {
          title: t('admin.title'),
          subtitle: t('admin.subtitle'),
          mainHero: {
            title: t('admin.heroTitle'),
            users: '156',
            farms: '42',
            todayActivities: '28',
            pendingRequests: '12',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
          },
          stats: [
            { title: t('admin.totalUsers'), value: 156, icon: <TeamOutlined />, color: '#42a5f5' },
            { title: t('admin.activeFarms'), value: 42, icon: <EnvironmentOutlined />, color: '#66bb6a' },
            { title: t('admin.todayActivities'), value: 28, icon: <ToolOutlined />, color: '#ffa726' },
            { title: t('admin.pendingRequests'), value: 12, icon: <ClockCircleOutlined />, color: '#ef5350' }
          ],
          fieldCards: [
            { id: 1, title: t('admin.userManagement'), status: 'active', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop' },
            { id: 2, title: t('admin.farmMonitoring'), status: 'active', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop' },
            { id: 3, title: t('admin.systemSettings'), status: 'active', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop' },
            { id: 4, title: t('admin.reportsAnalytics'), status: 'active', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' }
          ]
        };
      case 'Farmer':
        return {
          title: t('farmer.title'),
          subtitle: t('farmer.subtitle'),
          mainHero: {
            title: t('farmer.heroTitle'),
            area: '8.5 ha',
            date: '07.10.2025',
            time: '15:45',
            temp: '24°C',
            cropStage: t('farmer.cropStage'),
            nextTask: t('farmer.nextTask'),
            image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop'
          },
          stats: [
            { title: t('farmer.myParcels'), value: 5, icon: <EnvironmentOutlined />, color: '#66bb6a' },
            { title: t('farmer.cropsGrowing'), value: 3, icon: <ExperimentOutlined />, color: '#ffa726' },
            { title: t('farmer.machines'), value: 2, icon: <TruckOutlined />, color: '#42a5f5' },
            { title: t('farmer.pendingTasks'), value: 4, icon: <ToolOutlined />, color: '#ef5350' }
          ],
          fieldCards: [
            { id: 1, title: t('farmer.fieldPreparation'), status: 'completed', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop' },
            { id: 2, title: t('farmer.planting'), status: 'completed', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop' },
            { id: 3, title: t('farmer.irrigation'), status: 'in progress', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop' },
            { id: 4, title: t('farmer.harvest'), status: 'pending', image: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=400&h=300&fit=crop' }
          ]
        };
      default:
        return {
          title: t('agronomist.title'),
          subtitle: t('agronomist.subtitle'),
          mainHero: {
            title: t('agronomist.heroTitle'),
            area: '12 ha',
            date: '07.10.2025',
            time: '14:30',
            temp: '20°C',
            growth: '86%',
            image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop'
          },
          stats: [
            { title: t('agronomist.farmsAssigned'), value: 12, icon: <EnvironmentOutlined />, color: '#66bb6a' },
            { title: t('agronomist.cropsAnalyzed'), value: 28, icon: <ExperimentOutlined />, color: '#42a5f5' },
            { title: t('agronomist.recommendations'), value: 15, icon: <BarChartOutlined />, color: '#ffa726' },
            { title: t('agronomist.interventions'), value: 8, icon: <ToolOutlined />, color: '#ef5350' }
          ],
          fieldCards: [
            { id: 1, title: t('agronomist.fieldScanning'), status: 'completed', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop' },
            { id: 2, title: t('agronomist.smartSeeding'), status: 'completed', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop' },
            { id: 3, title: t('agronomist.cropMonitoring'), status: 'in progress', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop' },
            { id: 4, title: t('agronomist.irrigationTreatment'), status: 'pending', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop' }
          ]
        };
    }
  };

  const dashboardData = getDashboardData();

  const growthData = [
    { name: 'Seed', value: 45, label: '24h' },
    { name: 'Final', value: 75, label: '48h' },
    { name: 'Veg', value: 85, label: '1w' }
  ];

  const productionData = [
    { month: 'JAN', current: 500, last: 400 },
    { month: 'FEB', current: 1000, last: 800 },
    { month: 'MAR', current: 1500, last: 1200 },
    { month: 'APR', current: 1800, last: 1500 },
    { month: 'MAY', current: 2200, last: 1800 },
    { month: 'JUN', current: 2500, last: 2000 },
    { month: 'JUL', current: 3500, last: 2800 },
    { month: 'AUG', current: 4000, last: 3200 },
    { month: 'SEP', current: 3800, last: 3000 },
    { month: 'OCT', current: 2800, last: 2200 },
    { month: 'NOV', current: 1800, last: 1500 },
    { month: 'DEC', current: 2000, last: 1600 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': case 'active': return 'success';
      case 'in progress': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return t('status.completed');
      case 'in progress': return t('status.inProgress');
      case 'pending': return t('status.pending');
      case 'active': return t('status.active');
      default: return status;
    }
  };

  return (
    <div style={{ background: '#f0fdf4', minHeight: '100vh' }}>
      <Card style={{ borderRadius: '24px', background: '#f8fffc', border: 'none' }} styles={{ body: { padding: '24px' } }}>
        <Row align="middle" justify="space-between" style={{ marginBottom: '28px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <Col>
            <Space size="middle" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: userRole === 'Admin' 
                  ? 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)' 
                  : userRole === 'Farmer' 
                  ? 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)' 
                  : 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {userRole === 'Admin' ? <TeamOutlined /> : userRole === 'Farmer' ? <EnvironmentOutlined /> : <ExperimentOutlined />}
              </div>
              <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#2c3e50' }}>
                  {dashboardData.title}
                </span>
                <p style={{ margin: 0, fontSize: '12px', color: '#95a5a6' }}>
                  {dashboardData.subtitle}
                </p>
              </div>
            </Space>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder={t('common.search')}
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              style={{
                borderRadius: '30px',
                height: '48px',
                border: 'none',
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                paddingLeft: '16px'
              }}
            />
          </Col>
          
          <Col>
            <Space size="large" align="center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Button type="text" style={{ borderRadius: '50%', width: '44px', height: '44px' }}>
                <Badge count={3} size="small">
                  <BellOutlined style={{ fontSize: '20px', color: '#64748b' }} />
                </Badge>
              </Button>
              <Button type="text" style={{ borderRadius: '50%', width: '44px', height: '44px' }}>
                <MessageOutlined style={{ fontSize: '20px', color: '#64748b' }} />
              </Button>
              <Space align="center" size="middle">
                <Avatar 
                  size={48} 
                  icon={<UserOutlined />}
                />
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '16px' }}>
                    {user?.first_name || user?.prenom || t('common.defaultFirstName')} {user?.last_name || user?.nom || t('common.defaultLastName')}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {t(`common.${userRole.toLowerCase()}`)}
                  </div>
                </div>
                <CheckCircleOutlined style={{ color: '#22c55e', fontSize: '18px' }} />
              </Space>
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: '28px' }}>
          {dashboardData.stats.map((stat, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Card style={{ borderRadius: '16px', border: 'none' }}>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '10px',
                      background: `${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                      fontSize: '18px'
                    }}>
                      {stat.icon}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: '28px' }}>
          <Col xs={24} md={8}>
            <Card 
              style={{ borderRadius: '16px', border: 'none', height: '100%' }}
              styles={{ body: { padding: '20px' } }}
            >
              <div style={{ marginBottom: '8px', fontSize: '14px', color: '#667085', fontWeight: 500 }}>
                {userRole === 'Admin' ? t('admin.systemActivity') : t('agronomist.growthRate')}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#101828', marginBottom: '4px' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
              <div style={{ fontSize: '13px', color: '#98a2b3', marginBottom: '16px' }}>
                ({new Date().toLocaleDateString()})
              </div>
              
              <Row align="middle" gutter={16}>
                <Col>
                  <div style={{ fontSize: '40px', fontWeight: 800, color: '#101828' }}>
                    {dashboardData.mainHero.temp || '25°c'}
                  </div>
                </Col>
                <Col flex="auto">
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `conic-gradient(${dashboardData.mainHero.growth ? '#22c55e' : '#42a5f5'} 0 ${dashboardData.mainHero.growth || 62}%, #e2e8f0 ${dashboardData.mainHero.growth || 62}% 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, color: '#101828' }}>
                        {dashboardData.mainHero.growth ? `${dashboardData.mainHero.growth}%` : '25°c'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#98a2b3' }}>
                        {dashboardData.mainHero.growth ? t('agronomist.growth') : 'Room temp'}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          
          <Col xs={24} md={10}>
            <Card 
              style={{ borderRadius: '16px', border: 'none', height: '100%' }}
              styles={{ body: { padding: '20px' } }}
            >
              <Row align="middle" justify="space-between" style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#101828' }}>
                  {userRole === 'Admin' ? t('admin.systemActivity') : t('agronomist.growthRate')}
                </span>
                <Tag color="green" style={{ borderRadius: '12px', fontSize: '11px', background: '#dcfce7', color: '#166534' }}>
                  {t('common.weekly')}
                </Tag>
              </Row>
              
              <div style={{ height: '160px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#98a2b3' }}
                      tickFormatter={(value, index) => growthData[index].label}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={userRole === 'Admin' ? '#42a5f5' : userRole === 'Farmer' ? '#ffa726' : '#22c55e'}
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#ffffff', strokeWidth: 3, stroke: userRole === 'Admin' ? '#42a5f5' : userRole === 'Farmer' ? '#ffa726' : '#22c55e' }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={6}>
            <Card 
              style={{ borderRadius: '16px', border: 'none', height: '100%', overflow: 'hidden' }}
              styles={{ body: { padding: 0 } }}
            >
              <img 
                src={dashboardData.mainHero.image}
                alt={dashboardData.mainHero.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Row align="middle" justify="space-between" style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#101828' }}>
                {t('common.summary')}
              </span>
              <Space>
                <Button type="text" icon={<SwapOutlined style={{ color: '#98a2b3' }} />} />
                <Button type="text" icon={<FullscreenOutlined style={{ color: '#98a2b3' }} />} />
              </Space>
            </Row>
            
            <Card style={{ borderRadius: '16px', border: 'none' }} styles={{ body: { padding: '24px' } }}>
              <div style={{ marginBottom: '16px' }}>
                <Space size="large">
                  <span style={{ fontSize: '13px', color: '#98a2b3' }}>{t('common.comparingLastYear')}</span>
                  <Space size="middle">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#c6ff50' }}></span>
                      {t('common.currentYear')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#1a5e3d' }}></span>
                      {t('common.lastYear')}
                    </span>
                  </Space>
                </Space>
              </div>
              
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionData}>
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#98a2b3' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#98a2b3' }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="last" barSize={20} radius={[8, 8, 0, 0]}>
                      {productionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#1a5e3d" />
                      ))}
                    </Bar>
                    <Bar dataKey="current" barSize={20} radius={[8, 8, 0, 0]}>
                      {productionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#c6ff50" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                {dashboardData.fieldCards.map((field) => (
                  <Col key={field.id} xs={24} sm={12} md={6}>
                    <Card
                      hoverable
                      style={{ borderRadius: '16px', border: 'none' }}
                      styles={{ body: { padding: 0 } }}
                    >
                      <img 
                        src={field.image}
                        alt={field.title}
                        style={{ 
                          width: '100%', 
                          height: '140px', 
                          objectFit: 'cover',
                          borderRadius: '16px 16px 0 0'
                        }}
                      />
                      <div style={{ padding: '16px' }}>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: 600, 
                          color: '#2c3e50',
                          marginBottom: '8px'
                        }}>
                          {field.title}
                        </div>
                        <Tag color={getStatusColor(field.status)} style={{ 
                          fontSize: '11px',
                          borderRadius: '12px',
                          padding: '2px 10px'
                        }}>
                          {getStatusText(field.status)}
                        </Tag>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card style={{ borderRadius: '20px', border: 'none', background: '#4a7c59' }} styles={{ body: { padding: 0 } }}>
              <img 
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=vertical%20farming%20hydroponics%20system%20with%20scientist%20flat%20design&image_size=portrait_4_3"
                alt="Vertical Harvest"
                style={{ width: '100%', borderRadius: '20px 20px 0 0' }}
              />
              <div style={{ padding: '24px', color: '#ffffff' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
                  {dashboardData.mainHero.title}
                </div>
                
                <div style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '20px', 
                  padding: '8px 16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <PlayCircleOutlined style={{ fontSize: '32px' }} />
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                    <div style={{ width: '50%', height: '100%', background: '#ffffff', borderRadius: '2px' }}></div>
                  </div>
                </div>
                
                <Row justify="space-between" style={{ fontSize: '13px', opacity: 0.8 }}>
                  <span>18:50</span>
                  <span>36:00</span>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
