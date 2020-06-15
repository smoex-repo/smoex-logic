import * as React from 'react'
import { configureStore, useAsyncEffect, useAsyncCallback } from 'redux-async-kit'
import { Provider } from 'react-redux'
import { userSlice, accountSelector, accountAsyncAction } from '../index'

export default {
    title: 'user',
}

const store = configureStore({
    injector: userSlice.injector,
})

const AccountBasic = () => {
    const [info] = userSlice.useSelector(accountSelector.info)
    const [getInfo, infoState] = userSlice.useAction(accountAsyncAction.getInfo)
    const [login, loginState] = userSlice.useAction(accountAsyncAction.login)
    useAsyncEffect(async () => {
        await getInfo()
    })
    const onLogin = useAsyncCallback(async () => {
        await login('lynnkoo', '111111')
        await getInfo()
    })
    return (
        <div>
            <div>name: {JSON.stringify(info)}{JSON.stringify(infoState)}</div>
            <div onClick={() => getInfo()}>getInfo</div>
            <div onClick={onLogin}>login {loginState.loading && 'loading'}</div>
        </div>
    )
}

export const Container: React.FC = () => {
    return (
      <Provider store={store}>
          <AccountBasic />
      </Provider>
    )
}
