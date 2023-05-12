import React, { useState } from 'react';
import { Modal, Col, Row, Divider, Steps, Button, Radio } from 'antd';

const { Step } = Steps;

const QuestionnaireContrat = () => {

  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = undefined;
    setAnswers(newAnswers);
    setCurrentStep(currentStep - 1);
  };
  

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setVisible(false);
  };

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  const questions = [  {    question: "Question 1",    description: "Y a-t-il un bien déterminé?",    answers: ["Oui", "Non"]
},
{
  question: "Question 2",
  description: "Le client détient-il le droit d’obtenir la quasi-totalité des avantages économiques découlant de l’utilisation du bien tout au long de la durée d’utilisation?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 3",
  description: "Qui a le droit de décider comment utiliser le bien et à quelle fin l’utiliser tout au long de la durée d’utilisation ?",
  answers: ["Client", "Fournisseur", "Ni l'un ni l'autre"]
},
{
  question: "Question 4",
  description: "Le client a-t-il le droit d’exploiter le bien tout au long de la durée d’utilisation, sans que le fournisseur puisse changer les consignes d’exploitation?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 5",
  description: "Le bien a-t-il été conçu par le client d’une façon qui prédétermine comment le bien sera utilisé et à quelle fin il le sera tout au long de la durée d’utilisation?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 6",
  description: "Le contrat contient-il un contrat de location?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 7",
  description: "Contrat conclu en cours d'exercice (2022)?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 8",
  description: "Durée résiduelle du contrat en jours au 31/12/2022 pour les contrats conclus en 2022",
  answers: ["Moins de 30 jours", "Entre 30 jours et 1 an", "Plus d'un an"]
},
{
  question: "Question 9",
  description: "Contrat de location à court terme conclu au cours de l'exercice",
  answers: ["Oui", "Non"]
},
{
  question: "Question 10",
  description: "Valeur à l'état neuf du bien sous-jacent inférieur à 5000 usd?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 11",
  description: "Contrat de location dont le bien sous-jacent est de faible valeur",
  answers: ["Oui", "Non"]
},
{
  question: "Question 12",
  description: "Existe-t-il une composante location et une composante services?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 13",
  description: "Le contrat est-il de courte durée?",
  answers: ["Oui", "Non"]
}
];

  return (
    <>
      <Button onClick={handleShowModal}>Répondre au questionnaire</Button>
      <Modal
        title="Questionnaire"
        visible={visible}
        onCancel={handleHideModal}
        footer=
          {currentStep === 0 ? (
            <Button onClick={() => handleAnswer(answers[currentStep])} disabled={!answers[currentStep]}>Suivant</Button>
          ) : (
            <>
              {currentStep > 0 && (
                <Button onClick={handlePrevious}>Précédent</Button>
              )}
              {currentStep === questions.length ? (
                <Button onClick={handleHideModal}>Terminer</Button>
              ) : (
                <Button onClick={() => handleAnswer(answers[currentStep])} disabled={!answers[currentStep]}>Suivant</Button>
              )}
            </>
          )}
          
      >
<Steps current={currentStep}>
  {questions.map((q, index) => (
    <Step key={index} title={""} style={{padding: "0px"}} />
  ))}
</Steps>





        <Divider />
        <Row style={{ margin: 0, padding: 0 }}>
          <Col span={24}>
            {currentStep < questions.length && (
              <>
                <h6 style={{ margin: 0, padding: 0, textAlign:'center' }}>{questions[currentStep].question}</h6>
                <br/>
                <p><h5 style={{ margin: 0, padding: 0,textAlign:'center' }}>{questions[currentStep].description}</h5></p>
                <p align="center">
                <Radio.Group onChange={(e) => handleAnswer(e.target.value)} value={answers[currentStep]}>
                {questions[currentStep].answers.map((a, index) => (
                  <Radio.Button key={index} value={a} checked={answers[currentStep] === a}>{a}</Radio.Button>
                ))}
              </Radio.Group>

               

                </p>
              </>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default QuestionnaireContrat;
