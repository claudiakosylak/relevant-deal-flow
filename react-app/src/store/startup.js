const GET_STARTUPS = "startup/GET_STARTUPS";
const GET_STARTUP = "startup/GET_STARTUP";
const GET_USER_STARTUPS = "startup/GET_USER_STARTUPS";

const getStartups = startups => ({
    type: GET_STARTUPS,
    startups
});

const getStartup = startup => ({
    type: GET_STARTUP,
    startup
})

const getUserStartups = startups => ({
    type: GET_USER_STARTUPS,
    startups
})

export const getUserStartupsThunk = () => async dispatch => {
    const response = await fetch("/api/startups/owned");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getUserStartups(data));
    } else {
        return ["An error occurred. Please try again."];
    }
}

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

export const getStartupThunk = id => async dispatch => {
    const response = await fetch(`/api/startups/${id}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(getStartup(data));
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const createStartupThunk = startup => async dispatch => {
    const response = await fetch("/api/startups", {
        method: "POST",
        body: startup
    });
    if (response.ok) {
        const data = response.json();
        dispatch(getStartup(data))
        return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

const initialState = { allStartups: {}, myStartups: {}, currentStartup: {}};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STARTUPS:
            const newState = {...state, allStartups: {}, myStartups: {...state.myStartups}, currentStartup: {...state.currentStartup}}
            for (let startup of action.startups.startups) {
                newState.allStartups[startup.id] = startup;
            }
            return newState;
        case GET_STARTUP:
            const startupState = {...state, allStartups: {...state.allStartups}, myStartups: {...state.myStartups}, currentStartup: {}}
            startupState.currentStartup = action.startup;
            return startupState;
        case GET_USER_STARTUPS:
            const newerState = {...state, allStartups: {...state.allStartups}, myStartups: {}, currentStartup: {...state.currentStartup}};
            for (let startup of action.startups.startups) {
                newerState.myStartups[startup.id] = startup;
            }
            return newerState;
        default:
            return state;
    }
}
