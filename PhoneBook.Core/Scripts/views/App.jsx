var MainPage = require('./MainPage.jsx');
var Buttons = require('./buttons.jsx');

var AddUser = require('./AddUser.jsx');
var AuthUser = require('./AuthUser.jsx');
var AuthUser = require('./AuthUser.jsx');
var Info = require('./Info');
require('font-awesome/css/font-awesome.css');

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