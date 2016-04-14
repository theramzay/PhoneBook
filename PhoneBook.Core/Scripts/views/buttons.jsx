require('jquery.cookie');
var Info = require('./Info');
var MainPage = require('./MainPage');
var Buttons = require('./buttons');
var SearchPage = require('./SearchPage');
var Chat = require('./Chat');



module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        if (typeof $.cookie("userName") !== "undefined" && $.cookie("userName") !== "undefined") {
            $("#whoLog").text($.cookie("userName"));
            $("#authBtn").addClass('hidden');
            $("#regBtn").addClass('hidden');
            $("#hello").removeClass('hidden');
        } else {
            $("#hello").addClass('hidden');
        }
    },
    logOut: function() {
        $.cookie("tokenKey", "undefined");
        $.cookie("userName", "undefined");
        $.cookie("claims", "undefined");
        $("#logOutBtn").addClass('hidden');
        $("#hello").addClass('hidden');
        $("#authBtn").removeClass('hidden');
        $("#regBtn").removeClass('hidden');
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
    render: function() {
        return (
            <div>
    <ul className="nav navbar-nav">
        <li>
            <a href="#Home" onClick={this.MainPage} className="page-scroll"><i className="fa fa-2x fa-home"></i></a>
        </li>
        <li><input type="text" name="searchBox" id="searchBox" placeholder="search" className="form-control search-form" onChange={this.SearchPage} /></li>
        <li><a href="#splash" className="page-scroll"><i className="fa fa-2x fa-plane"></i> To the heaven!</a></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
        <li>
            <a href="#" id="regBtn" data-toggle="modal" data-target="#registrationModal"><i className="fa fa-user-plus"></i> Register</a>
        </li>
        <li>
            <a href="#" id="authBtn" data-toggle="modal" data-target="#authorizationModal"><i className="fa fa-sign-in"></i> Log in</a>
        </li>
                <li className="dropdown">
            <a id="hello" href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hello, <span id="whoLog"></span>  <i className="fa fa-2x fa-bars"></i>
</a>
            <ul className="dropdown-menu">
                <li>
                    <a href="#Settings" className="page-scroll" onClick={this.profile}><i className="fa fa-cogs"></i> Settings</a>
                    <a href="#Chat" className="page-scroll" onClick={this.Chat}><i className="fa fa-comment"></i> Chat</a>
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