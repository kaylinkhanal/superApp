import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { resetAlertMessages } from '../../redux/reducers/notifySlice';
import { useSelector, useDispatch } from 'react-redux';

export default function CustomSnackbar(props) {
  const dispatch = useDispatch()
  const { isApiSuccessMsgOpen, apiSuccessMessage } = useSelector(state => state.notify)

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const toggleOpen = (isOpen) => {
    setState({
      ...state,
      open: isOpen,
    });
  };

  useEffect(() => {
    if (isApiSuccessMsgOpen) {
      toggleOpen(true)
      setTimeout(() => {
        toggleOpen(false)
        dispatch(resetAlertMessages())
      }, 6000)
    }
  }, [isApiSuccessMsgOpen])

  return (
    <div>
      <Snackbar
        open={state.open}
        TransitionComponent={state.Transition}
        message={apiSuccessMessage}
        key={state.Transition.name}
      />
    </div>
  );
}