import React, {  useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AdminContext } from '../../../utils/adminContext'; 
import { toast } from 'react-toastify'; 
import { addCategory } from '../../../services/admin/categoryService'; // Service d'API pour ajouter une catégorie

// ModalEditCategory est un composant React pour éditer une catégorie dans un contexte d'admin
const ModalEditCategory = ({ showModal, categoryData, handleModalClose }) => {
    const { setMessageNotification } = useContext(AdminContext) // Utilisation du Contexte

    // Cet état contiendra les messages d'erreur liés à la soumission du formulaire
    const [messageErreur, setMessageErreur] = useState(null);

    // Ce hook d'effet réinitialise les messages d'erreur 3 secondes après la soumission du formulaire
    useEffect(() => {
        if (messageErreur) {
          const timeout = setTimeout(() => {
            setMessageErreur('');
          }, 3000);
      
          return () => clearTimeout(timeout);
        }
      }, [messageErreur]);

    // Ceci est le schéma de validation en utilisant Yup
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required('Le nom du category est requis'),
    });

    // Cette fonction sera appelée lorsque le formulaire est soumis
    const handleSubmit = async (values, { resetForm }) => {
        // Appeler le service pour ajouter une catégorie
        const response = await addCategory(values);
        // Si l'opération a réussi, affichez un toast, réinitialisez le formulaire et fermez la modale
        if(response.success == true){
            toast.success(response.message)
            resetForm()
            handleModalClose()
            setMessageNotification(response.message)
        } else {
            // S'il y a une erreur, affichez un toast et définissez le message d'erreur
            toast.error(response.message)
            setMessageErreur(response.message)
        }
    };

    
    return (
        <Modal show={showModal} onHide={handleModalClose} >
            <Modal.Header closeButton className='p-0'>
                <Modal.Title>Ajouter un Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>}
                {/* Utilisation de Formik pour la gestion du formulaire */}
                <Formik
                    initialValues={{ categoryName: categoryData ? categoryData.category_name : ''}}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCategory">
                                <Form.Label>Nom du Category</Form.Label>
                                {/* Ce champ est pour le nom de la catégorie */}
                                <Field type="text" name="categoryName" as={Form.Control} />
                                {/* Afficher le message d'erreur le cas échéant */}
                                <ErrorMessage name="categoryName" component="div" className="text-danger" />
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


export default ModalEditCategory 
