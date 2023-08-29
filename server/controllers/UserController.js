import * as userService from '../services/userService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Fonction de connexion (Login)
export function login(req, res) {
  //console.log('login:', req.body);
  const { email, password } = req.body;

  userService.getUserByEmail(email, (error, user) => {
    if (error) {
      console.error(`Erreur lors de l'authentification : ${error}`);
      return res.status(500).json({ success: 0, message: 'Erreur du serveur' });
    }

    if (!user) {
      return res.status(401).json({ success: 0, message: 'Email invalide' });
    }
    //console.log('User:', user);
    bcrypt.compare(password, user.password, (err, isPasswordValid) => {
      if (isPasswordValid) {
        user.password = undefined;
        const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        return res.json({ message: 'Authentification réussie !', user: user, token });
      } else {
        return res.status(401).json({ success: 0, message: 'Mot de passe incorrect' });
      }
    });
  });
}

// Fonction pour la déconnexion (Logout)
export const logout = (req, res) => {
  try {
    res.clearCookie(process.env.TOKEN_SECRET_KEY);
    res.status(200).json({ success: true, message: 'Déconnexion réussie' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la déconnexion' });
  }
};

// Fonction pour créer un nouvel utilisateur
export function createUser(req, res) {
  const userData = req.body;

  userService.createUser(userData, (error, userId) => {
    if (error) {
      console.error(`Erreur lors de la création de l'utilisateur : ${error}`);
      res.status(500).json({ error: `Erreur lors de la création de l'utilisateur : ${error}` });
    } else {
      res.status(201).json(userId);
    }
  });
}

// Fonction pour récupérer tous les utilisateurs
export function getAllUsers(req, res) {
  userService.getAllUsers((error, users) => {
    if (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    } else {
      res.status(200).json(users);
    }
  });
}

// Fonction pour récupérer un utilisateur par son identifiant
export function getUserById(req, res) {
  const userId = req.params.id;

  userService.getUserById(userId, (error, user) => {
    if (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur : ${error}`);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    } else {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    }
  });
}

// Fonction pour mettre à jour les informations d'un utilisateur
export function updateUser(req, res) {
  const userId = req.params.id;
  const userData = req.body;

  userService.updateUser(userId, userData, (error, success) => {
    if (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur : ${error}`);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    } else {
      if (success) {
        res.status(200).json({ success: true, message: 'Utilisateur mis à jour avec succès' });
      } else {
        res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }
    }
  });
}
// Fonction pour changer le mot de passe
export function updateUserPassword(req, res){
  const { userId } = req.params;
  const passwordData = req.body;

  userService.updateUserPassword(userId, passwordData, (error, success) => {
    if (error) {
      res.status(500).json({success: false, error });
    } else if (!success) {
      res.status(400).json({success: false, error: "Impossible de changer le mot de passe" });
    } else {
      res.status(200).json({ success: true });
    }
  });
};

// Fonction pour supprimer un utilisateur
export function deleteUser(req, res) {
  const userId = req.params.id;

  userService.deleteUser(userId, (error, success) => {
    if (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    } else {
      if (success) {
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    }
  });
}



