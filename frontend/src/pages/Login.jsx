import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Checkbox, Radio } from 'antd';
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import './Login.css';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('FARMER');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const rtlLanguages = ['ar', 'zgh'];
    setIsRTL(rtlLanguages.includes(i18n.language));
  }, [i18n.language]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Connexion réussie !');
      navigate('/dashboard');
    } catch (error) {
      message.error(error.response?.data?.detail || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div style={{
        position: 'absolute',
        top: '24px',
        [isRTL ? 'left' : 'right']: '24px',
        zIndex: 100
      }}>
        <LanguageSwitcher />
      </div>
      
      <div className="login-card">
        <h1 className="login-title">{t('common.login')}</h1>
        <p className="login-subtitle">
          {t('common.welcomeBack')}, {t('common.loginToAccount')}
        </p>
        
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: t('common.email') + '!' }, { type: 'email', message: 'Email invalide!' }]}
          >
            <Input 
              placeholder={t('common.email')} 
              prefix={<UserOutlined />}
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('common.password') + '!' }]}
          >
            <Input.Password 
              placeholder={t('common.password')}
              prefix={<EyeOutlined />}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Radio.Group 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="role-radio-group"
            >
              <Radio.Button value="ADMIN">{t('common.admin').toUpperCase()}</Radio.Button>
              <Radio.Button value="TECHNICIEN">{t('common.agronomist').toUpperCase()}</Radio.Button>
              <Radio.Button value="FARMER">{t('common.farmer').toUpperCase()}</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="remember-checkbox">{t('common.rememberMe')}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              className="login-button"
            >
              {t('common.login')}
            </Button>
          </Form.Item>
        </Form>

        <p className="signup-link">
          {t('common.dontHaveAccount')} <a href="#">{t('common.signup')}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
