var Info = require('./Info');
var MainPage = require('./MainPage');
var Buttons = require('./buttons');
var SearchPage = require('./SearchPage');
var Chat = require('./Chat');
var BigCalendar = require('./BigCalendar');



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
            console.log("Is auth? ", this.state.isAuth);
        } else {
            this.setState({ isAuth: false });
            console.log("Is auth? ", this.state.isAuth);
        }
        }
    },
    logOut: function() {
        Cookie.save('userName', "");
        Cookie.save('tokenKey', "");
        Cookie.save('claims', "");
        this.setState({ isAuth: false, userName: "" });
        ReactDOM.render(
            <MainPage/>,
            document.getElementById("content")
        );
    },
    profile: function () {
        ReactDOM.render(
            <Info changed={true} url="api/Account/AllUserInfo"/>,
            document.getElementById("content")
        );

    },
    BigCalendar: function() {
            ReactDOM.render(
       <BigCalendar url="api/PhoneBook/All"/>,
       document.getElementById("content"));
    },
    Chat: function() {
        ReactDOM.render(
    <Chat/>,
    document.getElementById("content")
);
    },
    MainPage: function() {
        ReactDOM.render(
            <MainPage/>,
            document.getElementById("content")
        );
    },
    SearchPage: function () {
        ReactDOM.render(
      <SearchPage url="api/Account/SearchUsers" searchData={$("#searchBox").val() }/>,
    document.getElementById("content")
          );
    },
    // Auth
    submitAuth: function (e) {
        e.preventDefault();

        var data = {
            grant_type: "password",
            username: this.refs.EmailAuth.value,
            Password: this.refs.PasswordAuth.value
        };

        $.ajax({
            type: "POST",
            url: "/Token",
            data: data
        }).success((data) => {
            Cookie.save('userName', data.userName);
            Cookie.save('tokenInfo', data.access_token);
            this.getClaims();
            this.setState({ isAuth: true, userName: data.userName });
            $("#authorizationModal").modal("hide");
        }).fail((err) => {
            alert("Error under login");
            console.log("error", err);
        });


    },
    getClaims: function () {
        $.ajax({
            headers: {
                'Authorization': "bearer " + Cookie.load('tokenInfo'),
                'Content-Type': "application/json"
            },
            type: "GET",
            url: "api/Account/AllUserInfo"
        }).success((data) => {
            var strOfCookies = data.Claims.reduce((x, y) => x + ";" + y.ClaimValue, "");
            Cookie.save('claims', strOfCookies);
        }).fail(() => { console.log("fuck"); });
    },
    clearForm: function () {
        this.setState({
            Email: "",
            Password: "",
            ConfirmPassword: ""
        });
    },
    // log end

    // Registration
    submit: function (e) {
        e.preventDefault();

        console.log(this.state);
        if (this.refs.PasswordReg.value === this.refs.ConfirmPassword.value) {
            var data = {
                Email: this.refs.Email.value,
                Password: this.refs.PasswordReg.value,
                ConfirmPassword: this.refs.ConfirmPassword.value
            };

            // Submit form via jQuery/AJAX
            $.ajax({
                type: "POST",
                url: "api/Account/Register",
                data: data
            }).done(()=> {
                    this.clearForm();
                    $("#registrationModal").modal("hide");
                })
                .fail(function () {
                    console.log("failed to register");
                });
        } else {
            alert("Password are not equivalented");
        }
    },
    checkFirst: function () {
        var pass = $(this.refs.PasswordReg);
        var repass = $(this.refs.ConfirmPassword);
        console.log("check first pass", pass.val(), repass.val());
        pass.setCustomValidity(pass.validity.patternMismatch ? pass.title : "");
        if (pass.checkValidity()) repass.pattern = pass.value;
    },
    checkSecond: function () {
        var repass = $(this.refs.ConfirmPassword);
        console.log("check second pass", repass.val());
        repass.setCustomValidity(repass.validity.patternMismatch ? repass.title : "");
    },
    // reg end
    render: function() {
        return (
            <div>
    <div id="registrationModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Registration</h4>
        </div>
        <div className="modal-body">
            <form onSubmit={this.submit}>
                <fieldset>
                    <legend>Registration form</legend>
                <input placeholder="Email" required={true}
                       className="form-control" ref="Email"
                       type="email" name="Email" label="Email:" />
 <label>Enter password</label><br />
 <input placeholder="Password"
        onChange={this.checkFirst}
        required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
        className="form-control" ref="PasswordReg" type="password" name="Password" label="Password:" />
 <label>Re-enter password</label><br />
 <input placeholder="Confirm password"
        onChange={this.checkSecond}
        required={true} title="Please enter the same Password as above"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" className="form-control"
        ref="ConfirmPassword" type="password" name="ConfirmPassword" label="ConfirmPassword:" />
 <button className="btn btn-success" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
<div className="modal-footer">
    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
</div>
    </div>
                    </div>
    </div>
    <div id="authorizationModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Authorization</h4>
        </div>
        <div className="modal-body">
            <form onSubmit={this.submitAuth}>
                <label>Enter email</label><br />
                <input placeholder="email" required={true} className="form-control" ref="EmailAuth" type="email" name="EmailAuth" label="Email:" /><br /><br />
                <label>Enter password</label><br />
                <input placeholder="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" className="form-control" ref="PasswordAuth" type="password" name="PasswordAuth" label="Password:" /><br /><br />
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
                </div>
    </div>
    <ul className="nav navbar-nav">
        <li>
            <a href="#Home" onClick={this.MainPage} className="page-scroll"><i className="fa fa-2x fa-home"></i></a>
        </li>
        <li><input type="text" name="searchBox" id="searchBox" placeholder="search" className="form-control search-form" onChange={this.SearchPage} /></li>
        <li><a href="#splash" className="page-scroll"><i className="fa fa-2x fa-plane"></i> To the heaven!</a></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
        <li>
            <a className={ this.state.isAuth ? 'hidden' : '' } href="#" id="regBtn" data-toggle="modal" data-backdrop="false" data-target="#registrationModal"><i className="fa fa-user-plus"></i> Register</a>
        </li>
        <li>
            <a href="#" id="authBtn" className={ this.state.isAuth ? 'hidden' : '' } data-toggle="modal" data-backdrop="false" data-target="#authorizationModal"><i className="fa fa-sign-in"></i> Log in</a>
        </li>
                <li className="dropdown">
            <a id="hello" href="#" className={`dropdown-toggle  ${this.state.isAuth ? '' : 'hidden'}`} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hello, <span id="whoLog" >{this.state.userName}</span>  <i className="fa fa-2x fa-bars"></i>
</a>
            <ul className="dropdown-menu">
                <li>
                    <a href="#Settings" className="page-scroll" onClick={this.profile}><i className="fa fa-cogs"></i> Settings</a>
                    <a href="#Chat" className="page-scroll" onClick={this.Chat}><i className="fa fa-comment"></i> Chat</a>
                    <a href="#Calendar" className="page-scroll" onClick={this.BigCalendar}><i className="fa fa-calendar-check-o" aria-hidden="true"></i> Calendar</a>
                </li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Bye</li>
                <li>
                    <a href="#LogOut" onClick={this.logOut}><i className="fa fa-sign-out"></i> Log Out</a>
                </li>
            </ul>
                </li>
    </ul>

</div>
        );
    }
});