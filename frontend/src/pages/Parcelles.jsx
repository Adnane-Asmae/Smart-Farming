import { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Parcelles = () => {
  const [parcelles, setParcelles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingParcelle, setEditingParcelle] = useState(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const fetchParcelles = async () => {
    setLoading(true);
    try {
      const response = await api.get('/parcelles/');
      setParcelles(response.data.results || response.data);
    } catch (error) {
      message.error(t('common.errorLoading'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcelles();
  }, []);

  const handleAdd = () => {
    setEditingParcelle(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingParcelle(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/parcelles/${id}/`);
      message.success(t('common.successDelete'));
      fetchParcelles();
    } catch (error) {
      message.error(t('common.errorDelete'));
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingParcelle) {
        await api.put(`/parcelles/${editingParcelle.id}/`, values);
        message.success(t('common.successEdit'));
      } else {
        await api.post('/parcelles/', values);
        message.success(t('common.successAdd'));
      }
      setModalVisible(false);
      fetchParcelles();
    } catch (error) {
      message.error(t('common.errorSave'));
    }
  };

  const columns = [
    {
      title: t('parcelles.name'),
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: t('parcelles.area'),
      dataIndex: 'superficie',
      key: 'superficie',
    },
    {
      title: t('parcelles.location'),
      dataIndex: 'localisation',
      key: 'localisation',
    },
    {
      title: t('parcelles.soilType'),
      dataIndex: 'type_sol',
      key: 'type_sol',
      render: (type) => {
        const soilTypes = {
          argileux: t('parcelles.clay'),
          sableux: t('parcelles.sandy'),
          limoneux: t('parcelles.loamy'),
          autre: t('parcelles.other')
        };
        return soilTypes[type] || type;
      }
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            {t('common.edit')}
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            {t('common.delete')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={t('parcelles.title')}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t('parcelles.add')}
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={parcelles}
          loading={loading}
          rowKey="id"
        />
      </Card>

      <Modal
        title={editingParcelle ? t('parcelles.edit') : t('parcelles.add')}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="nom"
            label={t('parcelles.name')}
            rules={[{ required: true, message: t('parcelles.enterName') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="superficie"
            label={t('parcelles.area')}
            rules={[{ required: true, message: t('parcelles.enterArea') }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} step={0.1} />
          </Form.Item>

          <Form.Item
            name="localisation"
            label={t('parcelles.location')}
            rules={[{ required: true, message: t('parcelles.enterLocation') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type_sol"
            label={t('parcelles.soilType')}
            rules={[{ required: true, message: t('parcelles.selectSoilType') }]}
          >
            <Select>
              <Option value="argileux">{t('parcelles.clay')}</Option>
              <Option value="sableux">{t('parcelles.sandy')}</Option>
              <Option value="limoneux">{t('parcelles.loamy')}</Option>
              <Option value="autre">{t('parcelles.other')}</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={t('parcelles.description')}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {t('common.save')}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                {t('common.cancel')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Parcelles;
