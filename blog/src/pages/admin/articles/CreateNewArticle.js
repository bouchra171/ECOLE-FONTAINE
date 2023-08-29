import React, { useContext, useState, useRef, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Col, Button } from 'react-bootstrap';
import { AdminContext } from '../../../utils/adminContext';
import { toast } from 'react-toastify';
import '../../../styles/dashbord/articlePage.css';

// Déclaration du composant CreateNewArticle
const CreateNewArticle = () => {
  // Utilisation du contexte Admin pour récupérer les catégories et la fonction setMessageNotification
  const { categories, setMessageNotification } = useContext(AdminContext)
  // Déclaration d'un state pour le message d'erreur
  const [messageErreur, setMessageErreur] = useState(null);//utliser pour configurer une variable d etat et gerer les messages d errure 

  // Définition du schéma de validation du formulaire avec Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre est requis'),
    content: Yup.string().required('Le contenu est requis'),
    categoryId: Yup.string().required('La catégorie est requise'),
    image: Yup.mixed().required('L\'image est requise'),
  });

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Création d'un objet FormData pour la soumission du formulaire
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('categoryId', values.categoryId);
      formData.append('userId', 2);
      formData.append('image', values.image);

      // Envoi de la requête POST avec les données du formulaire
      const response = await fetch('http://localhost:9000/articles', {
        method: 'POST',
        body: formData,
      });

      // Vérification du statut de la réponse
      if (response.ok) {
        // Parsing de la réponse en JSON
        const data = await response.json();
        if (data.success === true) {
          // Affichage d'un toast en cas de succès
          toast.success(data.message);
          // Mise à jour de la notification dans le contexte Admin
          setMessageNotification(data.message)
          
          // Actualiser la page
         // window.location.reload();
        } else {
          // Affichage d'un toast en cas d'erreur
          toast.error(data.message);
          // Mise à jour du message d'erreur
          setMessageErreur(data.message)
        }
        console.log(data);
        // Faire quelque chose avec la réponse du serveur
      } else {
        console.error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Mise en place d'un délai pour effacer le message de notification
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessageNotification('');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [messageErreur])
  

  // Rendu du composant
  return (
    <Container className="container-update-article">
      <div  className='form-update-article'>
        <Col>
          <h1 className="text-center">Créer un nouvel article</h1>
          {messageErreur && <p className="text-danger">{messageErreur}</p>}

          <Formik
            initialValues={{
              title: '',
              content: '',
              categoryId: '',
              
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-2">
                  <label htmlFor="title" className="form-label">Titre :</label>
                  <Field type="text" className="form-control" id="title" name="title" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>

                <div className="d-flex justify-content-between mb-2 gap-4">
                  <div className="mb-2 flex-grow-1">
                    <label htmlFor="image" className="form-label">Image :</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={(event) => {
                        // Mise à jour de la valeur du champ image lors de la sélection d'un fichier
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage name="image" component="div" className="text-danger" />
                  </div>
                 
                  <div className="mb-2 flex-grow-1">
                    <label htmlFor="categoryId" className="form-label">Catégorie :</label>
                    <Field as="select" name="categoryId" className="form-select"  >
                      <option value={''} >Sélectionnez une catégorie</option>
                      {categories.map((categ) => (
                        // Génération des options de la liste déroulante de catégories
                        <option key={categ.id} value={categ.id}  >
                          {categ.category_name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryId" component="div" className="text-danger" />
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="content" className="form-label">Contenu :</label>
                  <Field  as="textarea" className="form-control content-update-article" id="content" name="content" />
                  <ErrorMessage name="content" component="div" className="text-danger" />
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </div>
    </Container>
  );
};


export default CreateNewArticle;
