
import {Col,Row} from 'antd';
import Info_2 from '../../src/components/Info_c_2';
import Info_3 from './Info_c_3';




const Informations_Contrat_2 = () => (
    <Row gutter={16}>
        
        <Col span={12} >
            <div>
                <Info_2/>
            </div>
            
        </Col>

     
        <Col style={{borderLeft:"1.5px solid rgba(1,1,1,0.1)",}} span={12}>
            
        <div>
                <Info_3/>
            </div>
         

        </Col>

  </Row>
);
export default Informations_Contrat_2;