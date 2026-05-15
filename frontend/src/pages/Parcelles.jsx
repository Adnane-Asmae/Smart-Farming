import { useState } from 'react';
import { Card, Typography, Button, Input, Row, Col, Progress, Tag } from 'antd';
import { SearchOutlined, EnvironmentOutlined, ExperimentOutlined, CloudOutlined, SmileOutlined, TeamOutlined } from '@ant-design/icons';
import useAuthStore from '../stores/useAuthStore';

const { Title, Text, Paragraph } = Typography;

const Parcelles = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';

  const [parcels, setParcels] = useState([
    {
      id: 1,
      name: 'Parcel A-12',
      description: 'North Field Alpha',
      area: '5.2',
      culture: 'Tomatoes',
      soilType: 'Loamy',
      health: 'Excellent',
      moisture: 68,
      irrigationStatus: 'Operational',
      irrigationLast: '2024-05-13',
      coordinates: '33.5731° N, 7.5898° W'
    },
    {
      id: 2,
      name: 'Parcel B-5',
      description: 'East Field Beta',
      area: '8.7',
      culture: 'Wheat',
      soilType: 'Clay',
      health: 'Good',
      moisture: 55,
      irrigationStatus: 'Operational',
      irrigationLast: '2024-05-12',
      coordinates: '33.5735° N, 7.5892° W'
    },
    {
      id: 3,
      name: 'Parcel C-8',
      description: 'South Field Gamma',
      area: '6.5',
      culture: 'Corn',
      soilType: 'Sandy Loam',
      health: 'Fair',
      moisture: 42,
      irrigationStatus: 'Operational',
      irrigationLast: '2024-05-11',
      coordinates: '33.5728° N, 7.5905° W'
    },
    {
      id: 4,
      name: 'Parcel D-3',
      description: 'West Field Delta',
      area: '4.3',
      culture: 'Lettuce',
      soilType: 'Loamy',
      health: 'Excellent',
      moisture: 72,
      irrigationStatus: 'Operational',
      irrigationLast: '2024-05-14',
      coordinates: '33.5733° N, 7.5885° W'
    },
    {
      id: 5,
      name: 'Parcel E-1',
      description: 'Center Field Epsilon',
      area: '7.1',
      culture: 'Barley',
      soilType: 'Sandy',
      health: 'Good',
      moisture: 58,
      irrigationStatus: 'Needs Check',
      irrigationLast: '2024-05-10',
      coordinates: '33.5730° N, 7.5890° W'
    }
  ]);

  const [searchText, setSearchText] = useState('');

  const getHealthTag = (health) => {
    const colors = {
      'Excellent': '#d1fae5',
      'Good': '#dbeafe',
      'Fair': '#fff7ed',
      'Needs Check': '#fee2e2'
    };
    const textColors = {
      'Excellent': '#059669',
      'Good': '#2563eb',
      'Fair': '#ea580c',
      'Needs Check': '#dc2626'
    };
    return (
      <Tag color={colors[health]} style={{ border: 'none' }}>
        <span style={{ color: textColors[health], fontWeight: 500 }}>{health}</span>
      </Tag>
    );
  };

  const getIrrigationStatusTag = (status) => {
    const colors = {
      'Operational': '#d1fae5',
      'Needs Check': '#fff7ed'
    };
    const textColors = {
      'Operational': '#059669',
      'Needs Check': '#ea580c'
    };
    return (
      <Tag color={colors[status]} style={{ border: 'none' }}>
        <span style={{ color: textColors[status], fontWeight: 500 }}>{status}</span>
      </Tag>
    );
  };

  const filteredParcels = parcels.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase()) || 
    item.description.toLowerCase().includes(searchText.toLowerCase()) || 
    item.culture.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderTechnicianParcels = () => (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
            Assigned Parcels
          </Title>
          <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
            View and monitor all your assigned agricultural parcels
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<EnvironmentOutlined />}
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
          View Map
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
          placeholder="Search parcels by ID, name, or crop..." 
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
              Total Parcels
            </Text>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
              {filteredParcels.length}
            </Title>
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
              Total Area
            </Text>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
              {parcels.reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(1)} ha
            </Title>
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
                  Active Crops
                </Text>
                <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
                  {[...new Set(parcels.map(p => p.culture))].length}
                </Title>
              </div>
              <ExperimentOutlined style={{ fontSize: 18, color: '#4a7c59' }} />
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
              Avg. Soil Moisture
            </Text>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontSize: 32 }}>
              {Math.round(parcels.reduce((sum, p) => sum + p.moisture, 0) / parcels.length)}%
            </Title>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filteredParcels.map((parcel) => (
          <Col xs={24} lg={12} key={parcel.id}>
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
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <EnvironmentOutlined style={{ color: '#4a7c59', fontSize: 18 }} />
                    <Title level={4} style={{ margin: 0, color: '#1a1a1a', fontSize: 18 }}>
                      {parcel.name}
                    </Title>
                  </div>
                  <Text style={{ color: '#667085', fontSize: 14 }}>
                    {parcel.description}
                  </Text>
                </div>
                {getHealthTag(parcel.health)}
              </div>

              <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={12}>
                  <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                    Area
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 16, fontWeight: 600 }}>
                    {parcel.area} hectares
                  </Text>
                </Col>
                <Col xs={12}>
                  <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                    Crop
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ExperimentOutlined style={{ color: '#4a7c59' }} />
                    <Text style={{ color: '#1a1a1a', fontSize: 16, fontWeight: 600 }}>
                      {parcel.culture}
                    </Text>
                  </div>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={12}>
                  <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                    Soil Type
                  </Text>
                  <Text style={{ color: '#1a1a1a', fontSize: 15, fontWeight: 500 }}>
                    {parcel.soilType}
                  </Text>
                </Col>
                <Col xs={12}>
                  <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 4 }}>
                    Health
                  </Text>
                  {getHealthTag(parcel.health)}
                </Col>
              </Row>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CloudOutlined style={{ color: '#667085' }} />
                    <Text style={{ color: '#667085', fontSize: 13 }}>
                      Soil Moisture
                    </Text>
                  </div>
                  <Text style={{ color: '#1a1a1a', fontSize: 14, fontWeight: 600 }}>
                    {parcel.moisture}%
                  </Text>
                </div>
                <Progress 
                  percent={parcel.moisture} 
                  strokeColor={parcel.moisture < 50 ? '#ea580c' : '#4a7c59'} 
                  showInfo={false} 
                  style={{ margin: 0 }} 
                />
              </div>

              <div style={{ 
                background: '#f0fdf4', 
                padding: 12, 
                borderRadius: 10, 
                marginBottom: 16 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Text style={{ color: '#1a1a1a', fontSize: 14, fontWeight: 600, display: 'block' }}>
                      Irrigation Status
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12, color: '#667085' }}>
                      Last: {parcel.irrigationLast}
                    </Text>
                  </div>
                  {getIrrigationStatusTag(parcel.irrigationStatus)}
                </div>
              </div>

              <Text style={{ color: '#667085', fontSize: 13, display: 'block', marginBottom: 16 }}>
                {parcel.coordinates}
              </Text>

              <Row gutter={[8, 8]}>
                <Col xs={12}>
                  <Button 
                    block
                    style={{ 
                      border: '1px solid #e2e8e0', 
                      borderRadius: 8,
                      fontWeight: 500
                    }}
                  >
                    View Details
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button 
                    type="primary"
                    block
                    style={{ 
                      background: '#23a045',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 600
                    }}
                  >
                    View Crops
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  const renderAdminParcels = () => (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
        Gestion des parcelles
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        Gérer toutes les parcelles agricoles du système
      </Paragraph>
      <Card>
        <Title level={4}>Admin Parcels Page</Title>
        <Paragraph>This is the admin view for parcels.</Paragraph>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      {(userRole === 'TECHNICIEN' || userRole === 'Agronomist' || userRole === 'FARMER') 
        ? renderTechnicianParcels() 
        : renderAdminParcels()}
    </div>
  );
};

export default Parcelles;
