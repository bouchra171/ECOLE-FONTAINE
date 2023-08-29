import pool from '../config/database.js';

// Créer une catégorie
export function createCategory(categoryData, callback) {
  const { categoryName } = categoryData;
  const query = 'INSERT INTO category (category_name) VALUES (?)';
  pool.query(query, [categoryName], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, { success: true, categoryId: result.insertId });
    }
  });
}

// Récupérer toutes les catégories
export function getAllCategories(callback) {
  const query = 'SELECT * FROM category';
  pool.query(query, (error, categories) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, categories);
    }
  });
}

// Récupérer une catégorie par son ID
export function getCategoryById(id, callback) {
  const query = 'SELECT * FROM category WHERE id = ?';
  pool.query(query, [id], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows[0]);
    }
  });
}

// Mettre à jour une catégorie
export function updateCategory(categoryId, categoryData, callback) {
  const { categoryName } = categoryData;
  getCategoryById(categoryId, (error, categoryToUpdate) => {
    if (error) {
      callback(error, null);
    } else {
      if (categoryToUpdate) {
        const query = 'UPDATE category SET category_name = ? WHERE id = ?';
        pool.query(query, [categoryName, categoryId], (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.affectedRows > 0);
          }
        });
      } else {
        callback(null, false);
      }
    }
  });
}

// Supprimer une catégorie
export function deleteCategory(id, callback) {
  const query = 'DELETE FROM category WHERE id = ?';
  pool.query(query, [id], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result.affectedRows > 0);
    }
  });
}

