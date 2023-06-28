import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Divider, Select } from 'antd';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Info_1 = ({ updateContratInfo }) => {
  const [preneurs, setPreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [immobilisations, setImmobilisations] = useState([]);

  const [formData, setFormData] = useState({});



  useEffect(() => {
 
    // Effectuez la requête API pour récupérer les données des preneurs
    fetch('http://127.0.0.1:5000/api/preneurs')
      .then(response => response.json())
      .then(data => {
        setPreneurs(data);
        setLoading(false);
      
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des preneurs:', error);
        setLoading(false);
      });
  }, []);

  const onFocus = (e) => {
    e.currentTarget.parentElement.classList.add('focused');
  };

  const onBlur = (e) => {
    if (e.currentTarget.value === '') {
      e.currentTarget.parentElement.classList.remove('focused');
    }
  };



  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/codifications')
      .then(response => response.json())
      .then(data => setImmobilisations(data));
  }, []);



  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
   
    const formData = allValues.reduce((acc, field) => {
      const fieldName = field.name[0];
      const fieldValue = field.value;
      acc[fieldName] = fieldValue;
      return acc;
    }, {});


    updateContratInfo({'info_1':formData})

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
        onFieldsChange={handleFormChange}
        
       
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              className=""
              label="Preneur"
              name="preneur"
              rules={[
                {
                  required: true,
                  message: 'Preneur est requis',
                },
              ]}
            >
              <Select
                loading={loading}
                style={{ width: '100%', borderRadius: '8px', border: '0.3px solid rgba(1,1,1,0.5)' }}
                className="inputLogin"
              >
                {preneurs.map(preneur => (
                  <Option key={preneur.id_preneur} value={preneur.id_preneur}>
                    {preneur.Nom_Preneur}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="custom-input"
              label="Description de la location"
              name="descriptionLocation"
              rules={[
                {
                  required: true,
                  message: 'Description de la location est requise',
                },
              ]}
            >
              <Input.TextArea
                style={{ width: '100%', borderRadius: '5px' }}
                autoSize={{ minRows: 1, maxRows: 6 }}
                onFocus={onFocus}
                onBlur={onBlur}
                className="inputLogin"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              className="custom-input"
              label="Reference contrat"
              name="referenceContrat"
              rules={[
                {
                  required: true,
                  message: 'Reference contrat est requise',
                },
              ]}
            >
              <Input
                style={{ width: '100%', borderRadius: '5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                className="inputLogin"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="custom-input"
              label="Reference du bien"
              name="referenceBien"
              rules={[
                {
                  required: true,
                  message: 'Reference du bien est requise',
                },
              ]}
            >
              <Input
                style={{ width: '100%', borderRadius: '5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                className="inputLogin"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              className="custom-input"
              label="Catégorie d'immobilisations"
              name="categorieImmobiliations"
              rules={[
                {
                  required: true,
                  message: "Catégorie d'immobilisations est requise",
                },
              ]}
            >
              <Select
                style={{ width: '100%', borderRadius: '8px', border: '0.3px solid rgba(1,1,1,0.5)' }}
                onFocus={onFocus}
                onBlur={onBlur}
                className="inputLogin"
              >
                {immobilisations.map(option => (
                  <Option key={option.id} value={option.id}>
                    {option.Libelle}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="custom-input-number"
              label="Durée standard d'utilité (en mois)"
              name="dureeUtilite"
              rules={[
                {
                  required: false,
                  message: "Durée standard d'utilité est requise",
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%', borderRadius: '5px' }}
                min={1}
                onFocus={onFocus}
                onBlur={onBlur}
                className="inputLogin"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Info_1;
