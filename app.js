// Pour une présentation de notre séléction littéraire 
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const http = require('http');
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime)

// Séléction de livres incontournables
const books = [
    {
        title: "The Fellowship of the Ring",
        language: "English",
        country: "United Kingdom",
        author: "J.R.R. Tolkien",
        date: "1954-07-29"
    },
    {
        title: "Prelude to foundation",
        language: "English",
        country: "United States",
        author: "Isaac Asimov",
        date: "1988-11-08"
    },
    {
        title: "Voyage au centre de la terre",
        language: "Français",
        country: "France",
        author: "Jules Verne",
        date: "1864-11-25"
    },
    {
        title: "La nuit des temps",
        language: "Français",
        country: "France",
        author: "René Barjavel",
        date: "1968-05-20"
    },
    {
        title: "Carrion Comfort",
        language: "English",
        country: "United States",
        author: "Dan Simmons",
        date: "1989-02-15"
    }
];

const tableHeader = `
    <thead>
        <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Pays</th>
            <th>Langue</th>
            <th>Date de parution</th>
            <th>Âge du livre</th>
        </tr>
    </thead>
`;

// Création de notre serveur
const server = http.createServer((req, res) => {

    // On court-circuite l'appel automatique du navigateur au favicon.ico
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    // On envoi les header de la réponse http
    // ici nous voulons une réponse de type text encodé en UTF-8
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // On écrit l'entête de notre page html
    res.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge">    <title>Document</title></head><body>');

    // Corps de la page
    res.write('<table border="1" cellspacing="0" cellpadding="5">')

    res.write(tableHeader);
    console.log('hello');
    for (const book of books) {
        let bookLine = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.country}</td>
            <td>${book.language}</td>
            <td>${dayjs(book.date).format('dddd, MMMM Do YYYY')}</td>
            <td>${dayjs(book.date).fromNow()}</td>
        </tr>
        `
        res.write(bookLine);
    }

    res.write('</table>')

    // On écrit le pied de page de notre page html
    res.write('</body></html>');

    // On à fini d'envoyer nos informations au client
    res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000);
