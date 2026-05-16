import { useState } from 'react';
import { Table, Card, Typography, Tag } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/date';

const { Title, Text, Paragraph } = Typography;

const History = () => {
  const { t, i18n } = useTranslation();
  const [historyItems, setHistoryItems] = useState([
    { id: 1, typeKey: 'intervention', actionKey: 'pest_control_completed', parcelle: 'Parcelle A-12', date: '2024-05-14', statusKey: 'completed' },
    { id: 2, typeKey: 'irrigation', actionKey: 'irrigation_cycle_started', parcelle: 'Parcelle B-5', date: '2024-05-14', statusKey: 'active' },
    { id: 3, typeKey: 'report', actionKey: 'monthly_report_generated', parcelle: 'All', date: '2024-05-13', statusKey: 'completed' },
    { id: 4, typeKey: 'machine', actionKey: 'tractor_maintenance_completed', parcelle: 'Tractor T-03', date: '2024-05-13', statusKey: 'completed' },
    { id: 5, typeKey: 'intervention', actionKey: 'fertilization_assigned', parcelle: 'Parcelle C-8', date: '2024-05-12', statusKey: 'inProgress' },
  ]);

  const getStatusTag = (statusKey) => {
    const colors = {
      'completed': '#d1fae5',
      'active': '#dbeafe',
      'inProgress': '#fff7ed'
    };
    const textColors = {
      'completed': '#059669',
      'active': '#2563eb',
      'inProgress': '#ea580c'
    };
    return (
      <Tag color={colors[statusKey]} style={{ border: 'none' }}>
        <span style={{ color: textColors[statusKey], fontWeight: 500 }}>{t(`common.${statusKey}`)}</span>
      </Tag>
    );
  };

  const columns = [
    {
      title: t('common.type'),
      dataIndex: 'typeKey',
      key: 'type',
      render: (typeKey) => t(`historyTypes.${typeKey}`),
    },
    {
      title: t('common.action'),
      dataIndex: 'actionKey',
      key: 'action',
      render: (actionKey) => <Text style={{ fontWeight: 500 }}>{t(`historyActions.${actionKey}`)}</Text>
    },
    {
      title: t('common.parcelleMachine'),
      dataIndex: 'parcelle',
      key: 'parcelle',
    },
    {
      title: t('common.date'),
      dataIndex: 'date',
      key: 'date',
      render: (date) => <Text type="secondary">{formatDate(date, i18n.language)}</Text>
    },
    {
      title: t('common.status'),
      dataIndex: 'statusKey',
      key: 'status',
      render: getStatusTag
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
        {t('common.historyTitle')}
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        {t('common.historySubtitle')}
      </Paragraph>

      <Card
        style={{ 
          borderRadius: 12, 
          border: '1px solid #e2e8e0',
          boxShadow: 'none'
        }}
      >
        <Table
          columns={columns}
          dataSource={historyItems}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default History;
