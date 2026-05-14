import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api';

const Irrigation = () => {
  const [plans, setPlans] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loadingCycles, setLoadingCycles] = useState(false);

  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const response = await api.get('/irrigation/plans/');
      setPlans(response.data.results || response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des plans d\'irrigation');
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchCycles = async () => {
    setLoadingCycles(true);
    try {
      const response = await api.get('/irrigation/cycles/');
      setCycles(response.data.results || response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des cycles d\'irrigation');
    } finally {
      setLoadingCycles(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchCycles();
  }, []);

  const planColumns = [
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

  const cycleColumns = [
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

  const items = [
    {
      key: '1',
      label: 'Plans d\'irrigation',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />}>
              Ajouter un plan
            </Button>
          </div>
          <Table 
            columns={planColumns} 
            dataSource={plans} 
            loading={loadingPlans} 
            rowKey="id" 
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Cycles d\'irrigation',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />}>
              Ajouter un cycle
            </Button>
          </div>
          <Table 
            columns={cycleColumns} 
            dataSource={cycles} 
            loading={loadingCycles} 
            rowKey="id" 
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Card title="Irrigation">
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default Irrigation;
