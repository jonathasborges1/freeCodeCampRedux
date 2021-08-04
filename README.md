# freeCodeCampRedux

# Item 1 
## Contexto - Getting Started with React Redux
> This series of challenges introduces how to use Redux with React. First, here's a review of some of the key principles of each technology. React is a view library that you provide with data, then it renders the view in an efficient, predictable way. Redux is a state management framework that you can use to simplify the management of your application's state. Typically, in a React Redux app, you create a single Redux store that manages the state of your entire app. Your React components subscribe to only the pieces of data in the store that are relevant to their role. Then, you dispatch actions directly from React components, which then trigger store updates. [...]

###### Fonte: https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/getting-started-with-react-redux

##Saída Esperada
~~~~
⏳ The DisplayMessages component should render an empty div element.

⏳ The DisplayMessages constructor should be called properly with super, passing in props.

⏳ The DisplayMessages component should have an initial state equal to {input: "", messages: []}
~~~~

##Código Solução
~~~~
class DisplayMessages extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      input: "", 
      messages: []
   }
  }
  render() {
    return <div />
  }
};
~~~~ 

# Item: 2 
## Contexto - Manage State Locally First
> First, in the render() method, have the component render an input element, button element, and ul element. When the input element changes, it should trigger a handleChange() method. Also, the input element should render the value of input that's in the component's state. The button element should trigger a submitMessage() method when it's clicked.

###### Fonte: https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/manage-state-locally-first

##Saída Esperada
~~~~
⏳ The DisplayMessages component should initialize with a state equal to { input: "", messages: [] }.

⏳ The DisplayMessages component should render a div containing an h2 element, a button element, a ul element, and li elements as children.

⏳ .map should be used on the messages array.

⏳  The input element should render the value of input in local state.

⏳ Calling the method handleChange should update the input value in state to the current input.

⏳  Clicking the Add message button should call the method submitMessage which should add the current input to the messages array in state.

⏳  The submitMessage method should clear the current input.
~~~~

##Código Solução
~~~~
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.submitMessage = this.submitMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      input: e.target.value,
      messages: this.state.messages
    })
  }
  submitMessage(){
    let addNaLista = [...this.state.messages,this.state.input]
    this.setState({
      input: '',
      messages: addNaLista
    })
  }

  render() {
    const mostraLista = this.state.messages.map(
      (itemDaLista) => (<li>{itemDaLista}</li>)
    )
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input onChange={this.handleChange} value={this.state.input} />
        <button onClick={this.submitMessage}>submit</button>
          <ul> 
            {mostraLista}
          </ul>
      </div>
    );
  }
};
~~~~

Aula prática de como adicionar na lista de acordo com a entrada do usuário


----

# Item: 3
## Contexto - Extract State Logic to Redux
> Now that you finished the React component, you need to move the logic it's performing locally in its state into Redux. This is the first step to connect the simple React app to Redux. The only functionality your app has is to add new messages from the user to an unordered list. The example is simple in order to demonstrate how React and Redux work together. [...]

###### Fonte: https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/extract-state-logic-to-redux

##Saída Esperada
~~~~
⏳ The const ADD should exist and hold a value equal to the string ADD

⏳ The action creator addMessage should return an object with type equal to ADD and message equal to the message that is passed in.

⏳ messageReducer should be a function.

⏳ The store should exist and have an initial state set to an empty array.

⏳ Dispatching addMessage against the store should immutably add a new message to the array of messages held in state.

⏳ The messageReducer should return the current state if called with any other actions.
~~~~

##Código Solução
~~~~
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

const store = Redux.createStore(messageReducer);§
~~~~



# Item: 4
## Contexto - Use Provider to Connect Redux to React
> In the last challenge, you created a Redux store to handle the messages array and created an action for adding new messages. The next step is to provide React access to the Redux store and the actions it needs to dispatch updates. React Redux provides its react-redux package to help accomplish these tasks [...]

###### Fonte: https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/use-provider-to-connect-redux-to-react

##Saída Esperada
~~~~
⏳ The AppWrapper should render.

⏳ The Provider wrapper component should have a prop of store passed to it, equal to the Redux store.

⏳ DisplayMessages should render as a child of AppWrapper.

⏳ The DisplayMessages component should render an h2, input, button, and ul element
~~~~

##Código Solução
~~~~
const ADD = 'ADD';
const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
const Provider = ReactRedux.Provider;
const store = Redux.createStore(messageReducer);
class AppWrapper extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <DisplayMessages />
      </Provider>
    )
  }
};
~~~~



# Item: 5
## Contexto - Map State to Props
> The Provider component allows you to provide state and dispatch to your React components, but you must specify exactly what state and actions you want. This way, you make sure that each component only has access to the state it needs. You accomplish this by creating two functions: mapStateToProps() and mapDispatchToProps() [...]

###### Fonte: https://www.freecodecamp.org/learn/front-end-libraries/react-and-redux/map-state-to-props

##Saída Esperada
~~~~
⏳ The const state should be an empty array.

mapStateToProps should be a function.

mapStateToProps should return an object.

Passing an array as state to mapStateToProps should return this array assigned to a key of messages.
~~~~

##Código Solução
~~~~
const state = [];
const mapStateToProps = 
  (state) => {return {messages: state}
}
~~~~

# Item: 6
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 7
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 8
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~

Item: 9
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~

# Item: 10 
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 11
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 12
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 13
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 14
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 15
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 16
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~
# Item: 17
## Contexto
> -

###### Fonte: 

##Saída Esperada
~~~~
⏳ 
~~~~

##Código Solução
~~~~

~~~~

