import { Card, notification, Table, Modal, Form, Input, Button, Popconfirm,Row,Col } from 'antd';
import { useState,useEffect } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Preneur = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPreneur, setSelectedPreneur] = useState(null);
    const [form] = Form.useForm(); // Ajout de la référence au formulaire
    const [currentPage, setCurrentPage] = useState(1);

// Declare the data state variable using useState
const [data, setData] = useState([]);

// Function to fetch the initial data from the backend
const fetchInitialData = async () => {
  try {
    const response = await fetch('http://127.0.0.7:5000/api/preneurs');
    if (response.ok) {
      const initialData = await response.json();
      setData(initialData);
      console.log('Initial data fetched successfully');
    } else {
      console.log('Failed to fetch initial data');
    }
  } catch (error) {
    console.error('Error occurred while fetching initial data', error);
  }
};

// Fetch the initial data when the component mounts
useEffect(() => {
  fetchInitialData();
}, []);

 // Configuration des colonnes de la table
 const columns = [
    
    { title: 'Code Preneur', dataIndex: 'Code_preneur', key: 'Code_preneur' },
    { title: 'Nom Preneur', dataIndex: 'Nom_Preneur', key: 'Nom_Preneur' },
    { title: 'Secteur opérationnel', dataIndex: 'Secteur_opérationnel', key: 'Secteur_opérationnel' },
    { title: 'Pays', dataIndex: 'Pays', key: 'Pays' },
    { title: 'Taux BIC', dataIndex: 'Taux_BIC', key: 'Taux_BIC' },
    { title: '% Groupe', dataIndex: 'pourc_Groupe', key: 'pourc_Groupe' },
    { title: 'Tx Financement', dataIndex: 'Tx_Financement', key: 'Tx_Financement' },
    { title: 'Véhicules', dataIndex: 'Vehicules', key: 'Vehicules' },
    { title: 'Terrain', dataIndex: 'Terrain', key: 'Terrain' },
    { title: 'Constructions', dataIndex: 'Constructions', key: 'Constructions' },
    { title: 'Machines', dataIndex: 'Machines', key: 'Machines' },
    { title: 'Matériel informatique', dataIndex: 'Materiel_informatique', key: 'Materiel_informatique' },
    { title: 'Autres', dataIndex: 'Autres', key: 'Autres' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet élément ?"
            onConfirm={() => handleDelete(record.id_preneur)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedPreneur(null);
    form.resetFields(); // Réinitialisation du formulaire
  };

  const handleEdit = (record) => {
    setSelectedPreneur(record);
    setIsModalVisible(true);
    form.setFieldsValue(record); // Mise à jour des valeurs initiales du formulaire
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


// Function to send data to the backend (Ajout)
const sendDataToBackend = async (dataPreneur) => {
  console.log(dataPreneur);
  try {
    const response = await fetch('http://127.0.0.7:5000/api/ajoutpreneur', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPreneur),
    });

    if (response.ok) {
      console.log('Data sent successfully');

      // Update the data variable with the newPreneur
      const newPreneur = await response.json();
      setData([...data, newPreneur]);

      // Handle success response
    } else {
      console.log('Failed to send data');
      // Handle error response
    }
  } catch (error) {
    console.error('Error occurred while sending data', error);
    // Handle network or other errors
  }
};


// Update preneur (Modifier)
const updatePreneurData = async (updatedPreneur) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/updatepreneur/${updatedPreneur.id_preneur}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPreneur),
    });

    console.log(updatedPreneur)
    if (response.ok) {
      return true;
    } else {
      console.log('Failed to update preneur data');
      return false;
    }
  } catch (error) {
    console.error('Error occurred while updating preneur data', error);
    return false;
  }
};


