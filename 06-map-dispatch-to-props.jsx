const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};
const mapDispatchToProps = (dispatch) => { 
  return {
    submitNewMessage: 
      (message) => {dispatch(addMessage(message))}
  }
}            
// Change code below this line