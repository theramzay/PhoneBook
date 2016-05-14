var Info = require('./Info');
var MainPage = require('./MainPage');
var Buttons = require('./buttons');
var SearchPage = require('./SearchPage');
var Chat = require('./Chat');
var ChatWS = require('./ChatWS');
var BigCalendar = require('./BigCalendar');
var AdminPage = require('./AdminPage');


let AuthButton = React.createClass({
  submitAuth: function (e) {
    e.preventDefault();

    var data = {
      grant_type: "password",
      username: this.refs.EmailAuth.value,
      Password: this.refs.PasswordAuth.value
    };

/*    var formData = new FormData();
    formData.append('grant_type','password');
    formData.append('username',this.refs.EmailAuth.value);
    formData.append('Password',this.refs.PasswordAuth.value)

    fetch('/Token', {
    method: 'POST',
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest"
    }),
    body: formData
  }).then(r=>{
    Cookie.save('userName', data.userName);
    Cookie.save('tokenInfo', data.access_token);
    this.getClaims();
    this.props.updateAuthState(true, data.userName);
    $("#authorizationModal").modal("hide");
    this.props.clearForm();
  });*/

    $.ajax({
      type: "POST",
      url: "/Token",
      data: data
    }).success((data) => {
      Cookie.save('userName', data.userName);
      Cookie.save('tokenInfo', data.access_token);
      this.getClaims();
      this.props.updateAuthState(true, data.userName);
      $("#authorizationModal").modal("hide");
      this.props.clearForm();
    }).fail((err) => {
      alert("Error under login");
    });
  },
  getClaims: function () {
    fetch('api/Account/AllUserInfo', {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "bearer " + Cookie.load('tokenInfo')
      })
    })
    .then(r => r.json())
    .then(data=>{
      var strOfCookies = data.Claims.reduce((x, y) => x + ";" + y.ClaimValue, "");
      Cookie.save('claims', strOfCookies);
    });
},
  render: function() {
    return (
      <div
        id="authorizationModal"
        className="modal fade"
        role="dialog">

        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <button
                type="button"
                className="close"
                data-dismiss="modal">&times;</button>

              <h4 className="modal-title">Authorization</h4>

            </div>

            <div className="modal-body">

              <form onSubmit={this.submitAuth}>

                <label>
                  Enter email
                </label>
                <br />

                <input
                  placeholder="email"
                  required={true}
                  className="form-control"
                  ref="EmailAuth"
                  type="email"
                  name="EmailAuth"
                  label="Email:" />
                <br />
                <br />

                <label>
                  Enter password
                </label>
                <br />

                <input
                  placeholder="password"
                  required={true}
                  title="Password must be more then 8 characters, including UPPER/lowercase and digits"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$"
                  className="form-control"
                  ref="PasswordAuth"
                  type="password"
                  name="PasswordAuth"
                  label="Password:" />
                <br />
                <br />

                <button className="btn btn-success" type="submit">Submit</button>

              </form>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal">Close</button>

            </div>

          </div>

        </div>

      </div>
    );
  }
});

let RegButton = React.createClass({
  submit: function (e) {
    e.preventDefault();

    if (this.refs.PasswordReg.value === this.refs.ConfirmPassword.value) {
      var data = {
        Email: this.refs.Email.value,
        Password: this.refs.PasswordReg.value,
        ConfirmPassword: this.refs.ConfirmPassword.value
      };

      fetch('api/Account/Register', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "bearer " + Cookie.load('tokenInfo')
      }),
      body: JSON.stringify(data)
    }).then(()=>{
      this.props.clearForm();
      $("#registrationModal").modal("hide");
    });

    } else {
      alert("Password are not equivalented");
    }
  },
  checkFirst: function () {
    var pass = $(this.refs.PasswordReg);
    var repass = $(this.refs.ConfirmPassword);
    pass.setCustomValidity(pass.validity.patternMismatch ? pass.title : "");
    if (pass.checkValidity()) repass.pattern = pass.value;
  },
  checkSecond: function () {
    var repass = $(this.refs.ConfirmPassword);
    repass.setCustomValidity(repass.validity.patternMismatch ? repass.title : "");
  },
  render: function() {
    return (
      <div
        id="registrationModal"
        className="modal fade"
        role="dialog">

        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <button
                type="button"
                className="close"
                data-dismiss="modal">&times;</button>

              <h4 className="modal-title">Registration</h4>

            </div>

            <div className="modal-body">

              <form onSubmit={this.submit}>

                <fieldset>

                  <legend>
                    Registration form
                  </legend>

                  <input
                    placeholder="Email"
                    required={true}
                    className="form-control"
                    ref="Email"
                    type="email"
                    name="Email"
                    label="Email:" />

                  <label>
                    Enter password
                  </label>
                  <br />

                  <input
                    placeholder="Password"
                    onChange={this.checkFirst}
                    required={true}
                    title="Password must be more then 8 characters, including UPPER/lowercase and digits"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$"
                    className="form-control"
                    ref="PasswordReg"
                    type="password"
                    name="Password"
                    label="Password:" />

                  <label>
                    Re-enter password
                  </label>
                  <br />

                  <input
                    placeholder="Confirm password"
                    onChange={this.checkSecond}
                    required={true}
                    title="Please enter the same Password as above"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$"
                    className="form-control"
                    ref="ConfirmPassword"
                    type="password"
                    name="ConfirmPassword"
                    label="ConfirmPassword:" />

                  <button className="btn btn-success" type="submit">Submit</button>

                </fieldset>

              </form>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal">Close</button>

            </div>

          </div>

        </div>

      </div>
    );
  }

});

