const express = require('express');
const router = express.Router();
const siswaController = require('../controllers/siswaController');

// Mapping URL ke fungsi Controller
router.get('/', siswaController.getAllSiswa);
router.get('/next-kode', siswaController.getNextKode);
router.get('/:id', siswaController.getSiswaById);
router.post('/', siswaController.createSiswa);
router.put('/:id', siswaController.updateSiswa);
router.delete('/:id', siswaController.deleteSiswa);

module.exports = router;