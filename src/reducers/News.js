// ** News headlines Reducer ** //

// importing all api actions where news headlines are concerned
import * as NewsActions from '../actions/api_actions/news';

const initialState = { };

// api return types store on the state when making a REQUEST, return type when when returns with a SUCCESS or FAILURE
export const reducer = (state, headline) => {
    state = state || initialState;
    switch (headline.type) {
        case NewsActions.GET_ALL_NEWS_HEADLINES_SUCCESS:
            return {
                ...state,
                allHeadlines: headline.json
            };
    }
    return state;
};