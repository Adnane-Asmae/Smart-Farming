import { useState } from 'react';
import { Table, Button, Space, Card, message, Select, DatePicker, Row, Col, Typography, Modal, Tag, Descriptions, Divider } from 'antd';
import { FileTextOutlined, DownloadOutlined, PlusOutlined, CalendarOutlined, FilterOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/date';
import { getReportName } from '../utils/reportNames';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Reports = () => {
  const { t, i18n } = useTranslation();
  
  const [reports, setReports] = useState([
    { 
      id: 1, 
      type: 'monthly', 
      month: 4, 
      year: 2024, 
      date: '2024-05-01', 
      taille: '2.4 MB',
      data: {
        cropsHarvested: 12,
        waterConsumed: 1240,
        interventions: 45,
        yield: 89,
        topCrops: ['Tomatoes', 'Wheat', 'Lettuce'],
        avgSoilMoisture: 58
      }
    },
    { 
      id: 2, 
      type: 'weekly', 
      week: 19, 
      year: 2024, 
      date: '2024-05-12', 
      taille: '1.2 MB',
      data: {
        cropsHarvested: 3,
        waterConsumed: 280,
        interventions: 12,
        yield: 21,
        topCrops: ['Tomatoes'],
        avgSoilMoisture: 62
      }
    },
    { 
      id: 3, 
      type: 'annual', 
      year: 2023, 
      date: '2024-01-15', 
      taille: '8.7 MB',
      data: {
        cropsHarvested: 145,
        waterConsumed: 14880,
        interventions: 520,
        yield: 1050,
        topCrops: ['Tomatoes', 'Wheat', 'Corn', 'Lettuce', 'Barley'],
        avgSoilMoisture: 55
      }
    },
  ]);

  const [viewReportVisible, setViewReportVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleGenerate = () => {
    const newReport = {
      id: Date.now(),
      type: 'weekly',
      week: 20,
      year: 2024,
      date: new Date().toISOString().split('T')[0],
      taille: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      data: {
        cropsHarvested: Math.floor(Math.random() * 10),
        waterConsumed: Math.floor(Math.random() * 500),
        interventions: Math.floor(Math.random() * 20),
        yield: Math.floor(Math.random() * 30),
        topCrops: ['Tomatoes', 'Corn'],
        avgSoilMoisture: Math.floor(Math.random() * 40 + 40)
      }
    };
    setReports([newReport, ...reports]);
    message.success(t('common.reportGenerated'));
  };

  const handleDownload = (record) => {
    message.success(`${t('common.downloading')} ${getReportName(record, i18n.language)}...`);
  };

  const handleViewReport = (record) => {
    setSelectedReport(record);
    setViewReportVisible(true);
  };

  const columns = [
    {
      title: t('common.reportName'),
      dataIndex: 'type',
      key: 'nom',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileTextOutlined style={{ color: '#c43a31', fontSize: 20 }} />
          <span style={{ fontWeight: 500 }}>{getReportName(record, i18n.language)}</span>
        </div>
      ),
    },
    {
      title: t('common.type'),
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag 
          color={type === 'monthly' ? '#dbeafe' : type === 'weekly' ? '#d1fae5' : '#f3e8ff'}
          style={{ border: 'none' }}
        >
          {t(`reports.${type}`)}
        </Tag>
      ),
    },
    {
      title: t('common.generationDate'),
      dataIndex: 'date',
      key: 'date',
      render: (date) => <Text type="secondary" style={{ fontSize: 14 }}>{formatDate(date, i18n.language)}</Text>
    },
    {
      title: t('common.size'),
      dataIndex: 'taille',
      key: 'taille',
      render: (text) => <Text type="secondary" style={{ fontSize: 14 }}>{text}</Text>
    },
    {
      title: t('common.actions'),
      key: 'actions',
      fixed: 'right',
      width: 220,
      render: (_unused, record) => (
        <Space size="small" orientation="horizontal">
          <Button 
            icon={<EyeOutlined />}
            onClick={() => handleViewReport(record)}
          >
            View
          </Button>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
            style={{ 
              background: '#2d5a3d',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600
            }}
          >
            {t('common.downloadPdf')}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f6faf4', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#1a1a1a' }}>{t('common.reportsPdf')}</Title>
            <Paragraph type="secondary" style={{ margin: '8px 0 0', fontSize: 15 }}>
              {t('common.generateDownloadReports')}
            </Paragraph>
          </div>
          <Button 
            type="primary" 
            icon={<FileTextOutlined />}
            onClick={handleGenerate}
            size="large"
            style={{ 
              background: '#2d5a3d',
              border: 'none',
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              height: 48
            }}
          >
            {t('common.generateNewReport')}
          </Button>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 24 } }}
              hoverable
            >
              <FileTextOutlined style={{ fontSize: 36, color: '#333', marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{t('common.reportsPdf')}</div>
              <div style={{ fontSize: 13, color: '#667085' }}>{t('common.weekly')}</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 24 } }}
              hoverable
            >
              <FileTextOutlined style={{ fontSize: 36, color: '#4a7c59', marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{t('common.reportsPdf')}</div>
              <div style={{ fontSize: 13, color: '#667085' }}>{t('common.monthly')}</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 24 } }}
              hoverable
            >
              <FileTextOutlined style={{ fontSize: 36, color: '#2385bb', marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{t('common.reportsPdf')}</div>
              <div style={{ fontSize: 13, color: '#667085' }}>{t('common.annual')}</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none' }}
              styles={{ body: { padding: 24 } }}
              hoverable
            >
              <FileTextOutlined style={{ fontSize: 36, color: '#f59e0b', marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{t('common.reportsPdf')}</div>
              <div style={{ fontSize: 13, color: '#667085' }}>{t('common.custom')}</div>
            </Card>
          </Col>
        </Row>

        <Card 
          style={{ borderRadius: 10, border: '1px solid #e2e8e0', boxShadow: 'none', marginBottom: 24 }}
          styles={{ body: { padding: 20 } }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Text style={{ fontSize: 14, fontWeight: 500, color: '#667085', display: 'block', marginBottom: 8 }}>{t('common.period')}</Text>
              <RangePicker 
                style={{ width: '100%', height: 44 }}
                size="large"
                placeholder={[t('common.startDate'), t('common.endDate')]}
              />
            </Col>
            <Col xs={24} md={4}>
              <Text style={{ fontSize: 14, fontWeight: 500, color: '#667085', display: 'block', marginBottom: 8 }}>{t('common.type')}</Text>
              <Select 
                style={{ width: '100%', height: 44 }}
                size="large"
                placeholder={t('common.allReports')}
              >
                <Option value="all">{t('common.allReports')}</Option>
                <Option value="weekly">{t('common.weekly')}</Option>
                <Option value="monthly">{t('common.monthly')}</Option>
                <Option value="annual">{t('common.annual')}</Option>
              </Select>
            </Col>
            <Col xs={24} md={3}>
              <Text style={{ fontSize: 14, fontWeight: 500, color: '#667085', display: 'block', marginBottom: 8 }}>&nbsp;</Text>
              <Button 
                type="text"
                icon={<FilterOutlined />}
                style={{ width: '100%', height: 44, fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}
              >
                {t('common.filter')}
              </Button>
            </Col>
          </Row>
        </Card>
      </div>

      <Card
        style={{ 
          borderRadius: 10, 
          border: '1px solid #e2e8e0',
          boxShadow: 'none'
        }}
      >
        <Table
          columns={columns}
          dataSource={reports}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedReport ? getReportName(selectedReport, i18n.language) : 'Report'}
        open={viewReportVisible}
        onCancel={() => setViewReportVisible(false)}
        footer={[
          <Button key="download" type="primary" onClick={() => handleDownload(selectedReport)}>
            <DownloadOutlined /> Download PDF
          </Button>
        ]}
        width={800}
      >
        {selectedReport && selectedReport.data && (
          <div style={{ marginTop: 16 }}>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Report Type">
                <Tag color={selectedReport.type === 'monthly' ? '#dbeafe' : selectedReport.type === 'weekly' ? '#d1fae5' : '#f3e8ff'}>
                  {t(`reports.${selectedReport.type}`)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Generated Date">
                {formatDate(selectedReport.date, i18n.language)}
              </Descriptions.Item>
              <Descriptions.Item label="Crops Harvested">
                <span style={{ fontWeight: 600, fontSize: 16 }}>{selectedReport.data.cropsHarvested}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Water Consumed">
                <span style={{ fontWeight: 600, fontSize: 16 }}>{selectedReport.data.waterConsumed} m³</span>
              </Descriptions.Item>
              <Descriptions.Item label="Interventions">
                <span style={{ fontWeight: 600, fontSize: 16 }}>{selectedReport.data.interventions}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Total Yield">
                <span style={{ fontWeight: 600, fontSize: 16 }}>{selectedReport.data.yield} tons</span>
              </Descriptions.Item>
              <Descriptions.Item label="Average Soil Moisture" span={2}>
                <span style={{ fontWeight: 600, fontSize: 16, color: selectedReport.data.avgSoilMoisture < 40 ? '#c43a31' : '#4a7c59' }}>
                  {selectedReport.data.avgSoilMoisture}%
                </span>
              </Descriptions.Item>
            </Descriptions>
            
            <Divider style={{ margin: '24px 0' }} />
            
            <div>
              <Title level={4} style={{ marginBottom: 12 }}>Top Crops</Title>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {selectedReport.data.topCrops.map((crop, i) => (
                  <Tag 
                    key={i} 
                    color="#f0fdf4" 
                    style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500 }}
                  >
                    {crop}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reports;
