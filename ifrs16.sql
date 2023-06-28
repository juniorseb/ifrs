CREATE TABLE utilisateurs 
(
  idUtilisateur INT PRIMARY KEY AUTO_INCREMENT,
  nom_utilisateur VARCHAR(255) UNIQUE,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  email VARCHAR(255),
  motDePasse VARCHAR(255)
);

CREATE TABLE preneurs (
  id_preneur INT PRIMARY KEY AUTO_INCREMENT,
  Code_preneur VARCHAR(255) UNIQUE,
  Nom_Preneur VARCHAR(255),
  Secteur_opérationnel VARCHAR(255),
  Pays VARCHAR(255),
  Taux_BIC FLOAT,
  pourc_Groupe FLOAT,
  Tx_Financement FLOAT,
  Vehicules FLOAT,
  Terrain FLOAT,
  Constructions FLOAT,
  Machines FLOAT,
  Materiel_informatique FLOAT,
  Autres FLOAT
);

CREATE TABLE codifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Compte VARCHAR(255) UNIQUE,
  Libelle VARCHAR(255)
);

-- Table : Contratheque
CREATE TABLE contratheque (
  id_fichier INT AUTO_INCREMENT PRIMARY KEY,
  nom_fichier VARCHAR(255),
  date_ajout DATE
);

-- Table : Informations du contrat
CREATE TABLE informations_contrat (
  id_contrat INT AUTO_INCREMENT PRIMARY KEY,
  id_fichier INT,
  code_contrat VARCHAR(255) UNIQUE,
  id_preneur INT,
  description_location VARCHAR(255),
  reference_contrat VARCHAR(255),
  reference_bien VARCHAR(255),
  categorie_immobilisations VARCHAR(255),
  duree_utilite_mois INT,
  FOREIGN KEY (id_fichier) REFERENCES contratheque(id_fichier),
  FOREIGN KEY (id_preneur) REFERENCES preneurs(id_preneur)
);

-- Table : Caractéristiques du contrat
CREATE TABLE caracteristiques_contrat (
  id_caracteristique INT AUTO_INCREMENT PRIMARY KEY,
  code_contrat VARCHAR(255),
  type_contrat VARCHAR(255),
  bailleur VARCHAR(255),
  concessionnaire VARCHAR(255),
  signature_contrat DATE,
  debut_echeance DATE,
  fin_echeance DATE,
  duree_contrat_mois INT,
  periode_paiement VARCHAR(255),
  periodicite VARCHAR(255),
  taux_revision VARCHAR(255),
  tacite_reconduction VARCHAR(255),
  echeance_tacite VARCHAR(255),
  FOREIGN KEY (code_contrat) REFERENCES informations_contrat(code_contrat)
);

-- Table : Loyer & Suite
CREATE TABLE loyer_suite (
  id_loyer INT AUTO_INCREMENT PRIMARY KEY,
  code_contrat VARCHAR(255),
  montant_loyer_mensuel DECIMAL(10, 2),
  montant_avance DECIMAL(10, 2),
  montant_franchise_loyer DECIMAL(10, 2),
  option VARCHAR(255),
  montant_caution DECIMAL(10, 2),
  montant_frais_enregistrement DECIMAL(10, 2),
  taux_interet DECIMAL(10, 2),
  montant_prix_vente DECIMAL(10, 2),
  montant_garantie DECIMAL(10, 2),
  type_garantie VARCHAR(255),
  commentaires TEXT,
  FOREIGN KEY (code_contrat) REFERENCES informations_contrat(code_contrat)
);

-- Table : questionnaire
CREATE TABLE questionnaire (
  id_questionnaire INT AUTO_INCREMENT PRIMARY KEY,
  code_contrat VARCHAR(255),
  reponse_1 VARCHAR(255),
  reponse_2 VARCHAR(255),
  reponse_3 VARCHAR(255),
  reponse_4 VARCHAR(255),
  reponse_5 VARCHAR(255),
  reponse_6 VARCHAR(255),
  reponse_7 VARCHAR(255),
  reponse_8 VARCHAR(255),
  reponse_9 VARCHAR(255),
  reponse_10 VARCHAR(255),
  reponse_11 VARCHAR(255),
  reponse_12 VARCHAR(255),
  reponse_13 VARCHAR(255),
  date_ajout DATE,
  FOREIGN KEY (code_contrat) REFERENCES informations_contrat(code_contrat)
);

-- Table : eligibilite_contrat
CREATE TABLE eligibilite_contrat (
  id_questionnaire INT,
  code_contrat VARCHAR(255),
  statut_contrat VARCHAR(255),
  FOREIGN KEY (id_questionnaire) REFERENCES questionnaire(id_questionnaire),
  FOREIGN KEY (code_contrat) REFERENCES informations_contrat(code_contrat)
);



