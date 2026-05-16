import { useState } from 'react';
import { Card, Typography, Button, Row, Col, Tag, Avatar, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  EditOutlined,
  ArrowUpOutlined,
  TeamOutlined
} from '@ant-design/icons';
import useAuthStore from '../stores/useAuthStore';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;

const Profile = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';
  const { t } = useTranslation();

  const getStatusTag = (status) => {
    return (
      <Tag 
        color="#d1fae5" 
        style={{ border: 'none' }}
      >
        <span style={{ color: '#059669', fontWeight: 500 }}>{t('common.active')}</span>
      </Tag>
    );
  };

  const skills = [
    'cropManagement',
    'irrigationSystems',
    'pestControl',
    'soilAnalysis',
    'machineOperation',
    'organicFarming',
    'precisionAgriculture',
    'dataAnalysis'
  ];

  const renderTechnicianProfile = () => (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
          {t('common.myProfile')}
        </Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
          {t('common.managePersonalInfo')}
        </Paragraph>
      </div>

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
                {t('common.agriculturalTechnician')}
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
                    {t('common.casablancaMorocco')}
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CalendarOutlined style={{ color: '#667085', fontSize: 18 }} />
                  <Text style={{ color: '#667085', fontSize: 14 }}>
                    {t('common.joined')} {t('common.january2023')}
                  </Text>
                </div>
              </Space>
            </div>

            <Button 
              block
              icon={<EditOutlined />}
              style={{ 
                border: '1px solid #e2e8e0', 
                borderRadius: 10,
                fontWeight: 500,
                height: 44
              }}
            >
              {t('common.editProfile')}
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
                    {t('common.performanceOverview')}
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
                      {t('common.totalInterventions')}
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
                      {t('common.completionRate')}
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
                      {t('common.avgRating')}
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
                      {t('common.hoursWorked')}
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
                <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                  {t('common.employmentInformation')}
                </Title>
              }
            >
              <Row gutter={[24, 24]} style={{ marginTop: 8 }}>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    {t('common.employeeId')}
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                    EMP-2023-145
                  </Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    {t('common.department')}
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                    {t('common.fieldOperations')}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4, marginTop: 8 }}>
                    {t('common.specialization')}
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                    {t('common.cropManagementIrrigation')}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4, marginTop: 8 }}>
                    {t('common.bio')}
                  </Text>
                  <Text style={{ color: '#667085', fontSize: 14, lineHeight: 1.6 }}>
                    {t('common.bioDescription')}
                  </Text>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TeamOutlined style={{ color: '#23a045', fontSize: 20 }} />
                  <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                    {t('common.skillsExpertise')}
                  </Title>
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
                    <span style={{ color: '#23a045' }}>{t(`common.${skill}`)}</span>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TeamOutlined style={{ color: '#23a045', fontSize: 20 }} />
                  <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                    {t('common.certificationsTraining')}
                  </Title>
                </div>
              }
            >
              <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size="middle">
                <Card 
                  style={{ 
                    borderRadius: 12, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                >
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
                        {t('common.certifiedAgriculturalTechnician')}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        {t('common.ministryAgricultureMorocco')} • 2022
                      </Text>
                    </div>
                  </div>
                </Card>

                <Card 
                  style={{ 
                    borderRadius: 12, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                >
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
                        {t('common.irrigationSystemsSpecialist')}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        {t('common.internationalIrrigationAssociation')} • 2023
                      </Text>
                    </div>
                  </div>
                </Card>

                <Card 
                  style={{ 
                    borderRadius: 12, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                >
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
                        {t('common.organicFarmingCertification')}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        {t('common.organicAgricultureAssociation')} • 2023
                      </Text>
                    </div>
                  </div>
                </Card>

                <Card 
                  style={{ 
                    borderRadius: 12, 
                    border: '1px solid #e2e8e0',
                    boxShadow: 'none'
                  }}
                >
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
                        {t('common.smartFarmingTechnologies')}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        {t('common.agtechInstitute')} • 2024
                      </Text>
                    </div>
                  </div>
                </Card>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );

  const renderDefaultProfile = () => (
    <div style={{ padding: '24px' }}>
      <Title level={2}>{t('common.myProfile')}</Title>
      <Paragraph>Profile page for {userRole}</Paragraph>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      {(userRole === 'TECHNICIEN' || userRole === 'Agronomist' || userRole === 'FARMER') 
        ? renderTechnicianProfile() 
        : renderDefaultProfile()}
    </div>
  );
};

export default Profile;
