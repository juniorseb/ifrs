import { Button, message, Steps, theme } from 'antd';

import { useState } from 'react';
import Informations_Contrat from '../../components/Info_Contrat';
const steps = [
  {
    title: 'Informations du contrat',
    content: <Informations_Contrat />,
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
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
      <div  style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }} className=" border border bg-white p-5 rounded">
            <h3>Nouveau Contrat</h3>
            <br/>
        
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
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