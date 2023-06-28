const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(cookieParser());

const path = require('path');

// Configuration de multer pour le téléversement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Contratheque'); // Spécifiez le dossier de destination des fichiers
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname); // Définissez le nom du fichier téléversé
  },
});

const upload = multer({ storage });


// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ycube_ifrs',
});

// Établissement de la connexion à la base de données
          connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
    return;
  }
  console.log('Connexion à la base de données réussie.');
});

// Fonction pour hacher le mot de passe avec SHA-256
          function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

          router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Exécution de la requête SELECT pour récupérer les informations de l'utilisateur
  const sqlQuery = 'SELECT * FROM utilisateurs WHERE nom_utilisateur = ?';
  connection.query(sqlQuery, [username], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL:', err);
      res.sendStatus(500);
      return;
    }

    if (results.length > 0) {
      // Utilisateur trouvé, vérification du mot de passe
      const utilisateur = results[0];
      const hashedInputPassword = hashPassword(password);
      const motDePasseValide = utilisateur.motDePasse === hashedInputPassword;

      if (motDePasseValide) {
        // Mot de passe correct, génération du token JWT
        const payload = { username };
        const secretKey = 'IfRs16ytreza2023JU@';
        const token = jwt.sign(payload, secretKey, { expiresIn: '4h' });

        // Création du cookie sécurisé
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 4 * 60 * 60 * 1000, // 4 heures d'expiration
        });

        // Renvoyer une réponse au frontend
        res.status(200).json({ message: 'Connexion réussie.', token });


      } else {
        // Identifiants invalides
        res.status(401).json({ message: 'Identifiants invalides.' });
      }
    } else {
      // Utilisateur non trouvé
      res.status(404).json({ message: 'Identifiants invalides.' });
    }
  });
});

          router.get("/verifytoken", (req, res) => {
  res.status(200).json({ message: 'Connexion réussie.' });
})

          router.post("/ajoutpreneur", (req, res) => {

  const newPreneur = req.body;


  // Vérification des données reçues
  if (!newPreneur) {
    return res.status(400).json({ error: "Aucune donnée de preneur fournie" });
  }

  // Insérer les données du nouveau preneur dans la base de données
  connection.query(
    "INSERT INTO preneurs (Code_preneur, Nom_Preneur, Secteur_opérationnel, Pays, Taux_BIC, pourc_Groupe, Tx_Financement, Vehicules, Terrain, Constructions, Machines, Materiel_informatique, Autres) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      newPreneur.Code_preneur,
      newPreneur.Nom_Preneur,
      newPreneur.Secteur_opérationnel,
      newPreneur.Pays,
      newPreneur.Taux_BIC,
      newPreneur.pourc_Groupe,
      newPreneur.Tx_Financement,
      newPreneur.Vehicules,
      newPreneur.Terrain,
      newPreneur.Constructions,
      newPreneur.Machines,
      newPreneur.Materiel_informatique,
      newPreneur.Autres,
    ],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de l'insertion du preneur : ", error);
        return res.status(500).json({ error: "Erreur lors de l'insertion du preneur" });
      }

      // Récupérer l'ID du nouveau preneur inséré
      const newPreneurId = results.insertId;

      // Ajouter l'ID au nouveau preneur
      newPreneur.id_preneur = newPreneurId;

      // Retourner la réponse avec le nouveau preneur ajouté
      res.status(200).json(newPreneur);
    }
  );
});

          router.get("/preneurs", (req, res) => {
  // Query to fetch data from the "preneurs" table
  const sql = "SELECT * FROM preneurs";

  // Execute the SQL query
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Failed to fetch data from the 'preneurs' table", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(result);
    }
  });
});


router.post("/ajoutcodification", (req, res) => {
  const newCodification = req.body;

  // Vérification des données reçues
  if (!newCodification.compte || !newCodification.libelle) {
    return res.status(400).json({ error: "Les données de codification sont incomplètes" });
  }

  // Insérer les données de la nouvelle codification dans la base de données
  connection.query(
    "INSERT INTO codifications (Compte, Libelle) VALUES (?, ?)",
    [newCodification.compte, newCodification.libelle],
    (error) => {
      if (error) {
        console.error("Erreur lors de l'insertion de la codification : ", error);
        return res.status(500).json({ error: "Erreur lors de l'insertion de la codification" });
      }

      // Retourner la nouvelle codification ajoutée
      res.status(200).json(newCodification);
    }
  );
});
router.get("/codifications", (req, res) => {
  // Query to fetch data from the "codifications" table
  const sql = "SELECT * FROM codifications";

  // Execute the SQL query
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Failed to fetch data from the 'codifications' table", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(result);
    }
  });
});

