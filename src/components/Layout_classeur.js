import React from 'react';
import { MenuUnfoldOutlined,PartitionOutlined, MenuFoldOutlined, FolderOpenOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme,Modal, Form, Input, DatePicker } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/y3.jpg';
import { useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const { TextArea } = Input;

const Layout_Classeur = ({ children }) => {

  const location = useLocation();


    const [collapsed, setCollapsed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
      libelle_dossier: '',
      date_creation: new Date(),
    });
  
    const handleAjout = () => {
      setModalVisible(true);
    };
  
    const handleModalCancel = () => {
      setModalVisible(false);
    };


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleContrathequeClick = () => {
    navigate('/contratheque/');
  };
  const handleDashboardClick = () => {
    navigate('/dashboard/');
  };
  const handleNouvContratClick = () => {
    navigate('/nouveaucontrat/');
  };
  const handleAdministrationClick = () => {
    navigate('/administration/');
  };
  const handleFormSubmit = () => {
    // Effectuez ici la requête POST vers l'URL 127.0.0.1:5000/api/ajoutdossier
    // Utilisez la bibliothèque 'fetch' ou une autre pour effectuer la requête
    fetch('http://127.0.0.1:5000/api/ajoutdossier', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Traitez la réponse si nécessaire
        console.log(data);
        // Fermez le modal après avoir soumis les données avec succès
        setModalVisible(false);
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la soumission du formulaire :', error);
      });
  };
  return (
    <Layout>


        <Header
          style={{
          
            background: colorBgContainer,
            borderBottom: '1px solid #f0f0f0',
            width: '100%',
          
          }}
        >
          <img src={logo} width="50"/>
          <Button
          type="primary"
          onClick={handleAjout}
          
          style={{ marginBottom: 25, background: 'rgba(22, 150, 5, 0.8)',marginLeft:15 }}
        >
          + Nouveau dossier
        </Button>
        <Modal
        title="Nouveau dossier"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit}>
            Enregistrer
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Libellé du dossier">
            <Input
              value={formData.libelle_dossier}
              onChange={(e) => setFormData({ ...formData, libelle_dossier: e.target.value })}
            />
          </Form.Item>

        </Form>
      </Modal>
        </Header>



    <Content
  style={{
  
    paddingLeft: collapsed ? '140px' : '250px',
    paddingRight: '50px', 
    paddingTop: '40px', 
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

export default Layout_Classeur;
