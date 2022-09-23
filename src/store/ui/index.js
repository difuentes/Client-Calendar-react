import {createSlice} from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name:'ui',
    initialState:{
        isDateModalOpen:false
    },
    reducers:{
        onOpenDateModal : (state) =>{
            state.isDateModalOpen = true;
        },
        oncloseDateModal : (state) =>{
            state.isDateModalOpen = false;
        }
    }
})
//export de reduces del carro 
export default  uiSlice.reducer;
//exportamos variable 
export const {onOpenDateModal,oncloseDateModal} = uiSlice.actions;
