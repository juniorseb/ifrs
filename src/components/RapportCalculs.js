import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/img/y3.jpg';

const generatePDFReport = (parametres, tableau1, tableau2, tableau3) => {
  // Créer un nouveau document PDF
  const doc = new jsPDF();


  // Ajouter le logo
  const logoImage = new Image();
  logoImage.src = logo; // Assurez-vous de spécifier le chemin correct vers votre logo
  doc.addImage(logoImage, 'JPEG', 180, 0, 30, 30); // Ajustez les coordonnées et les dimensions selon vos besoins

  // Ajouter le titre du rapport
  doc.setFontSize(18);
  doc.text('Rapport des calculs', 10, 10);

  // Ajouter le tableau des paramètres au rapport
  doc.setFontSize(14);
  doc.text('Paramètres de calcul', 10, 30); // Ajustez la position verticale
  doc.autoTable({
    startY: 40, // Position de départ du tableau
    head: [['Paramètre', 'Valeur']], // En-tête du tableau des paramètres
    body: parametres.map(param => [Object.keys(param)[0], param[Object.keys(param)[0]]]), // Données des paramètres
  });

  // Fonction pour ajouter un tableau avec des données JSON personnalisées
  const ajouterTableau = (titre, data) => {
    doc.setFontSize(14);
    doc.text(titre, 10, doc.autoTable.previous.finalY + 10); // Ajustez la position verticale
    const headers = Object.keys(data[0]);
    const body = data.map(obj => headers.map(header => obj[header]));
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20, // Position de départ du tableau
      head: [headers], // En-tête du tableau
      body: body, // Données du tableau
    });
  };

  // Ajouter le tableau 1 au rapport
  ajouterTableau('Tableau 1: Détermination de la valeur actuelle', tableau1);

  // Ajouter le tableau 2 au rapport
  ajouterTableau('Tableau 2: Amortissement de la valeur actuelle', tableau2);

  // Ajouter le tableau 3 au rapport
  ajouterTableau('Tableau 3: Amortissement du droit d\'utilisation', tableau3);

  // Enregistrer le PDF ou l'afficher
  doc.save('RapportDeCalculs.pdf'); // Pour télécharger le PDF
};

export default generatePDFReport;
