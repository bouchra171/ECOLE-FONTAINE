import express from 'express';// creer l application Express
import cors from 'cors';// activer la prise en charge des requetes 
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Creation de l application Express 
const app = express();
const PORT = process.env.APP_PORT || 5000; // Utilisation de la variable d'environnement PORT, sinon utiliser le port 3000 par défaut

// Configuration des middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
 app.use('/users', userRoutes);
 app.use('/roles', roleRoutes);
app.use('/articles', articleRoutes);
 app.use('/category', categoryRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});