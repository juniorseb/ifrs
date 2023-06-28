import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Row, Col, DatePicker, Select, Divider } from 'antd';
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

const Info_2 = ({ updateContratInfo }) => {
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


    updateContratInfo({'info_2':formData})

  };

  return (
    <div className="Info_2" style={{margin:"10px"}}>
      <Divider className='mb-5' orientation="right">Caractéristiques du contrat</Divider>
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
        <Row gutter={16} >
          <Col span={4}>

          <Form.Item
                className="custom-input"
                label="Type de contrat"
                name="typeContrat"
                rules={[
                  {
                    required: true,
                    message: 'Type de contrat est requis',
                  },
                ]}
            
              >
                <Select
                  style={{ width: '100%', borderRadius: '7px',border:"0.01px solid rgba(1,1,1,0.5)" }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  
                  bordered={focus !== 'typeContrat'}
                >
                  <Option value="locationSimple">Location simple</Option>
                  <Option value="creditBail">Crédit bail</Option>
                  <Option value="contratService">Contrat service</Option>
                  <Option value="locationFinanciere">Location financière</Option>
                  <Option value="leaseBack">Lease back</Option>
                  <Option value="lld">LLD</Option>
                  <Option value="locationInterco">Location interco</Option>
                  <Option value="conventionBail">Convention bail</Option>
                </Select>
            </Form.Item>

          </Col>
          <Col span={4}>
            <Form.Item className="custom-input" label="Bailleur" name="bailleur" rules={[
              {
                required: true,
                message: 'Bailleur est requis',
              },
            ]}>
              <Input
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'bailleur'}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
        

        
          <Col span={4}>
            <Form.Item className="custom-input" label="Concessionnaire" name="concessionnaire" rules={[
              {
                required: false,
                message: 'Concessionnaire est requis',
              },
            ]}>
              <Input
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'concessionnaire'}
                className="inputLogin"
                
                 
              />
            </Form.Item>
          </Col>
        
          <Col span={4}>
            <Form.Item className="custom-datepicker" label="Signature du contrat" name="dateSignatureContrat" rules={[
              {
                required: false,
                message: 'Date de signature du contrat est requise',
              },
            ]}
            >
              <DatePicker
             
                 style={{ width: '100%', borderRadius:'5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'dateSignatureContrat'}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
      

      
          <Col span={4}>
            <Form.Item className="custom-datepicker" label="Début de l'échéance" name="dateDebutEcheance" rules={[
              {
                required: true,
                message: 'Date de début de l\'échéance est requise',
              },
            ]}>
              <DatePicker
                 style={{ width: '100%', borderRadius:'5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'dateDebutEcheance'}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item className="custom-datepicker" label="Date de fin de l'échéance" name="dateFinEcheance" rules={[
              {
                required: true,
                message: 'Date de fin de l\'échéance est requise',
              },
            ]}>
              <DatePicker
                 style={{ width: '100%', borderRadius:'5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'dateFinEcheance'}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={4}>
            <Form.Item className="custom-input-number" label="Durée du contrat (mois)" name="dureeContratMois" rules={[
              {
                required: true,
                message: 'Durée du contrat est requise',
              },
            ]}>
              <InputNumber
                 style={{ width: '100%', borderRadius:'5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'dureeContratMois'}
                min={1}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item className="custom-select" label="Période de paiement" name="paiementDebutFin" rules={[
              {
                required: true,
                message: 'Paiement début/fin de période est requis',
              },
            ]}
         >
              <Select
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'paiementDebutFin'}
               style={{borderRadius: '8px',}}
                 
              >
                <Option value="debut">Début de période</Option>
                <Option value="fin">Fin de période</Option>
              </Select>
            </Form.Item>
          </Col>
      

        
          <Col span={4}>
            <Form.Item className="custom-select" label="Périodicité" name="periodicite" rules={[
              {
                required: true,
                message: 'Périodicité est requise',
              },
            ]}>
              <Select
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'periodicite'}
                style={{borderRadius: '8px',}}
                 
              >
                <Option value="mensuelle">Mensuelle</Option>
                <Option value="trimestrielle">Trimestrielle</Option>
                <Option value="annuelle">Annuelle</Option>
              </Select>
            </Form.Item>
          </Col>

       
          <Col span={4}>
            <Form.Item className="custom-input-number" label="Taux de révision" name="tauxRevision" rules={[
              {
                required: false,
                message: 'Taux de révision est requis',
              },
            ]}>
              <InputNumber
                 style={{ width: '100%', borderRadius:'5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'tauxRevision'}
                min={0}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
      
          <Col span={4}>
            <Form.Item className="custom-select" label="Tacite reconduction" name="taciteReconduction" rules={[
              {
                required: true,
                message: 'Tacite reconduction est requis',
              },
            ]}>
              <Select
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'taciteReconduction'}
                style={{borderRadius: '8px',}}
              >
                <Option value="O">Oui</Option>
                <Option value="N">Non</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item className="custom-datepicker" label="Echéance tacite" name="echeanceTaciteReconduction" rules={[
              {
                required: false,
                message: 'Echéance tacite reconduction est requise',
              },
            ]}>
              <DatePicker
                 style={{ width: '100%', borderRadius:'5px' }}
                onFocus={onFocus}
                onBlur={onBlur}
                bordered={focus !== 'echeanceTaciteReconduction'}
                className="inputLogin"
                 
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Info_2;
