import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message, Tabs, Modal, Form, Input, Select, InputNumber, Tag, Row, Col, Typography, Progress, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ThunderboltOutlined, ClockCircleOutlined, CheckCircleOutlined, SyncOutlined, AlertOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/date';
import api from '../api';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Irrigation = () => {
  const { t, i18n } = useTranslation();
  const [plans, setPlans] = useState([
    { id: 1, parcelle: { nom: 'Parcelle Nord A1' }, methodeKey: 'drip_irrigation', frequenceKey: 'twiceWeekly', duree: 45, statutKey: 'active' },
    { id: 2, parcelle: { nom: 'Parcelle Sud B2' }, methodeKey: 'sprinkler', frequenceKey: 'daily', duree: 30, statutKey: 'active' },
    { id: 3, parcelle: { nom: 'Parcelle Est C3' }, methodeKey: 'drip_irrigation', frequenceKey: 'weekly', duree: 60, statutKey: 'paused' },
  ]);

  const [cycles, setCycles] = useState([
    { id: 1, parcelle: { nom: 'Parcelle Nord A1' }, date_debut: '2024-05-01', date_fin: '2024-05-31', statutKey: 'inProgress', progression: 45 },
    { id: 2, parcelle: { nom: 'Parcelle Sud B2' }, date_debut: '2024-04-15', date_fin: '2024-06-15', statutKey: 'planned', progression: 0 },
    { id: 3, parcelle: { nom: 'Parcelle Ouest D4' }, date_debut: '2024-03-01', date_fin: '2024-04-30', statutKey: 'completed', progression: 100 },
  ]);

  const [iotSensors, setIotSensors] = useState([
    {
      id: 1,
      sensor_name: 'Sensor A-1',
      parcelle_nom: 'Parcelle Nord - Blé',
      moisture_level: 45.2,
      battery_level: 87.5,
      status: 'ACTIVE',
      last_update: '2026-05-16'
    },
    {
      id: 2,
      sensor_name: 'Sensor B-2',
      parcelle_nom: 'Serre Tomates Souss',
      moisture_level: 22.8,
      battery_level: 65.3,
      status: 'ACTIVE',
      last_update: '2026-05-16'
    }
  ]);
  const [iotDashboard, setIotDashboard] = useState({
    avg_moisture: 34,
    parcels_needing_irrigation: 1,
    active_sensors: 2,
    unresolved_alerts: 1
  });
  const [loadingIot, setLoadingIot] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [cycleModalVisible, setCycleModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingCycle, setEditingCycle] = useState(null);
  const [planForm] = Form.useForm();
  const [cycleForm] = Form.useForm();

  const fetchIotSensors = async () => {
    try {
      setLoadingIot(true);
      const res = await api.get('/irrigation/sensors/');
      if (Array.isArray(res.data)) {
        setIotSensors(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch IoT sensors:', err);
    } finally {
      setLoadingIot(false);
    }
  };

  const fetchIotDashboard = async () => {
    try {
      const res = await api.get('/irrigation/sensors/dashboard/');
      if (res.data && typeof res.data === 'object') {
        setIotDashboard(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch IoT dashboard:', err);
    }
  };

  const handleSimulateUpdate = async () => {
    try {
      setSimulating(true);
      await api.post('/irrigation/sensors/simulate/');
      message.success('Sensor data updated successfully!');
      await fetchIotSensors();
      await fetchIotDashboard();
    } catch (err) {
      console.error('Failed to simulate sensor update:', err);
      message.error('Failed to update sensor data');
    } finally {
      setSimulating(false);
    }
  };

  useEffect(() => {
    fetchIotSensors();
    fetchIotDashboard();
  }, []);

  const getIrrigationRecommendation = (moisture) => {
    if (moisture < 30) return { text: 'Urgent irrigation needed', color: '#c43a31' };
    if (moisture >= 30 && moisture <= 60) return { text: 'Monitor', color: '#f59e0b' };
    return { text: 'No irrigation needed', color: '#4a7c59' };
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    planForm.resetFields();
    setPlanModalVisible(true);
  };

  const handleEditPlan = (record) => {
    setEditingPlan(record);
    planForm.setFieldsValue(record);
    setPlanModalVisible(true);
  };

  const handleDeletePlan = async (id) => {
    message.success(t('common.planDeleted'));
    setPlans(plans.filter(p => p.id !== id));
  };

  const handleSubmitPlan = async (values) => {
    message.success(editingPlan ? t('common.planModified') : t('common.planAdded'));
    setPlanModalVisible(false);
  };

  const handleAddCycle = () => {
    setEditingCycle(null);
    cycleForm.resetFields();
    setCycleModalVisible(true);
  };

  const handleEditCycle = (record) => {
    setEditingCycle(record);
    cycleForm.setFieldsValue(record);
    setCycleModalVisible(true);
  };

  const handleDeleteCycle = async (id) => {
    message.success(t('common.cycleDeleted'));
    setCycles(cycles.filter(c => c.id !== id));
  };

  const handleSubmitCycle = async (values) => {
    message.success(editingCycle ? t('common.cycleModified') : t('common.cycleAdded'));
    setCycleModalVisible(false);
  };

  const getParcelName = (parcel) => {
    if (!parcel) return '-';
    return parcel.nom || parcel.name || '-';
  };

  const getStatutBadge = (statusKey) => {
    const colors = {
      'active': '#d1fae5',
      'planned': '#eff6ff',
      'inProgress': '#d1fae5',
      'completed': '#f3f4f6',
      'paused': '#fff7ed'
    };
    const dotColors = {
      'active': '#4a7c59',
      'planned': '#2563eb',
      'inProgress': '#4a7c59',
      'completed': '#6b7280',
      'paused': '#f59e0b'
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors[statusKey], padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: dotColors[statusKey] }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: dotColors[statusKey] }}>{t(`common.${statusKey}`)}</span>
      </div>
    );
  };

  const getProgressionColor = (val) => {
    if (val >= 90) return '#4a7c59';
    if (val >= 50) return '#2385bb';
    return '#e5e7eb';
  };

  const planColumns = [
    {
      title: t('common.id'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>P{String(id).padStart(3, '0')}</span>
    },
    {
      title: t('common.parcelles'),
      dataIndex: 'parcelle',
      key: 'parcelle',
      render: getParcelName,
    },
    {
      title: t('common.method'),
      dataIndex: 'methodeKey',
      key: 'methode',
      render: (methodeKey) => t(`irrigationMethods.${methodeKey}`)
    },
    {
      title: t('common.frequency'),
      dataIndex: 'frequenceKey',
      key: 'frequence',
      render: (frequenceKey) => t(`irrigationFrequencies.${frequenceKey}`)
    },
    {
      title: t('common.duration'),
      dataIndex: 'duree',
      key: 'duree',
      render: (value) => `${value} min`
    },
    {
      title: t('common.status'),
      dataIndex: 'statutKey',
      key: 'statut',
      render: getStatutBadge
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_unused, record) => (
        <Space size="small" orientation="horizontal">
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: '#2385bb' }} />}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined style={{ color: '#c43a31' }} />}
          />
        </Space>
      ),
    },
  ];

  const cycleColumns = [
    {
      title: t('common.id'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>C{String(id).padStart(3, '0')}</span>
    },
    {
      title: t('common.parcelles'),
      dataIndex: 'parcelle',
      key: 'parcelle',
      render: getParcelName,
    },
    {
      title: t('common.startDate'),
      dataIndex: 'date_debut',
      key: 'date_debut',
      render: (date) => formatDate(date, i18n.language)
    },
    {
      title: t('common.endDate'),
      dataIndex: 'date_fin',
      key: 'date_fin',
      render: (date) => formatDate(date, i18n.language)
    },
    {
      title: t('common.progress'),
      dataIndex: 'progression',
      key: 'progression',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Progress 
            percent={val} 
            strokeColor={getProgressionColor(val)} 
            showInfo={false} 
            style={{ width: 80 }}
          />
          <span style={{ fontWeight: 600 }}>{val}%</span>
        </div>
      )
    },
    {
      title: t('common.status'),
      dataIndex: 'statutKey',
      key: 'statut',
      render: getStatutBadge
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_unused, record) => (
        <Space size="small" orientation="horizontal">
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: '#2385bb' }} />}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined style={{ color: '#c43a31' }} />}
          />
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>{t('common.plans')}</span>,
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAddPlan}
              size="large"
              style={{ 
                background: '#2d5a3d',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {t('common.newPlan')}
            </Button>
          </div>
          <Table 
            columns={planColumns} 
            dataSource={plans} 
            rowKey="id" 
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `${t('common.total')} ${total} plan${total > 1 ? 's' : ''}`,
            }}
          />
        </>
      ),
    },
    {
      key: '2',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>{t('common.cycles')}</span>,
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAddCycle}
              size="large"
              style={{ 
                background: '#2d5a3d',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {t('common.newCycle')}
            </Button>
          </div>
          <Table 
            columns={cycleColumns} 
            dataSource={cycles} 
            rowKey="id" 
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `${t('common.total')} ${total} cycle${total > 1 ? 's' : ''}`,
            }}
          />
        </>
      ),
    },
    {
      key: '3',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>IoT Sensors</span>,
      children: (
        <>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="primary" 
              icon={<SyncOutlined />} 
              onClick={handleSimulateUpdate}
              size="large"
              loading={simulating}
              style={{ 
                background: '#2385bb',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Simulate Sensor Update
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            {(Array.isArray(iotSensors) ? iotSensors : []).map(sensor => {
              const rec = getIrrigationRecommendation(sensor.moisture_level);
              const isCritical = sensor.moisture_level < 25;
              return (
                <Col xs={24} sm={12} md={8} key={sensor.id || sensor.sensor_name}>
                  <Card 
                    style={{ 
                      borderRadius: 12, 
                      border: `1px solid ${isCritical ? '#fecdd3' : '#e2e8e0'}`, 
                      boxShadow: isCritical ? '0 4px 20px rgba(196, 58, 49, 0.1)' : 'none' 
                    }}
                    styles={{ body: { padding: 20 } }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <Title level={4} style={{ margin: 0, fontSize: 16 }}>{sensor.sensor_name}</Title>
                      {isCritical && <Badge status="error" text="Critical" />}
                    </div>
                    <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
                      {sensor.parcelle_nom}
                    </Text>
                    
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ fontSize: 13 }}>Soil Moisture</Text>
                        <Text style={{ fontSize: 13, fontWeight: 600, color: isCritical ? '#c43a31' : '#2385bb' }}>
                          {sensor.moisture_level}%
                        </Text>
                      </div>
                      <Progress 
                        percent={sensor.moisture_level} 
                        strokeColor={isCritical ? '#c43a31' : '#2385bb'} 
                        showInfo={false}
                      />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ fontSize: 13 }}>Battery</Text>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>{sensor.battery_level}%</Text>
                      </div>
                      <Progress 
                        percent={sensor.battery_level} 
                        strokeColor={sensor.battery_level < 30 ? '#f59e0b' : '#4a7c59'} 
                        showInfo={false}
                      />
                    </div>

                    <div style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 8, background: `${rec.color}15` }}>
                      <Text style={{ fontSize: 13, fontWeight: 600, color: rec.color }}>
                        {rec.text}
                      </Text>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Tag color={sensor.status === 'ACTIVE' ? '#d1fae5' : '#f3f4f6'}>
                        <span style={{ color: sensor.status === 'ACTIVE' ? '#059669' : '#6b7280', fontSize: 12 }}>
                          {sensor.status}
                        </span>
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Updated: {formatDate(sensor.last_update, i18n.language)}
                      </Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 32 }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>{t('common.manageIrrigation')}</Title>
            <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
              {t('common.managePlansCycles')}
            </Paragraph>
          </div>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.activePlans')}</Text>
                <ThunderboltOutlined style={{ color: '#4a7c59' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>12</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.activeCycles')}</Text>
                <ClockCircleOutlined style={{ color: '#f59e0b' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#f59e0b', fontSize: 30 }}>4</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.completedCycles')}</Text>
                <CheckCircleOutlined style={{ color: '#4a7c59' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#4a7c59', fontSize: 30 }}>28</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.waterConsumed')}</Text>
                <ThunderboltOutlined style={{ color: '#2385bb' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#2385bb', fontSize: 30 }}>1,240 m³</Title>
            </Card>
          </Col>
        </Row>

        {/* IoT Dashboard Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Average Moisture</Text>
                <ExperimentOutlined style={{ color: '#2385bb' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>{(iotDashboard && iotDashboard.avg_moisture) || 0}%</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Parcels Needing Irrigation</Text>
                <AlertOutlined style={{ color: '#c43a31' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#c43a31', fontSize: 30 }}>{(iotDashboard && iotDashboard.parcels_needing_irrigation) || 0}</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Active Sensors</Text>
                <CheckCircleOutlined style={{ color: '#4a7c59' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#4a7c59', fontSize: 30 }}>{(iotDashboard && iotDashboard.active_sensors) || 0}</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>Unresolved Alerts</Text>
                <AlertOutlined style={{ color: '#f59e0b' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#f59e0b', fontSize: 30 }}>{(iotDashboard && iotDashboard.unresolved_alerts) || 0}</Title>
            </Card>
          </Col>
        </Row>
      </div>

      <Card
        style={{ 
          borderRadius: 16, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: 'none'
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default Irrigation;
