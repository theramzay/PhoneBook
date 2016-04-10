var DatePicker = require("react-datepicker");
var moment = require("moment");

require("react-datepicker/dist/react-datepicker.css");

var tempUsers = [];

$.ajax({
    headers: {
        'Authorization': "bearer " + $.cookie("tokenInfo")
    },
    type: "GET",
    url: "/api/PhoneBook/All"
}).success((data) => {
    console.log(data);
    tempUsers = data;
}).fail(function (error) {
    console.log("error: ", error.responseText);
    alert(error.responseText);
});


var AdminUserForm = React.createClass({
    getInitialState: function() {
        return {
            User: this.props.User,
            Users: [],
            firstSelectedDate: moment(),
            secondSelectedDate: moment(),
            startDate: moment()
        };
    },
    sendInfoToServer: function(e) {
        e.preventDefault();
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);

        var data = {
            Email: this.refs.EmailEdit.value,
            FirstName: this.refs.FirstNameEdit.value,
            LastName: this.refs.LastNameEdit.value,
            MiddleName: this.refs.MiddleNameEdit.value,
            PhonePrivate: this.refs.PhonePrivateEdit.value,
            PhoneWork: this.refs.PhoneWorkEdit.value,
            Notes: this.refs.NotesEdit.value,
            Boss: this.refs.BossEdit.value,
            NotesForBoss: this.refs.NotesForBossEdit.value,
            HolidayTimeStart: this.state.firstSelectedDate.toJSON(),
            HolidayTimeEnd: this.state.secondSelectedDate.toJSON()
        };

        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: "/api/Account/UpdateAllUserInfoByAdmin",
            data: data
        }).success(function() {
            console.log("ok");
        }).fail(function(error) {
            console.log("error: ", error.msg);
        });
    },
    handleFirstDatePick: function(date) {
        this.setState({
            firstSelectedDate: date
        });
    },
    handleSecondDatePick: function(date) {
        this.setState({
            secondSelectedDate: date
        });
    },
    render: function() {
        return (
            <div id="TableOfSerach">
    <div className="row jumbotron">
        <div className="col-sm-3">
            <img style={{ verticalAlign: "middle" }} src={this.state.User.PathToTmbOfPhoto} alt="user photo"/>
        </div>
        <div className="col-sm-4">
            <form onSubmit={this.sendInfoToServer}>
                <label htmlFor="EmailEdit">Enter Email</label>
                <input type="text" placeholder={this.state.User.Email} ref="EmailEdit" className="form-control" value={this.state.User.Email}/>
                <label htmlFor="FirstNameEdit">Enter First Name</label>
                <input type="text" placeholder={this.state.User.FirstName} ref="FirstNameEdit" className="form-control"/>

                <label htmlFor="MiddleNameEdit">Enter Middle Name</label>
                <input type="text" placeholder={this.state.User.MiddleName} ref="MiddleNameEdit" className="form-control"/>

                <label htmlFor="LastNameEdit">Enter Last Name</label>
                <input type="text" placeholder={this.state.User.LastName} ref="LastNameEdit" className="form-control"/>

                <label htmlFor="PhonePrivateEdit">Enter your private phone</label>
                <input type="text" placeholder={this.state.User.PhonePrivate} ref="PhonePrivateEdit" className="form-control"/>

                <label htmlFor="PhoneWorkEdit">Enter your work phone</label>
                <input type="text" placeholder={this.state.User.PhoneWork} ref="PhoneWorkEdit" className="form-control"/>

                <label htmlFor="NotesEdit">Enter your note</label>
                <input type="text" placeholder={this.state.User.Notes} ref="NotesEdit" className="form-control"/>

                <label htmlFor="BossEdit">Choose who wil be boss</label>
                <select className="form-control" ref="BossEdit">
                    {this.props.Users.map((u) => {return (<option value={u.FirstName + " " + u.LastName}>{u.FirstName + " " + u.LastName}</option>);})}
                </select>

                <label htmlFor="NotesForBossEdit">Enter boss note</label>
                <input type="text" placeholder={this.state.User.NotesForBoss} ref="NotesForBossEdit" className="form-control"/>
                <label htmlFor="HolidayTimeStartEdit">Enter Holiday start time</label>
                <DatePicker startDate={this.state.startDate} dateFormat="MM/DD/YYYY" selected={this.state.firstSelectedDate} onChange={this.handleFirstDatePick}/>
                <label htmlFor="HolidayTimeEndEdit">Enter Holiday end time</label>
                <DatePicker startDate={this.state.startDate} dateFormat="MM/DD/YYYY" selected={this.state.secondSelectedDate} onChange={this.handleSecondDatePick}/>

                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>
        );
    }
});

var UserForm = React.createClass({
    getInitialState: function () {
        return {
            User: this.props.User
        };
    },
    render: function() {
        return (
                    <div id="TableOfSerach">
        <div className="row jumbotron">
            <div className="col-sm-3">
                <img style={{ verticalAlign: "middle" }} src={this.state.User.PathToTmbOfPhoto} alt="user photo"/>
            </div>
            <div className="col-sm-4">
                <h3>First Name: {this.state.User.FirstName} </h3>
                <h3>Middle Name: {this.state.User.MiddleName}</h3>
                <h3>Last Name: {this.state.User.LastName}</h3>
                <h3>Notes: {this.state.User.Notes}</h3>
                <h3>Work Phone: {this.state.User.PhoneWork}</h3>
            </div>
        </div>
    </div>
            );
    }
});


module.exports = React.createClass({
    getInitialState: function() {
        return {
            searchData: this.props.searchData,
            founded: []
        };

    },
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
            url: this.props.url + "?searchData=" + this.state.searchData
        }).success(function(data) {
            self.setState({
                founded: data
            });
        });
    },
    componentWillReceiveProps: function(newProp) {
        this.setState({ searchData: newProp.searchData });
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.searchData !== this.state.searchData) {
            this.loadFromServer();
        }
    },
    componentDidMount: function() {
        this.loadFromServer();
    },
    render: function() {
        var self = this;
        var claimsKey = "claims";
        if (typeof $.cookie(claimsKey) === "undefined") $.cookie(claimsKey, "notauth");
        if ($.cookie(claimsKey).indexOf("Admin") !== -1) {
            return (
                <div>
                    {this.state.founded.map(function(user) {return (<AdminUserForm User={user} Users={tempUsers}/>);})}
                </div>
            );
        } else {
            return (
                <div>
                    {this.state.founded.map(function(user) {return (<UserForm User={user}/>);})}
                </div>
            );
        }

    }
});