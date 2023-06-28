import React from 'react';
import { MenuUnfoldOutlined,PartitionOutlined, MenuFoldOutlined, FolderOpenOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/y3.jpg';
import { useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {

  const location = useLocation();

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
  const handleAdministrationClick = () => {
    navigate('/administration');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} 
        style={{ position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '200px',
          overflowY: 'auto', /* Permet de faire défiler le contenu du Sider si celui-ci dépasse la hauteur de l'écran */
          backgroundColor: '#001529', /* Couleur de fond du Sider */}}>
  <div className="logo text-center mt-4">
    <img src={logo} alt="Y3 Logo" className="mb-1" style={{ width: "31%", height: "auto", borderRadius: "10px" }} />
    <div className="text-white ">
      <h6>Audit et Conseils</h6>
    </div>
  </div>
  <hr className="text-white" />
  <Menu theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
    >

    <Menu.Item
      key="0"
      icon={<PlusOutlined />}
      style={{
        background: "#81bf41",
        marginLeft: "-10px",
        marginRight: "-0px",
        color: "white",
        textAlign: "center",
      }}
      onClick={handleNouvContratClick}
    >
      Nouveau contrat
    </Menu.Item>

    <hr className="text-white" />

    <Menu.Item key="/dashboard" icon={<PieChartOutlined />} onClick={handleDashboardClick}>
      Tableau de bord
    </Menu.Item>

    <Menu.Item key="/contratheque" icon={<FolderOpenOutlined />} onClick={handleContrathequeClick}>
      Contrathèque
    </Menu.Item>

    <Menu.Item key="/administration" icon={<PartitionOutlined />} onClick={handleAdministrationClick}>
    Administration
  </Menu.Item>
  </Menu>
</Sider>

<Header
  style={{
    position: 'fixed',
    top: 0,
    left: collapsed ? '80px' : '200px',
    right: 0,
    zIndex: 1,
    padding: 0,
    background: colorBgContainer,
    borderBottom: '1px solid #f0f0f0',
    width: '100%',
    transition: 'left 0.1s ease-in-out',
  }}
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
    backgroundColor: "transparent" /* Ajout de la propriété pour enlever le hover background */
  }}
/>
</Header>



    <Content
  style={{
  
    paddingLeft: collapsed ? '140px' : '250px',
    paddingRight: '50px', 
    paddingTop: '90px', 
    minHeight: 'calc(100vh - 70px)', /* Hauteur minimale du Content pour éviter qu'il ne soit trop petit */
    background: 'rgba(245, 245, 255,0.3)',
    overflow: 'visible',
  }}
>
  {children}
</Content>


 
    </Layout>
  );
};

export default MainLayout;
