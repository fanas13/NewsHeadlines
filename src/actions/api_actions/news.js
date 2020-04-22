import 'isomorphic-fetch';
import callApi from '../../middleware/newsCallApi';

export const GET_ALL_NEWS_HEADLINES_REQUEST = 'GET_ALL_NEWS_HEADLINES_REQUEST';
export const GET_ALL_NEWS_HEADLINES_SUCCESS = 'GET_ALL_NEWS_HEADLINES_SUCCESS';
export const GET_ALL_NEWS_HEADLINES_FAILURE = 'GET_ALL_NEWS_HEADLINES_FAILURE';

export const newsActionCreators = {
    getAllNewsHeadlines: (payload) => async (dispatch, getState) => {
        let endpoint = 'everything?q=' + payload.filterText + '&from=' + payload.date + '&sortBy=' + payload.sortBy + '&apiKey=740800be48854b68bf0766990c649c9b';
        dispatch({ type: GET_ALL_NEWS_HEADLINES_REQUEST });
        return callApi('GET', endpoint, payload, undefined, getState()).then((data) => {
            const json = data.json;
            dispatch({ type: GET_ALL_NEWS_HEADLINES_SUCCESS, json });
            return Promise.resolve(data);
        }).catch((error) => {
            dispatch({ type: GET_ALL_NEWS_HEADLINES_FAILURE, error });
            return Promise.reject(error);
        });
    },
};