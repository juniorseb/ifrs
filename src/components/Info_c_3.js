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

const Info_3 = ({ updateContratInfo }) => {
  const [focus, setFocus] = useState('');
  const [formData, setFormData] = useState({});

  const onFocus = (e) => {
    setFocus(e.target.name);
  };

  const onBlur = () => {
    setFocus('');
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
   
    const formData = allValues.reduce((acc, field) => {
      const fieldName = field.name[0];
      const fieldValue = field.value;
      acc[fieldName] = fieldValue;
      return acc;
    }, {});


    updateContratInfo({'info_3':formData})

  };

  return (
    <div className="Info_3" style={{ margin: '10px' }}>
      <Divider className='mb-4' orientation="center">Loyer &amp; Suite</Divider>
     
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        onFieldsChange={handleFormChange}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant du loyer mensuel "
              name="loyerMensuel"
              rules={[
                {
                  required: true,
                  message: 'Montant du loyer mensuel est requis',
                },
              ]}
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant de l'avance "
              name="avance"
              rules={[
                {
                  required: false,
                  message: "Montant de l'avance est requis",
                },
              ]}
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant de la franchise de loyer "
              name="franchiseLoyer"
              rules={[
                {
                  required: false,
                  message: 'Montant de la franchise de loyer est requis',
                },
              ]}
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Option"
              name="option"
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
       
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant de la caution "
              name="caution"
              rules={[
                {
                  required: false,
                  message: 'Montant de la caution est requis',
                },
              ]}
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant des frais d'enregistrement et de dossiers "
              name="fraisEnregistrement"
              rules={[
                {
                  required: true,
                  message:
                    "Montant des frais d'enregistrement et de dossiers est requis",
                },
              ]}
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Taux d'interet (facultatif)"
              name="tauxInteret"
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant du prix de vente"
              name="prixVente"
            >
              <InputNumber className="inputLogin" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
    
          <Col span={8}>
            <Form.Item
              className="custom-input-number"
              label="Montant de garantie "
              name="montantGarantie"
              rules={[
                {
                  required: false,
                  message: 'Montant de garantie est requis',
                },
              ]}
            >
              <InputNumber
                className="inputLogin"
                style={{ width: '100%' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'montantGarantie'}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="custom-select"
              label="Type de garantie "
              name="typeGarantie"
              rules={[
                {
                  required: false,
                  message: 'Type de garantie est requis',
                },
              ]}
            >
              <Select
                placeholder="Sélectionnez le type de garantie"
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'typeGarantie'}
                style={{borderRadius: '8px',border:"0.1px solid rgba(1,1,1,0.5)"}}
              >
                <Option value="cautionBancaire">Caution bancaire</Option>
                <Option value="depotGarantie">Dépôt de garantie</Option>
                <Option value="autre">Autre</Option>
              </Select>
            </Form.Item>
          </Col>
     
          <Col span={8}>
            <Form.Item
              className="custom-input"
              label="Commentaires"
              name="commentaires"
            >
              <TextArea
                placeholder="Commentaires"
                autoSize={{ minRows: 1, maxRows: 6 }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'commentaires'}
                className="inputLogin"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Info_3;
