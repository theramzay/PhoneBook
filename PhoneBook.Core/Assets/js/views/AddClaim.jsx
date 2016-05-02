module.exports = React.createClass({
  getInitialState: function () {
    return {
      Email: '',
      NameOfClaim: '',
      Emails: []
    };
  },
  getFromServer: function () {
    $.ajax({
      headers: {
        'Authorization': "bearer " + Cookie.load('tokenInfo')
      },
      type: "GET",
      url: '/api/PhoneBook/All'
    }).success((data) => {
      console.log(data);
      this.setState({Emails: data.map(u => u.Email)});
    }).fail(function (error) {
      console.log("error: ", error.responseText);
      alert(error.responseText);
    });
  },
  componentDidMount: function() {
    this.getFromServer();
  },
  sendToServer: function() {
    var data = {
      Email: this.refs.EmailOfUser.value,
      NameOfClaim: this.refs.NameOfClaim.value
    }
    console.log(data);
    $.ajax({
      headers: {
        'Authorization': "bearer " + Cookie.load('tokenInfo')
      },
      type: "POST",
      url: this.props.url,
      data: data
    }).success(()=> {
      ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
    }).fail(function (error) {
      console.log("error: ", error.responseText);
      alert(error.responseText);
    });
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
