const Institution = require('../models/institution.model');
const { cloudinary, upload } = require('../config/cloudinary');

class InstitutionController {
  async createInstitution(req, res) {
    const institution = req.body;
    try {
      let imageUrl = null;
      if (req.file) {
        imageUrl = req.file.path;
      }
      const newInstitution = new Institution({
        name: institution.name,
        description: institution.description,
        address: institution.address,
        mapEmbed: institution.mapEmbed,
        institutionImage: imageUrl
      });
      await newInstitution.save();
      res.status(201).json({ status: true, newInstitution });
    } catch (error) {
      res.status(400).json({ message: 'Institution not created' });
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
      const updateData = req.body;
      if (req.file) {
        updateData.institutionImage = req.file.path;
      }
      const institution = await Institution.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
      res.status(200).json({ message: 'Institution deleted successfully' }); // Send response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
}

module.exports = new InstitutionController();
module.exports.upload = upload;