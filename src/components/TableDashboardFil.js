import { Table } from 'antd';

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

const data = [
  {
    key: '1',
    code: 'CAC1234',
    date: '18 Janvier 2023',
  },
  {
    key: '2',
    code: 'CAC1234',
    date: '18 Janvier 2023',
  },
  {
    key: '3',
    code: 'CAC1234',
    date: '18 Janvier 2023',
  },
];

const TableDash = () =>{
  const rowClassName = (record, index) => {
    return 'border border-primary';
  };

  return (
  <Table
    
    className=' rounded border border-primary'
    rowClassName={rowClassName}
    columns={columns}
    dataSource={data}
    bordered
  />
  );
  };

export default TableDash;
