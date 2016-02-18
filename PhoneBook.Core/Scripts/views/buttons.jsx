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
    render: function() {
        return (
            <div>
                <button id="regBtn" type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#registrationModal">Registration</button>
                <button id="authBtn" type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#authorizationModal">Authorization</button>
                <button id="logOutBtn" className="btn btn-info btn-lg" onClick={this.logOut}>Log Out</button>
                 <div id="hello"><p style={{ color: 'rgb(245, 197, 198)' } }>Приветствуем вас, <span style={{ color: 'cyan' }} id="whoLog"></span></p></div>
      </div>
    );
}
});

ReactDOM.render(
  <UserButtons />,
  document.getElementById('logins')
);