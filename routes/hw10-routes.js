// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

const express = require('express');
const router = express.Router();
const db = require('../db');

function buildPage(monsters, message, error, battle) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IC23: Student Directory</title>
  <link rel="stylesheet" href="css/hw10.css">
</head>
<body>
  <h1>Monster Arena</h1>
    ${message ? `<p class="message">${message}</p>` : ''}
    ${error ? `<p class="error">${error}</p>` : ''}
  <h2>Roster</h2>
  <div class="roster">
    ${monsters.map(m => `
      <div class="monster-card">
        <h3>${m.name}</h3>
        <p class = "species">${m.species}</p>
        <ul>
        <ul>
        <li>ID: ${m.id}</li>
        <li>Attack: ${m.attack}</li>
        <li>Defense: ${m.defense}</li>
        <li>HP: ${m.hp}</li>
        </ul>
      </div>
    `).join('')}
  </div>

<div class = "forms">
<form action = "/hw10/recruit" method="POST" class="form-box">
    <h2>Recruit</h2>
    <label>Name <input type="text" name="name" required></label>
      <label>Species <input type="text" name="species" required></label>
      <label>Attack <input type="number" name="attack" required></label>
      <label>Defense <input type="number" name="defense" required></label>
      <label>HP <input type="number" name="hp" required></label>
      <button type="submit">Recruit</button>
    </form>
    
    <form action="/hw10/retire" method="POST" class="form-box">
      <h2>Retire</h2>
      <label>Monster ID <input type="number" name="id" required></label>
      <button type="submit">Retire</button>
    </form>

    <form action="/hw10/battle" method="POST" class="form-box">
      <h2>Battle</h2>
      <button type="submit">Battle!</button>
    </form>
  </div>

  ${battle ? `
    <div class="battle-results">
      <h2>Battle Result</h2>
      <div class="fighters">
        <div class="fighter">
          <p>${battle.a.species}</p>
        <p>ATK ${battle.a.attack} / DEF ${battle.a.defense} / HP ${battle.a.hp}</p>
        <p><strong>Score: ${battle.scoreA}</strong></p>
      </div>
        <div class="vs">VS</div>
      <div class="fighter">
        <h3>${battle.b.name}</h3>
        <p>${battle.b.species}</p>
        <p>ATK ${battle.b.attack} / DEF ${battle.b.defense} / HP ${battle.b.hp}</p>
        <p><strong>Score: ${battle.scoreB}</strong></p>
      </div>
    </div>
    <p class="winner">${battle.winner}</p>
    </div>` : ''}
  </body>
  </html>`;
}

router.get('/', (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
        if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
        const html = buildPage(rows, message, error, null);
        res.send(html);
    });
});

router.post('/recruit', (req, res) => {
    const { name, species, attack, defense, hp } = req.body;
    db.run(
        'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
        [name, species, attack, defense, hp],
        function (err) {
            if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
            res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
        }
    );
});

router.post('/retire', (req, res) => {
    const { id } = req.body;
    db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
        if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
        if (this.changes === 0) {
            return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
        }
        res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
    });
});

router.post('/battle', (req, res) => {
    db.all('SELECT * FROM monsters', [], (err, rows) => {
        if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
        if (rows.length < 2) {
            return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
        }

        let i = Math.floor(Math.random() * rows.length);
        let j;
        do { j = Math.floor(Math.random() * rows.length); } while (j === i);

        const a = rows[i];
        const b = rows[j];
        const scoreA = a.attack + a.defense + a.hp;
        const scoreB = b.attack + b.defense + b.hp;

        let winner = 'Draw!';
        if (scoreA > scoreB) winner = a.name + ' wins!';
        else if (scoreB > scoreA) winner = b.name + ' wins!';

        const battle = { a, b, scoreA, scoreB, winner };
        const html = buildPage(rows, null, null, battle);
        res.send(html);
    });
});

module.exports = router;