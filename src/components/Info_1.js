import React, { useState } from 'react';
import { Form, Input, InputNumber, Row, Col,Divider } from 'antd';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Info_1 = () => {
    const [focus, setFocus] = useState('');
  
    const onFocus = (e) => {
      setFocus(e.target.name);
    };
  
    const onBlur = () => {
      setFocus('');
    };
  
    return (
      <div className="Info_1">
        <Divider orientation="right">Identification du bien</Divider>
 
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="preneur"
                rules={[
                  {
                    required: true,
                    message: 'Preneur est requis',
                  },
                ]}
              >
                <Input
                  placeholder="Preneur"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  bordered={focus !== 'preneur'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="descriptionLocation"
                rules={[
                  {
                    required: true,
                    message: 'Description de la location est requise',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Description de la location"
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  bordered={focus !== 'descriptionLocation'}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="referenceContrat"
                rules={[
                  {
                    required: true,
                    message: 'Reference contrat est requise',
                  },
                ]}
              >
                <Input
                  placeholder="Reference contrat"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  bordered={focus !== 'referenceContrat'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="referenceBien"
                rules={[
                  {
                    required: true,
                    message: 'Reference du bien est requise',
                  },
                ]}
              >
                <Input
                  placeholder="Reference du bien"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  bordered={focus !== 'referenceBien'}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categorieImmobiliations"
                rules={[
                  {
                    required: true,
                    message: "Catégorie d'immobilisations est requise",
                  },
                ]}
              >
                <Input
                  placeholder="Catégorie d'immobilisations :"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  bordered={focus !== 'categorieImmobiliations'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dureeUtilite"
                rules={[
                  {
                    required: true,
                    message: "Durée standard d'utilité est requise",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  placeholder="Durée standard d'utilité (en mois)"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  bordered={focus !== 'dureeUtilite'}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
  
  
  


export default Info_1;