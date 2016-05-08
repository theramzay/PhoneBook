var ChatWS = React.createClass({
  getInitialState: function() {
    return {
        socket: new WebSocket(`ws://${location.hostname}/api/Chat?name=${this.props.userName}`),
      msgs: []
    };
  },
  componentWillMount: function() {
    this.state.socket.onmessage = e => {
      this.setState({msgs:this.state.msgs.concat(JSON.parse(e.data))});
    };
  },
  onSubmit: function(e) {
    e.preventDefault();
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
          {this.state.msgs.map(m => {
            switch (m.Type) {
              case 'joined':  return <h3 key={m.Message+Date.now()}>
                <i style={{color: `${m.Color}`}}>
                  {m.From} {m.Message}
                </i>
              </h3>
              case 'welcome': return <h3 key={m.Message+Date.now()}>
                <i style={{color: `${m.Color}`}}>{m.Message} {m.From}.</i>
              </h3>
              case 'logout': return <h3 key={m.Message+Date.now()}>
                <i style={{color: `${m.Color}`}}>
                  {m.From} {m.Message}
                </i>
              </h3>
              case 'standard':return <p key={m.Message+Date.now()} className="jumbotron">
                <b>
                  <span style={{color: `${m.Color}`}}>
                    {m.From}:
                  </span>
                </b>
                {m.Message}
              </p>
            }
          })}
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="enter message"
            type="text"
            id="message"
            ref="message"
            className="form-control"/>
          <input
            className="btn btn-success"
            type="submit"
            value="send"/>
        </form>
      </div>
    );
  }
});

module.exports = ChatWS;
