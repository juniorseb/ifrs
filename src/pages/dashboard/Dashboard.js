
import React, { useState, useEffect, } from 'react';
import { ArrowUpOutlined,CopyTwoTone,HourglassTwoTone } from '@ant-design/icons';
import { Card, Col, Row, Statistic,  } from 'antd';
import DemoDualAxes from '../../components/DualAxes';
import TableDash from '../../components/TableDashboardFil';
import "./Dashboard.css"
import { Pie } from '@ant-design/plots';



const Dashboard = () => {

  const [data, setData] = useState([]);
  const [dataEligibles, setDataEligibles] = useState([]);
  const [dataExempt, setDataExempt] = useState([]);


  const cardHeadStyle = {
    color: "white",
     background: "#0ba30acc",
  };
  const cardHeadStyleBloc = {
    

     borderBottom:"",
  
  };
  const cardHeadStyleStat = {
    color: "white",
     background: "#0449af",
  };

  
  const fetchInitialData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contrats');
      if (response.ok) {
        const initialData = await response.json();
        const eligibleContrats = initialData.filter((contrat) => contrat.statut_contrat === 'éligible');
        const exemptionContrats = initialData.filter((contrat) => contrat.statut_contrat_exempt === 'exempté');
        setDataExempt(exemptionContrats)
        setData(initialData);
        setDataEligibles(eligibleContrats)
        console.log('Initial data fetched successfully');
      } else {
        console.log('Failed to fetch initial data');
      }
    } catch (error) {
      console.error('Error occurred while fetching initial data', error);
    }
  };
  useEffect(() => {
    fetchInitialData();
  }, [data]);


  
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
          value={data.length}
          precision={0}
          valueStyle={{ color: '#3f8600' }}
        />
      </Card>

    </Col>
    <Col span={6}>
      <Card 
        title={
          <span>
            Contrats éligbles
          </span>
        }
        headStyle={cardHeadStyleBloc}
        className='border border' bordered={false} style={{ color: 'green', boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <Statistic
        
          titleStyle={{ color: 'green' }}
          value={dataEligibles.length}
          precision={0}
          valueStyle={{ color: '#3f8600' }}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card 
          title="Taux d'éligibilité"
          headStyle={cardHeadStyleBloc}
        className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <Statistic
    
          value={((dataEligibles.length/data.length)*100)}
          precision={0}
          valueStyle={{
            color: 'green',
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card  
      headStyle={cardHeadStyleBloc}
      title="Taux d'exemption"
      className='border border' bordered={false} style={{ maxHeight:'150px', boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
      <Statistic
        
          value={((dataExempt.length/data.length)*100)}
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
