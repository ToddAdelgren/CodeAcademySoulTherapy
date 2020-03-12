import {createAction, props} from '@ngrx/store'

export const setBeingDisplayed = createAction('[Provoker State] Set Being Displayed', props<{id: number}>());
export const reduceBeingDisplayed = createAction('[Provoker State] Reduce Being Displayed');