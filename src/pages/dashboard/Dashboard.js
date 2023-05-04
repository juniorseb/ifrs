
import React from 'react';
import { ArrowDownOutlined} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import DemoDualAxes from '../../components/DualAxes';
import TableDash from '../../components/TableDashboardFil';


const Dashboard = () => {
 

  return (
    <div>
    <Row gutter={16}>
    <Col span={12}>
    <Card className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
      <Statistic
        title="Contrats"
        value={7}
        precision={0}
        valueStyle={{
          color: '#3f8600',
        }}
       
        
      />
    </Card>

    </Col>
    <Col span={12}>
      <Card className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <Statistic
          title="Taux de contrats non-conformes"
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
  </Row>
  <br />
  <Row gutter={16}>
    <Col span={12}>
      <Card className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <DemoDualAxes />
      </Card>
    </Col>

    <Col span={12}>
      <Card className='border border' bordered={false} style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)' }}>
        <TableDash />
      </Card>
    </Col>

  </Row>
  </div>
  );
};

export default Dashboard;
