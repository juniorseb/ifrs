
import React from 'react';
import { ArrowDownOutlined,CopyTwoTone,HourglassTwoTone } from '@ant-design/icons';
import { Card, Col, Row, Statistic,  } from 'antd';
import DemoDualAxes from '../../components/DualAxes';
import TableDash from '../../components/TableDashboardFil';
import "./Dashboard.css"



const Dashboard = () => {
  const cardHeadStyle = {
    color: "white",
     background: "#0ba30acc",
  };
  const cardHeadStyleBloc = {
    
     background: "#d9ffe59c",
     borderBottom:"",
     color:"#0a387b"
  };
  const cardHeadStyleStat = {
    color: "white",
     background: "#0449af",
  };

  return (
    <div>
    <Row gutter={16}>
    <Col span={6}>
    <Card
        title={
          <span>
            Contrats 
          </span>
          
        }
        headStyle={cardHeadStyleBloc}
        className='border border'
        bordered={false}
        style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}
      >
        <Statistic
          value={7}
          precision={0}
          valueStyle={{ color: '#3f8600' }}
        />
      </Card>

    </Col>
    <Col span={6}>
      <Card 
        title={
          <span>
            En cours 
          </span>
        }
        headStyle={cardHeadStyleBloc}
        className='border border' bordered={false} style={{ color: 'green', boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <Statistic
        
          titleStyle={{ color: 'green' }}
          value={3}
          precision={0}
          valueStyle={{ color: '#3f8600' }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card 
          title="Taux de contrats non-conformes"
          headStyle={cardHeadStyleBloc}
        className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <Statistic
    
          value={2}
          precision={0}
          valueStyle={{
            color: '#cf1322',
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card  
      headStyle={cardHeadStyleBloc}
      title="Taux de contrats à terme"
      className='border border' bordered={false} style={{ maxHeight:'150px', boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
      <Statistic
        
          value={30}
          precision={0}
          valueStyle={{
            color: '#cf1322',
          }}
         
          suffix="%"
        />
       
      </Card>
    </Col>
  </Row>
  <br />
  <Row gutter={16}>
    <Col span={12}>
      <Card 
       title="Statistiques des contrats"
       headStyle={cardHeadStyleStat}
      className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <DemoDualAxes />
      </Card>
    </Col>

    <Col className='rounded' span={12} style={{ maxHeight: '425px', overflow: 'auto' }}>
      
 
      <Card 
      title="Contrats à terme "
      headStyle={cardHeadStyle}
      className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
    
        <TableDash />
      </Card>

      <br/>

      <Card 
      title="Top 3 - Contrats"
      headStyle={cardHeadStyle}
      extra={<a style={{textDecoration:"none", color:"white"}} href="/contratheque"> {">>"}</a>}
      className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
    
        <TableDash />
      </Card>

    </Col>


  </Row>
  </div>
  );
};

export default Dashboard;
