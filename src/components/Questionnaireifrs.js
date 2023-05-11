
import {Col,Row} from 'antd';
import QuestionsIFRS from '../../src/components/Questions_ifrs';





const QuestionnaireContrat = () => (
    <Row gutter={16}>
        
        <Col span={12} >
            <div>
                <QuestionsIFRS />
            </div>
            
        </Col>

     
        <Col style={{borderLeft:"1.5px solid rgba(1,1,1,0.1)",}} span={12}>
            
            <div>
           
            </div>
         

        </Col>

  </Row>
);
export default QuestionnaireContrat;