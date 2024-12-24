// script.js

document.getElementById('btn1').addEventListener('click', function() {
    // Récupérer le tbody du tableau
    var tbody = document.getElementById('tableaucalcul').getElementsByTagName('tbody')[0];

    // Créer une nouvelle ligne
    var newRow = document.createElement('tr');

    // Créer les cellules de la nouvelle ligne
    var cells = [
        '<td><input type="text" placeholder="Libellé"></td>',
        '<td><input type="number" placeholder="prix HT"></td>',
        '<td><input type="number" placeholder="TVA"></td>',
        '<td><input type="number" placeholder="prix TTC"></td>',
        '<td><input type="button" value="Calculer"></td>',
        '<td><input type="button" value="Effacer"></td>',
        '<td><input type="button" value="Supprimer"></td>'
    ];

    // Ajouter les cellules à la nouvelle ligne
    cells.forEach(function(cell) {
        newRow.innerHTML += cell;
    });

    // Ajouter la nouvelle ligne au tbody
    tbody.appendChild(newRow);
});
