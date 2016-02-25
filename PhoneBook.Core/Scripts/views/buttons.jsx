var UserButtons = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function () {
        if (sessionStorage.getItem('userName') != null) {
            $("#whoLog").text(sessionStorage.getItem('userName'));
            $('#authBtn').css('visibility', 'hidden');
            $('#regBtn').css('visibility', 'hidden');
            $('#logOutBtn').css('visibility', 'visible');
            $("#hello").css('visibility', 'visible');
        } else {
            $('#logOutBtn').css('visibility', 'hidden');
            $("#hello").css('visibility', 'hidden');
        }
    },
    logOut: function () {
        sessionStorage.removeItem('tokenKey');
        sessionStorage.removeItem('userName');
        $('#logOutBtn').css('visibility', 'hidden');
        $("#hello").css('visibility', 'hidden');
        $('#authBtn').css('visibility', 'visible');
        $('#regBtn').css('visibility', 'visible');
    },
    profile:function() {
        ReactDOM.render(
          <Info url="api/Account/UserInfo" />,
          document.getElementById('content')
);
    },
    MainPage:function() {
        ReactDOM.render(
          <MainPage />,
          document.getElementById('content')
        );
    },
    render: function() {
        return (
            <div>
                <ul className="nav navbar-nav">
                    <li><a href="#" onClick={this.MainPage}>Home</a></li>
                    <li><a href="/Help">Api</a></li>
                    <li><a href="#" id="regBtn" data-toggle="modal" data-target="#registrationModal">Register</a></li>
                    <li><a href="#" id="authBtn" data-toggle="modal" data-target="#authorizationModal">Log in</a></li>
                    <li><a href="#" id="logOutBtn" onClick={this.logOut}>Log Out</a></li>
                    <li><a id="hello" href="#" onClick={this.profile}>Hello, <span id="whoLog"></span></a></li>
                </ul>
</div>
    );
}
});

ReactDOM.render(
  <UserButtons />,
  document.getElementById('logins')
);