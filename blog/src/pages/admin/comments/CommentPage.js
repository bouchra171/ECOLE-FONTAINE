import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { AdminContext } from '../../../utils/adminContext'; 
import { deleteComment } from '../../../services/admin/commentService'; 
import CommentEditForm from './EditComment'; 
import "../../../styles/dashbord/commentPage.css"; // Importation des styles de la page

// Composant de la page des commentaires dans le contexte d'admin
const CommentPage = () => {
    const [data, setData] = useState([]) // État pour conserver les données des commentaires
    const { commentsArticles, setMessageNotification } = useContext(AdminContext) // Utilisation du Contexte Admin

    const [showEditForm, setShowEditForm] = useState(null); // État pour gérer l'affichage du formulaire d'édition
    const [showConfirmation, setShowConfirmation] = useState(null); // État pour gérer l'affichage de la confirmation de suppression

    // Fonction pour gérer le clic sur le bouton de suppression
    const handleDeleteClick = (commentId) => {
        setShowConfirmation(commentId);
    };

    // Fonction pour gérer la confirmation de suppression
    const handleConfirmClick = async (commentId) => {
        const response = await deleteComment(commentId)
        setMessageNotification(response.message)
        setShowConfirmation(false);
    };

    // Fonction pour gérer l'annulation de la suppression
    const handleCancelClick = () => {
        setShowConfirmation(false);
    };

    // Fonction pour gérer le clic sur le bouton d'édition
    const handleEditClick = (commentId) => {
        setShowEditForm(commentId);
    };

    // Hook d'effet pour mettre à jour les données lors de la modification des commentaires, l'ajout ou la suppression
    useEffect(() => {
        setData(commentsArticles)
    }, [showConfirmation, commentsArticles, showEditForm])

    // Méthode de rendu
    return (
        <div className="d-flex flex-column gap-3 pt-2">
            <div className='d-flex flex-column gap-3 px-4'>
                {data && data?.map((article, index) => (
                    // Pour chaque article, afficher le titre et le nombre de commentaires
                    <div key={index} className="d-flex flex-column flex-wrap gap-3 justify-content-start">
                        <div className='d-flex align-items-center gap-2 border-bottom'>
                            <h4>{article.title} </h4><span>({article?.comments.length})commentaires</span>
                        </div>
                        <div className='d-flex flex-wrap gap-2'>
                            {
                                article.comments.length > 0 ? article.comments.map((comment, inde) => (
                                    <div key={inde} className="card comment-card" >
                                        {
                                            // Si le formulaire d'édition doit être affiché, afficher le formulaire d'édition, sinon, afficher le commentaire
                                            showEditForm === comment.commentId ? (<CommentEditForm commentId={comment.commentId} userId={comment.userId} comment={comment} setShowEditForm={setShowEditForm} />) :
                                                (
                                                    <div className="d-flex px-2 flex-column justify-content-between">
                                                        <span className="card-text font-bold">{comment.comment}</span>
                                                        <div className='row '>
                                                            <span className="card-text text-center comment-author" >Auteur : {comment.userName}</span>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                        
                                        <div className="d-flex gap-4 border p-1 m-0 w-100 justify-content-between">
                                            <div>
                                                {
                                                    showEditForm === comment.commentId ? (
                                                        // Si le formulaire d'édition est ouvert, afficher le bouton pour fermer le formulaire
                                                        <FaTimes
                                                            className="action-icon text-danger"
                                                            size={22}
                                                            onClick={() => setShowEditForm(false)} />
                                                    ) : (
                                                        // Sinon, afficher le bouton pour ouvrir le formulaire d'édition
                                                        <FaEdit onClick={() => handleEditClick(comment.commentId)} className="action-icon  text-primary " size={22} />
                                                    )
                                                }
                                            </div>
                                            <div className='d-flex justify-content-around align-items-center gap-3'>
                                                {showConfirmation === comment.commentId ? (
                                                    // Si la suppression est en attente de confirmation, afficher les boutons pour confirmer ou annuler la suppression
                                                    <>
                                                        <FaCheck
                                                            className="action-icon text-success"
                                                            size={22}
                                                            onClick={() => handleConfirmClick(comment.commentId)}
                                                        />
                                                        <FaTimes
                                                            className="action-icon text-danger"
                                                            size={22}
                                                            onClick={handleCancelClick}
                                                        />
                                                    </>
                                                ) : (
                                                    // Sinon, afficher le bouton pour initier la suppression
                                                    <FaTrash
                                                        className="action-icon text-danger"
                                                        size={22}
                                                        onClick={() => handleDeleteClick(comment.commentId)}
                                                    />
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )) : (<span className='text-secondary'>Pas de commentaire pour cet article</span>)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentPage 
