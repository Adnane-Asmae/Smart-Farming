import { useState } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Demandes = () => {
  const { t } = useTranslation();
  const [demandes, setDemandes] = useState([
    { id: 1, agriculteur: 'Mohammed Alami', type: 'Irrigation urgente', description: 'Besoin d\'irrigation immédiate suite à sécheresse', parcelle: 'Parcelle A1', priorite: 'Haute', date: '14/05/2024 08:30' },
    { id: 2, agriculteur: 'Youssef Chakir', type: 'Maintenance tracteur', description: 'Tracteur nécessite révision complète', parcelle: 'Parcelle B2', priorite: 'Moyenne', date: '14/05/2024 10:15' },
    { id: 3, agriculteur: 'Amina Berrada', type: 'Installation capteur', description: 'Installation de nouveaux capteurs d\'humidité', parcelle: 'Parcelle E5', priorite: 'Basse', date: '13/05/2024 14:20' },
    { id: 4, agriculteur: 'Mohammed Alami', type: 'Assistance technique', description: 'Problème avec système d\'irrigation automatique', parcelle: 'Parcelle D4', priorite: 'Haute', date: '13/05/2024 16:45' },
    { id: 5, agriculteur: 'Amina Berrada', type: 'Achat d\'engrais', description: 'Demande d\'approvisionnement en engrais organiques', parcelle: 'Parcelle C3', priorite: 'Moyenne', date: '12/05/2024 09:00' },
  ]);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDemande, setEditingDemande] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingDemande(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingDemande(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    message.success(t('common.demandDeleted'));
    setDemandes(demandes.filter(d => d.id !== id));
  };

  const handleSubmit = async (values) => {
    message.success(editingDemande ? t('common.demandModified') : t('common.demandAdded'));
    setModalVisible(false);
  };

  const getPrioriteBadge = (priorite) => {
    const colors = {
      'Haute': '#fee2e2',
      'Moyenne': '#fff7ed',
      'Basse': '#eff6ff'
    };
    const textColors = {
      'Haute': '#dc2626',
      'Moyenne': '#ea580c',
      'Basse': '#2563eb'
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors[priorite], padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: textColors[priorite] }}>{priorite}</span>
      </div>
    );
  };

  const columns = [
    {
      title: t('common.id'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>R{String(id).padStart(3, '0')}</span>
    },
    {
      title: t('common.agriculteur'),
      dataIndex: 'agriculteur',
      key: 'agriculteur',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
      title: t('common.description'),
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span style={{ color: '#667085' }}>{text}</span>
    },
    {
      title: t('common.parcelles'),
      dataIndex: 'parcelle',
      key: 'parcelle',
    },
    {
      title: t('common.priorite'),
      dataIndex: 'priorite',
      key: 'priorite',
      render: getPrioriteBadge
    },
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_unused, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<CheckCircleOutlined style={{ color: '#4a7c59' }} />}
          />
          <Button 
            type="text" 
            icon={<CloseCircleOutlined style={{ color: '#c43a31' }} />}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined style={{ color: '#6b7280' }} />}
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
            <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>{t('common.manageDemands')}</Title>
            <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
              {t('common.manageDemandsSubtitle')}
            </Paragraph>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ClockCircleOutlined style={{ color: '#667085' }} />
            <Text type="secondary">5 {t('common.pending')}</Text>
          </div>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.totalDemands')}</Text>
              </div>
              <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 30 }}>47</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.pending')}</Text>
              </div>
              <Title level={2} style={{ margin: 0, color: '#f59e0b', fontSize: 30 }}>5</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 20 } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 14 }}>{t('common.approvedToday')}</Text>
              </div>
              <Title level={2} style={{ margin: 0, color: '#4a7c59', fontSize: 30 }}>12</Title>
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
          dataSource={demandes}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${t('common.total')} : ${total} demande${total > 1 ? 's' : ''}`,
          }}
        />
      </Card>
    </div>
  );
};

export default Demandes;
