import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { register } from '../../services/admin/userService';
import { useNavigate } from 'react-router';
import '../../styles/auth.css'
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  // Définir les valeurs initiales pour les champs du formulaire
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  // Définir la validation pour les champs du formulaire
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
    password: Yup.string()
      .required('Le mot de passe est requis')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
        'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
      ),
  });

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await register(values);  // Appel du service d'inscription

      if (response.success === true) {
        navigate("/login");  // Si l'inscription est réussie, redirige vers la page de connexion
        toast.success('Inscription Réussi veillez-vous connecter !', { autoClose: 2000 });
      } else {
        toast.error(response.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      toast.error('Une erreur s\'est produite. Veuillez réessayer.', { autoClose: 2000 });
    }

    setSubmitting(false);  // Met fin à l'état de soumission du formulaire
  };

  return (
    <Container className="auth-container">
      <div className='auth-content'>
        <Col>
          <h2 className="text-center mb-4">Inscription</h2>

          {/* Début du formulaire avec Formik */}
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                {/* Champ Nom */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom complet :</label>
                  <Field type="name" className="form-control" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>

                {/* Champ Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Adresse e-mail :</label>
                  <Field type="email" className="form-control" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                {/* Champ Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe :</label>
                  <Field type="password" className="form-control" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                {/* Lien vers la page de connexion */}
                <div>
                  <span>Vous avez un compte? connectez-vous </span>
                  <Link to={'/login'}>Ici</Link>
                </div>

                {/* Bouton de soumission */}
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
                </Button>
              </Form>
            )}
          </Formik>

        </Col>
      </div>
    </Container>
  );
};

export default RegisterForm;
