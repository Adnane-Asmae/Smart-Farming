import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api';

const Cultures = () => {
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCultures = async () => {
    setLoading(true);
    try {
      const response = await api.get('/cultures/');
      setCultures(response.data.results || response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des cultures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCultures();
  }, []);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Stade',
      dataIndex: 'stade',
      key: 'stade',
    },
    {
      title: 'Date de plantation',
      dataIndex: 'date_plantation',
      key: 'date_plantation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Modifier</Button>
          <Button icon={<DeleteOutlined />} danger>Supprimer</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Cultures"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Ajouter une culture
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={cultures}
          loading={loading}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Cultures;
