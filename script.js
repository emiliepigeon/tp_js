console.log("Le script est chargé");

// fonction1 btn1 /////////////////// = clonage / création d'une nouvelle ligne au tableau
const boutonAjouterLigne = document.querySelector('#btn1');

// J'ajoute un écouteur d'événement 'click' sur ce bouton
boutonAjouterLigne.addEventListener('click', function () {
    console.log("J'ai cliqué sur le bouton 'Ajouter une ligne'");

    const corpsTableau = document.querySelector('#tableaucalcul tbody');
    console.log("J'ai sélectionné le corps du tableau :", corpsTableau);

    // Je clone la première ligne du tableau qui servira de modèle
    const ligneModele = document.querySelector('#tr1');
    const nouvelleLigne = ligneModele.cloneNode(true);
    console.log("J'ai cloné la ligne modèle :", nouvelleLigne);

    // Réinitialiser les valeurs des champs de saisie dans la nouvelle ligne
    const champsASaisir = nouvelleLigne.querySelectorAll('input[type=text], input[type=number]');
    champsASaisir.forEach(function (champ) {
        champ.value = ''; // Vider chaque champ
        console.log("J'ai vidé le champ :", champ);
    });

    // Réinitialiser aussi le sélecteur de TVA
    const selecteurTVA = nouvelleLigne.querySelector('select');
    selecteurTVA.selectedIndex = 0; // Réinitialise à la première option
    console.log("J'ai réinitialisé le sélecteur de TVA");

    // Assigner un ID unique à la nouvelle ligne (par exemple, "tr2", "tr3", etc.)
    const nombreDeLignes = corpsTableau.querySelectorAll('tr').length;
    nouvelleLigne.id = "tr" + (nombreDeLignes + 1); // Crée un nouvel ID unique
    console.log("Nouvelle ligne ID assigné :", nouvelleLigne.id);

    // Ajouter un gestionnaire d'événements pour sélectionner cette nouvelle ligne
    nouvelleLigne.onclick = function () {
        selectLigne(nouvelleLigne);
    };

    // Ajouter un gestionnaire d'événements pour le bouton Calculer
    const btnCalculer = nouvelleLigne.querySelector('.btn-calcul');

    btnCalculer.onclick = function (event) {
        event.stopPropagation(); // Empêche l'événement de clic de se propager à la ligne
        calculerPrixTTC(nouvelleLigne); // Appelle la fonction de calcul pour cette ligne
        console.log("Calcul du prix TTC lancé pour la ligne :", nouvelleLigne.id);
    };

    // J'ajoute la nouvelle ligne au corps du tableau
    corpsTableau.appendChild(nouvelleLigne);
    console.log("J'ai ajouté la nouvelle ligne au tableau");
});

// fonction2 btn2 /////////////////// = vide les champs d'une ligne dans le tableau
let ligneSelectionnee = null; // Variable pour stocker la ligne sélectionnée

// Fonction pour sélectionner une ligne
function selectLigne(ligne) {
    if (ligneSelectionnee) {
        ligneSelectionnee.classList.remove('selection'); // Retire la sélection de l'ancienne ligne
        console.log("Sélection retirée de la ligne :", ligneSelectionnee);
    }

    // Ajoute la classe 'selection' à la nouvelle ligne sélectionnée
    ligne.classList.add('selection');
    ligneSelectionnee = ligne; // Met à jour la variable de sélection
    console.log("Ligne sélectionnée :", ligne);
}

// Je sélectionne le bouton "Vider les champs"
const boutonViderChamps = document.querySelector('#btn2');

// J'ajoute un écouteur d'événements 'click' sur ce bouton
boutonViderChamps.addEventListener('click', function () {
    console.log("J'ai cliqué sur le bouton 'Vider les champs'");

    if (ligneSelectionnee) {
        console.log("Vidage des champs de la ligne sélectionnée");

        const champsASaisir = ligneSelectionnee.querySelectorAll('input[type=text]');
        champsASaisir.forEach(function (champ) {
            champ.value = ''; // Vide chaque champ
            console.log("Champ vidé :", champ);
        });

        const selecteurTVA = ligneSelectionnee.querySelector('select');
        if (selecteurTVA) {
            selecteurTVA.selectedIndex = 0; // Réinitialise à la première option
            console.log("Sélecteur TVA réinitialisé pour la ligne sélectionnée");
        }

        // Vider également le champ Prix TTC
        const prixTTCInput = ligneSelectionnee.querySelector('.prixttc');
        prixTTCInput.value = ''; // Vide le champ Prix TTC
        console.log("Champ Prix TTC vidé");

    } else {
        console.log("Aucune ligne n'est sélectionnée");
        alert("Veuillez sélectionner une ligne à vider.");
    }
});

