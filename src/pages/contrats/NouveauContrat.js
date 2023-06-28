import { Button, Steps, theme, Divider, notification } from 'antd';
import { useState } from 'react';
import Informations_Contrat from '../../components/Info_Contrat_1';
import "./NouveauContrat.css"
import Informations_Contrat_2 from '../../components/Info_Contrat_2';
import QuestionnaireContrat from '../../components/Questionnaireifrs';



const Nouveau_Contrat = () => {

  const [contractData_x, setContractData_x] = useState(null);

  // --- UPDATE ---

  const contractData_x_Update = (nouvellesDonnees) => {
    setContractData_x((prevContractData_x) => ({
      ...prevContractData_x,
      ...nouvellesDonnees,
    }));
  };

 // --- STEPS WORKFLOW ---

  const steps = [
    {
      title: 'Informations du contrat (1/2)',
      content: <Informations_Contrat updatecontratDataX={contractData_x_Update} />,
    },
    {
      title: 'Informations du contrat (2/2)',
      content: <Informations_Contrat_2 updatecontratDataX={contractData_x_Update} />,
    },
    {
      title: 'Questionnaire IFRS 16',
      content: <QuestionnaireContrat updatecontratDataX={contractData_x_Update}/>,
    },
  ];



  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
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
    border: `1px dashed rgba(1,1,1,0.2)`,
    marginTop: 16,
    padding: 8,
  };

  // --ENVOI--

  const sendContractData = async (contractData_x_send) => {
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
  
      if (contractData_x_send.questionnaire) {
        formData.append('questionnaire', JSON.stringify(contractData_x_send.questionnaire));
      }
  
      const response = await fetch('http://127.0.0.1:5000/api/nouveaucontrat/', {
        method: 'POST',
        body: formData,
      });
      console.log(formData)
      if (response.ok) {
        // Le contrat a été envoyé avec succès
        console.log('Contrat envoyé avec succès');
      } else {
        // Une erreur s'est produite lors de l'envoi du contrat
        console.error('Erreur lors de l\'envoi du contrat');
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête
      console.error('Erreur lors de la requête', error);
    }
  };
  
  
  
  const handleFinishWorkflow = (contractData_x_send) => {
    // Vérifier si les données du contrat sont disponibles
    if (contractData_x_send) {
      
  
      // Envoyez les données du contrat au serveur
      sendContractData(contractData_x_send);
  
      notification.success({
        message: 'Processus complet!',
        duration: 3, // Durée de la notification en secondes
      });
    } else {
      // Les données du contrat ne sont pas encore disponibles, afficher un message d'erreur ou prendre une autre action appropriée
      notification.error({
        message: 'Données non-disponibles!',
        duration: 3, // Durée de la notification en secondes
      });
    }
  };
  
  
  

  return (
    <>
      <div style={{
        boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)',
        marginTop: current === 1 ? '350px' : 0,
        marginBottom: current === 1 ? '0px' : 0
      }} className=" border border bg-white p-5 pt-3 pb-3 ">
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
            <Button type="primary" onClick={() => handleFinishWorkflow(contractData_x) } >
              Valider
            </Button>
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
    </>
  );
};

export default Nouveau_Contrat;
