// guardian.js

const express = require('express');
const db = require('../backend/db'); // Ensure this points to your database connection module
const router = express.Router();

// GET all guardians
router.get('/guardian', (req, res) => {
  db.query('SELECT * FROM guardian', (err, results) => {
    if (err) {
      console.error('Error fetching guardians:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch guardians' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// GET a single guardian by ID
router.get('/guardian/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM guardian WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching guardian:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch guardian' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, error: 'Guardian not found' });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
});

// POST create a new guardian
router.post('/guardian', (req, res) => {
  const {
    child_id,
    gardian_name,
    gardian_cnic,
    address,
    contact,
    email,
    emergency_contact,
    image
  } = req.body;

  db.query(
    'INSERT INTO guardian (child_id, gardian_name, gardian_cnic, address, contact, email, emergency_contact, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [child_id, gardian_name, gardian_cnic, address, contact, email, emergency_contact, image],
    (err, result) => {
      if (err) {
        console.error('Error creating guardian:', err);
        return res.status(500).json({ success: false, error: 'Failed to create guardian' });
      }
      res.status(201).json({ success: true, message: 'Guardian created successfully', id: result.insertId });
    }
  );
});

// PUT update an existing guardian
router.put('/guardian/:id', (req, res) => {
  const { id } = req.params;
  const {
    child_id,
    gardian_name,
    gardian_cnic,
    address,
    contact,
    email,
    emergency_contact,
    image
  } = req.body;

  db.query(
    'UPDATE guardian SET child_id=?, gardian_name=?, gardian_cnic=?, address=?, contact=?, email=?, emergency_contact=?, image=? WHERE id=?',
    [child_id, gardian_name, gardian_cnic, address, contact, email, emergency_contact, image, id],
    (err, result) => {
      if (err) {
        console.error('Error updating guardian:', err);
        return res.status(500).json({ success: false, error: 'Failed to update guardian' });
      }
      res.status(200).json({ success: true, message: 'Guardian updated successfully' });
    }
  );
});

// DELETE delete a guardian by ID
router.delete('/guardian/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM guardian WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting guardian:', err);
      return res.status(500).json({ success: false, error: 'Failed to delete guardian' });
    }
    res.status(200).json({ success: true, message: 'Guardian deleted successfully' });
  });
});

module.exports = router;
