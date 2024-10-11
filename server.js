/*
    Vevők nyilvántartása
*/
const express = require('express');
const app = express(); // az express mappából integrálja be a szükséges kiegészítők
const port = 3000;
app.use(express.json());

let vevok = [
    {
        id: 0, nev: "Józsi", kor: 32, foglalkozas: "futár"
    }
];

app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.status(200);
    res.send('Helló Express!');
});

/*
    összes vevő lekérdezése
*/
app.get('/vevok', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.status(200);
    res.json(vevok);
});

/*
    új vevő létrehozása
*/
app.post('/vevok', (req, res) => {
    console.log(req.body);

    let ujVevo = req.body;
    let { nev, kor } = ujVevo;  // Extract 'nev' and 'kor' from request body


    ujVevo.id = vevok.length + 1;
    vevok.push(ujVevo);

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.status(201);
    res.send(`Új vevő adatai: név: ${nev}, kor: ${kor}`);
});

/* 
    vevő adatainak módosítása
*/
app.put('/vevok/:id', (req, res) => {
    console.log(req.params.id);
    let id = parseInt(req.params.id);
    let ujVev = req.body;
    vevok[id - 1] = ujVev;
})

/*
    vevő adatainak törlése
*/
app.delete('/vevok/:id', (req, res) => {
    let id = req.params.id;
    vevok.slice(id,1);
    res.send(`A törlendő vevő adatai: v: ${vevok[id].nev}, k: ${vevok[id].kor}`)
})


app.listen(port, () => {
    console.log(`Az alkalmazás a http://localhost:${port} címen elérhető a szolgáltatás`);
});
