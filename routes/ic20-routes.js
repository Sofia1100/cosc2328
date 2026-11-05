// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

const express = require('express');
const router  = express.Router();

let missions = [
  { id: 1, name: 'Alpha Probe',  destination: 'Mars'   },
  { id: 2, name: 'Deep Survey',  destination: 'Europa' },
];
let nextId = 3;

//Get /ic20/missions
router.get('/missions', (req, res) => {
  res.json(missions);
});

//Post /ic20/missions - add a new mission
router.post('/missions', (req, res) => {
  const { name, destination } = req.body;
  if(!name || !destination) {
    return res.status(400).json({ error: 'Name and destination are required' });
  }
  const newMission = { id: nextId++, name, destination };
  missions.push(newMission);
  res.status(201).json(newMission);
});

//Delete /ic20/missions/:id - delete a mission by id
router.delete('/missions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = missions.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Mission not found' });
  const removed = missions.splice(idx, 1)[0];
  res.json(removed);
});



module.exports = router;