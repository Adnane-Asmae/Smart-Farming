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

const { Title, Text, Paragraph } = Typography;

const Profile = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';

  const getStatusTag = (status) => {
    return (
      <Tag 
        color="#d1fae5" 
        style={{ border: 'none' }}
      >
        <span style={{ color: '#059669', fontWeight: 500 }}>{status}</span>
      </Tag>
    );
  };

  const renderTechnicianProfile = () => (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
          My Profile
        </Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
          Manage your personal information and view your performance
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
                AT
              </Avatar>
              <Title level={3} style={{ margin: 0, color: '#1a1a1a', fontSize: 24 }}>
                Ahmed Tazi
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
                    ahmed.tazi@smartfarming.ma
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
                      Avg. Rating
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
                <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                  Employment Information
                </Title>
              }
            >
              <Row gutter={[24, 24]} style={{ marginTop: 8 }}>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    Employee ID
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                    EMP-2023-145
                  </Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
                    Department
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                    Field Operations
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4, marginTop: 8 }}>
                    Specialization
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 600 }}>
                    Crop Management & Irrigation
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 4, marginTop: 8 }}>
                    Bio
                  </Text>
                  <Text style={{ color: '#667085', fontSize: 14, lineHeight: 1.6 }}>
                    Experienced agricultural technician specializing in modern farming techniques, crop health monitoring, and precision irrigation systems. Passionate about sustainable agriculture and implementing smart farming solutions.
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
                    Skills & Expertise
                  </Title>
                </div>
              }
            >
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'Crop Management',
                  'Irrigation Systems',
                  'Pest Control',
                  'Soil Analysis',
                  'Machine Operation',
                  'Organic Farming',
                  'Precision Agriculture',
                  'Data Analysis'
                ].map((skill, i) => (
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
                    Certifications & Training
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
                        Certified Agricultural Technician
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        Ministry of Agriculture Morocco • 2022
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
                        Irrigation Systems Specialist
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        International Irrigation Association • 2023
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
                        Organic Farming Certification
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        Organic Agriculture Association • 2023
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
                        Smart Farming Technologies
                      </Title>
                      <Text type="secondary" style={{ fontSize: 14, display: 'block', marginTop: 4 }}>
                        AgTech Institute • 2024
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
      <Title level={2}>My Profile</Title>
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
