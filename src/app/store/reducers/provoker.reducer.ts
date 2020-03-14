import * as provokerActions from '../actions/provoker.action'
import { createReducer, on, Action } from '@ngrx/store';

export interface ProvokerState {
    beingDisplayed: number
    lastFinished: number
};

export const initialProvokerState: ProvokerState = {
    beingDisplayed: 0,
    lastFinished: 0
};

const provokerReducer = createReducer(
    initialProvokerState,
    on(provokerActions.setBeingDisplayed, (state, {id}) => ({...state, beingDisplayed: id})),
    on(provokerActions.setLastFinished, (state, {id}) => ({...state, lastFinished: id})),
    on(provokerActions.reduceBeingDisplayed, (state) => ({...state, beingDisplayed: --state.beingDisplayed})),
);

export function reducer(state: ProvokerState, action: Action){
    return provokerReducer(state, action);
}