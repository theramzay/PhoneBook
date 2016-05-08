module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  SendToServer: function(es) {
    es.preventDefault();
    var data = {
      OldPassword: this.refs.OldPassword.value,
      NewPassword: this.refs.NewPassword.value,
      ConfirmPassword: this.refs.ConfPassword.value
    };
    $.ajax({
      headers: {
        'Authorization': "bearer " + Cookie.load('tokenInfo')
      },
      type: "POST",
      url: this.props.url,
      data: data
    }).success(function () {
      React.unmountComponentAtNode(document.getElementById('Settings'));
    }).fail(function(ee) {
      alert(ee);
    });
  },
  componentDidMount: function() {
    console.log(this.props.url);
  },
  render: function() {
    return (
      <div>

        <form onSubmit={this.SendToServer}>

          <input
            type="password"
            required={true}
            title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
            placeholder="Old Password"
            ref="OldPassword"
            className="form-control"/>

          <input
            type="password"
            required={true}
            title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
            placeholder="New Password"
            ref="NewPassword"
            className="form-control"/>

          <input
            type="password"
            required={true}
            title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
            placeholder="Confirm Password"
            ref="ConfPassword"
            className="form-control"/>

          <button className="btn btn-success" type="submit">Submit</button>

        </form>

      </div>
    );
  }
});
