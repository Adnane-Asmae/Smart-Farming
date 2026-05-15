import { useState } from 'react';
import { Table, Button, Space, Card, message, Tabs, Modal, Form, Input, Select, InputNumber, Tag, Row, Col, Typography, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ThunderboltOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Irrigation = () => {
  const [plans, setPlans] = useState([
    { id: 1, parcelle: { nom: 'Parcelle Nord A1' }, methode: 'Goutte à goutte', frequence: '2 fois par semaine', duree: 45, statut: 'Actif' },
    { id: 2, parcelle: { nom: 'Parcelle Sud B2' }, methode: 'Aspersion', frequence: 'Quotidienne', duree: 30, statut: 'Actif' },
    { id: 3, parcelle: { nom: 'Parcelle Est C3' }, methode: 'Goutte à goutte', frequence: 'Hebdomadaire', duree: 60, statut: 'En pause' },
  ]);

  const [cycles, setCycles] = useState([
    { id: 1, parcelle: { nom: 'Parcelle Nord A1' }, date_debut: '2024-05-01', date_fin: '2024-05-31', statut: 'En cours', progression: 45 },
    { id: 2, parcelle: { nom: 'Parcelle Sud B2' }, date_debut: '2024-04-15', date_fin: '2024-06-15', statut: 'Planifié', progression: 0 },
    { id: 3, parcelle: { nom: 'Parcelle Ouest D4' }, date_debut: '2024-03-01', date_fin: '2024-04-30', statut: 'Terminé', progression: 100 },
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
    message.success('Plan supprimé');
    setPlans(plans.filter(p => p.id !== id));
  };

  const handleSubmitPlan = async (values) => {
    message.success(editingPlan ? 'Plan modifié' : 'Plan ajouté');
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
    message.success('Cycle supprimé');
    setCycles(cycles.filter(c => c.id !== id));
  };

  const handleSubmitCycle = async (values) => {
    message.success(editingCycle ? 'Cycle modifié' : 'Cycle ajouté');
    setCycleModalVisible(false);
  };

  const getParcelName = (parcel) => {
    if (!parcel) return '-';
    return parcel.nom || parcel.name || '-';
  };

  const getStatutBadge = (status) => {
    const colors = {
      'Actif': '#d1fae5',
      'Planifié': '#eff6ff',
      'En cours': '#d1fae5',
      'Terminé': '#f3f4f6',
      'En pause': '#fff7ed'
    };
    const dotColors = {
      'Actif': '#4a7c59',
      'Planifié': '#2563eb',
      'En cours': '#4a7c59',
      'Terminé': '#6b7280',
      'En pause': '#f59e0b'
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors[status], padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: dotColors[status] }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: dotColors[status] }}>{status}</span>
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>P{String(id).padStart(3, '0')}</span>
    },
    {
      title: 'Parcelle',
      dataIndex: 'parcelle',
      key: 'parcelle',
      render: getParcelName,
    },
    {
      title: 'Méthode',
      dataIndex: 'methode',
      key: 'methode',
    },
    {
      title: 'Fréquence',
      dataIndex: 'frequence',
      key: 'frequence',
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (value) => `${value} min`
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: getStatutBadge
    },
    {
      title: 'Actions',
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>C{String(id).padStart(3, '0')}</span>
    },
    {
      title: 'Parcelle',
      dataIndex: 'parcelle',
      key: 'parcelle',
      render: getParcelName,
    },
    {
      title: 'Date début',
      dataIndex: 'date_debut',
      key: 'date_debut',
    },
    {
      title: 'Date fin',
      dataIndex: 'date_fin',
      key: 'date_fin',
    },
    {
      title: 'Progression',
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
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: getStatutBadge
    },
    {
      title: 'Actions',
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
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>Plans d'irrigation</span>,
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
              Nouveau plan
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
              showTotal: (total) => `Total : ${total} plan${total > 1 ? 's' : ''}`,
            }}
          />
        </>
      ),
    },
    {
      key: '2',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>Cycles d'irrigation</span>,
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
              Nouveau cycle
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
              showTotal: (total) => `Total : ${total} cycle${total > 1 ? 's' : ''}`,
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
            <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>Gestion de l'irrigation</Title>
            <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
              Gérer les plans et cycles d'irrigation des parcelles
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
                <Text type="secondary" style={{ fontSize: 14 }}>Plans actifs</Text>
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
                <Text type="secondary" style={{ fontSize: 14 }}>Cycles en cours</Text>
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
                <Text type="secondary" style={{ fontSize: 14 }}>Cycles terminés</Text>
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
                <Text type="secondary" style={{ fontSize: 14 }}>Eau consommée</Text>
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
