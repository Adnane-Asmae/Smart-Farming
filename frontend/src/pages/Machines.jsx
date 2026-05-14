import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api';

const Machines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMachines = async () => {
    setLoading(true);
    try {
      const response = await api.get('/machines/');
      setMachines(response.data.results || response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des machines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Modèle',
      dataIndex: 'modele',
      key: 'modele',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
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
        title="Machines"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Ajouter une machine
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={machines}
          loading={loading}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Machines;
