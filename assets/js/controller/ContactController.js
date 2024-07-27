/**
 * TO DO:
 * - Ajouter champs adresse + email
 * - Ajouter Contact dans une modale
 * - Recherche dans une modale
 * - Modifier un contact
 * - Utiliser Bootstrap pour plus joli et responsive
 * - Affichage des personnes dans des onglets en fonction de la lettre de début de leur nom puis par ordre alphabétique
 * - Proposer de faire une recherche par ville
 * - Enregistrement des données en JSON dans le backend par la suite
 */

import {Contact} from "../models/Contact.js";

// Variables générales
let contactList = [];
let contactListSearched = [];

// Clic sur Ajouter
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.getElementById('formAdd');
    const data = new FormData(form);
    const firstname = data.get('firstname');
    const lastname = data.get('lastname');
    const phone = data.get('phone');
    addContactToList(firstname, lastname, phone);
});

// Clic sur Rechercher
document.getElementById('search').addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.getElementById('formSearch');
    const data = new FormData(form);
    const word = data.get('search');
    searchContactInList(word);
});

// Clic sur supprimer
document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('deleteBtn')) {
        const target = event.target.classList;
        const id = parseInt(target[0]);
        let removed = contactList;
        removed = contactList.splice(id,1);
        displayInHtml(contactList);
    };
});


// Ajouter des contacts
const addContactToList = (firstname, lastname, phone) => {
    const newContact = new Contact(firstname, lastname, phone);
    console.log(newContact)
    let isFounded = false;
    if (contactList.length != 0) {
        for (let i=0; i < contactList.length; i++) {
            const fn = contactList[i].firstname;
            const fnSearch = fn.toLowerCase();
            const ln = contactList[i].lastname;
            const lnSearch = ln.toLowerCase();
            const phoneSearch = contactList[i].phone;
            if (fnSearch === firstname.toLowerCase() && lnSearch === lastname.toLowerCase() && phoneSearch === phone) {
                alert("Ce contact existe déjà !");
                isFounded = true;
                break;
            };
        };
        if (isFounded != true) {
            contactList.push(newContact);
            displayInHtml(contactList);
        };
    } else {
        contactList.push(newContact);
        displayInHtml(contactList);
    };
};

// Rechercher des contacts avec juste quelques lettres du nom, prénom ou num de tel
const searchContactInList = (word) => {
    contactListSearched = [];
    for (let i=0; i < contactList.length; i++) {
        const firstname = contactList[i].firstname;
        const fnSearch = firstname.toLowerCase();
        const lastname = contactList[i].lastname;
        const lnSearch = lastname.toLowerCase();
        const phone = contactList[i].phone;
        if (fnSearch.includes(word.toLowerCase()) || lnSearch.includes(word.toLowerCase()) || phone.includes(word)) {
            const searchedContact = new Contact(firstname, lastname, phone);
            contactListSearched.push(searchedContact);
        }
    };
    displayInHtml(contactListSearched);
};

// Afficher les contacts dans un tableau
const displayInHtml = (list) => {
    const tbody = document.querySelector('.js-table-body');
    tbody.innerHTML = "";
    for (let i=0; i < list.length; i++) {
        const tr = document.createElement('tr');
        const tdFirst = document.createElement('td');
        tdFirst.textContent = list[i].firstname;
        const tdLast = document.createElement('td');
        tdLast.textContent = list[i].lastname;
        const tdPhone = document.createElement('td');
        tdPhone.textContent = list[i].phone;
        const tdButton = document.createElement('button');
        tdButton.classList.add(i);
        tdButton.classList.add('deleteBtn');
        tdButton.textContent = "Supprimer";
        
        tr.appendChild(tdFirst);
        tr.appendChild(tdLast);
        tr.appendChild(tdPhone);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    };
};




/** Créer des variables avec un set de données
const contact = new Contact("Kühn", "Myriam", "0682499706");
const contactDeux = new Contact("Kühn", "Matthias", "0630301530");
console.log(contact);
*/

/**  Pour créer 100 identiques dans le tableau
for(let i=0; i<100; i++){
    contactList.push(new Contact("Dupont", "Anne", "0682499706"));
};

console.log(contactList);
*/