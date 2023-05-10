import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, FolderOpenOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/y3.jpg';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleContrathequeClick = () => {
    navigate('/contratheque');
  };
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  const handleNouvContratClick = () => {
    navigate('/nouveaucontrat');
  };

  return (
    <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
        <div className="logo text-center mt-2 ">
          <img src={logo} alt="Y3 Logo" className='mb-1' style={{ width: '31%', height: 'auto',borderRadius:'10px' }} />
          <p className='text-white '><h6>Audit et Conseils</h6></p>
        </div>
        <hr className='text-white'/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item
              key='0'
              icon={<PlusOutlined />}
           
              style= {{ 
                background: '#81bf41',  
              marginLeft: '-10px',
              marginRight: '-0px', 
              color: 'white', 
              textAlign: 'center',
              }}
              onClick={handleNouvContratClick}
            > 

            Nouveau contrat

          </Menu.Item>

          <hr className='text-white'/>

          <Menu.Item key="1" icon={<PieChartOutlined />}
            onClick={handleDashboardClick}>
            Tableau de bord
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<FolderOpenOutlined />}
            onClick={handleContrathequeClick}
          >
            Contrathèque
          </Menu.Item>
  

          </Menu>
      </Sider>
      <Layout>
      <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className='border-bottom'
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Header>
        <Content
         style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
            background: 'rgba(245, 245, 255,0.3)',
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
