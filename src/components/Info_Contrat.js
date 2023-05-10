import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Col,Row, 
    Button, Form, Input, Select, Space} from 'antd';

const { Dragger } = Upload;

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const Informations_Contrat = () => (
    <Row gutter={16}>
        
        <Col span={11} >
            
                    <Dragger  {...props}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Cliquez ou faites glisser <b>le contrat </b>dans cette zone pour le téléverser</p>
                        <p className="ant-upload-hint">
                    
                        </p>
                    </Dragger>
        </Col>

     

        <Col style={{borderLeft:"1.5px solid rgba(1,1,1,0.1)",}} span={12}>
                    <Form
                name="complex-form"
                onFinish={onFinish}
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
            >
                <Form.Item label="Username">
                <Space>
                    <Form.Item
                    name="username"
                    noStyle
                    rules={[
                        {
                        required: true,
                        message: 'Username is required',
                        },
                    ]}
                    >
                    <Input
                        style={{
                        width: 160,
                        }}
                        placeholder="Please input"
                    />
                    </Form.Item>
                </Space>
                </Form.Item>
                <Form.Item label="Address">
                <Space.Compact>
                    <Form.Item
                    name={['address', 'province']}
                    noStyle
                    rules={[
                        {
                        required: true,
                        message: 'Province is required',
                        },
                    ]}
                    >
                    <Select placeholder="Select province">
                        <option value="Zhejiang">Zhejiang</option>
                        <option value="Jiangsu">Jiangsu</option>
                    </Select>
                    </Form.Item>
                    <Form.Item
                    name={['address', 'street']}
                    noStyle
                    rules={[
                        {
                        required: true,
                        message: 'Street is required',
                        },
                    ]}
                    >
                    <Input
                        style={{
                        width: '50%',
                        }}
                        placeholder="Input street"
                    />
                    </Form.Item>
                </Space.Compact>
                </Form.Item>
                <Form.Item
                label="BirthDate"
                style={{
                    marginBottom: 0,
                }}
                >
                <Form.Item
                    name="year"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    }}
                >
                    <Input placeholder="Input birth year" />
                </Form.Item>
                <Form.Item
                    name="month"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                    }}
                >
                    <Input placeholder="Input birth month" />
                </Form.Item>
                </Form.Item>
                <Form.Item label=" " colon={false}>
              
                </Form.Item>
                    </Form>
        </Col>
  </Row>
);
export default Informations_Contrat;