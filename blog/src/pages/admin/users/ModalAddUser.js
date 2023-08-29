import React, {  useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { saveNewUser } from '../../../services/admin/userService';
import { AdminContext } from '../../../utils/adminContext';

const ModalAddUser = ({ showModal, handleModalClose }) => {
    const { setMessageNotification} = useContext(AdminContext)

    const [messageErreur, setMessageErreur] = useState(null);

    // Reinitialiser les variable des messages 3 secondes apres l'envoie du formulaire
    useEffect(() => {
        if (messageErreur) {
          const timeout = setTimeout(() => {
            setMessageErreur('');
          }, 3000);
      
          return () => clearTimeout(timeout);
        }
      }, [messageErreur]);
      

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        password: Yup.string()
            .required('Le mot de passe est requis')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
                'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
            ),
    });

    const handleSubmit = async (values, { resetForm }) => {
        await saveNewUser(values, resetForm, handleModalClose,setMessageErreur,setMessageNotification);
      };

    return (
        <Modal show={showModal} onHide={handleModalClose} >
            <Modal.Header closeButton className='p-1'>
                <Modal.Title>Ajouter un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>
                }
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nom</Form.Label>
                                <Field type="text" name="name" as={Form.Control} />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Field type="email" name="email" as={Form.Control} />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Field type="password" name="password" as={Form.Control} />
                                <ErrorMessage name="password" component="div" className="text-danger" />
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

export default ModalAddUser