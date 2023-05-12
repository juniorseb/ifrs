import React, { useState } from 'react';
import { Form, Row, Col, Radio, Button } from 'antd';

const QuestionsIFRS = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    console.log(values); // Log the form values
    setSubmitting(false);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="q1" label="Y a-t-il un bien déterminé?">
            <Radio.Group>
              <Radio.Button value="Oui">Oui</Radio.Button>
              <Radio.Button value="Non">Non</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="q2"
            label="Le client détient-il le droit d’obtenir la quasi-totalité des avantages économiques découlant de l’utilisation du bien tout au long de la durée d’utilisation?"
          >
            <Radio.Group>
              <Radio.Button value="Oui">Oui</Radio.Button>
              <Radio.Button value="Non">Non</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="q3"
            label="Qui a le droit de décider comment utiliser le bien et à quelle fin l’utiliser tout au long de la durée d’utilisation : le client, le fournisseur ou ni l’un ni l’autre?"
          >
            <Radio.Group>
              <Radio.Button value="Client">Le client</Radio.Button>
              <Radio.Button value="Fournisseur">Le fournisseur</Radio.Button>
              <Radio.Button value="Aucun">Ni l'un ni l'autre</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="q4"
            label="Le client a-t-il le droit d’exploiter le bien tout au long de la durée d’utilisation, sans que le fournisseur puisse changer les consignes d’exploitation?"
          >
            <Radio.Group>
              <Radio.Button value="Oui">Oui</Radio.Button>
              <Radio.Button value="Non">Non</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="q5"
            label="Le bien a-t-il été conçu par le client d’une façon qui prédétermine comment le bien sera utilisé et à quelle fin il le sera tout au long de la durée d’utilisation?"
          >
            <Radio.Group>
              <Radio.Button value="Oui">Oui</Radio.Button>
              <Radio.Button value="Non">Non</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="q6" label="Le contrat concerné contient-il un contrat de location?">
<Radio.Group>
<Radio.Button value="Oui">Oui</Radio.Button>
<Radio.Button value="Non">Non</Radio.Button>
</Radio.Group>
</Form.Item>
</Col>
<Col span={12}>
<Form.Item name="q7" label="Contrat conclu en cours d'exercice (2022)?">
<Radio.Group>
<Radio.Button value="Oui">Oui</Radio.Button>
<Radio.Button value="Non">Non</Radio.Button>
</Radio.Group>
</Form.Item>
</Col>
</Row>
<Row gutter={16}>
    <Col span={12}>
      <Form.Item name="q8" label="Durée résiduelle du contrat en jours au 31/12/2022 pour les contrats conclus en 2022">
        <Radio.Group>
          <Radio.Button value="0-30">0-30 jours</Radio.Button>
          <Radio.Button value="31-90">31-90 jours</Radio.Button>
          <Radio.Button value="91-180">91-180 jours</Radio.Button>
          <Radio.Button value="181-365">181-365 jours</Radio.Button>
          <Radio.Button value="plus365">Plus de 365 jours</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="q9" label="Contrat de location à court terme conclu au cours de l'exercice">
        <Radio.Group>
          <Radio.Button value="Oui">Oui</Radio.Button>
          <Radio.Button value="Non">Non</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="q10" label="Valeur à l'état neuf du bien sous-jacent inférieur à 5000 usd?">
        <Radio.Group>
          <Radio.Button value="Oui">Oui</Radio.Button>
          <Radio.Button value="Non">Non</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="q11" label="Contrat de location dont le bien sous-jacent est de faible valeur">
        <Radio.Group>
          <Radio.Button value="Oui">Oui</Radio.Button>
          <Radio.Button value="Non">Non</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="q12" label="Existe-t-il une composante location et une composante services?">
        <Radio.Group>
          <Radio.Button value="Oui">Oui</Radio.Button>
          <Radio.Button value="Non">Non</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="q13" label="Le contrat est-il de courte durée?">
        <Radio.Group>
          <Radio.Button value="Oui">Oui</Radio.Button>
          <Radio.Button value="Non">Non</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Col>
  </Row>

  <Form.Item>
    <Button type="primary" htmlType="submit" disabled={submitting}>
      Submit
    </Button>
  </Form.Item>

</Form>

)
};
export default QuestionsIFRS;
