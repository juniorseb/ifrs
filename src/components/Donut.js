import React from 'react';

import { Pie } from '@ant-design/plots';

const DemoPie = () => {
  const data = [
    {
      type: 'En cours',
      value: 3,
    },
    {
      type: 'Conforme',
      value: 5,
    },
    {
      type: 'Non-conforme',
      value: 2,
    },
    {
      type: 'A terme',
      value: 1,
    },
 
  ];
  const config = {
    appendPadding: 0,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
       
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
       
          
        },
        content: 'Répartition',
        style: { fontSize: 11,}
      },
    },
  };
  return <Pie style={{width:'200px'}} {...config} />;
};

export default DemoPie;
