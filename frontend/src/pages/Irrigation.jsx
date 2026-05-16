import { useState } from 'react';
import { Table, Button, Space, Card, message, Tabs, Modal, Form, Input, Select, InputNumber, Tag, Row, Col, Typography, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ThunderboltOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Irrigation = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([
    { id: 1, parcelle: { nom: 'Parcelle Nord A1' }, methode: 'goutte à goutte', frequence: 'twiceWeekly', duree: 45, statut: 'actif' },
    { id: 2, parcelle: { nom: 'Parcelle Sud B2' }, methode: 'aspersion', frequence: 'quotidienne', duree: 30, statut: 'actif' },
    { id: 3, parcelle: { nom: 'Parcelle Est C3' }, methode: 'goutte à goutte', frequence: 'hebdomadaire', duree: 60, statut: 'en pause' },
  ]);

  const [cycles, setCycles] = useState([
    { id: 1, parcelle: { nom: 'Parcelle Nord A1' }, date_debut: '2024-05-01', date_fin: '2024-05-31', statut: 'en cours', progression: 45 },
    { id: 2, parcelle: { nom: 'Parcelle Sud B2' }, date_debut: '2024-04-15', date_fin: '2024-06-15', statut: 'planifié', progression: 0 },
    { id: 3, parcelle: { nom: 'Parcelle Ouest D4' }, date_debut: '2024-03-01', date_fin: '2024-04-30', statut: 'terminé', progression: 100 },
  ]);

  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [cycleModalVisible, setCycleModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingCycle, setEditingCycle] = useState(null);
  const [planForm] = Form.useForm();
  const [cycleForm] = Form.useForm();

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

  const getStatutBadge = (status) => {
    const colors = {
      'actif': '#d1fae5',
      'planifié': '#eff6ff',
      'en cours': '#d1fae5',
      'terminé': '#f3f4f6',
      'en pause': '#fff7ed'
    };
    const dotColors = {
      'actif': '#4a7c59',
      'planifié': '#2563eb',
      'en cours': '#4a7c59',
      'terminé': '#6b7280',
      'en pause': '#f59e0b'
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors[status], padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: dotColors[status] }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: dotColors[status] }}>{t(`common.${status}`)}</span>
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
      dataIndex: 'methode',
      key: 'methode',
      render: (methode) => t(`common.${methode}`)
    },
    {
      title: t('common.frequency'),
      dataIndex: 'frequence',
      key: 'frequence',
      render: (frequence) => t(`common.${frequence}`)
    },
    {
      title: t('common.duration'),
      dataIndex: 'duree',
      key: 'duree',
      render: (value) => `${value} min`
    },
    {
      title: t('common.status'),
      dataIndex: 'statut',
      key: 'statut',
      render: getStatutBadge
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_unused, record) => (
        <Space size="small">
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
    },
    {
      title: t('common.endDate'),
      dataIndex: 'date_fin',
      key: 'date_fin',
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
      dataIndex: 'statut',
      key: 'statut',
      render: getStatutBadge
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_unused, record) => (
        <Space size="small">
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
