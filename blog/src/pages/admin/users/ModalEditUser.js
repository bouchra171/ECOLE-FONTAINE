import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AdminContext } from '../../../utils/adminContext';
import { updateUser } from '../../../services/admin/userService';

const ModalEditUser = ({ showModal, userData, handleModalClose }) => {
    const { roles ,setMessageNotification} = useContext(AdminContext)
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
        roleId: Yup.string().required('Le rôle est requis'),
    });


    const handleSubmit = async (values, { resetForm }) => {
        await updateUser(userData.id,values, resetForm, handleModalClose,setMessageErreur,setMessageNotification);
    };


    return (
        <Modal show={showModal} onHide={handleModalClose} >
            <Modal.Header closeButton className='p-1'>
                <Modal.Title>Modifier un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>
                }
                <Formik
                    initialValues={{
                        name: userData ? userData.name : '',
                        email: userData ? userData.email : '',
                        roleId: userData ? userData.roleId : '',
                    }}
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
                            <Form.Group controlId="formRole">
                                <Form.Label>Rôle</Form.Label>
                                <Field as="select" name="roleId" className="form-select" >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}  >
                                            {role.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="roleId" component="div" className="text-danger" />
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

export default ModalEditUser