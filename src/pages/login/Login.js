import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Checkbox, Form, Input, Col, Row } from 'antd';
import './Login.css';
import logo from '../../assets/img/y3.jpg';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    navigate('/dashboard');
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
                    message: "Veuillez entrer votre nom d'utilisateur !",
                  },
                ]}
              >
                <Input className='inputLogin' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nom utilisateur" />
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
                  className='inputLogin'
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
