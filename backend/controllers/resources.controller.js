const Resource = require('../models/resources.model');

// Create a new resource
const createResource = async (req, res) => {
    try {
        const { resourceType, title, author, content, link } = req.body;

        // Validate inputs
        if (!resourceType || !title || !author || !content || !link) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create resource
        const resource = await Resource.create({
            resourceType,
            title,
            author,
            content,
            link
        });

        res.status(201).json(resource);

    } catch (error) {
        console.error("Error creating resource:", error);
        res.status(500).json({ error: "Failed to create resource" });
    }
};

// Get all resources
const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ error: "Failed to fetch resources" });
    }
};

// Get a resource by ID
const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);

        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.status(200).json(resource);
    } catch (error) {
        console.error("Error fetching resource:", error);
        res.status(500).json({ error: "Failed to fetch resource" });
    }
};

// Update a resource by ID
const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const resource = await Resource.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.status(200).json(resource);
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).json({ error: "Failed to update resource" });
    }
};

// Delete a resource by ID
const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findByIdAndDelete(id);

        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ error: "Failed to delete resource" });
    }
};

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
};  