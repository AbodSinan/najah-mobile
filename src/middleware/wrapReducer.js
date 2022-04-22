import { isEqual } from 'lodash';
import { removeError } from '../utils/commonUtils';

import apiStatusEnum from '../enums/apiStatusEnum';

import * as actions from '../actions/api';
import api from '../services/api/Api';

const requestStatus = (currentStatus) => (
    [apiStatusEnum.SUCCESS, apiStatusEnum.RELOADING].includes(currentStatus)
    ? apiStatusEnum.RELOADING 
    : apiStatusEnum.REQUESTED
);

const handleTransform = ({ action, state, endpoint }) => {
    const { endpointName, requestParams, error, stateOptions={} } = action;

    switch (action.type) {
        case actions.API_CALL_REQUESTED: {
            return {
                ...state,
                ...stateOptions,
                errors: removeError(state.errors, endpointName),
                status: {
                    ...state.status,
                    [endpointName]: requestStatus(state.status[endpointName]),
                },
            };
        }

        case actions.API_CALL_SUCCESS: {
            const transformedResponse = endpoint.prepareResponse({
                data: action,
                endpointName,
                requestParams,
            })
            console.log(transformedResponse)

            return {
                ...state,
                ...transformedResponse.response,
                errors: removeError(state.errors, endpointName),
                status: {
                    ...state.status,
                    [endpointName]: apiStatusEnum.SUCCESS,
                }
            }
        }

        case actions.API_CALL_ERROR: {
            const errors = [
                {
                    uuid: uuid4(),
                    endpointName,
                    error
                },
                ...state.errors,
            ]

            return {
                ...state,
                errors,
                status: {
                    ...state.status,
                    [endpointName]: apiStatusEnum.ERROR,
                }
            }
        }
        default:
            return action;
    }
}

const handleApiData = (state, action) => {
    const isNotApiAction = ![actions.API_CALL_ERROR, actions.API_CALL_REQUESTED, actions.API_CALL_SUCCESS].includes(action.type);

    if (isNotApiAction){
        return state;
    }

    const { endpointName } = action;
    const endpoint = api[endpointName];

    if (state[endpoint.reducer] === undefined) {
        console.warn(
            `The reducer (${endpoint.reducer}) does not exist in the store`
        );

        return state;
    }

    if (typeof endpoint.reducer !== "string" || endpoint.reducer.length === 0) {
        console.warn(
            `Empty or invalid reducer name given`
        );
        return state;
    }
    console.log(endpoint.reducer)

    return {
        ...state,
        [endpoint.reducer]: handleTransform({
            action,
            state: state[endpoint.reducer],
            endpoint,
        }),
    };
};

export const wrapReducer = (rootReducer) => (state, action) => {
    const nextState = rootReducer(state, action);

    if (!isEqual(state, nextState)) {
        return nextState;
    }

    return handleApiData(state, action);
};