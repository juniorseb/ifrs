import { Button, message, Steps, theme,Divider } from 'antd';

import { useState } from 'react';
import Informations_Contrat from '../../components/Info_Contrat_1';
import "./NouveauContrat.css"
import Informations_Contrat_2 from '../../components/Info_Contrat_2';
import QuestionnaireContrat from '../../components/Questionnaireifrs';

const steps = [
  {
    title: 'Informations du contrat (1/2)',
    content: <Informations_Contrat />,
  },
  {
    title: 'Informations du contrat (2/2)',
    content: <Informations_Contrat_2 />,
  },
  {
    title: 'Questionnaire IFRS 16',
    content: <QuestionnaireContrat />,
  },
];

const Nouveau_Contrat = () => {
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
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
      padding:5,
    
    };
    
    return (
      <>
      <div style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)',
      marginTop: current === 1 ? '-18px' : 0,
      marginBottom: current === 1 ? '0px' : 0
    }} className=" border border bg-white p-5 pt-3 pb-3 ">
           <Divider orientation="left"><h5>Nouveau contrat</h5></Divider>
          
           
        
        <Steps current={current} items={items} />
      
        <div style={contentStyle}>{steps[current].content}</div>
        <br/>
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
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
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