import React, { useState, useEffect } from 'react';
import { notification, Upload, Col, Row } from 'antd';
import Info_1 from './Info_1';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Informations_Contrat = ({ updatecontratDataX }) => {
  const [fileList, setFileList] = useState([]);
  const [contractData, setContractDataFileList] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);



  const handleFileUpload = (file) => {
    const allowedExtensions = ['.docx', '.xlsx', '.csv', '.pdf', '.doc', '.pptx'];

    // Récupérer l'extension du fichier
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    // Vérifier si l'extension est autorisée
    if (allowedExtensions.includes(fileExtension)) {
      setUploadedFile(file); // Mettre à jour le fichier uploadé
      setFileList([file]); // Mettre à jour la liste des fichiers avec le nouveau fichier
      
      notification.success({
        message: 'Téléversement du fichier',
        description: `${file.name} fichier téléversé avec succès.`,
        duration: 3, // Durée de la notification en secondes
      });
   
        updatecontratDataX({'fichier':file})

    } else {
      notification.error({
        message: 'Erreur de téléversement',
        description: `Le fichier ${file.name} n'est pas d'une extension autorisée.`,
        duration: 3, // Durée de la notification en secondes
      });
    }
  };

  const getContractData = () => {
    // Logique pour obtenir les données du contrat
    // Utilisez le fichier uploadé et les informations collectées ici
    const data = {
      file: uploadedFile,
      infoData: {},
    };
    return data;
  };

  useEffect(() => {
  
    const data = getContractData();
    setContractDataFileList(data);
  }, [uploadedFile]);

  const handleFinishWorkflow = () => {
    // Utilisez les données du contrat (y compris le fichier uploadé) ici
    console.log(contractData);
  };

  return (
    <Row gutter={16}>
      <Col span={11}>
        <Dragger
          style={{ borderColor: '#1677ff' }}
          multiple={false}
          fileList={fileList}
          beforeUpload={(file) => {
            handleFileUpload(file);
            return false; // Empêche l'envoi automatique du fichier
          }}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Cliquez ou faites glisser <b>le contrat</b> dans cette zone pour le téléverser</p>
          <p className="ant-upload-hint"></p>
        </Dragger>
      </Col>

      <Col style={{ borderLeft: '1.5px solid rgba(1,1,1,0.1)' }} span={12}>
        <div>
          <Info_1 updateContratInfo={updatecontratDataX} />
        </div>
      </Col>
    </Row>
  );
};

export default Informations_Contrat;
