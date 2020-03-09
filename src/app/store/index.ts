import * as provokerReducer from 'src/app/store/reducers/provoker.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface RootState{
    provoker: provokerReducer.ProvokerState
}

export const reducers: ActionReducerMap<RootState> = {
    provoker: provokerReducer.reducer
}
