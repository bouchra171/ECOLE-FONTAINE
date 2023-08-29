import * as articleService from '../services/articleService.js';

export const createArticle = (req, res) => {
  const articleData = req.body;
  const articleFile = req.file;

  // Extraire le nom du fichier à partir de l'objet `articleFile`
  const fileName = articleFile ? articleFile.filename : null;
  const image_path = fileName ? '/images/' + fileName : null;

  const { title, content, categoryId, userId } = articleData;
  const article = {
    title,
    content,
    image_path,
    category_id:categoryId,
    user_id:userId
  };

  articleService.createArticle(article, (error, articleId) => {
    if (error) {
      console.error(`Erreur lors de la création de l'article : ${error}`);
      res.status(500).send('Erreur serveur');
    } else {
      res.status(201).json({ success: true, message: 'Article créé avec succès !', articleId });
    }
  });
};

export const getAllArticles = (req, res) => {
  articleService.getAllArticles((error, articles) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(articles);
    }
  });
};
export const getArticlesTitreWithComments = (req, res) => {
  articleService.getArticlesTitreWithComments((error, articles) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else {
      res.json(articles);
    }
  });
};



export const getArticleById = (req, res) => {
  const articleId = req.params.id;
  articleService.getArticleById(articleId, (error, article) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article introuvable' });
    }
  });
};

export const getArticleWithComments = (req, res) => {
  const articleId = req.params.id;
  articleService.getArticleWithComments(articleId, (error, article) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article introuvable' });
    }
  });
};

export const updateArticle = (req, res) => {
  const articleId = req.params.id;
  const articleData = req.body;
  const articleFile = req.file;
  
  let imagePath = null;
  if (articleFile) {
    const fileName = articleFile.filename;
    imagePath = '/images/' + fileName;
  }else{
    imagePath = articleData.imagePath
  }

  const { title, content, categoryId, userId } = articleData;
  const article = {
    title,
    content,
    image_path:imagePath,
    category_id:categoryId,
    user_id:userId
  };

  articleService.updateArticle(articleId, article, (error, updated) => {
    if (error) {
      console.error(`Erreur lors de la mise à jour de l'article : ${error}`);
      res.status(500).send('Erreur serveur');
    } else if (updated) {
      res.json({ success: true, message: 'Article mis à jour avec succès!' });
    } else {
      res.json({ success: false, message: 'Echec de la mise à jour de l\'article!' });
    }
  });
};

export const deleteArticle = (req, res) => {
  const articleId = req.params.id;
  articleService.deleteArticle(articleId, (error, deleted) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'article' });
    } else if (deleted) {
      res.status(200).json({ success: true, message: `Article ${articleId} supprimé avec succès` });
    } else {
      res.status(404).json({ success: false, error: 'Article non trouvé' });
    }
  });
};

export const filterArticle = (req, res) => {
  const query = req.params.query;
  articleService.filterArticle(query, (error, articles) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    } else if (articles.length > 0) {
      res.status(200).json(articles);
    } else {
      res.status(404).send('Aucun article trouvé');
    }
  });
};




