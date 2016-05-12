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
            title="Password must be more then 8 characters, including UPPER/lowercase and digits"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$"
            placeholder="Old Password"
            ref="OldPassword"
            className="form-control"/>

          <input
            type="password"
            required={true}
            title="Password must be more then 8 characters, including UPPER/lowercase and digits"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$"
            placeholder="New Password"
            ref="NewPassword"
            className="form-control"/>

          <input
            type="password"
            required={true}
            title="Password must be more then 8 characters, including UPPER/lowercase and digits"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$"
            placeholder="Confirm Password"
            ref="ConfPassword"
            className="form-control"/>

          <button className="btn btn-success" type="submit">Submit</button>

        </form>

      </div>
    );
  }
});
