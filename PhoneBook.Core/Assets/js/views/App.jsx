
var MainPage = require('./MainPage.jsx');
var Buttons = require('./buttons.jsx');
var Splash = require('./HeaderPart.jsx');

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
  <Splash />,
  document.getElementById("splash")
);
