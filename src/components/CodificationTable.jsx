import { Card, notification, Table, Modal, Form, Input, Button, Popconfirm,Row,Col } from 'antd';
import { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Codification = () => {

    const [isCodificationModalVisible, setIsCodificationModalVisible] = useState(false);
    const [selectedCodification, setSelectedCodification] = useState(null);
    const [codificationForm] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);

    
    const [codificationData, setCodificationData] = useState([]);

    // Function to fetch the initial data from the backend
const fetchInitialData = async () => {
  try {
    const response = await fetch('http://127.0.0.7:5000/api/codifications');
    if (response.ok) {
      const initialData = await response.json();
      setCodificationData(initialData);
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

    // Use the codificationData in your component
    
  
    
    const showCodificationModal = () => {
        setSelectedCodification(null);
        setIsCodificationModalVisible(true);
    
    };
  
    const handleCodificationOk = () => {
      codificationForm.submit();
    };
  
    const sendDataToBackend = async (dataCodification) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/ajoutcodification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataCodification),
        });
    
        if (response.ok) {
          const newCodification = await response.json();
          setCodificationData([...codificationData, newCodification]);
          console.log('Data sent successfully');
          // Traiter la réponse en cas de succès
        } else {
          console.log('Failed to send data');
          // Traiter la réponse en cas d'erreur
        }
      } catch (error) {
        console.error('Error occurred while sending data', error);
        // Traiter les erreurs de réseau ou autres erreurs
      }
    };
    
    //Update codification data
    const updateCodificationData = async (updatedCodificationData) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/updatecodification/${updatedCodificationData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCodificationData),
        });
       
        if (response.ok) {
          return true;
        } else {
          console.log('Failed to update codification data');
          return false;
        }
      } catch (error) {
        console.error('Error occurred while updating codification data', error);
        return false;
      }
    };
    
  //Supprimer codification
const removeCodification = async (codificationId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/removecodification/${codificationId}`, {
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
  
    const onFinishCodification = async (values) => {
      if (selectedCodification) {
        const updatedCodification = {
          id: selectedCodification.id,
          compte: values.compte,
          libelle: values.libelle,
        };
        const isSuccess = await updateCodificationData(updatedCodification);
        
        if (isSuccess) {
  
          setCodificationData(codificationData.map((item) => (item.id === selectedCodification.id ? updatedCodification : item)));
    
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

        const newCodification = {
          id: codificationData.length + 1,
          compte: values.compte,
          libelle: values.libelle,
        };
        sendDataToBackend(newCodification)
        setCodificationData([...codificationData, newCodification]);

   
        notification.success({
            message: 'Condification validée',
            duration: 3, // Durée d'affichage de la notification en secondes
          });

          const totalPages = Math.ceil((codificationData.length + 1) / 3);
          setCurrentPage(totalPages);
  
        
      }
      codificationForm.resetFields();
      setIsCodificationModalVisible(false);
     
   
    };
  
    
    
    
    const handleCodificationCancel = () => {
      codificationForm.resetFields();
      setIsCodificationModalVisible(false);
  
    };
  
    const handleEditCodification = (record) => {
      setSelectedCodification(record);
      setIsCodificationModalVisible(true);
      codificationForm.setFieldsValue(record); // Set form values
    };
    
    const handleDeleteCodification = (id) => {
      removeCodification(id)
      const updatedData = codificationData.filter((item) => item.id !== id);
      setCodificationData(updatedData);
    };
    
    
    
    const codificationColumns = [
      {
        title: 'Code compte',
        dataIndex: 'compte',
        key: 'compte',
      },
      {
        title: 'Libellé',
        dataIndex: 'libelle',
        key: 'libelle',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <>
            <Button type="link" onClick={() => handleEditCodification(record)} icon={<EditOutlined />} />
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer cet élément ?"
              onConfirm={() => handleDeleteCodification(record.id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        ),
      },
    ];
    
   

    const cardHeadStyleStat = {
      color: "white",
       background: "#0ba30acc",
    };
  
    return (
      <div >
            <div style={{ marginBottom: '16px',marginLeft:"20px" }}>
            <Button type="primary" onClick={showCodificationModal}>
                Codifier
            </Button>
            </div>
            <Card
            title="Liste des codifications"
            headStyle={cardHeadStyleStat}
            className="border border"
            bordered={false}
            style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}
            >
              
              <Table
              dataSource={codificationData}
              columns={codificationColumns}
             
              pagination={{
                pageSize: 3,
                current: currentPage,
                onChange: setCurrentPage,
              }}
              />


            </Card>
            <Modal
        title={selectedCodification ? 'Modifier la codification' : 'Ajouter une codification'}
        visible={isCodificationModalVisible}
        onOk={handleCodificationOk}
            onCancel={handleCodificationCancel}
            okText={selectedCodification ? 'Modifier' : 'Enregistrer'}
            cancelText="Annuler"
            className="p-1"
            style={{ position: 'relative', top: '100px', paddingRight: '5px', paddingLeft: '5px' }}
        >
            <Form form={codificationForm} onFinish={onFinishCodification}>
        
                <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                    label="Code compte"
                    name="compte"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Veuillez saisir le compte' }]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
        
                <Col span={12}>
                    <Form.Item
                    label="Libellé"
                    name="libelle"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: 'Veuillez saisir le libellé' }]}
                    >
                    <Input />
                    </Form.Item>
                </Col>
                </Row>
        
            
        
            </Form>
            </Modal>
      </div>
    );
  };
  
  export default Codification;