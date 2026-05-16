import { useState, useEffect } from 'react';
import { Modal, Button, Space, Typography, Card, Row, Col, Progress, Tag } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, StepForwardOutlined, StepBackwardOutlined, CloseOutlined, EnvironmentOutlined, ToolOutlined, TruckOutlined, CloudOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const { Title, Text, Paragraph } = Typography;

const scenes = [
  {
    id: 1,
    title: 'Smart Farming',
    subtitle: 'L’agriculture connectée au service de votre exploitation',
    description: 'Gérez votre exploitation agricole avec une plateforme moderne et intuitive.',
    icon: 'logo',
    duration: 4000
  },
  {
    id: 2,
    title: 'Gestion des Parcelles',
    subtitle: 'Suivi intelligent de vos terrains',
    description: 'Visualisez et gérez toutes vos parcelles agricoles en temps réel.',
    icon: 'parcels',
    duration: 4000
  },
  {
    id: 3,
    title: 'Gestion des Cultures',
    subtitle: 'Suivi de la croissance et productivité',
    description: 'Analysez la croissance de vos cultures et optimisez votre rendement.',
    icon: 'crops',
    duration: 4000
  },
  {
    id: 4,
    title: 'Machines Agricoles',
    subtitle: 'Gestion de votre parc matériel',
    description: 'Suivez l’état et la disponibilité de vos tracteurs et équipements.',
    icon: 'machines',
    duration: 4000
  },
  {
    id: 5,
    title: 'Irrigation Intelligente',
    subtitle: 'Capteurs IoT et contrôle automatique',
    description: 'Optimisez l’irrigation grâce à des capteurs de humidité du sol connectés.',
    icon: 'irrigation',
    duration: 4000
  },
  {
    id: 6,
    title: 'Demandes d’Intervention',
    subtitle: 'Collaboration Agriculteur-Technicien',
    description: 'Envoyez et gérez vos demandes d’intervention rapidement.',
    icon: 'interventions',
    duration: 4000
  },
  {
    id: 7,
    title: 'Tableau de Bord',
    subtitle: 'Statistiques et Rapports',
    description: 'Visualisez vos données avec des graphiques interactifs et rapports détaillés.',
    icon: 'dashboard',
    duration: 4000
  },
  {
    id: 8,
    title: 'Smart Farming',
    subtitle: 'L’agriculture connectée au service de votre exploitation',
    description: 'Transformez votre exploitation avec la technologie agricole moderne.',
    icon: 'closing',
    duration: 5000
  }
];

const irrigationSensorData = [
  { time: '6h', moisture: 68 },
  { time: '9h', moisture: 59 },
  { time: '12h', moisture: 47 },
  { time: '15h', moisture: 39 },
  { time: '18h', moisture: 54 },
  { time: '21h', moisture: 63 }
];

const cropYieldData = [
  { month: 'Jan', wheat: 52, tomatoes: 48, corn: 35 },
  { month: 'Fév', wheat: 58, tomatoes: 52, corn: 40 },
  { month: 'Mar', wheat: 62, tomatoes: 56, corn: 45 },
  { month: 'Avr', wheat: 68, tomatoes: 62, corn: 52 },
  { month: 'Mai', wheat: 72, tomatoes: 68, corn: 58 }
];

const COLORS = ['#4a7c59', '#66bb6a', '#81c784', '#a5d6a7'];

