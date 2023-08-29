import React from "react";


const Contact = () => {
  return (
    <div className="Contact">
      <h1>Contactez-nous</h1>
      <p>Pour nous contacter, merci de remplir le formulaire ci-dessous :</p>
      <form>
        <div>
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea id="message" name="message" className="message-textarea" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
