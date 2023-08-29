import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function verifyToken(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token non authentifiée !' });
  }

  const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decodedToken) => { 
    if (err) {
      return res.status(401).json({ message: 'Requête non authentifiée !' });
    } else {
      req.user = decodedToken;
      next();
    }
  });
}