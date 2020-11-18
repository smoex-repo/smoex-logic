import { ACCOUNT_ASYNC_ACTION, ACCOUNT_ACTION } from './enums'
import { createReducer } from '@react-kits/redux'

const initialState = {
  loading: false,
  error: null,
  payload: undefined,
}

const reducerMap = (state: any) => ({
  [ACCOUNT_ASYNC_ACTION.GET_INFO]: () => {
    state.loading = true
    state.error = null
    state.payload = undefined
  },
  [ACCOUNT_ACTION.SET_INFO]: ({ payload }: any) => {
    state.loading = false
    state.payload = payload
  },
  [ACCOUNT_ACTION.SET_ERROR]: ({ error }: any) => {
    state.loading = false
    state.error = error
    state.payload = undefined
  },
})

export const accountReducer = createReducer(initialState, reducerMap)
