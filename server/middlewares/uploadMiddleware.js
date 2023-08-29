import multer from 'multer';
import path from 'path';

// Configuration du stockage des fichiers téléchargés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Définissez le dossier de destination des fichiers téléchargés
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) // Définissez le nom du fichier téléchargé
  },
});

// Fonction de filtrage des types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/; // Définissez les types de fichiers acceptés
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    cb(null, true); // Accepte le fichier
  } else {
    cb(new Error('Seuls les fichiers images sont autorisés !'), false); // Rejette le fichier
  }
};

// Configuration de l'upload avec Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite la taille du fichier à 5 Mo
  },
  fileFilter: fileFilter,
});

export default upload;


