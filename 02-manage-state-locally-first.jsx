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