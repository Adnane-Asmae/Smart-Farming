import { useState } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/date';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Demandes = () => {
  const { t, i18n } = useTranslation();
  const [demandes, setDemandes] = useState([
    { id: 1, agriculteur: 'Mohammed Alami', typeKey: 'urgent_irrigation', description: 'Besoin d\'irrigation immédiate suite à sécheresse', parcelle: 'Parcelle A1', prioriteKey: 'high', date: '2024-05-14' },
    { id: 2, agriculteur: 'Youssef Chakir', typeKey: 'tractor_maintenance', description: 'Tracteur nécessite révision complète', parcelle: 'Parcelle B2', prioriteKey: 'medium', date: '2024-05-14' },
    { id: 3, agriculteur: 'Amina Berrada', typeKey: 'sensor_installation', description: 'Installation de nouveaux capteurs d\'humidité', parcelle: 'Parcelle E5', prioriteKey: 'low', date: '2024-05-13' },
    { id: 4, agriculteur: 'Mohammed Alami', typeKey: 'technical_support', description: 'Problème avec système d\'irrigation automatique', parcelle: 'Parcelle D4', prioriteKey: 'high', date: '2024-05-13' },
    { id: 5, agriculteur: 'Amina Berrada', typeKey: 'fertilizer_purchase', description: 'Demande d\'approvisionnement en engrais organiques', parcelle: 'Parcelle C3', prioriteKey: 'medium', date: '2024-05-12' },
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

  const getPrioriteBadge = (prioriteKey) => {
    const colors = {
      'high': '#fee2e2',
      'medium': '#fff7ed',
      'low': '#eff6ff'
    };
    const textColors = {
      'high': '#dc2626',
      'medium': '#ea580c',
      'low': '#2563eb'
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors[prioriteKey], padding: '4px 12px', borderRadius: 20, width: 'fit-content' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: textColors[prioriteKey] }}>{t(`common.${prioriteKey}`)}</span>
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
      dataIndex: 'typeKey',
      key: 'type',
      render: (typeKey) => t(`demandTypes.${typeKey}`),
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
      dataIndex: 'prioriteKey',
      key: 'priorite',
      render: getPrioriteBadge
    },
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date',
      render: (date) => formatDate(date, i18n.language),
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
