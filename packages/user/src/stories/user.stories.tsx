import * as React from 'react'
import { configureStore, useAsyncEffect, useAsyncCallback } from '@react-kits/redux'
import { Provider, useSelector } from 'react-redux'
import { userSlice, accountSelector, accountAsyncAction } from '../index'
// proxy.defaults.baseURL = "https://www.smoex.com"

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
console.log(store)

const AccountBasic: React.FC = () => {
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
const Test: React.FC = () => {
    const info = userSlice.useSelector(accountSelector.info)
    const x = useSelector(x => x)
    console.log(x, info)
    return (
        <div>2131312</div>
    )
}

export const Login: React.FC = () => {
    return (
      <Provider store={store}>
          <AccountBasic />
      </Provider>
    )
}
