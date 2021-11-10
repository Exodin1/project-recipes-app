import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import fetchApi from '../../services/fetchApi';

export default function Recomendations() {
  const { detail } = useSelector((state) => state);
  const [isFetching, setIsFetching] = React.useState(false);
  const [recomendations, setRecomendations] = React.useState([]);
  let key = Object.keys(detail)[0];
  const recipe = detail[key][0];
  const { strYoutube } = recipe;
  const idYoutube = strYoutube ? strYoutube.split('v=')[1] : null;
  let path = window.location.pathname.split('/')[1];
  let strTitle = null;
  let strThumb = null;
  if (path === 'comidas') {
    strTitle = 'strDrink';
    strThumb = 'strDrinkThumb';
    path = '/bebidas';
    key = 'drinks';
  }
  if (path === 'bebidas') {
    strTitle = 'strMeal';
    strThumb = 'strMealThumb';
    path = '/comidas';
    key = 'meals';
  }
  const toApi = {
    inputRadio: 'name',
    search: '',
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApi(toApi, path);
      setRecomendations(response[key]);
      setIsFetching(true);
    };
    fetchData();
  }, []);
  if (!isFetching) return <div>Loading...</div>;
  console.log(recomendations);
  return (
    <div>
      { strYoutube && (
        <div>
          <h1>Vídeo</h1>
          <iframe
            src={ `https://www.youtube.com/embed/${idYoutube}` }
            title="video"
            frameBorder="0"
            allowFullScreen
            data-testid="video"
          />
        </div>
      )}
      <div className="d-flex w-50 horizontal-scroll">
        { recomendations.map((item, index) => {
          const { idMeal } = item;
          const MAX_CARDS = 5;
          if (index > MAX_CARDS) return null;
          return (
            <div key={ idMeal } data-testid={ `${index}-recomendation-card` }>
              <img src={ strThumb } alt={ strTitle } />
              <h2>{strTitle}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
