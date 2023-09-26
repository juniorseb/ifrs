export function calculerVariables(tauxEndettement, tauxMajorationLoyer, frequencePaiement, loyerMensuel, dateFinContrat, dateDebutContrat, nomBailleur, lieuUtilisationBien) {
  // Convertir les taux en valeurs décimales
  tauxEndettement = tauxEndettement / 100;
  tauxMajorationLoyer = tauxMajorationLoyer ? tauxMajorationLoyer / 100 : 0;

  // Calcul du nombre de paiements en mois
  const diffDate = new Date(dateFinContrat) - new Date(dateDebutContrat);
  const nombrePaiements = Math.floor(diffDate / (30 * 24 * 60 * 60 * 1000));

  // Tableau pour stocker les résultats
  const resultat = [];

  for (let periode = 0; periode <= nombrePaiements; periode++) {
    // Calculer la date de paiement
    const datePaiement = new Date(dateDebutContrat);
    datePaiement.setMonth(datePaiement.getMonth() + periode);

    // Calculer la date de fin de contrat
    const dateFin = new Date(dateFinContrat);

    // Vérifier si la date de paiement est supérieure à la date de fin de contrat
    if (datePaiement > dateFin) {
      break; // Sortir de la boucle si la date de paiement dépasse la date de fin de contrat
    }

    // Calcul du montant du loyer pour cette période
    const anneesCompletes = Math.floor(periode / 12);
    let montantLoyer = loyerMensuel * Math.pow(1 + tauxMajorationLoyer, anneesCompletes);
    montantLoyer = Math.round(montantLoyer * 100) / 100; // Arrondir à deux décimales

    // Arrondir le montant du loyer à l'entier supérieur si la décimale est supérieure ou égale à 0.5
    if (montantLoyer % 1 >= 0.5) {
      montantLoyer = Math.ceil(montantLoyer);
    } else {
      montantLoyer = Math.floor(montantLoyer);
    }

    // Calcul de la valeur actuelle pour cette période
    let valeurActuelle = montantLoyer / Math.pow(1 + tauxEndettement / 12, periode);
    valeurActuelle = Math.round(valeurActuelle * 100) / 100; // Arrondir à deux décimales

    // Arrondir la valeur actuelle à l'entier supérieur si la décimale est supérieure ou égale à 0.5
    if (valeurActuelle % 1 >= 0.5) {
      valeurActuelle = Math.ceil(valeurActuelle);
    } else {
      valeurActuelle = Math.floor(valeurActuelle);
    }

    // Ajouter les valeurs au tableau résultat
    resultat.push({
      Période: periode,
      'Date de paiement': datePaiement.toISOString().slice(0, 10),
      'Montant du loyer': montantLoyer,
      'Valeur actuelle': valeurActuelle,
    });
  }

  return resultat;
}



export function amortissementValeurActuelle(tauxEndettement, tauxMajorationLoyer, frequencePaiement, loyerMensuel, dateFinContrat, dateDebutContrat, nomBailleur, lieuUtilisationBien) {

  // Appeler la fonction pour calculer les variables
  const variables = calculerVariables(tauxEndettement, tauxMajorationLoyer, frequencePaiement, loyerMensuel, dateFinContrat, dateDebutContrat, nomBailleur, lieuUtilisationBien);
  // Diviser le taux d'endettement par 100
  tauxEndettement = tauxEndettement / 100;

  // Tableau pour stocker le tableau d'amortissement
  const amortissementTableau = [];

  // Initialiser la valeur actuelle à la somme des valeurs actuelles de la fonction calculerVariables
  let valeurActuelle = variables.reduce((total, variable) => total + variable['Valeur actuelle'], 0);

  for (let periode = 0; periode < variables.length; periode++) {
    const variable = variables[periode];

    // Calcul des intérêts en fonction de la valeur actuelle du tableau d'amortissement à la période x et du loyer mensuel à la période x
    const interets = (periode === 0) ? (valeurActuelle - loyerMensuel) * (tauxEndettement / 12) : (valeurActuelle - variable['Montant du loyer']) * (tauxEndettement / 12);

    // Calcul de la valeur de clôture
    const valeurCloture = valeurActuelle - variable['Montant du loyer'] + interets;

    // Ajouter les valeurs au tableau d'amortissement
    amortissementTableau.push({
      Période: variable['Période'],
      'Valeur actuelle': valeurActuelle,
      'Loyer mensuel': variable['Montant du loyer'],
      Intérêts: interets,
      'Valeur de clôture': valeurCloture,
    });

    // Mettre à jour la valeur actuelle pour la prochaine période
    valeurActuelle = valeurCloture;
  }

  return amortissementTableau;
}


export function tableauAmortissementDroitUtilisation(
  tauxEndettement,
  tauxMajorationLoyer,
  frequencePaiement,
  loyerMensuel,
  dateFinContrat,
  dateDebutContrat,
  nomBailleur,
  lieuUtilisationBien
) {
  // Appeler la fonction pour calculer les variables
  const variables = calculerVariables(
    tauxEndettement,
    tauxMajorationLoyer,
    frequencePaiement,
    loyerMensuel,
    dateFinContrat,
    dateDebutContrat,
    nomBailleur,
    lieuUtilisationBien
  );

  // Tableau pour stocker le tableau d'amortissement
  const amortissementTableau = [];

  // Initialisation des valeurs pour la première période
  let soldeOuverture = 0;
  let augmentation = variables.reduce((total, variable) => total + variable['Valeur actuelle'], 0);
  let reduction = 0;
  let amortissementOuverture = 0;
  const amortissementPeriode = augmentation / variables.length; // Calcul de l'amortissement de la période

  for (let periode = 1; periode <= variables.length; periode++) {
    const variable = variables[periode - 1];

    // Calcul de la valeur de clôture
    const valeurCloture = soldeOuverture + augmentation - reduction;

    // Calcul de l'amortissement de la période
    const amortissementFermeture = amortissementOuverture + amortissementPeriode - reduction;

    // Calcul de la valeur dépréciée (WDV)
    const wdv = valeurCloture - amortissementFermeture;

    // Ajouter les valeurs au tableau d'amortissement
    amortissementTableau.push({
      Période: periode,
      'Solde d\'ouverture': soldeOuverture,
      Augmentation: augmentation,
      Reduction: reduction,
      'Valeur de clôture': valeurCloture,
      'Amortissement d\'ouverture': amortissementOuverture,
      'Amortissement de la période': amortissementPeriode,
      'Amortissement de réduction': reduction,
      'Amortissement de fermeture': amortissementFermeture,
      'Valeur dépréciée (WDV)': wdv,
    });

    // Mettre à jour les valeurs pour la prochaine période
    soldeOuverture = valeurCloture;
    augmentation = 0;
    reduction = 0;
    amortissementOuverture = amortissementFermeture;
  }

  return amortissementTableau;
}



