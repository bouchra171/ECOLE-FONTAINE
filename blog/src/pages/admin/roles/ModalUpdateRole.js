
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap'; 
import { Formik, Field, ErrorMessage } from 'formik'; // La gestion de formulaire avec Formik
import * as Yup from 'yup'; // La validation de formulaire avec Yup
import { AdminContext } from '../../../utils/adminContext'; 
import { addRole, updateRole } from '../../../services/admin/rolesService'; // Les fonctions pour ajouter et mettre à jour les rôles
import { toast } from 'react-toastify'; // Les notifications avec toast

const ModalEditRole = ({ showModal, roleData, handleModalClose }) => {
    const {setMessageNotification,messageNotification} = useContext(AdminContext) // Utilisation du contexte Admin
    const [messageErreur, setMessageErreur] = useState(null); // Le state pour stocker les messages d'erreur

    // Un effet pour réinitialiser le message d'erreur après 3 secondes
    useEffect(() => {
        if (messageErreur) {
            const timeout = setTimeout(() => {
                setMessageErreur('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [messageErreur]);

    // Le schéma de validation pour le formulaire
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom du rôle est requis'),
    });

    // La fonction pour gérer la soumission du formulaire
    const handleSubmit = async (values, { resetForm }) => {
        const response = await updateRole(roleData.id,values); // Mise à jour du rôle
        if (response.success == true) {
            toast.success(response.message) // Notification de succès
            resetForm() // Réinitialisation du formulaire
            handleModalClose() // Fermeture du modal
            setMessageNotification(response.message) // Mise à jour du message de notification
        } else {
            toast.error(response.message) // Notification d'erreur
        }
    };

    // Le rendu du composant
    return (
        <Modal show={showModal} onHide={handleModalClose} > 
            <Modal.Header closeButton className='p-1'>
                <Modal.Title>Modifier un Rôle</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                {messageErreur && <p className="text-danger">{messageErreur}</p> // Affichage du message d'erreur si existant
                }
                <Formik
                    initialValues={{ name: roleData ? roleData.name : '' }} // Initialisation du formulaire
                    validationSchema={validationSchema} // Validation du formulaire
                    onSubmit={handleSubmit} // Soumission du formulaire
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formRole">
                                <Form.Label>Nom du Rôle</Form.Label>
                                <Field type="text" name="name" as={Form.Control} />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>

                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <Button variant="secondary" onClick={handleModalClose}>Annuler</Button>
                                <Button variant="primary" type="submit">Enrégistrer</Button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </Modal.Body>

        </Modal>

    )
}

export default ModalEditRole
