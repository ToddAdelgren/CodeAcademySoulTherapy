import {createAction, props} from '@ngrx/store'

export const setBeingDisplayed = createAction('[Provoker State] Set Being Displayed', props<{id: number}>())