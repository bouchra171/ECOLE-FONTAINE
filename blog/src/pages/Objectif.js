import React from 'react';


const objectifs = [
  {
    id: 1,
    title: 'Améliorer ses compétences en lecture',
    description:
      'Lire tous les jours pendant 20 minutes pour améliorer sa compréhension et sa vitesse de lecture.',
  },
  {
    id: 2,
    title: "S'améliorer en mathématiques",
    description:
      "Pratiquer les opérations de base comme l'addition, la soustraction, la multiplication et la division pour améliorer ses compétences.",
  },
  {
    id: 3,
    title: 'Améliorer sa créativité',
    description:
      'Faire des activités artistiques comme la peinture, le dessin ou le bricolage pour stimuler son imagination et sa créativité.',
  },
  {
    id: 4,
    title: 'Développer ses compétences sociales',
    description:
      'Participer à des activités de groupe comme le sport, les jeux ou les projets en classe pour apprendre à travailler en équipe et à interagir avec les autres.',
  },
];

function Objectif() {
  return (
    <div className="objectif-container">
      <h2 className="objectif-title">Nos Super Objectifs</h2>
      <div className="objectif-content">
        <div className="objectif-text">
          <ul className="objectif-list">
            {objectifs.map(({ id, title, description }) => (
              <li key={id} className="objectif-item">
                <h3 className="objectif-subtitle">{title}</h3>
                <p className="objectif-description">{description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="objectif-image">
          <img src="./img/girl.webp" alt="fille" className="objectif-img" />
          <div className="colorful-balls">
            <div className="colorful-ball"></div>
            <div className="colorful-ball"></div>
            <div className="colorful-ball"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Objectif;
