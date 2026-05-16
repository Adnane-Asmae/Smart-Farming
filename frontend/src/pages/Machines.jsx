import { useState } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, Select, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TruckOutlined, ToolOutlined } from '@ant-design/icons';
import { Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Machines = () => {
  const { t } = useTranslation();
  const [machines, setMachines] = useState([
    { id: 1, nom: 'Tracteur John Deere', type: 'Tracteur', marque: 'John Deere 6120M', assigne: 'Parcelle A1', localisation: 'Casablanca', maintenance: '15/04/2024', statut: 'Actif' },
    { id: 2, nom: 'Pulvérisateur agricole', type: 'Pulvérisateur', marque: 'Amazone UX5200', assigne: 'Parcelle B2', localisation: 'Rabat', maintenance: '20/04/2024', statut: 'Actif' },
    { id: 3, nom: 'Moissonneuse-batteuse', type: 'Moissonneuse', marque: 'Case IH Axial-Flow', assigne: 'Parcelle C3', localisation: 'Fès', maintenance: '10/03/2024', statut: 'Attention' },
    { id: 4, nom: 'Système d\'irrigation', type: 'Irrigation', marque: 'Netafim Drip Pro', assigne: 'Parcelle A1', localisation: 'Casablanca', maintenance: '25/04/2024', statut: 'Actif' },
    { id: 5, nom: 'Semoir de précision', type: 'Semoir', marque: 'Kuhn Planter 3', assigne: 'Non assigné', localisation: 'Entrepôt', maintenance: '05/02/2024', statut: 'Inactif' },
  ]);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingMachine(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingMachine(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    message.success(t('common.machineDeleted'));
    setMachines(machines.filter(m => m.id !== id));
  };

  const handleSubmit = async (values) => {
    message.success(editingMachine ? t('common.machineModified') : t('common.machineAdded'));
    setModalVisible(false);
  };

  const getStatutBadge = (status) => {
    const colors = {
      'Actif': '#d1fae5',
      'Attention': '#ffedd5',
      'Inactif': '#f3f4f6'
    };
    const dotColors = {
      'Actif': '#4a7c59',
      'Attention': '#f59e0b',
      'Inactif': '#6b7280'
    };
    const statusKey = status === 'Actif' ? 'active' :
                      status === 'Attention' ? 'attention' :
                      'inactive';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors[status], padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: dotColors[status] }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: dotColors[status] }}>{t(`common.${statusKey}`)}</span>
      </div>
    );
  };

  const columns = [
    {
      title: t('common.id'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>M{String(id).padStart(3, '0')}</span>
    },
    {
      title: t('common.name'),
      dataIndex: 'nom',
      key: 'nom',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TruckOutlined style={{ color: '#4a7c59' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      ),
    },
    {
      title: t('common.type'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: t('common.brandModel'),
      dataIndex: 'marque',
      key: 'marque',
    },
    {
      title: t('common.assignedTo'),
      dataIndex: 'assigne',
      key: 'assigne',
    },
    {
      title: t('common.location'),
      dataIndex: 'localisation',
      key: 'localisation',
    },
    {
      title: t('common.lastMaintenance'),
      dataIndex: 'maintenance',
      key: 'maintenance',
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
      width: 100,
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

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>{t('common.manageMachines')}</Title>
            <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
              {t('common.manageEquipment')}
            </Paragraph>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            size="large"
            style={{ 
              background: '#2d5a3d',
              border: 'none',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              height: 48
            }}
          >
            {t('common.newMachine')}
          </Button>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.totalMachines')}</Text>
                <TruckOutlined style={{ color: '#4a7c59' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>24</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.inService')}</Text>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#4a7c59' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#4a7c59', fontSize: 30 }}>18</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.maintenanceRequired')}</Text>
                <ToolOutlined style={{ color: '#f59e0b' }} />
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
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.outOfService')}</Text>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#c43a31' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>2</Title>
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
        <Table
          columns={columns}
          dataSource={machines}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${t('common.total')} : ${total} machine${total > 1 ? 's' : ''}`,
          }}
        />
      </Card>
    </div>
  );
};

export default Machines;