router.put("/updatepreneur/:id", (req, res) => {
  const preneurId = req.params.id;
  const updatedPreneur = req.body;

  // Query to update the preneur in the database
  const sql = "UPDATE preneurs SET Code_preneur = ?, Nom_Preneur = ?, Secteur_opérationnel = ?, Pays = ?, Taux_BIC = ?, pourc_Groupe = ?, Tx_Financement = ?, Vehicules = ?, Terrain = ?, Constructions = ?, Machines = ?, Materiel_informatique = ?, Autres = ? WHERE id_preneur = ?";

  // Execute the SQL query with the updated values
  connection.query(sql, [updatedPreneur.Code_preneur, updatedPreneur.Nom_Preneur, updatedPreneur.Secteur_opérationnel, updatedPreneur.Pays, updatedPreneur.Taux_BIC, updatedPreneur.pourc_Groupe, updatedPreneur.Tx_Financement, updatedPreneur.Vehicules, updatedPreneur.Terrain, updatedPreneur.Constructions, updatedPreneur.Machines, updatedPreneur.Materiel_informatique, updatedPreneur.Autres, preneurId], (err, result) => {
    if (err) {
      console.error("Failed to update preneur data", err);
      res.status(500).json({ error: "Failed to update preneur" });
    } else {
      res.json({ message: "Preneur updated successfully" });
    }
  });
});

router.put("/removepreneur/:id", (req, res) => {
  const preneurId = req.params.id;

  // Query to remove the preneur from the database
  const sql = "DELETE FROM preneurs WHERE id_preneur = ?";

  // Execute the SQL query with the preneur ID
  connection.query(sql, [preneurId], (err, result) => {
    if (err) {
      console.error("Failed to remove preneur data", err);
      res.status(500).json({ error: "Failed to remove preneur" });
    } else {
      res.json({ message: "Preneur removed successfully" });
    }
  });
});


router.put("/updatecodification/:id", (req, res) => {
  const updatedCodification = req.body;
  const codificationId = req.params.id;

  // Vérification des données reçues
  if (!updatedCodification) {
    return res.status(400).json({ error: "Aucune donnée de codification fournie" });
  }

  // Mettre à jour les données de la codification dans la base de données
  connection.query(
    "UPDATE codifications SET Compte = ?, Libelle = ? WHERE id = ?",
    [updatedCodification.Compte, updatedCodification.Libelle, codificationId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la mise à jour de la codification : ", error);
        return res.status(500).json({ error: "Erreur lors de la mise à jour de la codification" });
      }

      // Vérifier si la codification a été mise à jour avec succès
      if (results.affectedRows === 0) {
        console.error("La codification n'a pas pu être mise à jour");
        return res.status(500).json({ error: "La codification n'a pas pu être mise à jour" });
      }

      // Retourner la réponse avec la codification mise à jour
      res.status(200).json(updatedCodification);
      console.log(updatedCodification)
    }
  );
});


router.put("/removecodification/:id", (req, res) => {
  const codificationId = req.params.id;

  // Supprimer la codification de la base de données
  connection.query(
    "DELETE FROM codifications WHERE id = ?",
    [codificationId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la suppression de la codification : ", error);
        return res.status(500).json({ error: "Erreur lors de la suppression de la codification" });
      }

      // Vérifier si la codification a été supprimée avec succès
      if (results.affectedRows === 0) {
        console.error("La codification n'a pas pu être supprimée");
        return res.status(500).json({ error: "La codification n'a pas pu être supprimée" });
      }

      // Retourner la réponse indiquant que la codification a été supprimée avec succès
      res.status(200).json({ message: "Codification supprimée avec succès" });
    }
  );
});