// fonction3 btn3 /////////////////// = Supprimer une ligne dans le tableau sauf la première
const boutonSupprimerLigne = document.querySelector('#btn3');

// J'ajoute un écouteur d'événements 'click' sur ce bouton
boutonSupprimerLigne.addEventListener('click', function () {
    console.log("J'ai cliqué sur le bouton 'Supprimer une ligne'");

    if (ligneSelectionnee) {
        // Vérifie si la ligne sélectionnée est la première
        if (ligneSelectionnee.id === "tr1") {
            console.log("Impossible de supprimer la première ligne.");
            alert("La première ligne ne peut pas être supprimée.");
            return;
        }

        // Demande confirmation à l'utilisateur avant de supprimer
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?");

        if (confirmation) {
            const corpsTableau = document.querySelector('#tableaucalcul tbody');
            corpsTableau.removeChild(ligneSelectionnee); // Supprime la ligne sélectionnée
            console.log("J'ai supprimé la ligne sélectionnée du tableau");

            // Réinitialise la variable de sélection après suppression
            ligneSelectionnee = null;
        } else {
            console.log("L'utilisateur a annulé la suppression");
        }
    } else {
        console.log("Aucune ligne n'est sélectionnée");
        alert("Veuillez sélectionner une ligne à supprimer.");
    }
});

// Fonction pour calculer le prix TTC en fonction du prix HT et du taux de TVA choisi
function calculerPrixTTC() {
    if (ligneSelectionnee) {
        const prixHTInput = ligneSelectionnee.querySelector('.prixht'); // Champ Prix HT
        const tvaSelect = ligneSelectionnee.querySelector('.selection'); // Sélecteur TVA
        const prixTTCInput = ligneSelectionnee.querySelector('.prixttc'); // Champ Prix TTC

        const prixHT = parseFloat(prixHTInput.value); // Récupère et convertit le prix HT en nombre
        const tvaValue = parseFloat(tvaSelect.value); // Récupère et convertit le taux de TVA en nombre

        if (!isNaN(prixHT) && !isNaN(tvaValue)) { // Vérifie que les valeurs sont des nombres valides
            const tvaMontant = prixHT * (tvaValue / 100); // Calcule le montant de TVA
            const prixTTC = prixHT + tvaMontant; // Calcule le prix TTC

            prixTTCInput.value = prixTTC.toFixed(2); // Affiche le prix TTC arrondi à deux décimales dans le champ correspondant
            console.log(`Prix TTC calculé : ${prixTTC.toFixed(2)} €`);
        } else {
            alert("Veuillez entrer un Prix HT valide et sélectionner un taux de TVA.");
            console.log("Entrée invalide pour Prix HT ou TVA.");
        }
    } else {
        alert("Veuillez sélectionner une ligne pour calculer le Prix TTC.");
        console.log("Aucune ligne n'est sélectionnée pour calculer le Prix TTC.");
    }
}

// Ajout d'un écouteur d'événement pour chaque bouton Calculer dans les lignes du tableau
document.querySelectorAll('.btn-calcul').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Empêche l'événement de clic de se propager à la ligne.
        calculerPrixTTC(); // Appelle calculerPrixTTC pour utiliser la variable globale `ligneSelectionnee`.
    });
});

// Fonction pour cacher ou afficher le label en fonction de la sélection
function toggleLabel(selectElement) {
    const label = document.getElementById("tvaLabel");

    // Si une option autre que l'option par défaut est sélectionnée, cacher le label.
    if (selectElement.value) {
        label.classList.add('hidden'); // Cacher le label.
    } else {
        label.classList.remove('hidden'); // Afficher le label si aucune option n'est sélectionnée.
    }
}
