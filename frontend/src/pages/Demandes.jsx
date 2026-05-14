import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api';

const Demandes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/demandes/');
      setData(response.data.results || response.data);
    } catch (error) {
      message.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
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
        title="Demandes"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Ajouter
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
      </Card>
    </div>
  );
};

export default Demandes;
