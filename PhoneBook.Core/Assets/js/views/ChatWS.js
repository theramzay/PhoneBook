var ChatWS = React.createClass({
  getInitialState: function() {
    return {
      socket: new WebSocket(`ws://localhost:10184/api/Chat?name=${this.props.userName}`),
      msgs: []
    };
  },
  componentWillMount: function() {
    this.state.socket.onmessage = e => {
      console.log(e.data);
      this.state.msgs.push(e.data)
      this.refs.messages.innerHTML = this.state.msgs;
    };
  },
  onSubmit: function() {
    this.state.socket.send(this.refs.message.value);
    this.refs.message.value = "";
  },
  render: function() {
    return (
      <div>
        <h1>
          Hello sockets
        </h1>
        <div ref="chatroom">
          <div ref ="messages"/>
        </div>
        <form onSubmit={this.onSubmit}>
          <input placeholder="enter message"
          type="text"
          id="message"
          ref="message"
          className="form-control"/>
          <input className="btn btn-success" type="submit" value="send"/>
        </form>
      </div>
    );
  }
});

module.exports = ChatWS;
