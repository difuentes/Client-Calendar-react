import {configureStore} from '@reduxjs/toolkit'
//reducer
import ui from './ui';

export default configureStore({
    reducer:{
        ui,
    }
})