import React, { useState } from 'react';
import { Modal, Col, Row, Divider, Steps, Button, Radio, Tooltip } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';

const { Step } = Steps;

const QuestionnaireContrat = ({ updatecontratDataX, formValues }) => {
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(formValues?.questionnaire ?? []);
  const [showInfoModal, setShowInfoModal] = useState(false); // État pour afficher le modal d'informations
  const [infoText, setInfoText] = useState(''); // État pour stocker le texte des informations

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
    updatecontratDataX({ 'questionnaire': answers });
  };

  // Tableau d'informations supplémentaires pour chaque question
  const infoData = [
    `<br>
    <strong>B13</strong> - Le bien est habituellement déterminé par sa mention explicite au contrat. Toutefois, un bien peut aussi se 
    trouver implicitement déterminé au moment où il est mis à la disposition du client. <br/>
  

    <strong>B14</strong> - Si le fournisseur a le droit substantiel de remplacer le bien tout au long de la durée d’utilisation, le client ne 
    détient pas le droit d’utiliser un bien déterminé, même si ce dernier est explicitement mentionné. Le droit du 
    fournisseur de remplacer le bien est substantiel seulement si les deux conditions suivantes sont réunies : 
    (a) le fournisseur a la capacité pratique de remplacer le bien par un autre tout au long de la durée 
    d’utilisation (par exemple, le client ne peut pas empêcher le fournisseur de remplacer le bien et le 
    fournisseur a aisément accès à un bien de remplacement ou il peut en fournir un dans un délai 
    raisonnable) ; 
    (b) l’exercice du droit de substitution fournirait un avantage économique au fournisseur (c’est-à-dire 
    que les avantages économiques attendus de la substitution du bien excèdent les coûts associés à 
    celle-ci). <br/>
  
    <strong>B15</strong> - Si le fournisseur a le droit ou l’obligation de remplacer le bien seulement à une date donnée ou lorsque se 
    produit un événement donné, ou encore à compter de cette date ou de cet événement, son droit de 
    substitution n’est pas substantiel, car il n’a pas la capacité pratique de remplacer le bien par un autre tout au 
    long de la durée d’utilisation. <br/>
  
    <strong>B16</strong> - Pour apprécier si le droit de substitution du fournisseur est substantiel, l’entité doit se fonder sur les faits et 
    circonstances à la date de passation du contrat et ne doit pas tenir compte des événements futurs dont, à 
    cette date, la survenance n’est pas considérée comme probable. Voici des exemples d’événements futurs qui 
    ne seraient pas pris en compte dans l’appréciation du droit de substitution parce que, à la date de passation 
    du contrat, leur survenance ne serait pas considérée comme probable : 
    (a) un accord selon lequel un client futur verserait une contrepartie supérieure au taux du marché 
    pour l’utilisation du bien ; 
    (b) l’introduction d’une nouvelle technologie dont le développement n’est pas substantiel à la date de 
    passation du contrat ; 
    (c) un écart substantiel entre l’utilisation du bien par le client, ou le rendement du bien, et l’utilisation 
    ou le rendement considéré comme probable à la date de passation du contrat ; 
    (d) un écart substantiel entre le prix du bien sur le marché au cours de la durée d’utilisation et le prix 
    du bien sur le marché considéré comme probable à la date de passation du contrat. <br/>
  
    <strong>B17</strong> - Si le bien se trouve chez le client ou à tout autre endroit que chez le fournisseur, les coûts associés à la 
    substitution sont généralement plus élevés que si le bien se trouve chez le fournisseur, ce qui accroît la 
    probabilité qu’ils excèdent les avantages associés à cette substitution. <br/>
  
    <strong>B18</strong> - Le droit ou l’obligation du fournisseur de remplacer le bien lors de sa réparation ou de sa maintenance, s’il
    ne fonctionne pas correctement ou qu’une mise à niveau technique est offerte, n’empêche pas le client de 
    détenir le droit d’utiliser un bien déterminé. <br/>
  
    <strong>B19</strong> - Lorsque le client ne peut pas facilement déterminer si le fournisseur détient un droit de substitution 
    substantiel, il doit présumer que le droit de substitution du fournisseur, le cas échéant, n’est pas substantiel. <br/>
  

    <strong>B20</strong> - Une partie de la capacité d’un bien constitue un bien déterminé si elle est physiquement distincte (par 
    exemple, un étage d’un immeuble). Une partie de la capacité ou toute autre partie d’un bien qui n’est pas 
    physiquement distincte (par exemple, une partie de la capacité d’un câble à fibres optiques) ne constitue pas 
    un bien déterminé, à moins qu’elle représente la quasi-totalité de la capacité du bien et qu’elle procure de ce 
    fait au client le droit d’obtenir la quasi-totalité des avantages économiques découlant de l’utilisation du 
    bien.
    `,
    `<br/><b>B21</b> Pour contrôler l’utilisation d’un bien déterminé, le client doit détenir le droit d’obtenir la quasi-totalité des 
    avantages économiques découlant de l’utilisation du bien tout au long de la durée d’utilisation (par exemple, 
    en ayant l’usage exclusif du bien tout au long de sa durée d’utilisation). Le client peut tirer des avantages 
    économiques de l’utilisation du bien directement ou indirectement de différentes façons, notamment en 
    utilisant, détenant ou sous-louant le bien. Les avantages économiques tirés de l’utilisation du bien 
    comprennent la production principale et les sous-produits qui en sont issus (y compris les flux de trésorerie 
    découlant potentiellement de ces éléments) et les autres avantages économiques liés à l’utilisation du bien 
    qui pourraient découler d’une transaction commerciale avec une tierce partie.
    <br/><b>B22</b>  Pour apprécier si elle détient le droit d’obtenir la quasi-totalité des avantages économiques découlant de 
    l’utilisation du bien, l’entité doit considérer les avantages économiques qui découlent de l’utilisation du 
    bien dans les limites définies du droit d’utilisation du bien par le client (voir le paragraphe B30). Par 
    exemple : 
    (a) si le contrat limite l’utilisation d’un véhicule à moteur à un territoire déterminé pendant la durée 
    d’utilisation, l’entité ne doit considérer que les avantages économiques tirés de l’utilisation du 
    véhicule à moteur dans ce territoire, et non au-delà ; 
    (b) si le contrat spécifie que le client peut utiliser un véhicule à moteur jusqu’à concurrence d’un 
    kilométrage déterminé pendant la durée d’utilisation, l’entité ne doit considérer que les avantages 
    économiques tirés de l’utilisation du véhicule à moteur pour le kilométrage permis, et non au delà. 
    <br/><b>B23</b> Si le contrat exige que le client verse au fournisseur ou à un tiers, à titre de contrepartie, une part des flux de 
    trésorerie découlant de l’utilisation du bien, les flux de trésorerie versés à titre de contrepartie doivent être 
    inclus dans les avantages économiques que le client tire de l’utilisation du bien. Par exemple, si le client est 
    tenu de verser au fournisseur, en contrepartie de l’utilisation d’un espace commercial, un pourcentage des 
    ventes qu’il y réalise, cela ne l’empêche pas d’avoir le droit d’obtenir la quasi-totalité des avantages 
    économiques découlant de l’utilisation de l’espace commercial. Il est en effet considéré que les flux de 
    trésorerie découlant de ces ventes constituent des avantages économiques que le client tire de l’utilisation de 
    l’espace commercial et qu’une partie de ces flux est ensuite versée au fournisseur en contrepartie du droit 
    d’utiliser cet espace.`,

    `<i>Décisions quant à savoir comment utiliser le bien et à quelle fin l’utiliser</i> 
    <br/><b>B25</b>  Le client a le droit de décider comment utiliser le bien et à quelle fin l’utiliser s’il peut, dans les limites du 
    droit d’utilisation définies dans le contrat, apporter des changements sur ces deux plans tout au long de la 
    durée d’utilisation. Pour porter une appréciation à cet égard, l’entité considère les droits décisionnels qui 
    présentent le plus de pertinence pour ce qui est de pouvoir apporter de tels changements tout au long de la 
    durée d’utilisation. Les droits décisionnels sont pertinents lorsqu’ils ont une incidence sur les avantages 
    économiques à tirer de l’utilisation. Il est probable que les droits décisionnels les plus pertinents diffèrent 
    d’un contrat à l’autre, selon la nature du bien et les termes et conditions du contrat.
    <br/><b>B26</b>  Voici des exemples de droits décisionnels qui, selon les circonstances, confèrent au client le droit 
    d’apporter, dans les limites définies du droit d’utilisation, des changements quant à savoir comment utiliser 
    le bien et à quelle fin l’utiliser : 
    (a) le droit de changer le type de production qui résulte du bien (par exemple, le droit de décider 
    d’utiliser un conteneur pour le transport des marchandises ou pour l’entreposage, ou le droit de 
    décider de la combinaison de produits à mettre en vente dans un espace commercial) ; 
    (b) le droit de changer le moment auquel la production a lieu (par exemple, le droit de décider quand 
    un appareil ou une centrale électrique sera utilisé) ; 
    (c) le droit de changer l’endroit où la production a lieu (par exemple, le droit de décider de la 
    destination d’un camion ou d’un navire, ou le droit de décider où une pièce de matériel est 
    utilisée) ; 
    (d) le droit de lancer ou d’arrêter la production et de changer le volume de production (par exemple, 
    le droit de décider si une centrale produit ou non de l’énergie et de décider de la quantité 
    d’énergie qu’elle produit). 
    <br/><b>B27</b>  Les droits décisionnels qui ne confèrent pas au client le droit d’apporter des changements quant à savoir 
    comment utiliser le bien et à quelle fin l’utiliser comprennent par exemple les droits qui se limitent à 
    l’exploitation ou à la maintenance du bien. Ces droits peuvent être détenus par le client ou le fournisseur. 
    Bien que les droits tels que ceux relatifs à l’exploitation ou à la maintenance d’un bien soient souvent 
    essentiels à son utilisation efficace, ils ne constituent pas des droits permettant de décider comment utiliser 
    le bien et à quelle fin l’utiliser, et ils dépendent souvent des décisions prises à ces deux égards. Toutefois, le 
    droit d’exploiter un bien peut conférer au client le droit de décider de son utilisation si les décisions 
    pertinentes quant à savoir comment utiliser le bien et à quelle fin l’utiliser sont prédéterminées (voir le 
    paragraphe B24(b)(i)).<br/> 
    <i>Décisions déterminées pendant la durée d’utilisation et avant celle-ci</i>
    <br/><b>B28</b>  Les décisions pertinentes quant à savoir comment utiliser le bien et à quelle fin l’utiliser peuvent être 
    prédéterminées de nombreuses façons. Par exemple, elles peuvent être prédéterminées par la conception du 
    bien ou par des limitations d’utilisation contractuelles. 
    B29 Pour apprécier si le client a le droit de décider de l’utilisation du bien, l’entité doit uniquement tenir compte 
    des droits décisionnels qui concernent l’utilisation du bien pendant la durée d’utilisation, à moins que le 
    bien (ou des aspects particuliers du bien) ait été conçu par le client comme il est décrit au 
    paragraphe B24(b)(ii). Par conséquent, à moins que la condition du paragraphe B24(b)(ii) soit remplie, 
    l’entité ne doit pas tenir compte des décisions qui sont prédéterminées avant le début de la durée 
    d’utilisation. Par exemple, si le client a la capacité de spécifier la production du bien seulement avant le 
    début de la durée d’utilisation, il ne détient pas le droit de décider de l’utilisation de ce bien. La capacité de 
    spécifier la production dans le contrat avant le début de la durée d’utilisation, sans autres droits décisionnels 
    relatifs à l’utilisation du bien, donne au client les mêmes droits que ceux dont dispose un client achetant des 
    biens ou des services.`,
    `<br/><b>B24</b> Le client a le droit de décider de l’utilisation d’un bien déterminé tout au long de la durée d’utilisation 
    seulement dans l’une ou l’autre des situations suivantes : (b) Les décisions pertinentes quant à savoir comment utiliser le bien et à quelle fin l’utiliser sont 
    prédéterminées et l’une ou l’autre des conditions suivantes est remplie : 
    (i) le client a le droit d’exploiter le bien (ou de décider de la manière dont le bien est 
      exploité par d’autres) tout au long de la durée d’utilisation, sans que le fournisseur 
      puisse changer les consignes d’exploitation.
    `,

    `<br/><b>B24</b> Le client a le droit de décider de l’utilisation d’un bien déterminé tout au long de la durée d’utilisation 
    seulement dans l’une ou l’autre des situations suivantes : (b) Les décisions pertinentes quant à savoir comment utiliser le bien et à quelle fin l’utiliser sont 
    prédéterminées et l’une ou l’autre des conditions suivantes est remplie : 
    (ii) le client a conçu le bien (ou des aspects particuliers du bien) d’une façon qui 
    prédétermine comment l’utiliser et à quelle fin l’utiliser tout au long de la durée 
    d’utilisation. 
    `,
  
  ];
  

  const handleShowInfo = () => {
    // Afficher le modal d'informations avec le texte correspondant (en supprimant les balises HTML)
    setInfoText(infoData[currentStep]);
    setShowInfoModal(true);
  };
  

  const handleCloseInfoModal = () => {
    // Fermer le modal d'informations
    setShowInfoModal(false);
  };

  const questions = [
    {
      question: "Question 1",
      description: "Y a-t-il un bien déterminé ?",
      answers: ["Oui", "Non"]
    },
    {
      question: "Question 2",
      description: "Le client détient-il le droit d’obtenir la quasi-totalité des avantages économiques découlant de l’utilisation du bien tout au long de la durée d’utilisation ?",
      answers: ["Oui", "Non"]
    },
    {
      question: "Question 3",
      description: "Qui a le droit de décider comment utiliser le bien et à quelle fin l’utiliser tout au long de la durée d’utilisation ?",
      answers: ["Client", "Fournisseur", "Ni l'un ni l'autre"]
    },
    {
      question: "Question 4",
      description: "Le client a-t-il le droit d’exploiter le bien tout au long de la durée d’utilisation, sans que le fournisseur puisse changer les consignes d’exploitation ?",
      answers: ["Oui", "Non"]
    },
    {
      question: "Question 5",
      description: "Le bien a-t-il été conçu par le client d’une façon qui prédétermine comment le bien sera utilisé et à quelle fin il le sera tout au long de la durée d’utilisation ?",
      answers: ["Oui", "Non"]
    }
  ];

  return (
    <>
      <Button onClick={handleShowModal}>Répondre au questionnaire</Button>
      <Modal
        title="Eligibilité du contrat"
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
            <Step key={index} title={""} style={{ padding: "0px" }} />
          ))}
        </Steps>

        <Divider />
        <Row style={{ margin: 0, padding: 0 }}>
          <Col span={24}>
            {currentStep < questions.length && (
              <>
                <h6 style={{ margin: 0, padding: 0, textAlign: 'center' }}>
                  {questions[currentStep].question}
                </h6>
                <br />
                <p>
                  <h5
                    style={{
                      margin: 0,
                      padding: 0,
                      textAlign: 'center',
                    }}
                  >
                    {questions[currentStep].description}
        
                    {/* Bouton "Voir les informations" */}
                    <Button type="link" onClick={handleShowInfo}>
                    <Tooltip
                  
                      placement="right"
                    >
                      {/* Icône d'infobulle à côté de la question */}
                      <QuestionCircleFilled
                        style={{color: 'rgba(10,150,255,1)',fontSize:25 }}
                      />
                    </Tooltip>
                    </Button>
                  </h5>
                </p>
                <p align="center">
                  <Radio.Group
                    onChange={(e) => handleAnswer(e.target.value)}
                    value={answers[currentStep]}
                  >
                    {questions[currentStep].answers.map((a, index) => (
                      <Radio.Button
                        key={index}
                        value={a}
                        checked={answers[currentStep] === a}
                      >
                        {a}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </p>
              </>
            )}
          </Col>
        </Row>
      </Modal>

      {/* Modal d'informations */}
      <Modal
        title="Paragraphes de la norme IFRS 16"
        visible={showInfoModal}
        onCancel={handleCloseInfoModal}
        onOk={handleCloseInfoModal}
        width='800px'
        style={{position:'relative', top:"15px"}}
      >
        {/* Texte des informations */}
        <div dangerouslySetInnerHTML={{ __html: infoText }} />
      </Modal>
    </>
  );
};

export default QuestionnaireContrat;
