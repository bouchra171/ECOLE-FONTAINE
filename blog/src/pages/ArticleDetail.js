import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
// useLocation donne accès à l'objet de location qui contient des informations sur l'URL actuelle.
// useNavigate est un hook qui permet de rediriger l'utilisateur vers différentes routes.
// useParams est un hook qui donne accès aux paramètres de l'URL.
import { getArticleWithComments } from '../services/admin/articleService';
import { toast } from 'react-toastify';
import { createComment, deleteComment } from '../services/admin/commentService';
import { AuthContext } from '../utils/authContext';
import { dateFormatter } from '../utils/dateFormatter';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { AdminContext } from '../utils/adminContext';// Récupération de la fonction pour définir le message de notification.

import CommentEditForm from './admin/comments/EditComment';
import '../styles/article.css'

function ArticleDetail() {
  const { user } = useContext(AuthContext)
  const { setMessageNotification } = useContext(AdminContext)

  const location = useLocation();
  const navigate = useNavigate()
  const article = location.state?.article;// Récupération de l'article passé en paramètre via l'état de la route.
  const { id } = useParams();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(null)

  // Delete and edit comments
  const [showEditForm, setShowEditForm] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(null);

  const handleDeleteClick = (commentId) => {
    // Afficher les icônes de confirmation pour le commentaire spécifique
    setShowConfirmation(commentId);
  };

  const handleConfirmClick = async (commentId) => {
    const response = await deleteComment(commentId)
    setMessageNotification(response.message)
    setShowConfirmation(false);
  };

  const handleCancelClick = () => {
    // Masquer les icônes de confirmation
    setShowConfirmation(false);
  };
  const handleEditClick = (commentId) => {
    // Masquer les icônes de confirmation
    setShowEditForm(commentId);
  };

  //les options du commentaires
  const handleClickShowOptions = (commentId) => {
    // Masquer les icônes de confirmation
    setShowOptions(commentId);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const isSafeComment = (comment) => {
    const unsafePatterns = /<[^>]*>|alert\(|document\.|eval\(|function\(|javascript:|window\./i;
    return !unsafePatterns.test(comment);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    if (user) {


      e.preventDefault();

      const newComment = {
        userId: user.id,
        articleId: id,
        content: comment,
      };

      if (!isSafeComment(comment)) {
        console.log('Le commentaire contient un contenu potentiellement dangereux. Veuillez vérifier votre saisie.');
        toast.error('Le commentaire contient un contenu potentiellement dangereux. Veuillez vérifier votre saisie.')
        return;
      } else {
        const result = await createComment(newComment)
        console.log(result)
      }


      setComments([...comments, newComment]);
      setComment('');
    } else {
      toast.error("Vous devez d'abord vous connecter pour commenter un article!")
      navigate('/login')
    }
  };

  //console.log("comment ", comments)
  useEffect(() => {
    const fetchArticleWithComments = async () => {
      try {
        const currentArticle = await getArticleWithComments(id);
        setComments(currentArticle.comments);
        //console.log("article", currentArticle.comments);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'article avec les commentaires:', error);
      }
    };
    // console.log(comments)
    fetchArticleWithComments();
  }, [id, comments]);


  return (
    <div className="container p-4">
      <div className="row">
        <div className="col">
          <h2 className="text-center">{article.title}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <img src={article.image_path ? article.image_path : "/img/photo1.jpg"} alt={article.title} className="my-3 img-fluid rounded image" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="content">{article.content}</p>
        </div>
      </div>

      <div className="row">
        {
          comments[0]?.comment !== null && (
            <>
              <h3 className='my-3'>Commentaires</h3>
              <div className="row row-cols-1 row-cols-sm-2">
                {comments?.map((comment, index) => {
                  const formattedDate = dateFormatter(article.date);
                  return (comment?.comment &&
                    <div key={index} className=" mb-3">
                      <div className="d-flex gap-2 justify-content-start align-nav-item">
                        <img src="/img/photo1.jpg" alt={comment?.userName} className="comment-image" />
                        <h5 className="text-center">{comment?.userName}</h5>
                      </div>
                      <div className='comment-content'>
                        {
                          showEditForm === comment.commentId ? (
                            <CommentEditForm commentId={comment?.commentId} userId={comment?.userId} comment={comment} setShowEditForm={setShowEditForm} />
                          ) : (
                            <span className='text-white py-1' >{comment?.comment}</span>
                          )
                        }
                        {
                          (user?.id === comment?.userId || user?.role === 'Admin') &&
                          <div className='comment-options'>
                            <FiMoreHorizontal className='action-icon' onClick={() => handleClickShowOptions(comment?.commentId)} color='white' size={25} />
                          </div>
                        }
                        {
                          showOptions === comment?.commentId && (
                            <div className='comment-options-menu'
                              onMouseLeave={handleMouseLeave} >
                              <div >
                                {showConfirmation === comment?.commentId ? (
                                  <div className='px-1 d-flex justify-content-between align-items-center gap-2'>
                                    <FaCheck
                                      className="action-icon text-success"

                                      size={22}
                                      onClick={() => handleConfirmClick(comment?.commentId)}
                                    />
                                    <FaTimes
                                      className="action-icon text-danger"

                                      size={22}
                                      onClick={handleCancelClick}
                                    />
                                  </div>
                                ) : (
                                  <FaTrash
                                    className="action-icon text-danger"

                                    size={22}
                                    onClick={() => handleDeleteClick(comment?.commentId)}
                                  />
                                )}
                              </div>
                              <div>
                                {
                                  showEditForm === comment?.commentId ? (

                                    <FaTimes
                                      className="action-icon text-danger"

                                      size={22}
                                      onClick={() => setShowEditForm(false)} />
                                  ) : (
                                    <FaEdit onClick={() => handleEditClick(comment?.commentId)} className="action-icon  text-primary " size={22} />
                                  )
                                }
                              </div>
                            </div>

                          )
                        }

                      </div>
                      <p className="text-muted comment-date">{formattedDate}</p>
                    </div>
                  )
                })}
              </div>
            </>)
        }
      </div>

      <div className="row mt-4">
        <div className="col">
          <h3>Ajouter un commentaire</h3>
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="comment">Commentaire</label>
              <textarea
                id="comment"
                className="form-control"
                rows="2"
                value={comment}
                onChange={handleCommentChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Soumettre</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
