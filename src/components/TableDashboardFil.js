import { Table } from 'antd';
import "./Table.css"


const columns = [
  {
    title: <div className="custom-header">Code</div>,
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: <div className="custom-header">Date</div>,
    dataIndex: 'date',
    key: 'date',
    
  },
];

const data = [
  {
    key: '1',
    code: 'ABC1234',
    date: '12 Janvier 2023',
  },
  {
    key: '2',
    code: 'DEF5678',
    date: '15 Janvier 2023',
  },
  {
    key: '3',
    code: 'CAC1234',
    date: '18 Janvier 2023',
  },
];

const TableDash = () => {
  return (
    <Table
      className=""
      columns={columns}
      dataSource={data}
      
    />
  );
};

export default TableDash;