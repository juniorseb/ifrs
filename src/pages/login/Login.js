import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Checkbox, Form, Input, Col, Row, notification } from 'antd';
import './Login.css';
import logo from '../../assets/img/y3.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', values);
  
      if (response.status === 200) {
        const token = response.data.token;
  
        // Calculer la date d'expiration du token (4 heures à partir de maintenant)
        const expirationDate = new Date();
        
        expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000); // 4 heures en millisecondes

        // Stocker le token et la date d'expiration dans les cookies
        Cookies.set('token', token, { expires: expirationDate });
        Cookies.set('tokenExpiration', expirationDate.toISOString(), { expires: expirationDate });

        // Rediriger vers le dashboard
        navigate('/dashboard');

      } else {
        notification.error({
          message: 'Erreur de connexion',
          description: 'Une erreur est survenue lors de la connexion.',
          duration: 3,
        });
      }
    } catch (error) {
      if (error.response) {
        notification.error({
          message: 'Erreur de connexion',
          description: error.response.data.message || 'Une erreur est survenue lors de la connexion.',
          duration: 3,
        });
      } else {
        notification.error({
          message: 'Erreur de connexion',
          description: 'Une erreur est survenue lors de la connexion.',
          duration: 3,
        });
      }
    }
  };
  
  

  return (
    <div className="login-container">
      <Card
        bordered={true}
        className="login-card border border"
        cover={
          <div className="header-image-container text-center">
            <img alt="example" src={logo} className="header-image" />
          </div>
        }
      >
        <h2 className="login-card-title">Connexion</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez entrer votre nom d\'utilisateur !',
                  },
                ]}
              >
                <Input className="inputLogin" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nom utilisateur" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez entrer votre mot de passe!',
                  },
                ]}
              >
                <Input
                  className="inputLogin"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mot de passe"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Se souvenir</Checkbox>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Se connecter
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
