import { Tabs, Badge } from 'antd';
import React, { useState, useEffect } from 'react';
import './Contratheque.css';
import ContratsEligibles from '../../components/ContratsElgiblesTable';

const Contratheque = () => {
  const { TabPane } = Tabs;
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white p-5">
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane
          tab={
            <span style={{ color: 'green' }}>
              Contrats traités {' '}
              <Badge color="green" className={isBlinking ? 'badge-blink' : ''} />
            </span>
          }
          key="1"
        >
          <ContratsEligibles />
        </TabPane>

  
      </Tabs>
    </div>
  );
};

export default Contratheque;
