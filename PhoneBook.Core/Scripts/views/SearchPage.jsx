var SearchPage = React.createClass({
    loadFromServer: function() {
        var self = this;
        var tokenKey = "tokenInfo";
        var token = sessionStorage.getItem(tokenKey);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token,
                'Content-Type': "application/json"
            },
            type: "GET",
            url: this.props.url + "?searchData=" + this.props.searchData
        }).success(function(data) {
            self.setState({
                founded: data
            });
        });
    },
    getInitialState: function() {
        return {
            searchData: this.props.searchData,
            founded: []
        };

    },
    componentWillReceiveProps: function() {
        this.loadFromServer();
        this.setState({ searchData: this.props.searchData, founded: [] });
    },
    render: function() {
        return (
            <div>
    {this.state.founded.map(function(user) {
                return (<div id="TableOfSerach">
        <div className="row jumbotron">
            <div className="col-sm-3">
                <img style={{ verticalAlign: "middle" }} src={user.PathToTmbOfPhoto} alt="user photo"/>
            </div>
            <div className="col-sm-4">
                <h3>First Name: {user.FirstName} </h3>
                <h3>Middle Name: {user.MiddleName}</h3>
                <h3>Last Name: {user.LastName}</h3>
                <h3>Notes: {user.Notes}</h3>
                <h3>Work Phone: {user.PhoneWork}</h3>
            </div>
        </div>
    </div>);
            })}

</div>
        );
    }
});