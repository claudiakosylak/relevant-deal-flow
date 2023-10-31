const GET_STARTUPS = "startup/GET_STARTUPS";

const getStartups = startups => ({
    type: GET_STARTUPS,
    startups
});

export const getStartupsThunk = () => async dispatch => {
    const response = await fetch("/api/startups");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getStartups(data));
    } else {
        return ["An error occurred. Please try again."];
    }
};

const initialState = { allStartups: [], myStartups: {}};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STARTUPS:
            const newState = {...state, allStartups: {}, myStartups: {...state.myStartups}}
            newState.allStartups = action.startups.startups;
            return newState;
        default:
            return state;
    }
}
