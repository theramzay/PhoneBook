var MainPage = require('./MainPage.jsx');
var Buttons = require('./buttons.jsx');

require('font-awesome/css/font-awesome.css');

ReactDOM.render(
  <MainPage />,
  document.getElementById('content')
);

ReactDOM.render(
  <Buttons />,
  document.getElementById("logins")
);
