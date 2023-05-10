
import React from 'react';
import { ArrowDownOutlined,CopyTwoTone,HourglassTwoTone } from '@ant-design/icons';
import { Card, Col, Row, Statistic,  } from 'antd';
import DemoDualAxes from '../../components/DualAxes';
import TableDash from '../../components/TableDashboardFil';



const Dashboard = () => {
 

  return (
    <div>
    <Row gutter={16}>
    <Col span={6}>
    <Card
        title={
          <span>
            Contrats <CopyTwoTone style={{ marginLeft: '8px', color: '#1890ff', fontSize:"25px" }} />
          </span>
        }
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
            En cours <HourglassTwoTone style={{ marginLeft: '8px', color: '#1890ff', fontSize:"25px" }} />
          </span>
        }
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
      className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <DemoDualAxes />
      </Card>
    </Col>

    <Col className='rounded' span={12} style={{ maxHeight: '425px', overflow: 'auto' }}>
      
 
      <Card className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <p className='text-primary'><b>Contrats à terme </b></p>
        <TableDash />
      </Card>
      <br/>
      <Card 
      title="Top 3 - Contrats"
      extra={<a style={{textDecoration:"none"}} href="/contratheque"> {">>"}</a>}
      className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
    
        <TableDash />
      </Card>

    </Col>


  </Row>
  </div>
  );
};

export default Dashboard;