router.post('/nouveaucontrat/', upload.single('fichier'), (req, res) => {
  let contractData_x = req.body;
  const fichier = req.file;
  let contractData_x_info_1 = JSON.parse(contractData_x.info_1);
  let contractData_x_info_2 = JSON.parse(contractData_x.info_2);
  let contractData_x_info_3 = JSON.parse(contractData_x.info_3);
  let questionnaireData = JSON.parse(contractData_x.questionnaire);

  // Générez le code de contrat
  const codeContrat = 'C' + Date.now();

  // Enregistrez les informations du fichier dans la table Contratheque
  const contrathequeQuery = 'INSERT INTO contratheque (nom_fichier, date_ajout) VALUES (?, ?)';
  const contrathequeValues = [fichier.filename, new Date()]; // Utilisez fichier.filename au lieu de fichier.originalname
  connection.query(contrathequeQuery, contrathequeValues, (err, contrathequeResult) => {
    if (err) {
      console.error('Erreur lors de l\'enregistrement dans la table Contratheque', err);
      res.status(500).send('Erreur lors de l\'enregistrement dans la table Contratheque');
    } else {
      const idFichier = contrathequeResult.insertId;

      // Enregistrez les informations du contrat dans la table Informations du contrat
      const informationsContratQuery = 'INSERT INTO informations_contrat (id_fichier, code_contrat, id_preneur, description_location, reference_contrat, reference_bien, categorie_immobilisations, duree_utilite_mois) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const informationsContratValues = [idFichier, codeContrat, contractData_x_info_1.preneur, contractData_x_info_1.descriptionLocation, contractData_x_info_1.referenceContrat, contractData_x_info_1.referenceBien, contractData_x_info_1.categorieImmobiliations, contractData_x_info_1.dureeUtilite];
      connection.query(informationsContratQuery, informationsContratValues, (err, informationsContratResult) => {
        if (err) {
          console.error('Erreur lors de l\'enregistrement dans la table Informations du contrat', err);
          res.status(500).send('Erreur lors de l\'enregistrement dans la table Informations du contrat');
        } else {
          // Enregistrez les informations du contrat dans la table Caractéristiques du contrat
          const caracteristiquesContratQuery = 'INSERT INTO caracteristiques_contrat (code_contrat, type_contrat, bailleur, concessionnaire, signature_contrat, debut_echeance, fin_echeance, duree_contrat_mois, periode_paiement, periodicite, taux_revision, tacite_reconduction, echeance_tacite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const caracteristiquesContratValues = [codeContrat, contractData_x_info_2.typeContrat, contractData_x_info_2.bailleur, contractData_x_info_2.concessionnaire, contractData_x_info_2.dateSignatureContrat, contractData_x_info_2.dateDebutEcheance, contractData_x_info_2.dateFinEcheance, contractData_x_info_2.dureeContratMois, contractData_x_info_2.paiementDebutFin, contractData_x_info_2.periodicite, contractData_x_info_2.tauxRevision, contractData_x_info_2.taciteReconduction, contractData_x_info_2.echeanceTaciteReconduction];
          connection.query(caracteristiquesContratQuery, caracteristiquesContratValues, (err, caracteristiquesContratResult) => {
            if (err) {
              console.error('Erreur lors de l\'enregistrement dans la table Caractéristiques du contrat', err);
              res.status(500).send('Erreur lors de l\'enregistrement dans la table Caractéristiques du contrat');
            } else {
              // Enregistrez les informations du contrat dans la table Loyer & Suite
              const loyerSuiteQuery = 'INSERT INTO loyer_suite (code_contrat, montant_loyer_mensuel, montant_avance, montant_franchise_loyer, option, montant_caution, montant_frais_enregistrement, taux_interet, montant_prix_vente, montant_garantie, type_garantie, commentaires) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
              const loyerSuiteValues = [codeContrat, contractData_x_info_3.loyerMensuel, contractData_x_info_3.avance, contractData_x_info_3.franchiseLoyer, contractData_x_info_3.option, contractData_x_info_3.caution, contractData_x_info_3.fraisEnregistrement, contractData_x_info_3.tauxInteret, contractData_x_info_3.prixVente, contractData_x_info_3.montantGarantie, contractData_x_info_3.typeGarantie, contractData_x_info_3.commentaires];
              connection.query(loyerSuiteQuery, loyerSuiteValues, (err, loyerSuiteResult) => {
                if (err) {
                  console.error('Erreur lors de l\'enregistrement dans la table Loyer & Suite', err);
                  res.status(500).send('Erreur lors de l\'enregistrement dans la table Loyer & Suite');
                } else {
                  // Enregistrez les réponses du questionnaire dans la table Questionnaire
                  const questionnaireQuery = 'INSERT INTO questionnaire (code_contrat, reponse_1, reponse_2, reponse_3, reponse_4, reponse_5, reponse_6, reponse_7, reponse_8, reponse_9, reponse_10, reponse_11, reponse_12, reponse_13, date_ajout) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                  const questionnaireValues = [codeContrat, questionnaireData[0], questionnaireData[1], questionnaireData[2], questionnaireData[3], questionnaireData[4], questionnaireData[5], questionnaireData[6], questionnaireData[7], questionnaireData[8], questionnaireData[9], questionnaireData[10], questionnaireData[11], questionnaireData[12], new Date()];
                  connection.query(questionnaireQuery, questionnaireValues, (err, questionnaireResult) => {
                    if (err) {
                      console.error('Erreur lors de l\'enregistrement dans la table Questionnaire', err);
                      res.status(500).send('Erreur lors de l\'enregistrement dans la table Questionnaire');
                    } else {
                      // Les données ont été enregistrées avec succès dans toutes les tables
                      res.send('OK');
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});






module.exports = router;
