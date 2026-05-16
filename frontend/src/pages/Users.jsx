import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, Select, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import api from '../api';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

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

  const columns = [
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

  return (
    <div style={{ padding: '24px', background: '#f0fdf4', minHeight: '100vh' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <UserOutlined style={{ fontSize: 24, color: '#4a7c59' }} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>{t('common.manageUsers')}</span>
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
        <Table
          columns={columns}
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
