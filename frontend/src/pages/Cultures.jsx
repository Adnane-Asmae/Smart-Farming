import { useState } from 'react';
import { Card, Typography, Button, Input, Row, Col, Progress, Tag, Modal, Form, Select, InputNumber, DatePicker, Space, message, Table } from 'antd';
import { SearchOutlined, EnvironmentOutlined, ExperimentOutlined, CalendarOutlined, ArrowUpOutlined, SmileOutlined, PlusOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import useAuthStore from '../stores/useAuthStore';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/date';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Cultures = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';
  const { t, i18n } = useTranslation();

  const [crops, setCrops] = useState([
    {
      id: 1,
      nameKey: 'tomatoes',
      variety: 'Roma VF',
      parcel: 'Parcel A-12',
      health: 'Excellent',
      healthScore: 9.2,
      growthProgress: 65,
      growthStageKey: 'flowering',
      plantingDate: '2024-03-15',
      expectedHarvest: '2024-06-20',
      expectedYield: '12.5 tons',
      observations: [
        { id: 1, text: 'Plants look healthy', date: '2024-05-10' }
      ]
    },
    {
      id: 2,
      nameKey: 'wheat',
      variety: 'Durum',
      parcel: 'Parcel B-5',
      health: 'Good',
      healthScore: 8.5,
      growthProgress: 75,
      growthStageKey: 'grainFilling',
      plantingDate: '2024-01-20',
      expectedHarvest: '2024-06-10',
      expectedYield: '4.2 tons',
      observations: []
    },
    {
      id: 3,
      nameKey: 'corn',
      variety: 'Hybrid 335',
      parcel: 'Parcel C-8',
      health: 'Fair',
      healthScore: 7.1,
      growthProgress: 40,
      growthStageKey: 'vegetative',
      plantingDate: '2024-04-10',
      expectedHarvest: '2024-08-25',
      expectedYield: '8.7 tons',
      observations: []
    },
    {
      id: 4,
      nameKey: 'lettuce',
      variety: 'Iceberg',
      parcel: 'Parcel D-3',
      health: 'Excellent',
      healthScore: 9.8,
      growthProgress: 90,
      growthStageKey: 'harvestReady',
      plantingDate: '2024-03-25',
      expectedHarvest: '2024-05-20',
      expectedYield: '3.1 tons',
      observations: []
    },
    {
      id: 5,
      nameKey: 'barley',
      variety: 'Six-Row',
      parcel: 'Parcel E-1',
      health: 'Good',
      healthScore: 8.2,
      growthProgress: 55,
      growthStageKey: 'heading',
      plantingDate: '2024-02-05',
      expectedHarvest: '2024-07-05',
      expectedYield: '3.8 tons',
      observations: []
    }
  ]);

  const [searchText, setSearchText] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [observationModalVisible, setObservationModalVisible] = useState(false);
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [cropForm] = Form.useForm();
  const [observationForm] = Form.useForm();

  const getHealthTag = (health) => {
    const colors = {
      'Excellent': '#d1fae5',
      'Good': '#dbeafe',
      'Fair': '#fff7ed'
    };
    const textColors = {
      'Excellent': '#059669',
      'Good': '#2563eb',
      'Fair': '#ea580c'
    };
    const healthKey = health === 'Excellent' ? 'excellent' :
                      health === 'Good' ? 'good' :
                      'fair';
    return (
      <Tag color={colors[health]} style={{ border: 'none' }}>
        <span style={{ color: textColors[health], fontWeight: 500 }}>{t(`common.${healthKey}`)}</span>
      </Tag>
    );
  };

  const getGrowthStageTag = (stageKey) => {
    const colors = {
      'vegetative': '#eff6ff',
      'flowering': '#f3e8ff',
      'grainFilling': '#f0fdf4',
      'heading': '#fff7ed',
      'harvestReady': '#dbeafe'
    };
    const textColors = {
      'vegetative': '#2563eb',
      'flowering': '#7c3aed',
      'grainFilling': '#059669',
      'heading': '#ea580c',
      'harvestReady': '#2563eb'
    };
    return (
      <Tag color={colors[stageKey]} style={{ border: 'none' }}>
        <span style={{ color: textColors[stageKey], fontWeight: 500 }}>{t(`common.${stageKey}`)}</span>
      </Tag>
    );
  };

  const filteredCrops = crops.filter(item => 
    t(`crops.${item.nameKey}`).toLowerCase().includes(searchText.toLowerCase()) || 
    item.variety.toLowerCase().includes(searchText.toLowerCase()) || 
    item.parcel.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddCrop = () => {
    setEditingCrop(null);
    cropForm.resetFields();
    setCropModalVisible(true);
  };

  const handleEditCrop = (record) => {
    setEditingCrop(record);
    cropForm.setFieldsValue(record);
    setCropModalVisible(true);
  };

  const handleDeleteCrop = async (id) => {
    message.success('Crop deleted successfully');
    setCrops(crops.filter(c => c.id !== id));
  };

  const handleSubmitCrop = async (values) => {
    if (editingCrop) {
      setCrops(crops.map(c => c.id === editingCrop.id ? { ...c, ...values } : c));
      message.success('Crop updated successfully');
    } else {
      const newCrop = { ...values, id: Date.now(), observations: [] };
      setCrops([...crops, newCrop]);
      message.success('Crop added successfully');
    }
    setCropModalVisible(false);
  };

  const handleAddObservation = (values) => {
    if (selectedCrop) {
      const newObs = {
        id: Date.now(),
        text: values.text,
        date: new Date().toISOString().split('T')[0]
      };
      const updatedCrops = crops.map(c => 
        c.id === selectedCrop.id 
          ? { ...c, observations: [...(c.observations || []), newObs] }
          : c
      );
      setCrops(updatedCrops);
      setSelectedCrop(updatedCrops.find(c => c.id === selectedCrop.id));
      message.success('Observation added successfully');
      setObservationModalVisible(false);
      observationForm.resetFields();
    }
  };

  const cropColumns = [
    {
      title: t('common.id'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span style={{ fontWeight: 600, color: '#667085' }}>C{String(id).padStart(3, '0')}</span>
    },
    {
      title: t('common.crop'),
      dataIndex: 'nameKey',
      key: 'nameKey',
      render: (nameKey) => t(`crops.${nameKey}`)
    },
    {
      title: t('common.variety'),
      dataIndex: 'variety',
      key: 'variety'
    },
    {
      title: t('common.health'),
      dataIndex: 'health',
      key: 'health',
      render: getHealthTag
    },
    {
      title: t('common.growthProgress'),
      dataIndex: 'growthProgress',
      key: 'growthProgress',
      render: (val) => (
        <Progress 
          percent={val} 
          strokeColor="#4a7c59" 
          showInfo 
          style={{ width: 120 }}
        />
      )
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_unused, record) => (
        <Space size="small" orientation="horizontal">
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: '#2385bb' }} />}
            onClick={() => handleEditCrop(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined style={{ color: '#c43a31' }} />}
            onClick={() => handleDeleteCrop(record.id)}
          />
        </Space>
      ),
    },
  ];

  const renderTechnicianCrops = () => (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
            Crops Management
          </Title>
          <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
            {t('common.monitorCropHealth')}
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddCrop}
          size="large"
          style={{ 
            background: '#23a045',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            height: 44
          }}
        >
          Add Crop
        </Button>
      </div>

      <Card 
        style={{ 
          borderRadius: 16, 
          border: '1px solid #e2e8e0',
          boxShadow: 'none',
          marginBottom: 24
        }}
        styles={{ body: { padding: 24 } }}
      >
        <Input 
          placeholder={t('common.searchCrops')}
          prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ borderRadius: 10, background: '#f3f4f6', border: 'none' }}
        />
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 12 }}>
              {t('common.activeCrops')}
            </Text>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
              {filteredCrops.length}
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              {t('common.differentVarieties')}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 12 }}>
                  {t('common.avgHealthScore')}
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  {((crops.reduce((sum, c) => sum + c.healthScore, 0) / crops.length)).toFixed(1)}/10
                </Title>
                <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
                  <span style={{ color: '#4a7c59' }}>↑ 0.5</span> {t('common.fromLastWeek')}
                </Text>
              </div>
              <SmileOutlined style={{ fontSize: 18, color: '#f59e0b' }} />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 12 }}>
              {t('common.expectedYield')}
            </Text>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
              89 tons
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              {t('common.thisSeason')}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              border: '1px solid #e2e8e0',
              boxShadow: 'none'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Text style={{ color: '#666', fontSize: 14, display: 'block', marginBottom: 12 }}>
              {t('common.daysToHarvest')}
            </Text>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
              37
            </Title>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 8, display: 'block' }}>
              {t('common.average')}
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filteredCrops.map((crop) => (
          <Col xs={24} lg={12} key={crop.id}>
            <Card 
              style={{ 
                borderRadius: 16, 
                border: '1px solid #e2e8e0',
                boxShadow: 'none'
              }}
              styles={{ body: { padding: 24 } }}
              hoverable
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: 12, 
                    background: '#f0fdf4', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <ExperimentOutlined style={{ fontSize: 28, color: '#4a7c59' }} />
                  </div>
                  <div>
                    <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                      {t(`crops.${crop.nameKey}`)}
                    </Title>
                    <Text style={{ color: '#667085', fontSize: 14, display: 'block' }}>
                      {crop.variety}
                    </Text>
                  </div>
                </div>
                {getHealthTag(crop.health)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <EnvironmentOutlined style={{ color: '#4a7c59' }} />
                <Text style={{ color: '#667085', fontSize: 14 }}>
                  {crop.parcel}
                </Text>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: '#1a1a1a', fontSize: 14, fontWeight: 600 }}>
                    {t('common.growthProgress')}
                  </Text>
                  {getGrowthStageTag(crop.growthStageKey)}
                </div>
                <Progress 
                  percent={crop.growthProgress} 
                  strokeColor="#4a7c59" 
                  showInfo={false} 
                  style={{ margin: 0 }} 
                />
              </div>

              <Row gutter={[8, 8]} style={{ marginBottom: 20 }}>
                <Col xs={12}>
                  <div style={{ 
                    background: '#f3f4f6', 
                    padding: 12, 
                    borderRadius: 8 
                  }}>
                    <CalendarOutlined style={{ color: '#667085', marginBottom: 4 }} />
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', color: '#667085' }}>
                      {t('common.plantingDate')}
                    </Text>
                    <Text style={{ color: '#1a1a1a', fontWeight: 600, fontSize: 13 }}>
                      {formatDate(crop.plantingDate, i18n.language)}
                    </Text>
                  </div>
                </Col>
                <Col xs={12}>
                  <div style={{ 
                    background: '#f0fdf4', 
                    padding: 12, 
                    borderRadius: 8 
                  }}>
                    <ArrowUpOutlined style={{ color: '#4a7c59', marginBottom: 4 }} />
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', color: '#667085' }}>
                      {t('common.expectedHarvest')}
                    </Text>
                    <Text style={{ color: '#1a1a1a', fontWeight: 600, fontSize: 13 }}>
                      {formatDate(crop.expectedHarvest, i18n.language)}
                    </Text>
                  </div>
                </Col>
              </Row>

              <Row gutter={[8, 8]}>
                <Col xs={12}>
                  <Button 
                    block
                    onClick={() => {
                      setSelectedCrop(crop);
                      setDetailsModalVisible(true);
                    }}
                    style={{ 
                      border: '1px solid #e2e8e0', 
                      borderRadius: 8,
                      fontWeight: 500
                    }}
                  >
                    {t('common.viewDetails')}
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button 
                    type="primary"
                    block
                    onClick={() => {
                      setSelectedCrop(crop);
                      setObservationModalVisible(true);
                    }}
                    style={{ 
                      background: '#23a045',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 600
                    }}
                    icon={<PlusCircleOutlined />}
                  >
                    {t('common.addObservation')}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedCrop ? `Crop Details: ${t(`crops.${selectedCrop.nameKey}`)}` : 'Crop Details'}
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedCrop && (
          <div style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                  {t('common.variety')}
                </Text>
                <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                  {selectedCrop.variety}
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                  {t('common.health')}
                </Text>
                {getHealthTag(selectedCrop.health)}
              </Col>
              <Col xs={24} md={12}>
                <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                  {t('common.healthScore')}
                </Text>
                <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                  {selectedCrop.healthScore}/10
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                  {t('common.expectedYield')}
                </Text>
                <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                  {selectedCrop.expectedYield}
                </Text>
              </Col>
              <Col xs={24}>
                <div style={{ marginTop: 16 }}>
                  <Title level={4} style={{ marginBottom: 12 }}>Observations</Title>
                  {selectedCrop.observations && selectedCrop.observations.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {selectedCrop.observations.map(obs => (
                        <Card key={obs.id} size="small" style={{ border: '1px solid #e2e8e0', borderRadius: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>{obs.text}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatDate(obs.date, i18n.language)}
                            </Text>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Text type="secondary">No observations yet</Text>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      <Modal
        title={selectedCrop ? `Add Observation to ${t(`crops.${selectedCrop.nameKey}`)}` : 'Add Observation'}
        open={observationModalVisible}
        onCancel={() => setObservationModalVisible(false)}
        onOk={() => observationForm.submit()}
        okText="Add"
        width={500}
      >
        <Form
          form={observationForm}
          layout="vertical"
          onFinish={handleAddObservation}
        >
          <Form.Item
            name="text"
            label="Observation"
            rules={[{ required: true, message: 'Please enter an observation' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your observation..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingCrop ? 'Edit Crop' : 'Add New Crop'}
        open={cropModalVisible}
        onCancel={() => setCropModalVisible(false)}
        onOk={() => cropForm.submit()}
        okText={editingCrop ? 'Update' : 'Add'}
        width={600}
      >
        <Form
          form={cropForm}
          layout="vertical"
          onFinish={handleSubmitCrop}
        >
          <Form.Item
            name="nameKey"
            label="Crop"
            rules={[{ required: true, message: 'Please select a crop' }]}
          >
            <Select placeholder="Select crop">
              <Option value="tomatoes">{t('crops.tomatoes')}</Option>
              <Option value="wheat">{t('crops.wheat')}</Option>
              <Option value="corn">{t('crops.corn')}</Option>
              <Option value="lettuce">{t('crops.lettuce')}</Option>
              <Option value="barley">{t('crops.barley')}</Option>
              <Option value="olives">{t('crops.olives')}</Option>
              <Option value="almonds">{t('crops.almonds')}</Option>
              <Option value="citrus">{t('crops.citrus')}</Option>
              <Option value="grapes">{t('crops.grapes')}</Option>
              <Option value="apples">{t('crops.apples')}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="variety"
            label="Variety"
            rules={[{ required: true, message: 'Please enter variety' }]}
          >
            <Input placeholder="Enter variety" />
          </Form.Item>
          <Form.Item
            name="parcel"
            label="Parcel"
            rules={[{ required: true, message: 'Please enter parcel' }]}
          >
            <Input placeholder="Enter parcel name" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item
                name="health"
                label="Health"
                rules={[{ required: true, message: 'Please select health' }]}
              >
                <Select placeholder="Select health">
                  <Option value="Excellent">Excellent</Option>
                  <Option value="Good">Good</Option>
                  <Option value="Fair">Fair</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                name="healthScore"
                label="Health Score"
                rules={[{ required: true, message: 'Please enter score' }]}
              >
                <InputNumber min={0} max={10} step={0.1} placeholder="0-10" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item
                name="growthProgress"
                label="Growth Progress (%)"
                rules={[{ required: true, message: 'Please enter progress' }]}
              >
                <InputNumber min={0} max={100} placeholder="0-100" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                name="growthStageKey"
                label="Growth Stage"
                rules={[{ required: true, message: 'Please select stage' }]}
              >
                <Select placeholder="Select stage">
                  <Option value="vegetative">{t('common.vegetative')}</Option>
                  <Option value="flowering">{t('common.flowering')}</Option>
                  <Option value="grainFilling">{t('common.grainFilling')}</Option>
                  <Option value="heading">{t('common.heading')}</Option>
                  <Option value="harvestReady">{t('common.harvestReady')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item
                name="plantingDate"
                label="Planting Date"
                rules={[{ required: true, message: 'Please select planting date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                name="expectedHarvest"
                label="Expected Harvest"
                rules={[{ required: true, message: 'Please select harvest date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="expectedYield"
            label="Expected Yield"
            rules={[{ required: true, message: 'Please enter yield' }]}
          >
            <Input placeholder="e.g., 12.5 tons" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  const renderAdminCrops = () => (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
            Crops Management
          </Title>
          <Paragraph type="secondary">
            Manage all crops
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddCrop}
        >
          Add Crop
        </Button>
      </div>
      <Card style={{ borderRadius: 16 }}>
        <Table 
          columns={cropColumns} 
          dataSource={crops} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingCrop ? 'Edit Crop' : 'Add New Crop'}
        open={cropModalVisible}
        onCancel={() => setCropModalVisible(false)}
        onOk={() => cropForm.submit()}
        okText={editingCrop ? 'Update' : 'Add'}
        width={600}
      >
        <Form
          form={cropForm}
          layout="vertical"
          onFinish={handleSubmitCrop}
        >
          <Form.Item
            name="nameKey"
            label="Crop"
            rules={[{ required: true, message: 'Please select a crop' }]}
          >
            <Select placeholder="Select crop">
              <Option value="tomatoes">{t('crops.tomatoes')}</Option>
              <Option value="wheat">{t('crops.wheat')}</Option>
              <Option value="corn">{t('crops.corn')}</Option>
              <Option value="lettuce">{t('crops.lettuce')}</Option>
              <Option value="barley">{t('crops.barley')}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="variety"
            label="Variety"
            rules={[{ required: true, message: 'Please enter variety' }]}
          >
            <Input placeholder="Enter variety" />
          </Form.Item>
          <Form.Item
            name="parcel"
            label="Parcel"
            rules={[{ required: true, message: 'Please enter parcel' }]}
          >
            <Input placeholder="Enter parcel name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      {(userRole === 'TECHNICIEN' || userRole === 'Agronomist' || userRole === 'FARMER') 
        ? renderTechnicianCrops() 
        : renderAdminCrops()}
    </div>
  );
};

export default Cultures;
