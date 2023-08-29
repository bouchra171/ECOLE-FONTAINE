import React, {  useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap'; 
import { Formik, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup'; // Importation de Yup pour la validation du formulaire
import { AdminContext } from '../../../utils/adminContext'; 
import { addRole } from '../../../services/admin/rolesService'; 
import { toast } from 'react-toastify'; // Importation de react-toastify pour les notifications

const ModalAddRole = ({ showModal, handleModalClose }) => {
    const { setMessageNotification} = useContext(AdminContext) // Utiliser le contexte Admin pour définir les notifications

    const [messageErreur, setMessageErreur] = useState(null); 

    // Effet pour réinitialiser les messages d'erreur après 3 secondes
    useEffect(() => {
        if (messageErreur) {
          const timeout = setTimeout(() => {
            setMessageErreur('');
          }, 3000);
      
          return () => clearTimeout(timeout);
        }
      }, [messageErreur]);
      

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom du rôle est requis'), // Schema de validation pour le champ "name"
    });

    const handleSubmit = async (values, { resetForm }) => {
       const response = await addRole(values); 
       if(response.success==true){
        toast.success(response.message) // Afficher une notification de succès
        resetForm() // Réinitialiser le formulaire
        handleModalClose() // Fermer le modal
        setMessageNotification(response.message) // Définir le message de notification
       }else{
        toast.error(response.message) // Afficher une notification d'erreur
        setMessageErreur(response.message) // Définir le message d'erreur
       }
      };

    return (
        <Modal show={showModal} onHide={handleModalClose} > // Modal pour ajouter un rôle
            <Modal.Header closeButton className='p-1'>
                <Modal.Title>Ajouter un Rôle</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                {messageErreur && <p className="text-danger">{messageErreur}</p> // Afficher le message d'erreur si présent
                }
                <Formik
                    initialValues={{ name: ''}}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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

export default ModalAddRole 
