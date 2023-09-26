import { Button, Steps, theme, Divider, notification, Modal, Popconfirm, Spin, Table, Tabs } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Informations_Contrat from '../../components/Info_Contrat_1';
import "./NouveauContrat.css"
import Informations_Contrat_2 from '../../components/Info_Contrat_2';
import QuestionnaireContrat from '../../components/Questionnaireifrs';
import QuestionnaireContrat_exemption from '../../components/Exemption_questionnaire';
import { useNavigate } from 'react-router-dom';
import { amortissementValeurActuelle, calculerVariables, tableauAmortissementDroitUtilisation } from '../../components/calculFunctions';

const Nouveau_Contrat = () => {
  const [contractData_x, setContractData_x] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [contractCode, setContractCode] = useState('');
  const [modalContent1, setModalContent1] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false);
  const [finalStepLoading, setFinalStepLoading] = useState(false);
  const [statutEligibilite, setStatutEligibilite] = useState(true);
  const [statutExempt, setStatutExempt] = useState(true);
  const [activeTab, setActiveTab] = useState('tab1'); // État pour suivre l'onglet actif
const [showTabsModal, setShowTabsModal] = useState(false);

const [tableData, setTableData] = useState({
  tableau1: [],
  tableau2: [],
  tableau3: [],
});

