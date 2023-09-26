
import React from 'react';

const TablePreviewModal = ({ title, tableData, closeModal }) => {
  return (
    <div>
      <h2>{title}</h2>
      <table>
        {/* Affichez les données du tableau ici */}
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={closeModal}>Fermer</button>
    </div>
  );
};

export default TablePreviewModal;
