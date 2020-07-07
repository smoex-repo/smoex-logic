import * as React from 'react'
import { configureStore, useAsyncEffect, useAsyncCallback } from 'redux-async-kit'
import { Provider } from 'react-redux'
import { configureFetch, apiClient } from '@smoex-business/basic'
import { userSlice, accountSelector, accountAsyncAction } from '../index'

// configureFetch({
//     axiosClient:
//     apiClient
//  })

export default {
    title: 'account',
}

const store = configureStore({
    injector: userSlice.injector,
})

const AccountBasic = () => {
    const [info] = userSlice.useSelector(accountSelector.info)
    const [getInfo, infoState] = userSlice.useAction(accountAsyncAction.getInfo)
    const [login, loginState] = userSlice.useAction(accountAsyncAction.login)
    const [logout] = userSlice.useAction(accountAsyncAction.logout)
    useAsyncEffect(async () => {
        await getInfo()
    })
    const onLogin = useAsyncCallback(async () => {
        await login('lynnkoo', '111111')
        await getInfo()
    })
    const onLogout = () => {
        logout()
    }
    return (
        <div>
            <div>name: {JSON.stringify(info)}{JSON.stringify(infoState)}</div>
            <div onClick={() => getInfo()}>getInfo</div>
            <div onClick={onLogin}>login {loginState.loading && 'loading'}</div>
            <div onClick={onLogout}>logout</div>
        </div>
    )
}

export const Login: React.FC = () => {
    return (
      <Provider store={store}>
          <AccountBasic />
      </Provider>
    )
}
