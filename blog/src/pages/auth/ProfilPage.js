import React, { useContext } from "react";
/*import { Formik, Form, Field, ErrorMessage } from "formik";*/
/*import * as Yup from "yup";*/
import { AuthContext } from "../../utils/authContext";

const ProfilePage = () => {
  const {user} = useContext(AuthContext)
 

  return (
    <div className="container py-4 " > 
      <div>
        <h2>Informations de l'utilisateur</h2>
       
        <p>Nom: <strong>{user?.name}</strong></p>
        <p>Email: <strong>{user?.email}</strong></p>
        <p>Role: <strong>{user?.role}</strong></p>
      </div>
   
    </div>
  );
};

export default ProfilePage;
