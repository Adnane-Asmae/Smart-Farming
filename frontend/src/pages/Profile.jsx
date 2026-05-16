import { useState } from 'react';
import { Card, Typography, Button, Row, Col, Tag, Avatar, Space, Modal, Form, Input, message, List, Tabs, Table } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  EditOutlined,
  ArrowUpOutlined,
  TeamOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  ToolOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import useAuthStore from '../stores/useAuthStore';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;

const Profile = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';
  const { t } = useTranslation();

  const [skills, setSkills] = useState([
    'cropManagement',
    'irrigationSystems',
    'pestControl',
    'soilAnalysis',
    'machineOperation',
    'organicFarming',
    'precisionAgriculture',
    'dataAnalysis'
  ]);

  const [certificates, setCertificates] = useState([
    { id: 1, name: 'Certified Agricultural Technician', issuer: 'Ministry of Agriculture Morocco', year: 2022 },
    { id: 2, name: 'Irrigation Systems Specialist', issuer: 'International Irrigation Association', year: 2023 },
    { id: 3, name: 'Organic Farming Certification', issuer: 'Organic Agriculture Association', year: 2023 },
    { id: 4, name: 'Smart Farming Technologies', issuer: 'AgTech Institute', year: 2024 }
  ]);

  const [parcels, setParcels] = useState([
    { id: 1, name: 'Parcelle Nord A1', location: 'Casablanca, Maroc', area: 5.2, crop: 'Tomates', farmer: 'Mohammed Alami', irrigation: 'Automatique', status: 'Actif' },
    { id: 2, name: 'Parcelle Sud B2', location: 'Rabat, Maroc', area: 3.8, crop: 'Pommes de terre', farmer: 'Youssef Chakir', irrigation: 'Manuel', status: 'Actif' },
    { id: 3, name: 'Parcelle Est C3', location: 'Fès, Maroc', area: 7.1, crop: 'Blé', farmer: 'Amina Berrada', irrigation: 'Automatique', status: 'Attention' },
  ]);

  const [interventions, setInterventions] = useState([
    { id: 1001, type: 'Irrigation automatique', parcel: 'Parcelle A1', technician: 'Youssef El Idrissi', priority: 'Haute', dateStart: '14/05/2024', dateEnd: '14/05/2024', progress: 75, status: 'Actif' },
    { id: 1002, type: 'Maintenance tracteur', parcel: 'Parcelle B2', technician: 'Youssef El Idrissi', priority: 'Moyenne', dateStart: '13/05/2024', dateEnd: '15/05/2024', progress: 45, status: 'Actif' },
    { id: 1003, type: 'Traitement phytosanitaire', parcel: 'Parcelle C3', technician: 'Youssef El Idrissi', priority: 'Haute', dateStart: '14/05/2024', dateEnd: '14/05/2024', progress: 90, status: 'Actif' },
  ]);

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [addCertificateVisible, setAddCertificateVisible] = useState(false);
  const [addSkillVisible, setAddSkillVisible] = useState(false);
  const [profileForm] = Form.useForm();
  const [certificateForm] = Form.useForm();
  const [skillForm] = Form.useForm();

  const getStatusTag = (status) => {
    return (
      <Tag 
        color="#d1fae5" 
        style={{ border: 'none' }}
      >
        <span style={{ color: '#059669', fontWeight: 500 }}>Active</span>
      </Tag>
    );
  };

  const handleEditProfile = (values) => {
    message.success('Profile updated successfully');
    setEditProfileVisible(false);
  };

  const handleAddCertificate = (values) => {
    const newCert = { ...values, id: Date.now() };
    setCertificates([...certificates, newCert]);
    message.success('Certificate added successfully');
    setAddCertificateVisible(false);
    certificateForm.resetFields();
  };

  const handleAddSkill = (values) => {
    setSkills([...skills, values.skillKey]);
    message.success('Skill added successfully');
    setAddSkillVisible(false);
    skillForm.resetFields();
  };

  const parcelColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => `P${String(id).padStart(2, '0')}`,
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <EnvironmentOutlined style={{ color: '#4a7c59' }} />
          <span style={{ fontWeight: 600 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Localisation',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Surface',
      dataIndex: 'area',
      key: 'area',
      render: (val) => `${val} ha`,
    },
    {
      title: 'Culture',
      dataIndex: 'crop',
      key: 'crop',
    },
    {
      title: 'Irrigation',
      dataIndex: 'irrigation',
      key: 'irrigation',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { 'Actif': 'success', 'Inactif': 'default', 'Attention': 'warning' };
        return (
          <Tag color={colors[status]}>
            {status === 'Attention' && <AlertOutlined style={{ marginRight: 4 }} />}
            {status}
          </Tag>
        );
      },
    },
  ];

  const interventionColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ToolOutlined style={{ color: '#2385bb' }} />
          <span style={{ fontWeight: 600 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Parcelle',
      dataIndex: 'parcel',
      key: 'parcel',
    },
    {
      title: 'Priorité',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const colors = { 'Haute': 'error', 'Moyenne': 'warning', 'Basse': 'processing' };
        return <Tag color={colors[priority]}>{priority}</Tag>;
      },
    },
    {
      title: 'Date début',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'Date fin',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Progression',
      dataIndex: 'progress',
      key: 'progress',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ 
            width: 80, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' 
          }}>
            <div style={{ 
              width: `${val}%`, 
              height: '100%', 
              background: val === 100 ? '#52c41a' : '#1890ff',
              borderRadius: 4
            }} />
          </div>
          <span style={{ fontWeight: 600 }}>{val}%</span>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { 'Actif': 'success', 'Inactif': 'default', 'En attente': 'processing' };
        return (
          <Tag color={colors[status]}>
            {status === 'En attente' && <ClockCircleOutlined style={{ marginRight: 4 }} />}
            {status === 'Inactif' && <CheckCircleOutlined style={{ marginRight: 4 }} />}
            {status}
          </Tag>
        );
      },
    },
  ];

  const profileItems = [
    {
      key: '1',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>My Info</span>,
      children: (
        <>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card 
                style={{ 
                  borderRadius: 16, 
                  border: '1px solid #e2e8e0',
                  boxShadow: 'none'
                }}
                styles={{ body: { padding: 32 } }}
              >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <Avatar 
                    size={120}
                    style={{ 
                      background: '#23a045',
                      marginBottom: 16,
                      fontSize: 36,
                      fontWeight: 600
                    }}
                  >
                    YE
                  </Avatar>
                  <Title level={3} style={{ margin: 0, color: '#1a1a1a', fontSize: 24 }}>
                    Youssef El Idrissi
                  </Title>
                  <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 12 }}>
                    Agricultural Technician
                  </Text>
                  {getStatusTag('Active')}
                </div>

                <div style={{ marginBottom: 24 }}>
                  <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <MailOutlined style={{ color: '#667085', fontSize: 18 }} />
                      <Text style={{ color: '#667085', fontSize: 14 }}>
                        youssef.elidrissi@smartfarming.ma
                      </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <PhoneOutlined style={{ color: '#667085', fontSize: 18 }} />
                      <Text style={{ color: '#667085', fontSize: 14 }}>
                        +212 6 12 34 56 78
                      </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <EnvironmentOutlined style={{ color: '#667085', fontSize: 18 }} />
                      <Text style={{ color: '#667085', fontSize: 14 }}>
                        Casablanca, Morocco
                      </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CalendarOutlined style={{ color: '#667085', fontSize: 18 }} />
                      <Text style={{ color: '#667085', fontSize: 14 }}>
                        Joined January 2023
                      </Text>
                    </div>
                  </Space>
                </div>

                <Button 
                  block
                  icon={<EditOutlined />}
                  onClick={() => setEditProfileVisible(true)}
                  style={{ 
                    border: '1px solid #e2e8e0', 
                    borderRadius: 10,
                    fontWeight: 500,
                    height: 44
                  }}
                >
                  Edit Profile
                </Button>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Card 
                  style={{ 
                    borderRadius: 16, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                  styles={{ body: { padding: 28 } }}
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ArrowUpOutlined style={{ color: '#23a045', fontSize: 20 }} />
                      <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                        Performance Overview
                      </Title>
                    </div>
                  }
                >
                  <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                    <Col xs={12} md={6}>
                      <Card 
                        style={{ 
                          borderRadius: 12, 
                          border: 'none',
                          background: '#f0fdf4',
                          textAlign: 'center'
                        }}
                      >
                        <Title level={2} style={{ margin: 0, color: '#23a045', fontSize: 32 }}>
                          247
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
                          Total Interventions
                        </Text>
                      </Card>
                    </Col>
                    <Col xs={12} md={6}>
                      <Card 
                        style={{ 
                          borderRadius: 12, 
                          border: 'none',
                          background: '#f0fdf4',
                          textAlign: 'center'
                        }}
                      >
                        <Title level={2} style={{ margin: 0, color: '#23a045', fontSize: 32 }}>
                          98%
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
                          Completion Rate
                        </Text>
                      </Card>
                    </Col>
                    <Col xs={12} md={6}>
                      <Card 
                        style={{ 
                          borderRadius: 12, 
                          border: 'none',
                          background: '#f0fdf4',
                          textAlign: 'center'
                        }}
                      >
                        <Title level={2} style={{ margin: 0, color: '#ea580c', fontSize: 32 }}>
                          4.6/5
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
                          Avg Rating
                        </Text>
                      </Card>
                    </Col>
                    <Col xs={12} md={6}>
                      <Card 
                        style={{ 
                          borderRadius: 12, 
                          border: 'none',
                          background: '#f0fdf4',
                          textAlign: 'center'
                        }}
                      >
                        <Title level={2} style={{ margin: 0, color: '#2563eb', fontSize: 32 }}>
                          1240h
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
                          Hours Worked
                        </Text>
                      </Card>
                    </Col>
                  </Row>
                </Card>

                <Card 
                  style={{ 
                    borderRadius: 16, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                  styles={{ body: { padding: 28 } }}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <TeamOutlined style={{ color: '#23a045', fontSize: 20 }} />
                        <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                          Skills & Expertise
                        </Title>
                      </div>
                      <Button 
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => setAddSkillVisible(true)}
                      >
                        Add Skill
                      </Button>
                    </div>
                  }
                >
                  <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {skills.map((skill, i) => (
                      <Tag 
                        key={i}
                        color="#d1fae5" 
                        style={{ 
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: 20,
                          fontSize: 13,
                          fontWeight: 500
                        }}
                      >
                        <span style={{ color: '#23a045' }}>{skill}</span>
                        <Button 
                          type="text" 
                          size="small" 
                          style={{ color: '#c43a31', marginLeft: 8, padding: 0 }}
                          onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                        >
                          ×
                        </Button>
                      </Tag>
                    ))}
                  </div>
                </Card>

                <Card 
                  style={{ 
                    borderRadius: 16, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                  styles={{ body: { padding: 28 } }}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <TeamOutlined style={{ color: '#23a045', fontSize: 20 }} />
                        <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                          Certifications
                        </Title>
                      </div>
                      <Button 
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => setAddCertificateVisible(true)}
                      >
                        Add Certificate
                      </Button>
                    </div>
                  }
                >
                  <List
                    dataSource={certificates}
                    renderItem={(cert) => (
                      <List.Item>
                        <Card 
                          style={{ 
                            width: '100%',
                            borderRadius: 12, 
                            border: '1px solid #e2e8e0',
                            boxShadow: 'none'
                          }}
                        >
                          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                              <div style={{ 
                                width: 48, 
                                height: 48, 
                                borderRadius: 12, 
                                background: '#f0fdf4', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}>
                                <TeamOutlined style={{ fontSize: 24, color: '#23a045' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <Title level={5} style={{ margin: 0, color: '#1a1a1a', fontSize: 17 }}>
                                  {cert.name}
                                </Title>
                                <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                                  {cert.issuer} • {cert.year}
                                </Text>
                              </div>
                            </div>
                            <Button 
                              type="text" 
                              style={{ color: '#c43a31' }}
                              onClick={() => setCertificates(certificates.filter(c => c.id !== cert.id))}
                            >
                              <DeleteOutlined />
                            </Button>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </Card>
              </Space>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: '2',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>My Parcels</span>,
      children: (
        <Table
          columns={parcelColumns}
          dataSource={parcels}
          rowKey="id"
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${t('common.total')} : ${total} parcels`,
          }}
        />
      ),
    },
    {
      key: '3',
      label: <span style={{ fontSize: 15, fontWeight: 600 }}>My Interventions</span>,
      children: (
        <Table
          columns={interventionColumns}
          dataSource={interventions}
          rowKey="id"
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `${t('common.total')} : ${total} interventions`,
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0fdf4', minHeight: '100vh' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <UserOutlined style={{ fontSize: 24, color: '#4a7c59' }} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>My Profile</span>
          </div>
        }
        style={{ 
          borderRadius: 16, 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: 'none'
        }}
      >
        <Tabs defaultActiveKey="1" items={profileItems} />
      </Card>

      <Modal
        title="Edit Profile"
        open={editProfileVisible}
        onCancel={() => setEditProfileVisible(false)}
        onOk={() => profileForm.submit()}
        okText="Save"
        width={600}
      >
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleEditProfile}
        >
          <Form.Item
            name="name"
            label="Full Name"
            initialValue="Youssef El Idrissi"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            initialValue="youssef.elidrissi@smartfarming.ma"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            initialValue="+212 6 12 34 56 78"
            rules={[{ required: true, message: 'Please enter phone' }]}
          >
            <Input placeholder="Enter phone" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            initialValue="Casablanca, Morocco"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Certificate"
        open={addCertificateVisible}
        onCancel={() => setAddCertificateVisible(false)}
        onOk={() => certificateForm.submit()}
        okText="Add"
        width={600}
      >
        <Form
          form={certificateForm}
          layout="vertical"
          onFinish={handleAddCertificate}
        >
          <Form.Item
            name="name"
            label="Certificate Name"
            rules={[{ required: true, message: 'Please enter certificate name' }]}
          >
            <Input placeholder="e.g., Certified Agricultural Technician" />
          </Form.Item>
          <Form.Item
            name="issuer"
            label="Issuing Organization"
            rules={[{ required: true, message: 'Please enter issuer' }]}
          >
            <Input placeholder="e.g., Ministry of Agriculture Morocco" />
          </Form.Item>
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: 'Please enter year' }]}
          >
            <Input.Number min={2000} max={2030} placeholder="2024" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Skill"
        open={addSkillVisible}
        onCancel={() => setAddSkillVisible(false)}
        onOk={() => skillForm.submit()}
        okText="Add"
        width={500}
      >
        <Form
          form={skillForm}
          layout="vertical"
          onFinish={handleAddSkill}
        >
          <Form.Item
            name="skillKey"
            label="Skill"
            rules={[{ required: true, message: 'Please enter a skill' }]}
          >
            <Input placeholder="e.g., Climate Adaptation" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
