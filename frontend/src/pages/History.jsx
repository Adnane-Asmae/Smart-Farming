import { useState } from 'react';
import { Table, Card, Typography, Tag } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const History = () => {
  const [historyItems, setHistoryItems] = useState([
    { id: 1, type: 'Intervention', action: 'Pest Control completed', parcelle: 'Parcelle A-12', date: '14/05/2024 10:30', status: 'Completed' },
    { id: 2, type: 'Irrigation', action: 'Irrigation cycle started', parcelle: 'Parcelle B-5', date: '14/05/2024 08:00', status: 'Active' },
    { id: 3, type: 'Report', action: 'Monthly report generated', parcelle: 'All', date: '13/05/2024 17:45', status: 'Completed' },
    { id: 4, type: 'Machine', action: 'Tractor maintenance completed', parcelle: 'Tractor T-03', date: '13/05/2024 14:20', status: 'Completed' },
    { id: 5, type: 'Intervention', action: 'Fertilization assigned', parcelle: 'Parcelle C-8', date: '12/05/2024 09:15', status: 'In Progress' },
  ]);

  const getStatusTag = (status) => {
    const colors = {
      'Completed': '#d1fae5',
      'Active': '#dbeafe',
      'In Progress': '#fff7ed'
    };
    const textColors = {
      'Completed': '#059669',
      'Active': '#2563eb',
      'In Progress': '#ea580c'
    };
    return (
      <Tag color={colors[status]} style={{ border: 'none' }}>
        <span style={{ color: textColors[status], fontWeight: 500 }}>{status}</span>
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text) => <Text style={{ fontWeight: 500 }}>{text}</Text>
    },
    {
      title: 'Parcelle / Machine',
      dataIndex: 'parcelle',
      key: 'parcelle',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <Text type="secondary">{text}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: getStatusTag
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
        Historique des actions
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        Suivi de toutes les actions effectuées sur la plateforme
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