//Supprimer un preneur
const removePreneur = async (preneurId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/removepreneur/${preneurId}`, {
      method: 'PUT',
    });

    if (response.ok) {
      return true;
    } else {
      console.log('Failed to remove preneur');
      return false;
    }
  } catch (error) {
    console.error('Error occurred while removing preneur', error);
    return false;
  }
};

  const onFinish = async (values) => {
    if (selectedPreneur) {
      const updatedPreneur = {
        ...selectedPreneur,
        Code_preneur: values.Code_preneur,
        Nom_Preneur: values.Nom_Preneur,
        Secteur_opérationnel: values.Secteur_opérationnel,
        Pays: values.Pays,
        Taux_BIC: values.Taux_BIC,
        pourc_Groupe: values.pourc_Groupe,
        Tx_Financement: values.Tx_Financement,
        Vehicules: values.Vehicules,
        Terrain: values.Terrain,
        Constructions: values.Constructions,
        Machines: values.Machines,
        Materiel_informatique: values.Materiel_informatique,
        Autres: values.Autres,
      };
      const isSuccess = await updatePreneurData(updatedPreneur);

      if (isSuccess) {

      setData(data.map((item) => (item.id_preneur === selectedPreneur.id_preneur ? updatedPreneur : item)));
      
      notification.success({
        message: 'Mise à jour validée',
        duration: 3, // Durée d'affichage de la notification en secondes
      });
    }else {
      notification.error({
        message: 'Échec de la mise à jour',
        duration: 3,
      });
    }
    } else {
      const newPreneur = {
        id_preneur: data.length + 1,
        Code_preneur: values.Code_preneur,
        Nom_Preneur: values.Nom_Preneur,
        Secteur_opérationnel: values.Secteur_opérationnel,
        Pays: values.Pays,
        Taux_BIC: values.Taux_BIC,
        pourc_Groupe: values.pourc_Groupe,
        Tx_Financement: values.Tx_Financement,
        Vehicules: values.Vehicules,
        Terrain: values.Terrain,
        Constructions: values.Constructions,
        Machines: values.Machines,
        Materiel_informatique: values.Materiel_informatique,
        Autres: values.Autres,
      };
      sendDataToBackend(newPreneur);
      setData([...data, newPreneur]);
     

      
      notification.success({
        message: 'Ajout validé',
        duration: 3, // Durée d'affichage de la notification en secondes
      });

      const totalPages = Math.ceil((data.length + 1) / 3);
      setCurrentPage(totalPages);
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    removePreneur(id)
    setData(data.filter((item) => item.id_preneur !== id));
  };
  const cardHeadStyleStat = {
    color: "white",
     background: "#0ba30acc",
  };


  

  
  
    return (
      <div >
     
          <div style={{ marginBottom: '16px',marginLeft:"20px"  }}>
            <Button type="primary"  onClick={showModal}>
              Ajouter
            </Button>
          </div>
          <Card 
              title="Liste des preneurs"
              headStyle={cardHeadStyleStat}
              className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
              
        
            <Table
              dataSource={data}
              columns={columns}
              pagination={{ 
                pageSize: 3,
                current: currentPage,
                onChange: setCurrentPage,}}
              scroll={{ x: 'max-content' }} // Ajout de l'attribut scroll pour ajouter le défilement horizontal
            />

          </Card>

          <Modal
            title={selectedPreneur ? 'Modifier le preneur' : 'Ajouter un preneur'}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={selectedPreneur ? 'Modifier' : 'Enregistrer'}
            cancelText="Annuler"
            className='p-1'
            style={{position:'relative',top:'30px',paddingRight:'5px',paddingLeft:'5px'}}
          >
           

<Form form={form} onFinish={onFinish}>
  <Row gutter={24}>
    <Col span={12}>
      <Form.Item
        label="Code Preneur"
        name="Code_preneur"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: 'Veuillez saisir le code du preneur' }]}
      >
        <Input  />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        label="Nom Preneur"
        name="Nom_Preneur"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: 'Veuillez saisir le nom du preneur' }]}
      >
        <Input  />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={24}>
    <Col span={12}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Secteur opérationnel"
        name="Secteur_opérationnel"
        rules={[{ required: true, message: 'Veuillez saisir le secteur opérationnel' }]}
      >
        <Input  />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Pays"
        name="Pays"
        initialValue="CIV" 
        rules={[{ required: true, message: 'Veuillez saisir le pays' }]}
      >
        <Input />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={24}>
    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Taux BIC"
        name="Taux_BIC"
        rules={[{ required: true, message: 'Veuillez saisir le taux BIC' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="% Groupe"
        name="pourc_Groupe"
        rules={[{ required: true, message: 'Veuillez saisir le pourcentage de groupe' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>
  
    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Tx Financement"
        name="Tx_Financement"
        rules={[{ required: true, message: 'Veuillez saisir le taux de financement' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>
    </Row>
  <Row gutter={24}>
    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Véhicules"
        name="Vehicules"
        rules={[{ required: true, message: 'Veuillez saisir le montant pour Véhicules' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>
  
    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Terrain"
        name="Terrain"
        rules={[{ required: true, message: 'Veuillez saisir le montant pour Terrain' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Constructions"
        name="Constructions"
        rules={[{ required: true, message: 'Veuillez saisir le montant pour Constructions' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={24}>
    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Machines"
        name="Machines"
        rules={[{ required: true, message: 'Veuillez saisir le montant pour Machines' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Mat. inform."
        name="Materiel_informatique"
        rules={[{ required: true, message: 'Veuillez saisir le montant pour Matériel informatique' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>
 
    <Col span={8}>
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label="Autres"
        name="Autres"
        rules={[{ required: true, message: 'Veuillez saisir le montant pour Autres' }]}
      >
        <Input  type="number" step={0.01} />
      </Form.Item>
    </Col>
  </Row>
</Form>
          </Modal>
        
      </div>
    );
  };
  
  export default Preneur;