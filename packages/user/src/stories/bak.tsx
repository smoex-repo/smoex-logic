import * as React from 'react'
import { configureStore } from '@react-kits/redux'
import { Provider } from 'react-redux'

export default {
    title: 'xxxx',
}

const store = configureStore({

})


export const Container: React.FC = () => {
  return (
    <Provider store={store}>
        
    </Provider>
  )
}