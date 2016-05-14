module.exports = React.createClass({
  getInitialState: function () {
    return {
      Email: '',
      NameOfClaim: '',
      Emails: []
    };
  },
  getFromServer: function () {
    fetch('/api/PhoneBook/All', {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "bearer " + Cookie.load('tokenInfo')
    })
  })
  .then(r => r.json())
  .then(users=>this.setState({Emails: users.map(u => u.Email)}));
  },
  componentDidMount: function() {
    this.getFromServer();
  },
  sendToServer: function(e) {
    e.preventDefault();
    var data = {
      Email: this.refs.EmailOfUser.value,
      NameOfClaim: this.refs.NameOfClaim.value
    }
    fetch(this.props.url, {
    method: 'POST',
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "bearer " + Cookie.load('tokenInfo')
    }),
    body: JSON.stringify(data)
  }).then(()=>ReactDOM.unmountComponentAtNode(document.getElementById('Settings')));
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.sendToServer}>
          <select
            className="form-control"
            ref="EmailOfUser">
            {this.state.Emails.map((e) => {
              return (
                <option value={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <select
            className="form-control"
            ref="NameOfClaim">
            <option value="Admin">Administrator</option>
            <option value="User">User</option>
          </select>
          <button className="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    );
  }
});