export const PromoVideo = ({ open, onClose }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [moistureLevel, setMoistureLevel] = useState(65);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      } else {
        setCurrentScene(0);
      }
    }, scenes[currentScene].duration);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const moistureTimer = setInterval(() => {
      setMoistureLevel(prev => {
        let newVal = prev + (Math.random() * 6 - 3);
        return Math.max(20, Math.min(90, newVal));
      });
    }, 500);

    return () => clearInterval(moistureTimer);
  }, [isPlaying]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => setCurrentScene(prev => prev < scenes.length - 1 ? prev + 1 : 0);
  const handlePrev = () => setCurrentScene(prev => prev > 0 ? prev - 1 : scenes.length - 1);

  const renderSceneContent = () => {
    const scene = scenes[currentScene];
    
    switch (scene.icon) {
      case 'logo':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ 
              fontSize: 64, 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 20
            }}>
              🌾 Smart Farming
            </div>
            <Title level={3} style={{ color: '#1a1a1a' }}>{scene.subtitle}</Title>
          </div>
        );
      
      case 'parcels':
        return (
          <Row gutter={24} justify="center">
            <Col xs={24} md={12}>
              <Card style={{ borderRadius: 16, border: 'none', background: '#f0fdf4' }}>
                <EnvironmentOutlined style={{ fontSize: 48, color: '#4a7c59', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#1a1a1a' }}>12 Parcelles</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>Gérées intelligemment</Text>
                <Progress percent={85} strokeColor="#4a7c59" />
              </Card>
            </Col>
          </Row>
        );
      
      case 'crops':
        return (
          <Row gutter={24} justify="center">
            <Col xs={24} md={16}>
              <Card style={{ borderRadius: 16, border: 'none', background: '#f0fdf4' }}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={cropYieldData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e0" />
                    <XAxis dataKey="month" stroke="#667085" />
                    <YAxis stroke="#667085" />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                    <Line type="monotone" dataKey="wheat" stroke="#4a7c59" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="tomatoes" stroke="#66bb6a" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="corn" stroke="#81c784" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        );
      
      case 'machines':
        return (
          <Row gutter={24} justify="center">
            <Col xs={24} md={12}>
              <Card style={{ borderRadius: 16, border: 'none', background: '#f0fdf4' }}>
                <TruckOutlined style={{ fontSize: 48, color: '#2385bb', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#1a1a1a' }}>8 Machines</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
                  <Tag color="success">6 Disponibles</Tag>
                  <Tag color="processing">2 En maintenance</Tag>
                </div>
              </Card>
            </Col>
          </Row>
        );
      
      case 'irrigation':
        return (
          <Row gutter={24} justify="center">
            <Col xs={24} md={12}>
              <Card style={{ borderRadius: 16, border: 'none', background: '#f0fdf4' }}>
                <CloudOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#1a1a1a' }}>Humidité du sol</Title>
                <Progress 
                  type="circle" 
                  percent={Math.round(moistureLevel)} 
                  strokeColor={moistureLevel < 40 ? '#ea580c' : moistureLevel < 60 ? '#23a045' : '#1890ff'}
                  format={percent => `${percent}%`}
                />
                <div style={{ marginTop: 24 }}>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={irrigationSensorData}>
                      <XAxis dataKey="time" stroke="#667085" fontSize={10} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                      <Line type="monotone" dataKey="moisture" stroke="#1890ff" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        );
      
      case 'interventions':
        return (
          <Row gutter={24} justify="center">
            <Col xs={24} md={12}>
              <Card style={{ borderRadius: 16, border: 'none', background: '#f0fdf4' }}>
                <TeamOutlined style={{ fontSize: 48, color: '#f59e0b', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#1a1a1a' }}>5 Interventions</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
                  <Tag color="success">2 Complétées</Tag>
                  <Tag color="processing">2 En cours</Tag>
                  <Tag color="warning">1 En attente</Tag>
                </div>
              </Card>
            </Col>
          </Row>
        );
      
      case 'dashboard':
        return (
          <Row gutter={24} justify="center">
            <Col xs={24} md={16}>
              <Card style={{ borderRadius: 16, border: 'none', background: '#f0fdf4' }}>
                <Row gutter={16}>
                  <Col xs={12}>
                    <Card size="small" style={{ borderRadius: 10, border: 'none' }}>
                      <BarChartOutlined style={{ fontSize: 24, color: '#4a7c59' }} />
                      <div style={{ fontWeight: 700, marginTop: 8, fontSize: 24 }}>89%</div>
                      <Text type="secondary" style={{ fontSize: 12 }}>Rendement</Text>
                    </Card>
                  </Col>
                  <Col xs={12}>
                    <Card size="small" style={{ borderRadius: 10, border: 'none' }}>
                      <EnvironmentOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                      <div style={{ fontWeight: 700, marginTop: 8, fontSize: 24 }}>65%</div>
                      <Text type="secondary" style={{ fontSize: 12 }}>Humidité</Text>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        );
      
      case 'closing':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ 
              fontSize: 64, 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 20
            }}>
              🌾 Smart Farming
            </div>
            <Title level={3} style={{ color: '#1a1a1a' }}>{scene.subtitle}</Title>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      styles={{ 
        mask: { background: 'rgba(0, 0, 0, 0.85)' },
        content: { borderRadius: 20, overflow: 'hidden' }
      }}
      closeIcon={<CloseOutlined style={{ fontSize: 20, color: '#fff', zIndex: 1000 }} />}
    >
      <div style={{ 
        background: 'linear-gradient(180deg, #f6faf4 0%, #e8f5e9 100%)',
        minHeight: 500,
        padding: 32,
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#1a1a1a', marginBottom: 8 }}>
            {scenes[currentScene].title}
          </Title>
          <Title level={4} style={{ color: '#4a7c59', marginBottom: 16 }}>
            {scenes[currentScene].subtitle}
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            {scenes[currentScene].description}
          </Paragraph>
        </div>

        <div style={{ marginBottom: 32 }}>
          {renderSceneContent()}
        </div>

        <div style={{ 
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 400
        }}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
              {scenes.map((_, i) => (
                <div 
                  key={i}
                  style={{ 
                    width: i === currentScene ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === currentScene ? '#4a7c59' : '#d1d5db',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => { setCurrentScene(i); setIsPlaying(false); }}
                />
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Button 
                type="text" 
                icon={<StepBackwardOutlined />} 
                onClick={handlePrev}
                style={{ fontSize: 20, color: '#4a7c59' }}
              />
              <Button 
                type="primary"
                shape="circle"
                size="large"
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={handlePlayPause}
                style={{ 
                  background: '#4a7c59',
                  border: 'none',
                  fontSize: 24,
                  width: 56,
                  height: 56
                }}
              />
              <Button 
                type="text" 
                icon={<StepForwardOutlined />} 
                onClick={handleNext}
                style={{ fontSize: 20, color: '#4a7c59' }}
              />
            </div>
          </Space>
        </div>
      </div>
    </Modal>
  );
};
