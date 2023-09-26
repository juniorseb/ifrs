import React, { useState, useEffect } from 'react';
import { FolderOpenFilled } from '@ant-design/icons'; // Importez l'icône de dossier
import { Card, Col, Image, Row, Statistic,  } from 'antd';
import "./Classeur.css"


const Classeur = () => {

  const [dossiers, setDossiers] = useState([]); // Pour stocker les dossiers récupérés depuis l'API

  // Utilisez useEffect pour effectuer une requête GET lors du chargement initial du composant
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/afficherdossier')
      .then((response) => response.json())
      .then((data) => {
        // Stockez les dossiers récupérés dans l'état local
        setDossiers(data);
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la récupération des dossiers :', error);
      });
  }, [dossiers]); // Le tableau vide [] signifie que cette fonction s'exécute une seule fois lors du chargement initial du composant

console.log(dossiers)
  return (
    <div>
    <Row gutter={16}>

          {dossiers.map((dossier) => (
            <Col span={6} key={dossier.id_dossier}>
              <Card
                className='border border'
                bordered={false}
                style={{ boxShadow: '0 0.5px 1px 0px rgba(1, 1, 1, 0.1)',textAlign:"center" }}
              >
              <a href='/dashboard/' style={{color:'rgba(1,1,80,1)',textDecoration:'none'}}>
             <img src='https://static.vecteezy.com/system/resources/thumbnails/015/072/080/small/folder-3d-rendering-isometric-icon-png.png' width={80} />       {/* <FolderOpenFilled className='primary' style={{ fontSize: '75px', marginBottom: '10px',color:'rgba(50,150,255,1)' }} /> Icône de dossier */}
                <h5 >{dossier.libelle_dossier}</h5>
              </a>

                <p>Date de création : {dossier.date_creation}</p>
                {/* Autres informations du dossier */}
    
              </Card>
            </Col>
          ))}
 
  </Row>
  <br />

  </div>
  );
};

export default Classeur;
