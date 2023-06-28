import { Card, Tabs, Table, Modal, Form, Input, Button, Popconfirm,Row,Col } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './Administration.css'
import Codification from '../../components/CodificationTable';
import Preneur from '../../components/PreneurTable';


const Administration = () => {

  const { TabPane } = Tabs;

  return (
    <div className="bg-white p-5">
      <Tabs defaultActiveKey="1" type="card" size={'large'}>
        <TabPane tab="Preneur" key="1">
            <Preneur />
        </TabPane>

        <TabPane tab="Codification" key="2">
            <Codification/>
        </TabPane>


      </Tabs>
      
    </div>
  );
};

export default Administration;
