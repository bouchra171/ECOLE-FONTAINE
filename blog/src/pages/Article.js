
import React, { useContext } from 'react'
import { AdminContext } from '../utils/adminContext'
import { Link } from 'react-router-dom'
import '../styles/article.css'

// Déclaration du composant Article
const Article = () => {
  // On récupère les articles à partir du contexte d'administration
  const { articles } = useContext(AdminContext)

  // Le rendu du composant
  return (
    <div className='d-flex flex-column p-3'>

      <div className="">
        <h1 className="text-center m-4">Nos Articles </h1>  {/* Titre de la page */}
      </div>
      <div className="row row-cols-1 row-cols-sm-2  row-cols-md-3 row-cols-lg-4 g-3">
        {
          // On vérifie que les articles existent et on les parcourt avec la méthode map
          articles && articles.map((article, index) => {
            
            const formattedTitle = article.title.replace(/\s+/g, '_');
            return (
              <div key={index} className="col">
                <div className="border p-1 rounded">
                  <Link 
                    className='row justify-content-center p-1 rounded-3' 
                    to={`/article/${article.id}`}  // Création du lien vers la page de l'article
                    state= {{ article: article }}  // Passage de l'objet article en tant que propriété de l'état de la page de l'article
                  >
                    <img  src={article.image_path ? article.image_path : "/img/photo1.jpg"} 
                          className="card-img-top img-article" 
                          alt="..." 
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className='title-article'>{article.title}</h5>  

                    <p className='content-article'>{article.content}</p>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


export default Article 
