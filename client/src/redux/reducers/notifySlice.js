import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isApiSuccessMsgOpen: false,
  apiSuccessMessage: '',
  apiResIsSuccess: Boolean
}

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setAlertMessages: (state, actions) => {
      state.apiSuccessMessage = actions.payload
      state.isApiSuccessMsgOpen = true
    },
    resetAlertMessages: (state, actions) => {
      state.apiSuccessMessage = ''
      state.isApiSuccessMsgOpen = false
    },
    apiResStatus: (state, actions) => {
      state.apiResIsSuccess = actions.payload
    }
  }
})

export const {
  setAlertMessages,
  resetAlertMessages,
  apiResStatus
} = notifySlice.actions
export default notifySlice.reducer
