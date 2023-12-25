//constants
const GET_FAVORITES = "favorite/GET_FAVORITES";

const getFavorites = (startups) => ({
  type: GET_FAVORITES,
  startups,
});

export const favoriteThunk = (startupId) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${startupId}`, {
    method: "POST"
  });
  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const userFavoritesThunk = () => async dispatch => {
    const response = await fetch("/api/favorites")
    if (response.ok) {
        const data = response.json()
        dispatch(getFavorites(data))
        return data
    } else {
        return ["An error occurred. Please try again"]
    }
}

const initialState = { favorites: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      const newState = { ...state, favorites: {} };
      for (let startup of action.startups.startups) {
        newState.favorites[startup.id] = startup;
      }
      return newState;
    default:
      return state;
  }
}
