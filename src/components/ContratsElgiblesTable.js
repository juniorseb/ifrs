import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Checkbox, notification, Table, Modal, Form, Input, Button, Popconfirm, Badge } from 'antd';
import { DeleteOutlined, EditOutlined, DownloadOutlined, FileOutlined } from '@ant-design/icons';
import { Document, Page, pdfjs } from 'react-pdf';
import { amortissementValeurActuelle, calculerVariables, tableauAmortissementDroitUtilisation } from './calculFunctions';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import generatePDFReport from './RapportCalculs';
const XLSX = require('xlsx');





pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ContratsEligibles = () => {
  const [data, setData] = useState([]);
  const [dataAllContract, setDataAllContract] = useState([]);
  const [selectedContrat, setSelectedContrat] = useState(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContrats, setSelectedContrats] = useState([]); // Tableau des contrats sélectionnés
  const [selectAll, setSelectAll] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [questionnaireModalVisible, setQuestionnaireModalVisible] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);


    // État pour stocker les données du tableau actuellement prévisualisé
    const [tablePreviewData, setTablePreviewData] = useState([]);
    const [isTablePreviewModalVisible, setIsTablePreviewModalVisible] = useState(false);
    const [tablePreviewTitle, setTablePreviewTitle] = useState('');
   
  


    // Fonction pour ouvrir la modal de prévisualisation du tableau
    const openTablePreviewModal = (title, data) => {
      setTablePreviewTitle(title);
      if (data && data.length > 0) {
        setTablePreviewData(data);
        setIsTablePreviewModalVisible(true);
      } else {
        console.error("Les données du tableau sont vides ou non définies.");
      }
    
      // Attendre que l'élément soit présent dans le DOM
      setTimeout(() => {
        const tableElement = document.querySelector('.custom-table');
        if (tableElement && tableElement.scrollWidth > tableElement.clientWidth) {
          tableElement.classList.add('overflow-x');
        } else {
          tableElement.classList.remove('overflow-x');
        }
      }, 100); // Utilisez une temporisation de 100 ms (peut être ajustée si nécessaire)
    
      setIsTablePreviewModalVisible(true);
    };
    
  
    // Fonction pour fermer la modal de prévisualisation du tableau
    const closeTablePreviewModal = () => {
      setIsTablePreviewModalVisible(false);
    };
  
    const questions = [  {    question: "1",    description: "Y a-t-il un bien déterminé ?",    answers: ["Oui", "Non"]
  },
  {
    question: "2",
    description: "Le client détient-il le droit d’obtenir la quasi-totalité des avantages économiques découlant de l’utilisation du bien tout au long de la durée d’utilisation ?",
    answers: ["Oui", "Non"]
  },
  {
    question: "3",
    description: "Qui a le droit de décider comment utiliser le bien et à quelle fin l’utiliser tout au long de la durée d’utilisation ?",
    answers: ["Client", "Fournisseur", "Ni l'un ni l'autre"]
  },
  {
    question: "4",
    description: "Le client a-t-il le droit d’exploiter le bien tout au long de la durée d’utilisation, sans que le fournisseur puisse changer les consignes d’exploitation ?",
    answers: ["Oui", "Non"]
  },
  {
    question: "5",
    description: "Le bien a-t-il été conçu par le client d’une façon qui prédétermine comment le bien sera utilisé et à quelle fin il le sera tout au long de la durée d’utilisation ?",
    answers: ["Oui", "Non"]
  },

  ];

   const exportToExcel = () => {
                              // Données à exporter
                              const data = [];

                          
                        data.push([
                          "ID Contrat",
                          "Code Contrat",
                          "Preneur",
                          "Bailleur",
                          "Type Contrat",
                          "Catégorie Immobilisations",
                          "Nom Fichier",
                          "Début Échéance",
                          "Fin Échéance",
                          "Durée Contrat (mois)",
                          "Statut Contrat",
                          "Valeur Actuelle",
                          "Y a-t-il un bien déterminé ?", // Remplacé "Réponse 1" par la question
                          "Le client détient-il le droit d’obtenir la quasi-totalité des avantages économiques découlant de l’utilisation du bien tout au long de la durée d’utilisation ?", // Remplacé "Réponse 2" par la question
                          "Qui a le droit de décider comment utiliser le bien et à quelle fin l’utiliser tout au long de la durée d’utilisation ?", // Remplacé "Réponse 3" par la question
                          "Le client a-t-il le droit d’exploiter le bien tout au long de la durée d’utilisation, sans que le fournisseur puisse changer les consignes d’exploitation ?", // Remplacé "Réponse 4" par la question
                          "Le bien a-t-il été conçu par le client d’une façon qui prédétermine comment le bien sera utilisé et à quelle fin il le sera tout au long de la durée d’utilisation ?", // Remplacé "Réponse 5" par la question
                          "Date Ajout"
                        ]);
                      

                        
if(dataAllContract.length!=0){
                        // Parcourez chaque objet dans data1 et ajoutez ses valeurs au tableau data
                        dataAllContract.forEach(item => {
                          data.push([
                              item.id_contrat,
                              item.code_contrat,
                              item.preneur,
                              item.bailleur,
                              item.type_contrat,
                              item.categorie_immobilisations,
                              item.nom_fichier,
                              item.debut_echeance,
                              item.fin_echeance,
                              item.duree_contrat_mois,
                              item.statut_contrat,
                              sommeValeurActuelle,
                              item.reponse_1,
                              item.reponse_2,
                              item.reponse_3,
                              item.reponse_4,
                              item.reponse_5,
                              item.date_ajout
                          ]);
                        });
                              
                          
                            // Créez un nouveau classeur (workbook)
                        const wb = XLSX.utils.book_new();

                        // Créez une nouvelle feuille de calcul (worksheet)
                        const ws = XLSX.utils.aoa_to_sheet(data);

                        // Ajoutez la feuille de calcul au classeur
                        XLSX.utils.book_append_sheet(wb, ws, 'Feuille1'); // 'Feuille1' est le nom de la feuille de calcul

                        // Écrivez le classeur dans un fichier Excel
                        XLSX.writeFile(wb, 'export.xlsx'); // export.xlsx est le nom du fichier de sortie

                        console.log('Export Excel réussi !');
                      }
    
};

