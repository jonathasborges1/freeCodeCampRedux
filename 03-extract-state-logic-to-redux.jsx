const ADD = "ADD";

const addMessage = 
  (message) => {return {type: ADD,message};
};

const messageReducer = (estadoAnterior = [], action) => {
  switch (action.type) {
    case ADD:
      let novaMensagem = [...estadoAnterior, action.message];
      return novaMensagem;
    default:
      return estadoAnterior;
  }
};

const store = Redux.createStore(messageReducer);