const extractColumnsFromData = (data) => {
  if (!data || data.length === 0) {
    return [];
  }

  const firstRow = data[0];
  const columns = [];

  for (const key in firstRow) {
    if (firstRow.hasOwnProperty(key)) {
      columns.push({
        title: key,
        dataIndex: key,
      });
    }
  }

  return columns;
};


  // --- UPDATE ---
  const { TabPane } = Tabs;
  const { Column } = Table;
  const navigate = useNavigate();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const contractData_x_Update = (nouvellesDonnées) => {
    setContractData_x((prevContractData_x) => ({
      ...prevContractData_x,
      ...nouvellesDonnées,
    }));
  };

  // --- STEPS WORKFLOW ---

  const steps = [
    {
      title: 'Informations du contrat (1/2)',
      content: <Informations_Contrat formValues={contractData_x} updatecontratDataX={contractData_x_Update} />,
    },
    {
      title: 'Eligibilité du contrat',
      content: <QuestionnaireContrat formValues={contractData_x} updatecontratDataX={contractData_x_Update} />,
    },
    {
      title: 'Exemption du contrat',
      content: <QuestionnaireContrat_exemption formValues={contractData_x} updatecontratDataX={contractData_x_Update} />,
    },
    {
      title: 'Informations du contrat (2/2)',
      content: <Informations_Contrat_2 formValues={contractData_x} updatecontratDataX={contractData_x_Update} />,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current === 0) {
      // À l'étape 0, lorsque le code du contrat est généré
      let codeContrat_ = 'C' + Date.now();
      setContractCode(codeContrat_);
  
      // Vérifiez si le formulaire de l'étape actuelle est valide
      if (contractData_x) {
 
        if(contractData_x.fichier && contractData_x.info_1){
        sendContractData(contractData_x, "", "", codeContrat_);
        setCurrent(current + 1);
      }
      } else {
             // Affichez une notification d'erreur si le formulaire n'est pas valide
      notification.error({
        message: 'Veuillez remplir tous les champs requis.',
        duration: 3, // Durée en secondes pour la notification
      });      }
    } else if (current === 1) {

      // À l'étape 1, envoyez les données et videz info_1
      const updatedContractData = { ...contractData_x };
      updatedContractData.info_1 = null;
  
      // Vérifiez si le formulaire de l'étape actuelle est valide
      if (updatedContractData.questionnaire) {
        console.log(updatedContractData.questionnaire)
      if (updatedContractData.questionnaire[4]) {
        setLoading(true);
        // Delay the setLoading(false) call by 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        traitementData(updatedContractData.questionnaire, updatedContractData);
        setCurrent(current + 1);
      } else {
        notification.error({
          message: 'Veuillez remplir le questionnaire.',
          duration: 3, // Durée en secondes pour la notification
        });        }
      } else {
        notification.error({
          message: 'Veuillez remplir le questionnaire.',
          duration: 3, // Durée en secondes pour la notification
        });        }
    } else if (current === 2) {

      // À l'étape 2, envoyez les données et videz info_1
      const updatedContractData = { ...contractData_x };
      updatedContractData.questionnaire = null;
      updatedContractData.info_1 = null;
  
      // Vérifiez si le formulaire de l'étape actuelle est valide
    
      if (updatedContractData.questionnaire_exemption) {
        if (updatedContractData.questionnaire_exemption[2]) {
        setLoading(true);
        // Delay the setLoading(false) call by 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        traitementDataExemption(
          updatedContractData.questionnaire_exemption,
          updatedContractData
        );
        setCurrent(current + 1);
        }else {
          notification.error({
            message: 'Veuillez remplir le questionnaire.',
            duration: 3, // Durée en secondes pour la notification
          });       }
      } else {
        notification.error({
          message: 'Veuillez remplir le questionnaire.',
          duration: 3, // Durée en secondes pour la notification
        });       }
    }
  };
  
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: "#fff",
    borderRadius: token.borderRadiusLG,
    borderBottom: `1px dashed rgba(1,1,1,0.2)`,
    marginTop: 16,
    padding: 8,
  };

  // --ENVOI--

  const sendContractData = async (contractData_x_send, eligibilitecontrat, exemptioncontrat, codeC) => {
    try {
      const formData = new FormData();

      if (contractData_x_send.info_1) {
        formData.append('info_1', JSON.stringify(contractData_x_send.info_1));
      }

      if (contractData_x_send.info_2) {
        formData.append('info_2', JSON.stringify(contractData_x_send.info_2));
      }

      if (contractData_x_send.info_3) {
        formData.append('info_3', JSON.stringify(contractData_x_send.info_3));
      }

      if (contractData_x_send.fichier) {
        formData.append('fichier', contractData_x_send.fichier);
      }
      if (contractData_x_send.questionnaire_exemption) {
        formData.append('questionnaire_exemption', JSON.stringify(contractData_x_send.questionnaire_exemption));
      }

      if (contractData_x_send.questionnaire) {
        formData.append('questionnaire', JSON.stringify(contractData_x_send.questionnaire));
      }
      if (contractData_x_send) {
        formData.append('eligibilite', eligibilitecontrat);
      }
      if (contractData_x_send) {
        formData.append('exemption', exemptioncontrat);
      }
      if (contractData_x_send) {
        formData.append('codecontrat', codeC);
      }
      const response = await fetch('http://127.0.0.1:5000/api/nouveaucontrat/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Le contrat a été envoyé avec succès
        console.log('Contrat envoyé avec succès');
      } else {
        // Une erreur s'est produite lors de l'envoi du contrat
        console.error("Erreur lors de l'envoi du contrat");
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête
      console.error('Erreur lors de la requête', error);
    }
  };

  //TRAITEMENT

  const traitementData = (questions, contractData_x_send) => {
    // Vérifier si le contrat contient un contrat de location
    if (
      questions[0] === "Non" ||
      questions[1] === "Non" ||
      questions[2] === "Fournisseur" ||
      questions[4] === "Non"
    ) {
      // Le contrat ne contient pas de contrat de location
      setModalContent("Contrat non éligible à la norme IFRS 16");
      setModalVisible(true);

      setStatutEligibilite(false)
      // Ne pas activer la redirection ici
      // setShouldRedirect(true);

      return;
    } else {
      // Le contrat est éligible selon la norme IFRS 16
      setModalContent("Contrat éligible à la norme IFRS 16");
      setModalVisible(true);
      setStatutEligibilite(true)

      // Envoyez les données du contrat au serveur
      sendContractData(contractData_x_send, 'éligible', "", contractCode);
    }
  };

  const traitementDataExemption = (questions, contractData_x_send) => {
    // Vérifier si les données sont définies
    if (!questions || !contractData_x_send) {
      console.error('Données non définies.');
      return;
    }
  
    // Vérifier si questions a au moins un élément
    if (questions.length > 0) {
      // Vérifier si le contrat contient un contrat de location
      if (
        questions[0] === "Oui" ||
        questions[1] === "Oui" ||
        questions[2] === "Oui"
      ) {
        // Le contrat ne contient pas de contrat de location
        setModalContent1("Contrat exempté de calculs");
        setModalVisible1(true);
        setStatutExempt(false)
  
        // Envoyez les données du contrat au serveur
        sendContractData(contractData_x_send, "", 'exempté', contractCode);
        return;
      } else {
        // Le contrat est éligible selon la norme IFRS 16
        setModalContent1("Contrat non-exempté de calculs");
        setModalVisible1(true);
        setStatutExempt(true)
  
        // Envoyez les données du contrat au serveur
        sendContractData(contractData_x_send, "", 'non exempté', contractCode);
      }
    } else {
      console.error('Aucune question disponible.');
    }
  };
  
  //FIN WORKFLOW

  const handleModalAfterClose = () => {
    setModalVisible(false); // Fermez le modal
    if (!statutEligibilite) {
      navigate('/contratheque'); // Redirigez si statutEligibilite est false
    }
  };

  const handleModalOk = () => {
    // La fonction à exécuter lorsque l'utilisateur clique sur "OK" dans le modal
    setModalVisible(false); // Fermez le modal

  }
    
  const handleModalAfterClose1 = () => {
    setModalVisible1(false); // Fermez le modal
    if (!statutExempt) {
      navigate('/contratheque'); // Redirigez si statutEligibilite est false
    }
  };

  const handleModalOk1 = () => {
    // La fonction à exécuter lorsque l'utilisateur clique sur "OK" dans le modal
    setModalVisible1(false); // Fermez le modal
  
    if (!statutExempt) {
      navigate('/contratheque'); // Redirigez si statutEligibilite est false
    }
  };
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
    
        const handleFinishWorkflow = async (contractData_x_send) => {
          if (contractData_x_send) {
            setFinalStepLoading(true); // Activer l'indicateur de chargement
            setShowTabsModal(true);
            const updatedContractData = { ...contractData_x_send };
            updatedContractData.questionnaire = null;
            updatedContractData.info_1 = null;
            updatedContractData.questionnaire_exemption = null;
            try {
              // Envoyez les données du contrat au serveur
              
              await sendContractData(updatedContractData, "", "", contractCode);
        
              const tauxEndettement = 7;
              const tauxMajorationLoyer = 0;
              const frequencePaiement = 'mensuel';
              const loyerMensuel = 250000;
              const dateFinContrat = '2035-12-31';
              const dateDebutContrat = '2021-03-01';
              const nomBailleur = 'John Doe';
              const lieuUtilisationBien = 'Daloa';
        
              const resultatJSON1 = calculerVariables(
                tauxEndettement,
                tauxMajorationLoyer,
                frequencePaiement,
                loyerMensuel,
                dateFinContrat,
                dateDebutContrat,
                nomBailleur,
                lieuUtilisationBien
              );
              
              const resultatAVAJSON1 = amortissementValeurActuelle(
                tauxEndettement,
                tauxMajorationLoyer,
                frequencePaiement,
                loyerMensuel,
                dateFinContrat,
                dateDebutContrat,
                nomBailleur,
                lieuUtilisationBien
              );
              
              const resultatADUJSON1 = tableauAmortissementDroitUtilisation(
                tauxEndettement,
                tauxMajorationLoyer,
                frequencePaiement,
                loyerMensuel,
                dateFinContrat,
                dateDebutContrat,
                nomBailleur,
                lieuUtilisationBien
              );
              
              setTableData({
                tableau1: resultatJSON1,
                tableau2: resultatAVAJSON1,
                tableau3: resultatADUJSON1,
              });
              
        
        
              notification.success({
                message: 'Processus complet!',
                duration: 1,
              });
            } catch (error) {
              console.error('Erreur lors de l\'envoi des données du contrat', error);
              notification.error({
                message: 'Erreur lors de l\'envoi des données du contrat',
                duration: 3,
              });
            } finally {
              // Désactiver l'indicateur de chargement
              setFinalStepLoading(false);
            }
          } else {
            notification.error({
              message: 'Données non-disponibles!',
              duration: 3,
            });
          }
        };
        

  return (
    <>
      <div
        style={{
          boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)',
          marginTop: current === 3 ? '40px' : 0,
          marginBottom: current === 1 ? '0px' : 0
        }}
        className="border border bg-white p-5 pt-3 pb-3"
      >
        <Divider orientation="left"><h5>Nouveau contrat</h5></Divider>

        <Steps current={current} items={items} />

        <div style={contentStyle}>{steps[current].content}</div>
        <br />
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Suivant
            </Button>
          )}
         {current === steps.length - 1 && (
  <Popconfirm
    title="Êtes-vous sûr de vouloir envoyer ?"
    onConfirm={() => handleFinishWorkflow(contractData_x)}
    okText="Oui"
    cancelText="Non"
  >
    <Button
      type="primary"
      loading={finalStepLoading} // Utilisez la propriété loading pour activer/désactiver le chargement
    >
      Valider
    </Button>
  </Popconfirm>
)}

          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Précédent
            </Button>
          )}
        </div>
      </div>

      <Modal
        title={modalContent.includes('non') ? 'Éligibilité du contrat' : 'Éligibilité du contrat'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        afterClose={handleModalAfterClose}
        style={{ position: 'relative', top: '-100px' }}
        centered
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center' }}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              {modalContent.includes('non') ? (
                <CloseCircleOutlined style={{ fontSize: '50px', color: 'red' }} />
              ) : (
                <CheckCircleOutlined style={{ fontSize: '50px', color: 'green' }} />
              )}
              <p style={{ marginTop: '16px', fontSize: '18px' }}>{modalContent}</p>
            </div>
          )}
        </div>
      </Modal>
      <Modal
  title="Rétraitement comptable"
  visible={showTabsModal}
  onOk={() => {
    setShowTabsModal(false);
    navigate('/contratheque'); // Redirection vers la page "contratheque"
  }}
  onCancel={() => {
    setShowTabsModal(false);
    navigate('/contratheque'); // Redirection vers la page "contratheque"
  }}
  afterClose={() => {
    setShowTabsModal(false);
    navigate('/contratheque'); // Redirection vers la page "contratheque"
  }}
  width="1200px"
  style={{ position: 'relative', top: '1px' }}
  bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
  zIndex={1000}
  centered
  footer={[
    <Button key="ok" type="primary" onClick={handleModalOk}>
      OK
    </Button>,
  ]}
