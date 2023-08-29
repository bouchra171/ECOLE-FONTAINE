import pool from "../config/database.js";
import bcrypt from 'bcrypt';

export const createUser = (userData, callback) => {
  const { name, email, password } = userData;

  // Vérification des champs obligatoires
  if (!name || !email || !password) {
    callback({ success: false, message: 'Tous les champs doivent être renseignés' }, null);
    return;
  }

  // Vérification du format de l'e-mail
  if (!isValidEmail(email)) {
    callback({ success: false, message: 'L\'adresse e-mail n\'est pas valide' }, null);
    return;
  }

  // Vérification de l'unicité de l'email
  getUserByEmail(email, (error, existingUser) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (existingUser) {
      callback({ success: false, message: 'Cet email est déjà utilisé' }, null);
      return;
    }

    // Vérification de la complexité du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      callback({ success: false, message: 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre' }, null);
      return;
    }

    // Cryptage du mot de passe avec bcrypt
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        callback(error, null);
        return;
      }

      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      pool.query(query, [name, email, hashedPassword], (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          const userId = result.insertId;
          const defaultRoleId = 2;
          assignRoleToUser(userId, defaultRoleId, (error) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, { success: true, userId });
            }
          });
        }
      });
    });
  });
};

export const getAllUsers = (callback) => {
  const query = `
    SELECT users.*, roles.name AS role, roles.id AS roleId
    FROM users
    JOIN user_roles ON users.id = user_roles.user_id
    JOIN roles ON user_roles.role_id = roles.id
  `;
  pool.query(query, (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, rows);
    }
  });
};

export const getUserByEmail = (email, callback) => {
  const query = `
    SELECT users.*, roles.name AS role
    FROM users
    JOIN user_roles ON users.id = user_roles.user_id
    JOIN roles ON user_roles.role_id = roles.id
    WHERE email = ?
  `;
  pool.query(query, [email], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      const user = rows[0];
      callback(null, user);
    }
  });
};

export const getUserById = (userId, callback) => {
  const query = `
    SELECT users.*, roles.name AS role
    FROM users
    JOIN user_roles ON users.id = user_roles.user_id
    JOIN roles ON user_roles.role_id = roles.id
    WHERE users.id = ?
  `;
  pool.query(query, [userId], (error, rows) => {
    if (error) {
      callback(error, null);
    } else {
      const user = rows[0];
      callback(null, user);
    }
  });
};

export const updateUser = (userId, userData, callback) => {
  const { name, email, roleId } = userData;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  pool.query(query, [name, email, userId], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      updateRoleForUser(userId, roleId, (error) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, result.affectedRows > 0);
        }
      });
    }
  });
};

export const updateUserPassword = (userId, passwordData, callback) => {
  const { oldPassword, newPassword } = passwordData;

  // Récupérer le mot de passe actuel de l'utilisateur
  const getPasswordQuery = 'SELECT password FROM users WHERE id = ?';
  pool.query(getPasswordQuery, [userId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (results.length === 0) {
      callback("Utilisateur non trouvé", null);
      return;
    }

    const currentPassword = results[0].password;

    // Vérifier si l'ancien mot de passe correspond
    bcrypt.compare(oldPassword, currentPassword, (error, isMatch) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (!isMatch) {
        callback("Le mot de passe actuel est incorrect", null);
        return;
      }

      // Changer le mot de passe
      bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
        if (error) {
          callback(error, null);
          return;
        }

        const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
        pool.query(updatePasswordQuery, [hashedPassword, userId], (error, result) => {
          if (error) {
            callback(error, null);
          } else {
            callback(null, result.affectedRows > 0);
          }
        });
      });
    });
  });
};


export const deleteUser = (userId, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  pool.query(query, [userId], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result.affectedRows > 0);
    }
  });
};

export const assignRoleToUser = (userId, roleId, callback) => {
  const query = 'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)';
  pool.query(query, [userId, roleId], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null);
    }
  });
};

export const updateRoleForUser = (userId, roleId, callback) => {
  const query = 'UPDATE user_roles SET role_id = ? WHERE user_id = ?';
  pool.query(query, [roleId, userId], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null);
    }
  });
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


