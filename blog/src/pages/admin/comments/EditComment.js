import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik'; // Importation des composants Formik pour la gestion de formulaire
import * as Yup from 'yup'; // Importation de Yup pour la validation de formulaire

import { FaSave, } from 'react-icons/fa'; // Importation de l'icône de sauvegarde
import { AdminContext } from '../../../utils/adminContext'; // Importation du Contexte Admin
import { updateComment } from '../../../services/admin/commentService'; // Service pour mettre à jour un commentaire
import { toast } from 'react-toastify'; // Importation du composant toast pour les notifications

// Composant de formulaire d'édition de commentaires
const CommentEditForm = ({ commentId,userId, comment,setShowEditForm }) => {
    const { setMessageNotification } = useContext(AdminContext) // Utilisation du Contexte Admin

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (values, { setSubmitting }) => {
        // Préparation des données mises à jour
        const updatedComment = {
            userId: userId,
            content: values.comment
        }
        // Appel du service pour mettre à jour le commentaire
        const response = await updateComment(commentId, updatedComment)
        if (response.success === true) {
            toast.success(response.message, {
                autoClose: 500, 
              });
            // Mise à jour de la notification et fermeture du formulaire d'édition
            setMessageNotification(response.message)
            setShowEditForm(false)
        } else {
            // En cas d'erreur, afficher un message d'erreur
            toast.error(response.message)
        }
        // Fin de la soumission
        setSubmitting(false);
    };

    // Schéma de validation pour le formulaire
    const validationSchema = Yup.object().shape({
        comment: Yup.string().required('Le commentaire est requis'),
    });

    // Styles pour le champ textarea
    const styles = {
        textarea: {
            resize: 'vertical',
            outline: 'none',
            padding: '2px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
        }
    }

    // Méthode de rendu
    return (
        <Formik
            initialValues={{ comment: comment.comment }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting }) => (
                <Form className='d-flex flex-column align-item-start '>
                    <Field
                        as="textarea"
                        name="comment"
                        style={styles.textarea}
                    />
                    <ErrorMessage name="comment" component="div" className="text-danger" />

                    <button className='btn ' type="submit" disabled={isSubmitting}>
                        <FaSave className="action-icon  text-primary " size={22} />
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CommentEditForm;
