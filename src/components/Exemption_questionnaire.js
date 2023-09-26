import React, { useState } from 'react';
import { Modal, Col, Row, Divider, Steps, Button, Radio } from 'antd';

const { Step } = Steps;

const QuestionnaireContrat_exemption = ({ updatecontratDataX,formValues }) => {

  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(formValues?.questionnaire_exemption ?? []);


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
    updatecontratDataX({'questionnaire_exemption': answers})
  };

  const questions = [  {    question: "Question 1",    description: "S'agit-il d'un contrat de location dont le bien sous-jacent a une faible valeur ?",    answers: ["Oui", "Non"]
},
{
  question: "Question 2",
  description: "Le contrat comporte-t-il à la fois une composante de location et une composante de services ?",
  answers: ["Oui", "Non"]
},
{
  question: "Question 3",
  description: "La durée du contrat est-elle courte, c'est-à-dire inférieure à 12 mois ?",
  answers: ["Oui", "Non"]
},
];

  return (
    <>
      <Button onClick={handleShowModal}>Répondre au questionnaire</Button>
      <Modal
        title="Exemption du contrat"
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

export default QuestionnaireContrat_exemption;
