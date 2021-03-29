import { combineReducers } from 'redux';
import PolicyGraphReducer from '../PolicySearch/reducers/policyGraphReducer';
import PolicySearchReducer from '../PolicySearch/reducers/policySearchReducer';

/**
 * Combines all reducer objects and returns to the store
 */
const rootReducer = combineReducers({
    policyGraphReducer : PolicyGraphReducer,
    policySearchReducer : PolicySearchReducer
});

export default rootReducer;