var PieChart = require('react-d3-components').PieChart;

var data = {
    label: 'somethingA',
    values: [{ x: 'SomethingA', y: 10 }, { x: 'SomethingB', y: 4 }, { x: 'SomethingC', y: 3 }]
};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: {}
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
        }).success((users) => {
            var temp = users.map(u => u.); //TODO: гляннуть где то в коде есть такая реализация.
            this.setState({data:users});
        }).fail(function () {
            alert("Error");
        });
        this.setState({
            isChanged: false
        });
    },
    render: function () {
        return (      
    <PieChart
        data={data}
                width={600}
                height={400}
                margin={{top: 10, bottom: 10, left: 100, right: 100}}
                />
            );
    }
});