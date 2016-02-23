var Info = React.createClass({
    loadFromServer: function () {
        var self = this;
        var tokenKey = "tokenInfo";
        var token = sessionStorage.getItem(tokenKey);
        $.ajax({
            headers: {
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            },
            type: "GET",
            url: this.props.url
        }).success(function (data) {
            self.setState({
                Email: data.Email
            });
        }).fail(function () {
            alert("Error");
        });
    },
    getInitialState: function () {
        return {data: [] };
    },
    componentDidMount: function () {
        this.loadFromServer();
    },
    render: function() {
        return (
          <div>
              Yours email is - {this.state.Email} <br/>
              Other content under hard development =)
          </div>
        );
    }
});