import pool from "../config/database.js";

export const createArticle = (articleData, callback) => {
  const query = 'INSERT INTO articles SET ?';
  pool.query(query, articleData, callback);
};

export const getAllArticles = (callback) => {
  const query = `
    SELECT articles.*, category.category_name
    FROM articles
    LEFT JOIN category ON articles.category_id = category.id    
    ORDER BY articles.id ASC
  `;
  pool.query(query, callback);
};
export const getArticlesTitreWithComments = (callback) => {
  const query = `
  SELECT articles.id, articles.title, comments.id AS commentId, comments.content AS comment, comments.user_id, users.name AS user_name
  FROM articles
  LEFT JOIN comments ON articles.id = comments.article_id
  LEFT JOIN users ON comments.user_id = users.id
`;

  pool.query(query, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      const articles = [];
      let currentArticle = null;
      results.forEach(result => {
        const articleId = result.id;

        if (!currentArticle || currentArticle.id !== articleId) {
          currentArticle = {
            ...result,
            comments: []
          };
          articles.push(currentArticle);
        }

        if (result.comment) {
          const comment = {
            commentId:result.commentId,
            comment: result.comment,
            userName: result.user_name,
            userId: result.user_id
          };
          currentArticle.comments.push(comment);
        }
      });
      const articlesComments=[]
      articles.forEach(article =>{
        const currentArticleComments = {
          articleId:article.id,
          title:article.title,
          comments:article.comments
        }
        articlesComments.push(currentArticleComments)
      })

      callback(null, articlesComments);
    }
  });
};

export const getArticleById = (articleId, callback) => {
  const query = 'SELECT * FROM articles WHERE id = ?';
  pool.query(query, articleId, callback);
};

export const getArticleWithComments = (articleId, callback) => {
  const query = `
    SELECT articles.*,comments.id AS commentId,comments.created_at AS date, comments.content AS comment,comments.user_id, users.name AS user_name
    FROM articles
    LEFT JOIN comments ON articles.id = comments.article_id
    LEFT JOIN users ON comments.user_id = users.id
    WHERE articles.id = ?
  `;
  pool.query(query, [articleId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      const article = results[0];
      const comments = results.map(result => ({
        commentId:result.commentId,
        comment: result.comment,
        userName: result.user_name,
        userId: result.user_id,
        date: result.date
      }));
      article.comments = comments;
      callback(null, article);
      //console.log(article)
    }
  });
};


export const  updateArticle = (articleId, articleData, callback) => {
  const query = 'UPDATE articles SET ? WHERE id = ?';
  pool.query(query, [articleData, articleId], callback);
};

export const deleteArticle = (articleId, callback) => {
  const query = 'DELETE FROM articles WHERE id = ?';
  pool.query(query, articleId, callback);
};

export const filterArticle = (query, callback) => {
  const searchQuery = `%${query}%`;
  const sql = 'SELECT * FROM articles WHERE title LIKE ?';
  pool.query(sql, searchQuery, callback);
};



