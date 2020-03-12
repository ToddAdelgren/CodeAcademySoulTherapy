import * as provokerActions from '../actions/provoker.action'
import { createReducer, on, Action } from '@ngrx/store';
// import { createReducer, on, Action } from '@ngrx/store';

export interface ProvokerState {
    beingDisplayed: number
};

export const initialProvokerState: ProvokerState = {
    beingDisplayed: 0
};

const provokerReducer = createReducer(
    initialProvokerState,
    on(provokerActions.setBeingDisplayed, (state, {id}) => ({...state, beingDisplayed: id})),
    on(provokerActions.reduceBeingDisplayed, (state) => ({...state, beingDisplayed: --state.beingDisplayed})),
);

export function reducer(state: ProvokerState, action: Action){
    return provokerReducer(state, action);
}