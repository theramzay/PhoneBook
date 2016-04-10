var MainPage = require('./MainPage.jsx');
var Buttons = require('./buttons.jsx');
var AddUser = require('./AddUser.jsx');
var AuthUser = require('./AuthUser.jsx');

require('font-awesome/css/font-awesome.css');

//module.exports = React.createClass({
//    render: function() {
//        return (
//            <div>
//                <MainPage />
//                <Buttons />
//                <AddUser url="api/Account/Register" />
//                <AuthUser url="/Token" />
//                {this.props.children}
//            </div>
//            );
//    }
//});

ReactDOM.render(
  <MainPage />,
  document.getElementById('content')
);

ReactDOM.render(
    <Buttons />,
    document.getElementById("logins")
);

ReactDOM.render(
    <AddUser url="api/Account/Register"/>,
    document.getElementById("registrationModal")
);

ReactDOM.render(
    <AuthUser url="/Token"/>,
    document.getElementById("authorizationModal")
);