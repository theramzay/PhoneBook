var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var Info = require('./Info');

var App = require('./App.jsx');

var EmailConfirm = React.createClass({
    render() {
        return <h3>Message {this.props.params.token}</h3>
    }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="info" component={Info}/>
    </Route>
  </Router>
), document.getElementById("content"))