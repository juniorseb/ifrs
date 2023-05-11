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

const Info_2 = () => 

{
        const [focus, setFocus] = useState('');

        const onFocus = (e) => {
        setFocus(e.target.name);
        };

        const onBlur = () => {
        setFocus('');
        };

        return (
  
            <div className="Info_2">
                <Divider orientation="right">Caractéristiques du contrat</Divider>
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
                        name="typeContrat"
                        rules={[
                            {
                            required: true,
                            message: 'Type de contrat est requis',
                            },
                        ]}
                        >
                        <Input
                            placeholder="Type de contrat"
                            onFocus={onFocus}
                            onBlur={onBlur}
                            bordered={focus !== 'typeContrat'}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="bailleur"
                        rules={[
                            {
                            required: true,
                            message: 'Bailleur est requis',
                            },
                        ]}
                        >
                        <Input
                            placeholder="Bailleur"
                            onFocus={onFocus}
                            onBlur={onBlur}
                            bordered={focus !== 'bailleur'}
                        />
                        </Form.Item>
                    </Col>
                    </Row>

                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="concessionnaire"
                        rules={[
                            {
                            required: true,
                            message: 'Concessionnaire est requis',
                            },
                        ]}
                        >
                        <Input
                            placeholder="Concessionnaire"
                            onFocus={onFocus}
                            onBlur={onBlur}
                            bordered={focus !== 'concessionnaire'}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="dateSignatureContrat"
                        rules={[
                            {
                            required: true,
                            message: 'Date de signature du contrat est requise',
                            },
                        ]}
                        >
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Date de signature du contrat"
                            onFocus={onFocus}
                            onBlur={onBlur}
                            bordered={focus !== 'dateSignatureContrat'}
                        />
                        </Form.Item>
                    </Col>
                    </Row>

                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="dateDebutEcheance"
                        rules={[
                            {
                            required: true,
                            message: 'Date de début de l\'échéance est requise',
                            },
                        ]}
                        >
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Date de début de l'échéance"
                            onFocus={onFocus}
                            onBlur={onBlur}
                            bordered={focus !== 'dateDebutEcheance'}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="dateFinEcheance"
                        rules={[
                            {
                            required: true,
                            message: 'Date de fin de l\'échéance est requise',
                            },
                            ]}
                            >
                            <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Date de fin de l'échéance"
                            onFocus={onFocus}
                            onBlur={onBlur}
                            bordered={focus !== 'dateFinEcheance'}
                            />
                            </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    name="dureeContratMois"
                    rules={[
                        {
                        required: true,
                        message: 'Durée du contrat est requise',
                        },
                    ]}
                    >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Durée du contrat (mois)"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        bordered={focus !== 'dureeContratMois'}
                        min={1}
                    />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="paiementDebutFin"
                    rules={[
                        {
                        required: true,
                        message: 'Paiement début/fin de période est requis',
                        },
                    ]}
                    >
                    <Select
                        placeholder="Paiement début/fin de période"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        bordered={focus !== 'paiementDebutFin'}
                    >
                        <Option value="debut">Début de période</Option>
                        <Option value="fin">Fin de période</Option>
                    </Select>
                    </Form.Item>
                </Col>
                </Row>

                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    name="periodicite"
                    rules={[
                        {
                        required: true,
                        message: 'Périodicité est requise',
                        },
                    ]}
                    >
                    <Select
                        placeholder="Périodicité (mensuelle/trimestrielle/annuelle)"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        bordered={focus !== 'periodicite'}
                    >
                        <Option value="mensuelle">Mensuelle</Option>
                        <Option value="trimestrielle">Trimestrielle</Option>
                        <Option value="annuelle">Annuelle</Option>
                    </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="tauxRevision"
                    rules={[
                        {
                        required: true,
                        message: 'Taux de révision est requis',
                        },
                    ]}
                    >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Taux de révision"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        bordered={focus !== 'tauxRevision'}
                        min={0}
                    />
                    </Form.Item>
                </Col>
                </Row>

                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    name="taciteReconduction"
                    rules={[
                        {
                        required: true,
                        message: 'Tacite reconduction est requis',
                        },
                    ]}
                    >
                    <Select
                        placeholder="Tacite reconduction (O/N)"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        bordered={focus !== 'taciteReconduction'}
                    >
                        <Option value="O">Oui</Option>
                        <Option value="N">Non</Option>
                    </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="echeanceTaciteReconduction"
                    rules={[
                        {
                        required: true,
                        message: 'Echéance tacite reconduction est requis',
                        },
                        ]}
                        >
                        <DatePicker
                        style={{ width: '100%' }}
                        placeholder="Date d'échéance tacite reconduction"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        bordered={focus !== 'echeanceTaciteReconduction'}
                        />
                        </Form.Item>
                        
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="montantGarantie"
                            rules={[
                                {
                                required: true,
                                message: 'Montant de garantie est requis',
                                },
                            ]}
                            >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Montant de garantie"
                                onFocus={onFocus}
                                onBlur={onBlur}
                                bordered={focus !== 'montantGarantie'}
                                min={0}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="typeGarantie"
                            rules={[
                                {
                                required: true,
                                message: 'Type de garantie est requis',
                                },
                            ]}
                            >
                            <Select
                                placeholder="Type de garantie"
                                onFocus={onFocus}
                                onBlur={onBlur}
                                bordered={focus !== 'typeGarantie'}
                            >
                                <Option value="cautionBancaire">Caution bancaire</Option>
                                <Option value="depotGarantie">Dépôt de garantie</Option>
                                <Option value="autre">Autre</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                            name="commentaires"
                            >
                            <TextArea
                                placeholder="Commentaires"
                                autoSize={{ minRows: 1, maxRows: 6 }}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                bordered={focus !== 'commentaires'}
                            />
                            </Form.Item>
                        </Col>
                        </Row>         
                    </Form>
                </div>
      
        );

};

export default Info_2;

