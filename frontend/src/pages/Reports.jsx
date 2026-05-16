import { useState } from 'react';
import { Table, Button, Space, Card, message, Select, DatePicker, Row, Col, Typography } from 'antd';
import { FileTextOutlined, DownloadOutlined, PlusOutlined, CalendarOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const Reports = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState([
    { id: 1, nom: 'Rapport mensuel - Avril 2024', type: 'Mensuel', date: '01/05/2024', taille: '2.4 MB' },
    { id: 2, nom: 'Rapport hebdomadaire - S19', type: 'Hebdomadaire', date: '12/05/2024', taille: '1.2 MB' },
    { id: 3, nom: 'Rapport annuel 2023', type: 'Annuel', date: '15/01/2024', taille: '8.7 MB' },
  ]);

  const handleGenerate = () => {
    message.success(t('common.reportGenerated'));
  };

  const handleDownload = (record) => {
    message.success(`${t('common.downloading')} ${record.nom}...`);
  };

  const columns = [
    {
      title: t('common.reportName'),
      dataIndex: 'nom',
      key: 'nom',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileTextOutlined style={{ color: '#c43a31', fontSize: 20 }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      ),
    },
    {
      title: t('common.type'),
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Text type="secondary" style={{ fontSize: 14 }}>{text}</Text>
    },
    {
      title: t('common.generationDate'),
      dataIndex: 'date',
      key: 'date',
      render: (text) => <Text type="secondary" style={{ fontSize: 14 }}>{text}</Text>
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
      width: 200,
      render: (_unused, record) => (
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
    </div>
  );
};

export default Reports;
