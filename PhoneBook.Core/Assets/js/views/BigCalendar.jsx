var BigCalendar = require('react-big-calendar');
var moment = require('moment');
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

module.exports = React.createClass({
  getInitialState: function () {
    return {
      events: []
    };
  },
  componentDidMount: function () {
      fetch(this.props.url, {
    	method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "bearer " + Cookie.load('tokenInfo')
      })
    }).then(r => r.json()).then(users=>this.setState({
      events: users.map(u => ({ title: u.FirstName, start: u.HolidayTimeStart, end: u.HolidayTimeEnd }))
    }));
  },
  render() {
    return (
      <div style={{height: 1000}}>

        <BigCalendar
          events={this.state.events}
          defaultDate={new Date()}
          />

      </div>
    );
  }
});
