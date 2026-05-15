import { useState } from 'react';
import { Card, Form, Input, Select, Button, Switch, Space, Divider, message, Row, Col, Tag } from 'antd';
import { SaveOutlined, SettingOutlined, BellOutlined, GlobalOutlined, DatabaseOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../api';

const { Option } = Select;

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  const handleSave = async (values) => {
    setLoading(true);
    try {
      await message.success('Paramètres enregistrés avec succès');
    } catch {
      message.error('Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    message.success(`Langue changée en ${lang === 'fr' ? 'Français' : lang === 'en' ? 'Anglais' : lang === 'ar' ? 'Arabe' : 'Amazigh'}`);
  };

  return (
    <div style={{ padding: '24px', background: '#f0fdf4', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        {/* Général */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <SettingOutlined style={{ fontSize: 20, color: '#4a7c59' }} />
                <span style={{ fontSize: 18, fontWeight: 700 }}>Paramètres généraux</span>
              </div>
            }
            style={{ 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: 'none'
            }}
          >
            <Form 
              form={form} 
              layout="vertical" 
              initialValues={{ language: 'fr', notifications: true }}
              onFinish={handleSave}
            >
              <Form.Item
                name="language"
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <GlobalOutlined />
                    <span>Langue de l'interface</span>
                  </div>
                }
              >
                <Select 
                  size="large" 
                  onChange={changeLanguage}
                >
                  <Option value="fr">Français</Option>
                  <Option value="en">English</Option>
                  <Option value="ar">العربية</Option>
                  <Option value="zgh">ⵜⴰⵎⵉⴼⵉⵜ</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="notifications"
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BellOutlined />
                    <span>Notifications</span>
                  </div>
                }
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren="Activées" 
                  unCheckedChildren="Désactivées"
                  style={{ backgroundColor: '#4a7c59' }}
                />
              </Form.Item>

              <Divider style={{ margin: '24px 0' }} />

              <Form.Item style={{ marginBottom: 0 }}>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />} 
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  style={{ 
                    background: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)',
                    border: 'none',
                    borderRadius: 12,
                    height: 48,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(74, 124, 89, 0.3)'
                  }}
                >
                  Enregistrer les paramètres
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Sécurité */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <SecurityScanOutlined style={{ fontSize: 20, color: '#4a7c59' }} />
                <span style={{ fontSize: 18, fontWeight: 700 }}>Sécurité</span>
              </div>
            }
            style={{ 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: 'none'
            }}
          >
            <Form layout="vertical">
              <Form.Item
                label="Mot de passe actuel"
              >
                <Input.Password placeholder="Mot de passe actuel" size="large" />
              </Form.Item>
              <Form.Item
                label="Nouveau mot de passe"
              >
                <Input.Password placeholder="Nouveau mot de passe" size="large" />
              </Form.Item>
              <Form.Item
                label="Confirmer le nouveau mot de passe"
              >
                <Input.Password placeholder="Confirmer le nouveau mot de passe" size="large" />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button 
                  type="primary" 
                  size="large"
                  block
                  style={{ 
                    background: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)',
                    border: 'none',
                    borderRadius: 12,
                    height: 48,
                    fontWeight: 600
                  }}
                >
                  Changer le mot de passe
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Base de données */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
                <DatabaseOutlined style={{ fontSize: 20, color: '#4a7c59' }} />
                <span style={{ fontSize: 18, fontWeight: 700 }}>Base de données</span>
              </div>
            }
            style={{ 
              borderRadius: 16, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: 'none'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Button 
                size="large" 
                block
                style={{ 
                  height: 48,
                  borderRadius: 12,
                  border: '1px solid #4a7c59',
                  color: '#4a7c59'
                }}
              >
                Sauvegarder la base de données
              </Button>
              <Button 
                size="large" 
                block
                style={{ 
                  height: 48,
                  borderRadius: 12,
                  border: '1px solid #4a7c59',
                  color: '#4a7c59'
                }}
              >
                Restaurer la base de données
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