>
        <div style={{ textAlign: 'center' }}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              {modalContent1.includes('non') ? (
                <CheckCircleOutlined style={{ fontSize: '50px', color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ fontSize: '50px', color: 'red' }} />
              )}
              <p style={{ marginTop: '16px', fontSize: '18px' }}>{modalContent1}</p>
            </div>
          )}
        </div>
      </Modal>
      <Modal
  title="Rétraitement comptable"
  visible={showTabsModal}
  onOk={()=> setShowTabsModal(false)}
  onCancel={()=> setShowTabsModal(false)}
  afterClose={()=> setShowTabsModal(false)}
  width="1200px"
  style={{position:'relative', top:'1px'}}
  bodyStyle={{ maxHeight: '80vh', overflowY: 'auto',  }}
  zIndex={1000} // Définissez le z-index du modal à une valeur inférieure au tableau

  centered

  footer={[
    <Button key="ok" type="primary" onClick={handleModalOk}>
      OK
    </Button>,
  ]}
>
<Tabs activeKey={activeTab} onChange={handleTabChange}>
  <TabPane tab="Tableau 1 : Détermination de la valeur actuelle" key="tab1">
    {tableData.tableau1 && (
      <Table
        dataSource={tableData.tableau1}
        columns={extractColumnsFromData(tableData.tableau1)} // Utilisez la fonction pour extraire les colonnes
        pagination={false}
      />
    )}
  </TabPane>
  <TabPane tab="Tableau 2 : Amortissement de la valeur actuelle" key="tab2">
    {tableData.tableau2 && (
      <Table
        dataSource={tableData.tableau2}
        columns={extractColumnsFromData(tableData.tableau2)} // Utilisez la fonction pour extraire les colonnes
        pagination={false}
      />
    )}
  </TabPane>
  <TabPane tab="Tableau 3 : Amortissement du droit d'utilisation" key="tab3">
    {tableData.tableau3 && (
      <Table
        dataSource={tableData.tableau3}
        columns={extractColumnsFromData(tableData.tableau3)} // Utilisez la fonction pour extraire les colonnes
        pagination={false}
      />
    )}
  </TabPane>
</Tabs>

</Modal>

    </>
  );
};

export default Nouveau_Contrat;
