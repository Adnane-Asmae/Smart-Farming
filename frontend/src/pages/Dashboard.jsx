import { Card, Typography, Row, Col, Button, Progress, Tag, Table, Space } from 'antd';
import { 
  TeamOutlined, 
  EnvironmentOutlined, 
  TruckOutlined, 
  ToolOutlined, 
  FileTextOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  FireOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  CheckOutlined,
  CloudOutlined
} from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthStore from '../stores/useAuthStore';
import { useTranslation } from 'react-i18next';
import { useTranslatedContent } from '../hooks/useTranslatedContent';

const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';
  const { t } = useTranslation();
  const { tContent } = useTranslatedContent();

  const waterData = [
    { name: 'Lun', value: 2500 },
    { name: 'Mar', value: 2200 },
    { name: 'Mer', value: 2300 },
    { name: 'Jeu', value: 2600 },
    { name: 'Ven', value: 2000 },
    { name: 'Sam', value: 2400 },
    { name: 'Dim', value: 2250 },
  ];

  const interventionsData = [
    { name: 'Jan', value: 12 },
    { name: 'Fév', value: 18 },
    { name: 'Mar', value: 14 },
    { name: 'Avr', value: 25 },
    { name: 'Mai', value: 21 },
  ];

  const cropsData = [
    { name: 'Blé', value: 35 },
    { name: 'Orge', value: 20 },
    { name: 'Tomates', value: 30 },
    { name: 'Oliviers', value: 15 },
  ];

  const weeklyInterventions = [
    { name: 'Mon', value: 7 },
    { name: 'Tue', value: 5 },
    { name: 'Wed', value: 8 },
    { name: 'Thu', value: 6 },
    { name: 'Fri', value: 9 },
    { name: 'Sat', value: 4 },
    { name: 'Sun', value: 3 },
  ];

  const irrigationLevels = [
    { time: '6AM', value: 65 },
    { time: '9AM', value: 58 },
    { time: '12PM', value: 45 },
    { time: '3PM', value: 38 },
    { time: '6PM', value: 52 },
    { time: '9PM', value: 60 },
  ];

  const recentInterventions = [
    { id: 'INT-2024-145', type: 'Pest Control Application', parcelle: 'Parcel A-12', culture: 'Tomatoes', status: 'In Progress', priority: 'High', date: '2024-05-15' },
    { id: 'INT-2024-143', type: 'Fertilization', parcelle: 'Parcel B-5', culture: 'Wheat', status: 'To Do', priority: 'Medium', date: '2024-05-16' },
    { id: 'INT-2024-141', type: 'Soil Testing', parcelle: 'Parcel C-8', culture: 'Corn', status: 'To Do', priority: 'Low', date: '2024-05-18' },
    { id: 'INT-2024-139', type: 'Harvesting', parcelle: 'Parcel D-3', culture: 'Lettuce', status: 'Completed', priority: 'High', date: '2024-05-13' },
  ];

  const COLORS = ['#4a7c59', '#66bb6a', '#81c784', '#a5d6a7'];

  const getPriorityTag = (priority) => {
    const colors = {
      'High': '#fee2e2',
      'Medium': '#fff7ed',
      'Low': '#d1fae5'
    };
    const textColors = {
      'High': '#dc2626',
      'Medium': '#ea580c',
      'Low': '#059669'
    };
    return (
      <Tag color={colors[priority]} style={{ border: 'none' }}>
        <span style={{ color: textColors[priority], fontWeight: 500 }}>{priority}</span>
      </Tag>
    );
  };

  const getStatusTag = (status) => {
    const colors = {
      'In Progress': '#dbeafe',
      'To Do': '#f3f4f6',
      'Completed': '#d1fae5'
    };
    const textColors = {
      'In Progress': '#2563eb',
      'To Do': '#6b7280',
      'Completed': '#059669'
    };
    return (
      <Tag color={colors[status]} style={{ border: 'none' }}>
        <span style={{ color: textColors[status], fontWeight: 500 }}>{status}</span>
      </Tag>
    );
  };

  const renderAdminDashboard = () => (
    <>
      <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
        {t('common.adminDashboard')}
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        {t('common.completeOverview')}
      </Paragraph>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 8 }}>
                  {t('common.totalFarmers')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  156
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 16, display: 'block' }}>
                  <span style={{ color: '#4a7c59' }}>↑ +12</span> {t('common.thisMonth')}
                </Text>
              </div>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 12, 
                background: '#4a7c59', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <TeamOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 8 }}>
                  {t('common.totalTechnicians')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  24
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 16, display: 'block' }}>
                  <span style={{ color: '#4a7c59' }}>↑ +3</span> {t('common.thisMonth')}
                </Text>
              </div>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 12, 
                background: '#2385bb', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <TeamOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 8 }}>
                  {t('common.totalParcels')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  342
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 16, display: 'block' }}>
                  <span style={{ color: '#4a7c59' }}>↑ +8</span> {t('common.thisMonth')}
                </Text>
              </div>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 12, 
                background: '#2d5a3d', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <EnvironmentOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 8 }}>
                  {t('common.totalMachines')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  87
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 16, display: 'block' }}>
                  <span style={{ color: '#c43a31' }}>5</span> {t('common.inMaintenance')}
                </Text>
              </div>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 12, 
                background: '#f59e0b', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <TruckOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 8 }}>
                  {t('common.activeInterventions')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  45
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 16, display: 'block' }}>
                  <span style={{ color: '#4a7c59' }}>↑ 18</span> {t('common.completed')}
                </Text>
              </div>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 12, 
                background: '#4a7c59', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <ToolOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 8 }}>
                  {t('common.pendingRequests')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  12
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 16, display: 'block' }}>
                  <span style={{ color: '#c43a31' }}>↓ +5</span> {t('common.today')}
                </Text>
              </div>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 12, 
                background: '#c43a31', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <FileTextOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Title level={4} style={{ marginBottom: 24, color: '#1a1a1a' }}>
        {t('common.quickActions')}
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
        <Col xs={24} sm={12} md={6}>
          <Button 
            type="primary" 
            block 
            size="large"
            icon={<PlayCircleOutlined />}
            style={{ 
              height: 100, 
              background: '#4a7c59', 
              border: 'none', 
              borderRadius: 10, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(74, 124, 89, 0.2)'
            }}
          >
            <PlayCircleOutlined style={{ fontSize: 24, marginBottom: 8 }} />
            {t('common.startIrrigation')}
          </Button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button 
            block 
            size="large"
            icon={<PlusOutlined />}
            style={{ 
              height: 100, 
              background: '#2d5a3d', 
              border: 'none', 
              borderRadius: 10, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#fff'
            }}
          >
            <PlusOutlined style={{ fontSize: 24, marginBottom: 8 }} />
            {t('common.addSensor')}
          </Button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button 
            block 
            size="large"
            icon={<FileTextOutlined />}
            style={{ 
              height: 100, 
              background: '#2385bb', 
              border: 'none', 
              borderRadius: 10, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#fff'
            }}
          >
            <FileTextOutlined style={{ fontSize: 24, marginBottom: 8 }} />
            {t('common.generateReport')}
          </Button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button 
            block 
            size="large"
            icon={<SettingOutlined />}
            style={{ 
              height: 100, 
              background: '#555f53', 
              border: 'none', 
              borderRadius: 10, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#fff'
            }}
          >
            <SettingOutlined style={{ fontSize: 24, marginBottom: 8 }} />
            {t('common.configuration')}
          </Button>
        </Col>
      </Row>

      {/* Charts Section */}
      <Title level={4} style={{ marginBottom: 24, color: '#1a1a1a' }}>
        {t('common.analyticsAndStatistics')}
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={<span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 18 }}>{t('common.waterConsumptionLast7Days')}</span>}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 8, 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4a7c59" 
                  strokeWidth={3} 
                  fill="url(#colorWater)"
                />
                <defs>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4a7c59" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4a7c59" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={<span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 18 }}>{t('common.monthlyInterventions')}</span>}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={interventionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 8, 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Bar dataKey="value" fill="#4a7c59" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={<span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 18 }}>{t('common.cropsDistribution')}</span>}
          >
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={12}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={cropsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cropsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
              <Col xs={24} sm={12}>
                {cropsData.map((entry, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: 12 
                    }}
                  >
                    <div 
                      style={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: 6, 
                        background: COLORS[index % COLORS.length],
                        marginRight: 12
                      }} 
                    />
                    <Text style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>
                      {entry.name} {entry.value}%
                    </Text>
                  </div>
                ))}
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={<span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 18 }}>{t('common.quickStatistics')}</span>}
          >
            <div style={{ marginBottom: 24 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>{t('common.cropSuccessRate')}</Text>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingBottom: 8, borderBottom: '1px solid #e2e8e0' }}>
                <Text style={{ fontSize: 15, color: '#1a1a1a' }}>{t('common.cropSuccessRate')}</Text>
                <Text style={{ fontSize: 18, color: '#4a7c59', fontWeight: 700 }}>94%</Text>
              </div>
              <Progress percent={94} strokeColor="#4a7c59" showInfo={false} style={{ marginTop: 12 }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>{t('common.irrigationEfficiency')}</Text>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingBottom: 8, borderBottom: '1px solid #e2e8e0' }}>
                <Text style={{ fontSize: 15, color: '#1a1a1a' }}>{t('common.irrigationEfficiency')}</Text>
                <Text style={{ fontSize: 18, color: '#2385bb', fontWeight: 700 }}>88%</Text>
              </div>
              <Progress percent={88} strokeColor="#2385bb" showInfo={false} style={{ marginTop: 12 }} />
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 13 }}>{t('common.machineUtilization')}</Text>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingBottom: 8, borderBottom: '1px solid #e2e8e0' }}>
                <Text style={{ fontSize: 15, color: '#1a1a1a' }}>{t('common.machineUtilization')}</Text>
                <Text style={{ fontSize: 18, color: '#f59e0b', fontWeight: 700 }}>76%</Text>
              </div>
              <Progress percent={76} strokeColor="#f59e0b" showInfo={false} style={{ marginTop: 12 }} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderTechnicianDashboard = () => (
    <>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
            {t('common.dashboardOverview')}
          </Title>
          <Paragraph type="secondary" style={{ margin: 0, fontSize: 15 }}>
            {t('common.welcomeBack')}
          </Paragraph>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarOutlined style={{ color: '#667085', fontSize: 18 }} />
          <Text style={{ fontSize: 15, color: '#667085' }}>Thursday, May 14, 2026</Text>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <Text style={{ color: '#666', fontSize: 14, display: 'block' }}>
                {t('common.assignedInterventions')}
              </Text>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                background: '#eff6ff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <FileTextOutlined style={{ fontSize: 18, color: '#2563eb' }} />
              </div>
            </div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>
              12
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              <span style={{ color: '#2563eb' }}>+3</span> {t('common.thisWeek')}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <Text style={{ color: '#666', fontSize: 14, display: 'block' }}>
                {t('common.completedInterventions')}
              </Text>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                background: '#d1fae5', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <CheckCircleOutlined style={{ fontSize: 18, color: '#059669' }} />
              </div>
            </div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>
              47
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              <span style={{ color: '#059669' }}>98%</span> {t('common.completionRate')}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <Text style={{ color: '#666', fontSize: 14, display: 'block' }}>
                {t('common.machinesOperational')}
              </Text>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                background: '#fff7ed', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <TruckOutlined style={{ fontSize: 18, color: '#ea580c' }} />
              </div>
            </div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>
              8/10
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              2 {t('common.underMaintenance')}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <Text style={{ color: '#666', fontSize: 14, display: 'block' }}>
                {t('common.irrigationAlerts')}
              </Text>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                background: '#fee2e2', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <FireOutlined style={{ fontSize: 18, color: '#dc2626' }} />
              </div>
            </div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>
              5
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              {t('common.requiresAttention')}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ArrowUpOutlined style={{ color: '#4a7c59' }} />
                <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 16 }}>{t('common.weeklyInterventions')}</span>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyInterventions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 8, 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Bar dataKey="value" fill="#4a7c59" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CloudOutlined style={{ color: '#2563eb' }} />
                <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 16 }}>{t('common.irrigationLevelsToday')}</span>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={irrigationLevels}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: 8, 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Interventions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 16 }}>{t('common.recentInterventions')}</span>
                <Button type="link" style={{ fontSize: 14, fontWeight: 500, color: '#2563eb' }}>{t('common.viewAll')}</Button>
              </div>
            }
          >
            <Table
              dataSource={recentInterventions}
              pagination={false}
              showHeader
              columns={[
                {
                  title: t('common.id'),
                  dataIndex: 'id',
                  key: 'id',
                  render: (id) => <Text style={{ fontWeight: 600, color: '#667085' }}>{id}</Text>
                },
                {
                  title: t('common.intervention'),
                  dataIndex: 'type',
                  key: 'type',
                },
                {
                  title: t('common.parcelCrop'),
                  dataIndex: 'parcelle',
                  key: 'parcelle',
                  render: (parcelle, record) => (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <EnvironmentOutlined style={{ color: '#667085' }} />
                        <Text style={{ fontWeight: 500 }}>{parcelle}</Text>
                      </div>
                      <Text type="secondary" style={{ fontSize: 13, marginLeft: 24 }}>{record.culture}</Text>
                    </div>
                  )
                },
                {
                  title: t('common.status'),
                  dataIndex: 'status',
                  key: 'status',
                  render: getStatusTag
                },
                {
                  title: t('common.priority'),
                  dataIndex: 'priority',
                  key: 'priority',
                  render: getPriorityTag
                },
                {
                  title: t('common.dueDate'),
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: t('common.action'),
                  key: 'action',
                  render: () => <Button type="link" style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{t('common.view')}</Button>
                }
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card 
                style={{ 
                  borderRadius: 12, 
                  border: '1px solid #e2e8e0',
                  boxShadow: 'none'
                }}
                title={<span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 16 }}>{t('common.quickActions')}</span>}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    block 
                    style={{ 
                      height: 48, 
                      border: '1px solid #e2e8e0', 
                      borderRadius: 10,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-start',
                      gap: 12,
                      color: '#1a1a1a',
                      fontWeight: 500
                    }}
                  >
                    <FileTextOutlined />
                    {t('common.addFieldObservation')}
                  </Button>
                  <Button 
                    block 
                    style={{ 
                      height: 48, 
                      border: '1px solid #e2e8e0', 
                      borderRadius: 10,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-start',
                      gap: 12,
                      color: '#1a1a1a',
                      fontWeight: 500
                    }}
                  >
                    <TruckOutlined />
                    {t('common.reportMachineIssue')}
                  </Button>
                  <Button 
                    block 
                    style={{ 
                      height: 48, 
                      border: '1px solid #e2e8e0', 
                      borderRadius: 10,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-start',
                      gap: 12,
                      color: '#1a1a1a',
                      fontWeight: 500
                    }}
                  >
                    <FireOutlined />
                    {t('common.updateIrrigationStatus')}
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24}>
              <Card 
                style={{ 
                  borderRadius: 12, 
                  border: '1px solid #e2e8e0',
                  boxShadow: 'none'
                }}
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <WarningOutlined style={{ color: '#ea580c' }} />
                    <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 16 }}>{t('common.activeAlerts')}</span>
                  </div>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ background: '#fee2e2', padding: 16, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <FireOutlined style={{ color: '#dc2626', fontSize: 24 }} />
                    <div>
                      <Text style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>{t('common.critical')}: Irrigation System</Text>
                      <br/>
                      <Text type="secondary" style={{ fontSize: 13, color: '#991b1b' }}>{t('common.waterPressureLow')}</Text>
                    </div>
                  </div>
                  <div style={{ background: '#fff7ed', padding: 16, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <TruckOutlined style={{ color: '#ea580c', fontSize: 24 }} />
                    <div>
                      <Text style={{ fontSize: 14, fontWeight: 600, color: '#9a3412' }}>{t('common.warning')}: Equipment Maintenance</Text>
                      <br/>
                      <Text type="secondary" style={{ fontSize: 13, color: '#9a3412' }}>{t('common.scheduledMaintenanceOverdue')}</Text>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  return (
    <div style={{ padding: '24px', background: '#f9fafb', minHeight: '100vh' }}>
      {(userRole === 'ADMIN') ? renderAdminDashboard() : renderTechnicianDashboard()}
    </div>
  );
};

export default Dashboard;
