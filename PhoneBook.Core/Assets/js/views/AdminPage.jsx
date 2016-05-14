
var PieChart = require('react-d3-components').PieChart;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      data: {}
    }
  },
  componentDidMount: function() {

    fetch(this.props.url, {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": "bearer " + Cookie.load('tokenInfo')
    })
  })
  .then(r => r.json())
  .then(users=>{
    let value = users.map(u => ({x:u.Email,y:new Date(u.DayOfRegistration)}))
    this.setState({data: users.map(u => ({label:u.Email, values: value}))});
  });
  },
  render: function () {
    return (
      <PieChart
        data = {this.state.data}
        width = {600}
        height = {400}
        margin={{top: 10, bottom: 10, left: 100, right: 100}}
        />
    );
  }
});



/*var LineChart = require('react-d3-basic').LineChart;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      chartSeries: [
      {
        field: 'value',
        name: 'Day of registration',
        color: '#ff7f0e',
        style: {
          "strokeWidth": 2,
          "strokeOpacity": .2,
          "fillOpacity": .2
        }
      }
    ],
      x: x=> x.value.getDate()
    }
  },
  componentDidMount: function() {
    $.ajax({
      headers: {
        'Authorization': "bearer " + Cookie.load('tokenInfo'),
        'Content-Type': "application/json"
      },
      type: "GET",
      url: this.props.url
    }).success(users => {
      this.setState({data: users.map(u => ({name:u.Email, value: new Date(u.DayOfRegistration)}))});
      console.log(this.state.data);
    }).fail(function () {
      alert("Error");
    });
  },
  render: function () {
    return (
      <LineChart
        data = {this.state.data}
        width = {600}
        height = {400}
        chartSeries = {this.state.chartSeries}
        x = {this.state.x}
        />
    );
  }
});*/
