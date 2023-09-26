import {Col,Row} from 'antd';
import Info_2 from '../../src/components/Info_c_2';
import Info_3 from './Info_c_3';




const Informations_Contrat_2 =  ({ updatecontratDataX,formValues }) => (
    <Row gutter={16}>
        
        <Col span={24} >
            <div>
                <Info_2 formValues={formValues} updateContratInfo={updatecontratDataX}/>
            </div>
            
        </Col>

     
        <Col  span={24}>
            
            <div>
                <Info_3 formValues={formValues} updateContratInfo={updatecontratDataX}/>
            </div>
         

        </Col>

  </Row>
);
export default Informations_Contrat_2;