import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../utils/authContext';
import jwtDecode from 'jwt-decode';
import { login } from '../../services/admin/userService';
import { Link } from 'react-router-dom';
import '../../styles/auth.css'

const LoginForm = () => {
  // Hook pour la navigation
  const navigate = useNavigate();

  // Accéder à l'état de l'authentification
  const { setUser, setIsAdmin, setIsLoggedIn, isLoggedIn } = useContext(AuthContext)

  // Définir les valeurs initiales pour le formulaire
  const initialValues = {
    email: '',
    password: '',
  };

  // Définir le schéma de validation pour le formulaire avec Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
    password: Yup.string()
      .required('Le mot de passe est requis')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
        'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
      ),
  });

  // Définir la fonction qui sera exécutée lors de la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Faire une demande de connexion avec les valeurs du formulaire
      const data = await login(values);

      // Si la connexion est réussie
      if (data) {
        const { token, user } = data;

        // Décoder le token pour obtenir les informations de l'utilisateur
        const decodedToken = jwtDecode(token);

        // Mettre à jour l'état de l'utilisateur avec les informations décodées
        setUser({
          id: decodedToken.user.id,
          email: decodedToken.user.email,
          name: decodedToken.user.name,
          role: decodedToken.user.role
        });

        // Stocker le token dans le stockage local
        localStorage.setItem('token', token);

        // Mettre à jour l'état de l'authentification
        setIsLoggedIn(true)

        // Si l'utilisateur est un administrateur, le rediriger vers la page d'administration
        if (user?.role === "Admin") {
          navigate('/admin');
          setIsAdmin(true)
        }

        // Rediriger l'utilisateur vers la page d'accueil
        navigate('/');
      } else {
        // Afficher une erreur si la connexion a échoué
        console.error('Erreur d\'authentification');
        toast.error('Une erreur s\'est produite. Veuillez réessayer.', { autoClose: 2000 });
      }
    } catch (error) {
      // Afficher une erreur si la demande de connexion a échoué
      console.error('Erreur lors de la connexion :', error);
      toast.error('Une erreur s\'est produite. Veuillez réessayer.', { autoClose: 2000 });
    }

    // Arrêter la soumission du formulaire
    setSubmitting(false);
  };

  // Rendu du composant
  return (
    <Container className="auth-container">
      <div className='auth-content'>
        <Col>
          <h2 className="text-center mb-4">Connexion</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Adresse e-mail :</label>
                  <Field type="email" className="form-control" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe :</label>
                  <Field type="password" className="form-control" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div>
                  <span>Vous n'avez pas de compte? créer un </span>
                  <Link to={'/register'}>Ici</Link>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </div>
    </Container>
  );
};

export default LoginForm;
