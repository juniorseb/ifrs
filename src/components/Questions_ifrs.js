import React, { useState } from 'react';
import { Form, Input, InputNumber, Row, Col, DatePicker, Select, Divider } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const layout = {
labelCol: {
span: 24,
},
wrapperCol: {
span: 24,
},
};

const QuestionsIFRS = () => 

{
        const [focus, setFocus] = useState('');

        const onFocus = (e) => {
        setFocus(e.target.name);
        };

        const onBlur = () => {
        setFocus('');
        };

        return (
  
            <div className="QuestionsIFRS">
                <Divider orientation="right">Loyer</Divider>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={() => {}}
                    onFinishFailed={() => {}}
                >
                
                   <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item name="loyerMensuel">
                            <InputNumber style={{width:"100%"}} placeholder="Montant du loyer mensuel" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item  name="avance">
                            <InputNumber style={{width:"100%"}} placeholder="Montant de l'avance" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item  name="franchiseLoyer">
                            <InputNumber style={{width:"100%"}} placeholder="Montant de la franchise de loyer" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item  name="option">
                            <InputNumber style={{width:"100%"}} placeholder="Option (facultatif)" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item  name="caution">
                            <InputNumber style={{width:"100%"}} placeholder="Montant de la caution" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item  name="fraisEnregistrement">
                            <InputNumber style={{width:"100%"}} placeholder="Montant des frais d'enregistrement et de dossiers" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item  name="tauxInteret">
                            <InputNumber style={{width:"100%"}} placeholder="Taux d'interet (facultatif)" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item  name="prixVente">
                            <InputNumber style={{width:"100%"}} placeholder="Montant du prix de vente (facultatif)" />
                          </Form.Item>
                        </Col>
                      </Row>

                    </Form>
                </div>
      
        );

};

export default QuestionsIFRS;

