import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searcheArticle } from '../services/admin/articleService';

const Search = ({ placeholder, data, setData, model }) => {
  const [phrase, setPhrase] = useState('');

  const handleSearch = (e) => {
    setPhrase(e.target.value);
  };

  useEffect(() => {
    if (phrase) {
      const dataSearched = data?.filter((item) => {
        if (model === 'article') {
          return (
            item?.title.toLowerCase().includes(phrase.toLowerCase()) 
          );
        } else if (model === 'user') {
          console.log('name:', item?.name)
          // Recherche par nom ou email (pour les utilisateurs)
          return (
            item?.name.toLowerCase().includes(phrase.toLowerCase()) ||
            item?.email.toLowerCase().includes(phrase.toLowerCase())
          );
        }  else  {
          // Recherche par nom (pour les rôles)
          const commentFiltered = item?.comments.filter((comment)=>{
            return comment.comment.toLowerCase().includes(phrase.toLowerCase());
          })
          return commentFiltered
        }
        // Par défaut, retourne false pour ne pas afficher d'éléments
        return false;
      });
      console.log('datasearched:', dataSearched, 'term', phrase)

      setData(dataSearched);
    } else {
      setData(data);
    }
  }, [phrase]);

  return (
    <div className="input-group d-flex align-items-center position-relative" >
      <input
        value={phrase}
        onChange={(e) => handleSearch(e)}
        type="text"
        className="form-control rounded"
        placeholder={`Rechercher ${placeholder ? placeholder : ''}...`}
      />
      <div className="input-group-append position-absolute me-1 end-0">
        <span className="input-group-text ">
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default Search;
