export const fetchNews = (category) => async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_NEWS_REQUEST' });  // Indicate that the news request is in progress
  
      const response = await fetch(`/api/news?category=${category}`);  // Pass the category to the backend
      const data = await response.json();
      
      dispatch({
        type: 'FETCH_NEWS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_NEWS_FAILURE',
        error: error.message,
      });
    }
  };
  