var ChangePassword = React.createClass({
    getInitialState: function () {
        return {};
    },
    SendToServer: function (es) {
        es.preventDefault();
        var tokenKey = "tokenInfo";
        var token = sessionStorage.getItem(tokenKey);
        var data = {
            OldPassword: $("#OldPassword").val(),
            NewPassword: $("#NewPassword").val(),
            ConfirmPassword: $("#ConfPassword").val()
        };
        //console.log(data);
        $.ajax({
            headers: {
                'Authorization': 'bearer ' + token
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function (data) {
            console.log(data);
        }).fail(function (ee) {
            alert(ee);
        });
    },
    componentDidMount: function () {
        console.log(this.props.url);
    },
    render: function() {
        return (
          <div>
              <form onSubmit={this.SendToServer}>
              <input type="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" placeholder="Old Password" id="OldPassword" className="form-control" />
              <input type="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" placeholder="New Password" id="NewPassword" className="form-control" />
              <input type="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" placeholder="Confirm Password" id="ConfPassword" className="form-control" />
                  <button className="btn btn-success" type="submit">Submit</button>
              </form>
          </div>
        );
    }
});


var Info = React.createClass({
    loadFromServer: function () {
        var self = this;
        var tokenKey = "tokenInfo";
        var token = sessionStorage.getItem(tokenKey);
        $.ajax({
            headers: {
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: this.props.url
        }).success(function (data) {
            self.setState({
                Email: data.Email
            });
        }).fail(function () {
            alert("Error");
        });
    },
    getInitialState: function () {
        return {data: [] };
    },
    componentDidMount: function () {
        this.loadFromServer();
        console.log(this.props.url);
    },
    ChangePassword: function () {
        ReactDOM.render(
          <ChangePassword url="api/Account/ChangePassword" />,
          document.getElementById('pass')
        );
    },
    render: function() {
        return (
          <div>
              Yours email is - {this.state.Email} <br/>
              Other content under hard development =)
              <a onClick={this.ChangePassword} href="#">Change password</a>
              <div id="pass"></div>
          </div>
        );
    }
});