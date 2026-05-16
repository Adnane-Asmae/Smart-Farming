import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, Select, Tag, Tabs, Row, Col, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, EyeOutlined, EnvironmentOutlined, ToolOutlined, AlertOutlined, CheckCircleOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import api from '../api';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { Title } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [parcels, setParcels] = useState([
    { id: 1, name: 'Parcelle Nord A1', location: 'Casablanca, Maroc', area: 5.2, crop: 'Tomates', farmer: 'Mohammed Alami', irrigation: 'Automatique', status: 'Actif' },
    { id: 2, name: 'Parcelle Sud B2', location: 'Rabat, Maroc', area: 3.8, crop: 'Pommes de terre', farmer: 'Youssef Chakir', irrigation: 'Manuel', status: 'Actif' },
    { id: 3, name: 'Parcelle Est C3', location: 'Fès, Maroc', area: 7.1, crop: 'Blé', farmer: 'Amina Berrada', irrigation: 'Automatique', status: 'Attention' },
    { id: 4, name: 'Parcelle Ouest D4', location: 'Marrakech, Maroc', area: 4.5, crop: 'Maïs', farmer: 'Mohammed Alami', irrigation: 'Automatique', status: 'Actif' },
    { id: 5, name: 'Parcelle Centre E5', location: 'Tanger, Maroc', area: 6.0, crop: 'Oignons', farmer: 'Amina Berrada', irrigation: 'Manuel', status: 'Inactif' },
  ]);

  const [interventions, setInterventions] = useState([
    { id: 1001, type: 'Irrigation automatique', parcel: 'Parcelle A1', technician: 'Fatima Zahra', priority: 'Haute', dateStart: '14/05/2024', dateEnd: '14/05/2024', progress: 75, status: 'Actif' },
    { id: 1002, type: 'Maintenance tracteur', parcel: 'Parcelle B2', technician: 'Sanaa Idrissi', priority: 'Moyenne', dateStart: '13/05/2024', dateEnd: '15/05/2024', progress: 45, status: 'Actif' },
    { id: 1003, type: 'Installation capteurs', parcel: 'Parcelle E5', technician: 'Fatima Zahra', priority: 'Basse', dateStart: '15/05/2024', dateEnd: '16/05/2024', progress: 0, status: 'En attente' },
    { id: 1004, type: 'Traitement phytosanitaire', parcel: 'Parcelle C3', technician: 'Sanaa Idrissi', priority: 'Haute', dateStart: '14/05/2024', dateEnd: '14/05/2024', progress: 90, status: 'Actif' },
    { id: 1005, type: 'Réparation pompe irrigation', parcel: 'Parcelle D4', technician: 'Fatima Zahra', priority: 'Moyenne', dateStart: '10/05/2024', dateEnd: '12/05/2024', progress: 100, status: 'Inactif' },
  ]);

  const parcelStats = {
    total: 12,
    totalArea: 68.5,
    active: 9,
    alert: 3
  };

  const interventionStats = {
    total: 127,
    inProgress: 18,
    completed: 103,
    pending: 6
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/');
      setUsers(response.data.results || response.data);
    } catch {
      message.error(t('common.errorLoadingUsers'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}/`);
      message.success(t('common.userDeletedSuccessfully'));
      fetchUsers();
    } catch {
      message.error(t('common.errorDeletingUser'));
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await api.post(`/users/${id}/toggle-statut/`);
      message.success(t('common.statusUpdated'));
      fetchUsers();
    } catch {
      message.error(t('common.errorUpdatingStatus'));
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}/`, values);
        message.success(t('common.userEdited'));
      } else {
        await api.post('/users/', values);
        message.success(t('common.userAdded'));
      }
      setModalVisible(false);
      fetchUsers();
    } catch {
      message.error(t('common.errorSavingUser'));
    }
  };

  const userColumns = [
    {
      title: t('common.name'),
      dataIndex: 'nom',
      key: 'nom',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined style={{ color: '#4a7c59' }} />
          <span style={{ fontWeight: 600 }}>{record.prenom} {text}</span>
        </div>
      ),
    },
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('common.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const colors = {
          ADMIN: 'blue',
          TECHNICIEN: 'orange',
          FARMER: 'green',
        };
        return <Tag color={colors[role]}>{t(`common.${role.toLowerCase()}`)}</Tag>;
      },
    },
    {
      title: t('common.status'),
      dataIndex: 'statut',
      key: 'statut',
      render: (statut, record) => (
        <Tag color={statut ? 'success' : 'default'}>
          {statut ? t('common.active') : t('common.inactive')}
        </Tag>
      ),
    },
    {
      title: t('common.creationDate'),
      dataIndex: 'date_creation',
      key: 'date_creation',
      render: (date) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            ghost 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          >
            {t('common.modify')}
          </Button>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handleToggleStatus(record.id)}
            size="small"
          >
            {record.statut ? t('common.deactivate') : t('common.activate')}
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDelete(record.id)}
            size="small"
          >
            {t('common.delete')}
          </Button>
        </Space>
      ),
    },
  ];

  const parcelColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => `P${String(id).padStart(2, '0')}`,
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <EnvironmentOutlined style={{ color: '#4a7c59' }} />
          <span style={{ fontWeight: 600 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Localisation',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Surface',
      dataIndex: 'area',
      key: 'area',
      render: (val) => `${val} ha`,
    },
    {
      title: 'Culture',
      dataIndex: 'crop',
      key: 'crop',
    },
    {
      title: 'Agriculteur',
      dataIndex: 'farmer',
      key: 'farmer',
    },
    {
      title: 'Irrigation',
      dataIndex: 'irrigation',
      key: 'irrigation',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { 'Actif': 'success', 'Inactif': 'default', 'Attention': 'warning' };
        return (
          <Tag color={colors[status]}>
            {status === 'Attention' && <AlertOutlined style={{ marginRight: 4 }} />}
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_unused, record) => (
        <Space size="small" orientation="horizontal">
          <Button icon={<EyeOutlined />} size="small" type="text" />
          <Button icon={<EditOutlined />} size="small" type="text" />
          <Button icon={<DeleteOutlined />} size="small" danger type="text" />
        </Space>
      ),
    },
  ];

  const interventionColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ToolOutlined style={{ color: '#2385bb' }} />
          <span style={{ fontWeight: 600 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Parcelle',
      dataIndex: 'parcel',
      key: 'parcel',
    },
    {
      title: 'Technicien',
      dataIndex: 'technician',
      key: 'technician',
    },
    {
      title: 'Priorité',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const colors = { 'Haute': 'error', 'Moyenne': 'warning', 'Basse': 'processing' };
        return <Tag color={colors[priority]}>{priority}</Tag>;
      },
    },
    {
      title: 'Date début',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'Date fin',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Progression',
      dataIndex: 'progress',
      key: 'progress',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ 
            width: 80, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' 
          }}>
            <div style={{ 
              width: `${val}%`, 
              height: '100%', 
              background: val === 100 ? '#52c41a' : '#1890ff',
              borderRadius: 4
            }} />
          </div>
          <span style={{ fontWeight: 600 }}>{val}%</span>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { 'Actif': 'success', 'Inactif': 'default', 'En attente': 'processing' };
        return (
          <Tag color={colors[status]}>
            {status === 'En attente' && <ClockCircleOutlined style={{ marginRight: 4 }} />}
            {status === 'Inactif' && <CheckCircleOutlined style={{ marginRight: 4 }} />}
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 120,
      render: (_unused, record) => (
        <Space size="small" orientation="horizontal">
          <Button icon={<EditOutlined />} size="small" type="text" />
          <Button icon={<DeleteOutlined />} size="small" danger type="text" />
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>Users</span>,
      children: (
        <Table
          columns={userColumns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${t('common.total')} : ${total} utilisateur${total > 1 ? 's' : ''}`,
          }}
        />
      ),
    },
    {
      key: '2',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>Parcelle</span>,
      children: (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Total parcelles</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1a1a1a' }}>{parcelStats.total}</div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Surface totale</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1a1a1a' }}>{parcelStats.totalArea} ha</div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Parcelles actives</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#4a7c59' }}>{parcelStats.active}</div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>En alerte</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#ea580c' }}>{parcelStats.alert}</div>
              </Card>
            </Col>
          </Row>
          
          <Table
            columns={parcelColumns}
            dataSource={parcels}
            rowKey="id"
            scroll={{ x: 1400 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `${t('common.total')} : ${total} parcels`,
            }}
          />
        </>
      ),
    },
    {
      key: '3',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>Interventions</span>,
      children: (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#667085' }}>Total interventions</span>
                  <ToolOutlined style={{ color: '#4a7c59', fontSize: 18 }} />
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1a1a1a' }}>{interventionStats.total}</div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#667085' }}>En cours</span>
                  <ClockCircleOutlined style={{ color: '#ea580c', fontSize: 18 }} />
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#ea580c' }}>{interventionStats.inProgress}</div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#667085' }}>Complétées</span>
                  <CheckCircleOutlined style={{ color: '#4a7c59', fontSize: 18 }} />
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#4a7c59' }}>{interventionStats.completed}</div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card 
                style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#667085' }}>En attente</span>
                  <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 18 }} />
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1890ff' }}>{interventionStats.pending}</div>
              </Card>
            </Col>
          </Row>
          
          <Table
            columns={interventionColumns}
            dataSource={interventions}
            rowKey="id"
            scroll={{ x: 1600 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `${t('common.total')} : ${total} interventions`,
            }}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0fdf4', minHeight: '100vh' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <UserOutlined style={{ fontSize: 24, color: '#4a7c59' }} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>Admin Dashboard</span>
          </div>
        }
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            size="large"
            style={{ 
              background: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)',
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(74, 124, 89, 0.3)'
            }}
          >
            {t('common.addUser')}
          </Button>
        }
        style={{ 
          borderRadius: 16, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: 'none'
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Card>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {editingUser ? <EditOutlined /> : <PlusOutlined />}
            <span style={{ fontSize: 18, fontWeight: 700 }}>
              {editingUser ? t('common.editUser') : t('common.addUser')}
            </span>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
        centered
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
          style={{ marginTop: 20 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item
              name="prenom"
              label={t('common.firstName')}
              rules={[{ required: true, message: t('common.enterFirstName') }]}
            >
              <Input placeholder={t('common.firstName')} size="large" />
            </Form.Item>
            <Form.Item
              name="nom"
              label={t('common.lastName')}
              rules={[{ required: true, message: t('common.enterLastName') }]}
            >
              <Input placeholder={t('common.lastName')} size="large" />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            label={t('common.email')}
            rules={[
              { required: true, message: t('common.enterEmail') },
              { type: 'email', message: t('common.invalidEmail') }
            ]}
          >
            <Input placeholder={t('common.email')} size="large" />
          </Form.Item>
          <Form.Item
            name="role"
            label={t('common.role')}
            rules={[{ required: true, message: t('common.selectRole') }]}
          >
            <Select placeholder={t('common.selectRole')} size="large">
              <Option value="ADMIN">{t('common.admin')}</Option>
              <Option value="TECHNICIEN">{t('common.agronomist')}</Option>
              <Option value="FARMER">{t('common.farmer')}</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space size="middle" style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button 
                size="large" 
                onClick={() => setModalVisible(false)}
                style={{ borderRadius: 8, padding: '0 24px' }}
              >
                {t('common.cancel')}
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                style={{ 
                  background: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0 32px',
                  boxShadow: '0 4px 12px rgba(74, 124, 89, 0.3)'
                }}
              >
                {t('common.save')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
