import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Col,Row} from 'antd';
import Info_1 from './Info_1';

const { Dragger } = Upload;

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
            
            <div>
                <Info_1/>
            </div>
         

        </Col>

  </Row>
);
export default Informations_Contrat;