const Institution = require('../models/institution.model');

class InstitutionController {
  async createInstitution(req, res) {
    try {
      const institution = new Institution(req.body);
      await institution.save();
      res.status(201).json(institution);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllInstitutions(req, res) {
    try {
      const institutions = await Institution.find();
      res.status(200).json(institutions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getInstitutionById(req, res) {
    try {
      const institution = await Institution.findById(req.params.id);
      if (!institution) {
        return res.status(404).json({ message: 'Institution not found' });
      }
      res.status(200).json(institution);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateInstitution(req, res) {
    try {
      const institution = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!institution) {
        return res.status(404).json({ message: 'Institution not found' });
      }
      res.status(200).json(institution);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteInstitution(req, res) {
    try {
      const institution = await Institution.findByIdAndDelete(req.params.id);
      if (!institution) {
        return res.status(404).json({ message: 'Institution not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new InstitutionController();