const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/nouveaucontrat');
  };
  const { Column } = Table;

  const handleDownload = () => {
    fetch(fileContent)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error occurred while downloading file', error);
      });
  };

  const handleFileClick = async (fileName) => {
    setSelectedFileName(fileName);
    setIsModalVisible(true);

    try {
      const response = await fetch(`http://localhost:5000/api/fichiers_contrats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      });

      if (response.ok) {
        const fileData = await response.blob();
        setFileContent(URL.createObjectURL(fileData));
      } else {
        console.log('Failed to fetch file data');
      }
    } catch (error) {
      console.error('Error occurred while fetching file data', error);
    }
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    const selectedContratIds = checked ? data.map((contrat) => contrat.id_contrat) : [];
    setSelectedContrats(selectedContratIds);
  };

  const handleSelectSingle = (e, contratId) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedContrats([...selectedContrats, contratId]);
    } else {
      setSelectedContrats(selectedContrats.filter((id) => id !== contratId));
    }
  };

  const fetchInitialData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contrats');
      if (response.ok) {
        const initialData = await response.json();
        const eligibleContrats = initialData.filter((contrat) => contrat.statut_contrat === 'éligible');
        setData(initialData);
        setDataAllContract(initialData);
        console.log('Initial data fetched successfully');
      } else {
        console.log('Failed to fetch initial data');
      }
    } catch (error) {
      console.error('Error occurred while fetching initial data', error);
    }
  };
  const tablePreviewColumns = [
    {
      title: 'Header 1',
      dataIndex: 'header1', // Assurez-vous que cela correspond au nom de la clé dans vos données
      key: 'header1',
    },
    {
      title: 'Header 2',
      dataIndex: 'header2',
      key: 'header2',
    },
    {
      title: 'Header 3',
      dataIndex: 'header3',
      key: 'header3',
    },
  ];
  

  useEffect(() => {
    fetchInitialData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedContrat(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setSelectedContrat(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const removeContrat = async (contratId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/removeContrat/${contratId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        return true;
      } else {
        console.log('Failed to remove contrat');
        return false;
      }
    } catch (error) {
      console.error('Error occurred while removing contrat', error);
      return false;
    }
  };

  const handleDelete = (id) => {
    removeContrat(id);
    setData(data.filter((item) => item.id_contrat !== id));

    notification.success({
      message: 'Suppression validée',
      duration: 3,
    });
  };

  const renderActions = (_, record) => (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
        style={{ marginRight: 8 }}
      />
      <Popconfirm
        title="Êtes-vous sûr de vouloir supprimer ce contrat ?"
        onConfirm={() => handleDelete(record.id_contrat)}
        okText="Oui"
        cancelText="Non"
      >
        <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
      </Popconfirm>
    </div>
  );

  const handleViewResponses = (record) => {
    setSelectedQuestionnaire(record);
    setQuestionnaireModalVisible(true);
  };

  const handleQuestionnaireModalCancel = () => {
    setQuestionnaireModalVisible(false);
  };

  const renderQuestionnaireResponses = () => {
    if (selectedQuestionnaire) {
      const tableComponents = {
        body: {
          cell: (props) => <td style={{ fontSize: '16px' }}>{props.children}</td>,
        },
        header: {
          cell: (props) => <th style={{ fontSize: '16px' }}>{props.children}</th>,
        },
      };
  
      return (
        <Table
          dataSource={questions}
          rowKey={(record) => record.question}
          pagination={false}
          bordered
          size="small"
          className="questionnaire-responses-table"
          components={tableComponents}
        >
          {/* Columns */}
          <Column
            title="Questions"
            dataIndex="question"
            key="question"
            className="questionnaire-column"
          />
          <Column
            title="Descriptions"
            dataIndex="description"
            key="description"
            className="questionnaire-column"
          />
          <Column
            title="Réponses"
            dataIndex="question"
            key="response"
            className="questionnaire-column text-success"
            render={(question) => (
              <span className="text-success" style={{ fontWeight: '500' }}>
                {selectedQuestionnaire[`reponse_${questions.findIndex((q) => q.question === question) + 1}`]}
              </span>
            )}
          />
        </Table>
      );
    }
    return null;
  };
  
    // Simulation de la détermination de la VA (valeur actuelle)
          
          const tauxEndettement = 7; 
          const tauxMajorationLoyer = 0; 
          const frequencePaiement = 'mensuel';
          const loyerMensuel = 250000;
          const dateFinContrat = '2035-12-31';
          const dateDebutContrat = '2021-03-01';
          const nomBailleur = 'John Doe';
          const lieuUtilisationBien = 'Daloa';

 

      const resultatJSON = calculerVariables(tauxEndettement, tauxMajorationLoyer, frequencePaiement, loyerMensuel, dateFinContrat, dateDebutContrat, nomBailleur, lieuUtilisationBien);

          // Calcul de la somme des valeurs actuelles
            let sommeValeurActuelle = 0;

            resultatJSON.forEach((result) => {
              sommeValeurActuelle += result['Valeur actuelle'];
            });

        
          // Formatter la somme avec des espaces pour faciliter la lecture
            const sommeValeurActuelleFormatee = sommeValeurActuelle.toLocaleString();

            
  

    //////////////////////

      // Simulation amortissement de la VA 

      const resultatAVAJSON = amortissementValeurActuelle(tauxEndettement, tauxMajorationLoyer, frequencePaiement, loyerMensuel, dateFinContrat, dateDebutContrat, nomBailleur, lieuUtilisationBien);

    
    //////////////////////


        // Simulation amortissement DU

        const resultatADUJSON = tableauAmortissementDroitUtilisation(tauxEndettement, tauxMajorationLoyer, frequencePaiement, loyerMensuel, dateFinContrat, dateDebutContrat, nomBailleur, lieuUtilisationBien);

        const parametres = [
          { "Nom du bailleur": nomBailleur },
          { "Lieu d'utilisation du bien": lieuUtilisationBien },
          { "Date de début de contrat": dateDebutContrat },
          { "Date de fin de contrat": dateFinContrat },
          { "Loyer mensuel": loyerMensuel },
          { "Fréquence de paiement": frequencePaiement },
          { "Taux de majoration de loyer": tauxMajorationLoyer + "%" },
          { "Taux d'endettement": tauxEndettement + "%"},
          { "Valeur actuelle": sommeValeurActuelle + " FCFA"},
          { "Droit d\'utilisation": sommeValeurActuelle + " FCFA"},
];




   //////////////////////
   const handleGenerateReport = () => {
    // Vérifiez s'il y a des données de tableau prévisualisées
    if (resultatJSON.length === 0) {
      console.error('Tableau 1 est vide');
      return;
    }
    
    if (resultatAVAJSON.length === 0) {
      console.error('Tableau 2 est vide');
      return;
    }
    
    if (resultatADUJSON.length === 0) {
      console.error('Tableau 3 est vide');
      return;
    }
    
    // Si tous les tableaux ont des données valides, appelez la fonction generatePDFReport
    generatePDFReport(parametres, resultatJSON, resultatAVAJSON, resultatADUJSON);
    
  };
  

  const columns = [
    {
      title: (
        <Checkbox onChange={handleSelectAll} checked={selectAll} />
      ),
      dataIndex: 'id_contrat',
      key: 'id_contrat',
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleSelectSingle(e, record.id_contrat)}
          checked={selectedContrats.includes(record.id_contrat)}
        />
      ),
    },
    { title: 'Code Contrat', dataIndex: 'code_contrat', key: 'code_contrat', className: 'column-cell',
    render: (text) => (
      <span className="file-name text-blue " style={{ 'fontSize':'16px', 'textDecoration':'none' }} >
        {text}
      </span>
    ),},
    { title: 'Preneur', dataIndex: 'preneur', key: 'preneur', className: 'column-cell' },
    { title: 'Bailleur', dataIndex: 'bailleur', key: 'bailleur', className: 'column-cell' },
    {
      title: 'Type Contrat',
      dataIndex: 'type_contrat',
      key: 'type_contrat',
      className: 'column-cell',
      render: (text) => (
        <span style={{'fontSize':'12px'}} className="badge badge-primary bg-primary" >{text} </span>
      ),
    },
    {
      title: 'Fichier',
      dataIndex: 'nom_fichier',
      key: 'nom_fichier',
      className: 'column-cell',
      render: (text) => (
        <Button
          className="file-name "
          style={{ color: 'black', cursor: 'pointer' }}
          onClick={() => handleFileClick(text)}
        >
          <FileOutlined style={{ marginRight: '5px' }} />
          {text}
        </Button>
      ),
    },

    { title: 'Catégorie Immobilisations', dataIndex: 'categorie_immobilisations', key: 'categorie_immobilisations', className: 'column-cell' },
    {
      title: 'Statut éligibilité',
      dataIndex: 'statut_contrat',
      key: 'statut_contrat',
      className: 'column-cell',
      render: (text) => (
        <span
          style={{ fontSize: '12px' }}
          className={`badge badge-primary ${text === 'non éligible' ? 'bg-danger' : 'bg-success'}`}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Statut exemption',
      dataIndex: 'statut_contrat_exempt',
      key: 'statut_contrat_exempt',
      className: 'column-cell',
      render: (text) => (
        <span
          style={{ fontSize: '12px' }}
          className={`badge badge-primary ${text === 'exempté' ? 'bg-success' : 'bg-danger'}`}
        >
          {text}
        </span>
      ),
    },
    { title: 'Valeur actuelle du contrat', dataIndex: 'valeur_actuelle_contrat', key: 'valeur_actuelle_contrat', className: 'column-cell',
    render: (_, record) => (
      <span>
         {sommeValeurActuelleFormatee + " FCFA" }
      </span>
    ), },
    {
      title: 'Rapport des calculs',
      dataIndex: '',
      key: 'responses',
      className: 'column-cell',
      render: (_, record) => (
        <div>
          <Button className="ant-btn-white" onClick={() => openTablePreviewModal('Tableau 1 : Détermination de la valeur actuelle', resultatJSON)}>
            T1
          </Button>
          
          <Button className="ant-btn-white" onClick={() => openTablePreviewModal('Tableau 2 : Amortissement de la valeur actuelle', resultatAVAJSON)}>
            T2
          </Button>

          <Button className="ant-btn-white" onClick={() => openTablePreviewModal('Tableau 3 : Amortissement du droit d\'utilisation', resultatADUJSON)}>
            T3
          </Button>
          <br />
          <Button className="ant-btn-white mt-1" style={{position:"relative"}} onClick={handleGenerateReport}>
            Générer le rapport
          </Button>
        </div>

      ),
    },
  
    { title: 'Actions', dataIndex: '', key: 'actions', render: renderActions, className: 'column-cell' },

  ];

  const tableHeaderStyle = {
    background: 'rgba(11, 163, 10, 0.8)',
    color: 'white',
    borderBottom: '2.5px dotted skyblue',
    borderTop: '0.5px solid rgba(4, 73, 175,0.5)',
  };

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return 'table-row-light'; // Classe pour les lignes avec fond blanc
    } else {
      return 'table-row-dark'; // Classe pour les lignes avec fond gris
    }
  };

  return (
    <div>
      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Contenu du fichier</span>
            <Button style={{ marginRight: '100px' }} type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
              Télécharger
            </Button>
          </div>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="custom-modal"
        bodyStyle={{ height: '80vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {fileContent && (
          <Document
            file={fileContent}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="pdf-content"
              />
            ))}
          </Document>
        )}
      </Modal>

      <Modal
  title="Réponses"
  visible={questionnaireModalVisible}
  onCancel={handleQuestionnaireModalCancel}
  footer={null}
  bodyStyle={{ maxHeight: '60vh', overflowY: 'auto', }}
>
  {renderQuestionnaireResponses()}
</Modal>

<Modal
  title={tablePreviewTitle}
  visible={isTablePreviewModalVisible}
  onCancel={closeTablePreviewModal}
  footer={null}
  width="1200px"
  style={{position:'relative', top:'25px'}}
  bodyStyle={{ maxHeight: '80vh', overflowY: 'auto',  }}
  zIndex={1000} // Définissez le z-index du modal à une valeur inférieure au tableau
>
  {/* Afficher les données du tableau actuellement prévisualisé */}
  {tablePreviewData.length > 0 && (
    <Table
  dataSource={tablePreviewData}
  pagination={false}
  scroll={{ x: 'max-content' }}
  className="custom-table" // Ajoutez cette classe

  zIndex={1500}
>
      {/* Définir les colonnes en fonction des clés de votre objet JSON */}
      {Object.keys(tablePreviewData[0]).map((key) => (
        <Column
          title={key}
          dataIndex={key}
          key={key}
        />
      ))}
    </Table>
  )}
</Modal>



      <Card>
        <Button
          type="primary"
          onClick={handleButtonClick}
          style={{ marginBottom: 25, background: 'rgba(22, 150, 5, 0.8)' }}
        >
          + Nouveau contrat
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: 25, marginLeft: 2 }}
          onClick={()=> exportToExcel()}
        >
          <DownloadOutlined style={{ marginLeft: 5 }} />
          Exporter vers Excel
        </Button>


        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 4,
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: 'max-content' }}
          components={{
            header: {
              cell: (props) => <th style={tableHeaderStyle}>{props.children}</th>,
            },
          }}
          rowClassName={getRowClassName}
        />
      </Card>
    </div>
  );
};

export default ContratsEligibles;
