import { useState } from 'react';
import { Card, Typography, Button, Input, Row, Col, Progress, Tag } from 'antd';
import { SearchOutlined, EnvironmentOutlined, ExperimentOutlined, CalendarOutlined, ArrowUpOutlined, SmileOutlined } from '@ant-design/icons';
import useAuthStore from '../stores/useAuthStore';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;

const Cultures = () => {
  const { user } = useAuthStore();
  const userRole = user?.role || 'FARMER';
  const { t } = useTranslation();

  const [crops, setCrops] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      variety: 'Roma VF',
      parcel: 'Parcel A-12',
      health: 'Excellent',
      healthScore: 9.2,
      growthProgress: 65,
      growthStage: 'Flowering',
      plantingDate: '2024-03-15',
      expectedHarvest: '2024-06-20',
      expectedYield: '12.5 tons'
    },
    {
      id: 2,
      name: 'Wheat',
      variety: 'Durum',
      parcel: 'Parcel B-5',
      health: 'Good',
      healthScore: 8.5,
      growthProgress: 75,
      growthStage: 'Grain Filling',
      plantingDate: '2024-01-20',
      expectedHarvest: '2024-06-10',
      expectedYield: '4.2 tons'
    },
    {
      id: 3,
      name: 'Corn',
      variety: 'Hybrid 335',
      parcel: 'Parcel C-8',
      health: 'Fair',
      healthScore: 7.1,
      growthProgress: 40,
      growthStage: 'Vegetative',
      plantingDate: '2024-04-10',
      expectedHarvest: '2024-08-25',
      expectedYield: '8.7 tons'
    },
    {
      id: 4,
      name: 'Lettuce',
      variety: 'Iceberg',
      parcel: 'Parcel D-3',
      health: 'Excellent',
      healthScore: 9.8,
      growthProgress: 90,
      growthStage: 'Harvest Ready',
      plantingDate: '2024-03-25',
      expectedHarvest: '2024-05-20',
      expectedYield: '3.1 tons'
    },
    {
      id: 5,
      name: 'Barley',
      variety: 'Six-Row',
      parcel: 'Parcel E-1',
      health: 'Good',
      healthScore: 8.2,
      growthProgress: 55,
      growthStage: 'Heading',
      plantingDate: '2024-02-05',
      expectedHarvest: '2024-07-05',
      expectedYield: '3.8 tons'
    }
  ]);

  const [searchText, setSearchText] = useState('');

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

  const getGrowthStageTag = (stage) => {
    const colors = {
      'Vegetative': '#eff6ff',
      'Flowering': '#f3e8ff',
      'Grain Filling': '#f0fdf4',
      'Heading': '#fff7ed',
      'Harvest Ready': '#dbeafe'
    };
    const textColors = {
      'Vegetative': '#2563eb',
      'Flowering': '#7c3aed',
      'Grain Filling': '#059669',
      'Heading': '#ea580c',
      'Harvest Ready': '#2563eb'
    };
    const stageKey = stage === 'Vegetative' ? 'vegetative' :
                    stage === 'Flowering' ? 'flowering' :
                    stage === 'Grain Filling' ? 'grainFilling' :
                    stage === 'Heading' ? 'heading' :
                    'harvestReady';
    return (
      <Tag color={colors[stage]} style={{ border: 'none' }}>
        <span style={{ color: textColors[stage], fontWeight: 500 }}>{t(`common.${stageKey}`)}</span>
      </Tag>
    );
  };

  const filteredCrops = crops.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase()) || 
    item.variety.toLowerCase().includes(searchText.toLowerCase()) || 
    item.parcel.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderTechnicianCrops = () => (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>
            {t('common.cropManagement')}
          </Title>
          <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
            {t('common.monitorCropHealth')}
          </Paragraph>
        </div>
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
                      {crop.name}
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
                  {getGrowthStageTag(crop.growthStage)}
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
                      {crop.plantingDate}
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
                      {crop.expectedHarvest}
                    </Text>
                  </div>
                </Col>
              </Row>

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
                    {t('common.viewDetails')}
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
                    {t('common.addObservation')}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  const renderAdminCrops = () => (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8, color: '#1a1a1a' }}>
        {t('common.manageCrops')}
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        {t('common.manageCropTypes')}
      </Paragraph>
      <Card>
        <Title level={4}>{t('common.adminCropsPage')}</Title>
        <Paragraph>{t('common.thisIsAdminViewCrops')}</Paragraph>
      </Card>
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