let LeftNavBar = React.createClass({
  MainPage: function() {
    ReactDOM.render(
      <MainPage />,
      document.getElementById("content")
    );
  },
  SearchPage: function () {
    ReactDOM.render(
      <SearchPage
        url="api/Account/SearchUsers"
        searchData={this.refs.searchBox.value } />,
      document.getElementById("content")
    );
  },
  render: function() {
    return (
      <ul className="nav navbar-nav">

        <li>

          <a
            href="#Home"
            onClick={this.MainPage}
            className="page-scroll">
            <i className="fa fa-2x fa-home">
            </i>
          </a>

        </li>

        <li>
          <input
            type="text"
            name="searchBox"
            id="searchBox"
            ref="searchBox"
            placeholder="search"
            className="form-control search-form"
            onChange={this.SearchPage}/>
        </li>

      </ul>
    );
  }
});


module.exports = React.createClass({
  getInitialState: function() {
    return {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      isAuth: false,
      userName: Cookie.load('userName')
    };
  },
  componentDidMount: function () {
    if (typeof this.state.userName !== "undefined" && this.state.userName !== "") {
      this.setState({ isAuth: true });
    } else {
      this.setState({ isAuth: false });
    }
  },
  componentDidUpdate: function (prevProps,prevState) {
    if(prevState.isAuth !== this.state.isAuth){
      if (typeof this.state.userName !== "undefined" && this.state.userName !== "") {
        this.setState({ isAuth: true });
      } else {
        this.setState({ isAuth: false });
      }
    }
  },
  logOut: function() {
    Cookie.save('userName', "");
    Cookie.save('tokenKey', "");
    Cookie.save('claims', "");
    this.updateAuthState(false, "");
    ReactDOM.render(
      <MainPage/>,
      document.getElementById("content")
    );
  },
  profile: function () {
    ReactDOM.render(
      <Info
        changed={true}
        url="api/Account/AllUserInfo"/>,
      document.getElementById("content")
    );

  },
  BigCalendar: function() {
    ReactDOM.render(
      <BigCalendar url="api/PhoneBook/All"/>,
      document.getElementById("content")
    );
  },
  Chat: function() {
    ReactDOM.render(
      <Chat/>,
      document.getElementById("content")
    );
  },
  ChatWS: function() {
    ReactDOM.render(
      <ChatWS userName={this.state.userName}/>,
      document.getElementById("content")
    );
  },

  AdminPage: function() {
    ReactDOM.render(
      <AdminPage url="api/PhoneBook/All" />,
      document.getElementById("content")
    );
  },
  updateAuthState: function (state, username) {
    this.setState({ isAuth: state, userName: username });
  },
  clearForm: function () {
    this.setState({
      Email: "",
      Password: "",
      ConfirmPassword: ""
    });
  },
  render: function() {
    return (
      <div>

        <RegButton
          clearForm={this.clearForm}
          updateAuthState={this.updateAuthState} />

        <AuthButton
          clearForm={this.clearForm}
          updateAuthState={this.updateAuthState}/>

        <LeftNavBar />


        <ul className="nav navbar-nav navbar-right">

          <li>

            <a
              className={ this.state.isAuth ? 'hidden' : '' }
              href="#"
              id="regBtn"
              data-toggle="modal"
              data-backdrop="false"
              data-target="#registrationModal">
              <i className="fa fa-user-plus">
              </i> Register
            </a>

          </li>

          <li>

            <a
              href="#"
              id="authBtn"
              className={ this.state.isAuth ? 'hidden' : '' }
              data-toggle="modal"
              data-backdrop="false"
              data-target="#authorizationModal">
              <i className="fa fa-sign-in">
              </i> Log in
            </a>

          </li>

          <li className="dropdown">

            <a
              id="hello"
              href="#"
              className={`dropdown-toggle  ${this.state.isAuth ? '' : 'hidden'}`}
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              Hello, <span id="whoLog" >{this.state.userName}</span>
            <i className="fa fa-2x fa-bars">
            </i>

          </a>

          <ul className="dropdown-menu">

            <li>

              <a
                href="#Settings"
                className="page-scroll"
                onClick={this.profile}>
                <i className="fa fa-cogs">
                </i> Settings
              </a>

              <a
                href="#Chat"
                className="page-scroll"
                onClick={this.Chat}>
                <i className="fa fa-comment">
                </i> Chat
              </a>

              <a
                href="#ChatWS"
                className="page-scroll"
                onClick={this.ChatWS}>
                <i className="fa fa-comment">
                </i> ChatWS
              </a>

              <a
                href="#Calendar"
                className="page-scroll"
                onClick={this.BigCalendar}>
                <i
                  className="fa fa-calendar-check-o"
                  aria-hidden="true">
                </i> Calendar
              </a>

              <a
                href="#AdminPanel"
                className="page-scroll"
                onClick={this.AdminPage}>
                <i
                  className="fa fa-calendar-check-o"
                  aria-hidden="true">
                </i> Admin Panel
              </a>

            </li>

            <li role="separator" className="divider">
            </li>

            <li className="dropdown-header">Bye</li>

            <li>

              <a href="#LogOut" onClick={this.logOut}>
                <i className="fa fa-sign-out">
                </i> Log Out
              </a>

            </li>

          </ul>

        </li>

      </ul>


    </div>
  );
}
});
