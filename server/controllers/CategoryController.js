import * as categoryService from '../services/categoryService.js';

// Créer une catégorie
export function createCategory(req, res) {
  const categoryData = req.body;
  categoryService.createCategory(categoryData, (error, categoryId) => {
    if (error) {
      res.status(500).json({success: false, error: 'Une erreur s\'est produite lors de la création de la catégorie' });
    } else {
      res.status(201).json({success: true, categoryId: categoryId, message: 'Catégorie créée avec succès' });
    }
  });
}

// Récupérer toutes les catégories
export function getAllCategories(req, res) {
  categoryService.getAllCategories((error, categories) => {
    if (error) {
      res.status(500).json({success: false, error: 'Une erreur s\'est produite lors de la récupération des catégories' });
    } else {
      res.status(200).json(categories);
    }
  });
}

// Récupérer une catégorie par son ID
export function getCategoryById(req, res) {
  const { id } = req.params;
  categoryService.getCategoryById(id, (error, category) => {
    if (error) {
      res.status(500).json({success: false, error: 'Une erreur s\'est produite lors de la récupération de la catégorie' });
    } else if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({success: false, error: 'Catégorie non trouvée' });
    }
  });
}

// Mettre à jour une catégorie
export function updateCategory(req, res) {
  const { id } = req.params;
  const categoryData= req.body;
  categoryService.updateCategory(id, categoryData, (error, success) => {
    if (error) {
      res.status(500).json({success: false, error: 'Une erreur s\'est produite lors de la mise à jour de la catégorie' });
    } else if (success) {
      res.status(200).json({success: true, message: 'Catégorie mise à jour avec succès' });
    } else {
      res.status(404).json({success: false, error: 'Catégorie non trouvée' });
    }
  });
}

// Supprimer une catégorie
export function deleteCategory(req, res) {
  const { id } = req.params;
  categoryService.deleteCategory(id, (error, success) => {
    if (error) {
      res.status(500).json({success: false, error: 'Une erreur s\'est produite lors de la suppression de la catégorie' });
    } else if (success) {
      res.status(200).json({success: true, message: 'Catégorie supprimée avec succès' });
    } else {
      res.status(404).json({success: false, error: 'Catégorie non trouvée' });
    }
  });
}


