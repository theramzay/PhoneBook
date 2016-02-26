var UserButtons = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        if (sessionStorage.getItem("userName") != null) {
            $("#whoLog").text(sessionStorage.getItem("userName"));
            $("#authBtn").addClass('hidden');
            $("#regBtn").addClass('hidden');
            $("#hello").removeClass('hidden');
        } else {
            $("#hello").addClass('hidden');
        }
    },
    logOut: function() {
        sessionStorage.removeItem("tokenKey");
        sessionStorage.removeItem("userName");
        $("#logOutBtn").addClass('hidden');
        $("#hello").addClass('hidden');
        $("#authBtn").removeClass('hidden');
        $("#regBtn").removeClass('hidden');
    },
    profile: function() {
        ReactDOM.render(
            <Info url="api/Account/UserInfo"/>,
            document.getElementById("content")
        );
    },
    MainPage: function() {
        ReactDOM.render(
            <MainPage/>,
            document.getElementById("content")
        );
    },
    render: function() {
        return (
            <div>
    <ul className="nav navbar-nav">
        <li>
            <a href="#Home" onClick={this.MainPage}><span className="glyphicon glyphicon-home"></span></a>
        </li>
        <li>
            <a href="/Help">Api</a>
        </li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
        <li>
            <a href="#" id="regBtn" data-toggle="modal" data-target="#registrationModal"><span className="glyphicon glyphicon-user"></span> Register</a>
        </li>
        <li>
            <a href="#" id="authBtn" data-toggle="modal" data-target="#authorizationModal"><span className="glyphicon glyphicon-log-in"></span> Log in</a>
        </li>
                <li className="dropdown">
            <a id="hello" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hello, <span id="whoLog"></span> <span className="caret"></span></a>
            <ul className="dropdown-menu">
                <li>
                    <a href="#Settings" onClick={this.profile}><span className="glyphicon glyphicon-cog"></span> Settings</a>
                </li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Bye</li>
                <li>
                    <a href="#LogOut" onClick={this.logOut}><span className="glyphicon glyphicon-off"></span> Log Out</a>
                </li>
            </ul>
                </li>
    </ul>

</div>
        );
    }
});

ReactDOM.render(
    <UserButtons/>,
    document.getElementById("logins")
);