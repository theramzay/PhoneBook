var DatePicker = require("react-datepicker");
var moment = require("moment");

require("react-datepicker/dist/react-datepicker.css");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            searchData: this.props.searchData,
            founded: [],
            Users: [],
            firstSelectedDate: moment(),
            secondSelectedDate: moment(),
            startDate: moment()
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

            $.ajax({
                headers: {
                    'Authorization': "bearer " + token
                },
                type: "GET",
                url: '/api/PhoneBook/All'
            }).success((data) => {
                console.log(data);
                self.setState({ Users: data });
            }).fail(function (error) {
                console.log("error: ", error.responseText);
                alert(error.responseText);
            });


        });
    },
    sendInfoToServer: function(e) {
        e.preventDefault();
        console.log(e.target);
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        console.log("Email in log", this.refs.frm);

        //var data = {
        //    Email: this.refs.EmailEdit.value,
        //    FirstName: this.refs.FirstNameEdit.value,
        //    LastName: this.refs.LastNameEdit.value,
        //    MiddleName: this.refs.MiddleNameEdit.value,
        //    PhonePrivate: this.refs.PhonePrivateEdit.value,
        //    PhoneWork: this.refs.PhoneWorkEdit.value,
        //    Notes: this.refs.NotesEdit.value,
        //    Boss: this.refs.BossEdit.value,
        //    NotesForBoss: this.refs.NotesForBossEdit.value,
        //    HolidayTimeStart: this.state.firstSelectedDate.toJSON(),
        //    HolidayTimeEnd: this.state.secondSelectedDate.toJSON()
        //};

        var data = {
            Email: e.target[0].value,
            FirstName: e.target[1].value,
            LastName: e.target[2].value,
            MiddleName: e.target[3].value,
            PhonePrivate: e.target[4].value,
            PhoneWork: e.target[5].value,
            Notes: e.target[6].value,
            Boss: e.target[7].value,
            NotesForBoss: e.target[8].value,
            HolidayTimeStart: e.target[9].value,
            HolidayTimeEnd: e.target[10].value
        };

        console.log(data);

        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: "/api/Account/UpdateAllUserInfoByAdmin",
            data: data
        }).success(function() {
            console.log('ok');
        }).fail(function(error) {
            console.log('error: ',error.msg);
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
        var self = this;
        var claimsKey = "claims";
        if (typeof $.cookie(claimsKey) === "undefined") $.cookie(claimsKey, "notauth");
        if ($.cookie(claimsKey).indexOf("Admin") !== -1) {
            return (
                <div>
    {this.state.founded.map(function(user) {
                    return (<div id="TableOfSerach">
        <div className="row jumbotron">
            <div className="col-sm-3">
                <img style={{ verticalAlign: "middle" }} src={user.PathToTmbOfPhoto} alt="user photo"/>
            </div>
            <div className="col-sm-4">
                <form key={user.Email} ref="frm" onSubmit={self.sendInfoToServer.bind(this)}>
                    <label htmlFor="EmailEdit">Enter Email</label>
                    <input type="text" placeholder={user.Email} ref="EmailEdit" className="form-control" value={user.Email}/>
                    <label htmlFor="FirstNameEdit">Enter First Name</label>
                    <input type="text" placeholder={user.FirstName} ref="FirstNameEdit" className="form-control"/>

                    <label htmlFor="MiddleNameEdit">Enter Middle Name</label>
                    <input type="text" placeholder={user.MiddleName} ref="MiddleNameEdit" className="form-control"/>

                    <label htmlFor="LastNameEdit">Enter Last Name</label>
                    <input type="text" placeholder={user.LastName} ref="LastNameEdit" className="form-control"/>

                    <label htmlFor="PhonePrivateEdit">Enter your private phone</label>
                    <input type="text" placeholder={user.PhonePrivate} ref="PhonePrivateEdit" className="form-control"/>

                    <label htmlFor="PhoneWorkEdit">Enter your work phone</label>
                    <input type="text" placeholder={user.PhoneWork} ref="PhoneWorkEdit" className="form-control"/>

                    <label htmlFor="NotesEdit">Enter your note</label>
                    <input type="text" placeholder={user.Notes} ref="NotesEdit" className="form-control"/>

                    <label htmlFor="BossEdit">Choose who wil be boss</label>
                    <select className="form-control" ref="BossEdit">
                        {self.state.Users.map((u) => {
                        return (
                    <option value={u.FirstName + ' ' + u.LastName}>{u.FirstName + ' ' + u.LastName}</option>);
                        })}
                    </select>

                    <label htmlFor="NotesForBossEdit">Enter boss note</label>
                    <input type="text" placeholder={user.NotesForBoss} ref="NotesForBossEdit" className="form-control"/>
                    <label htmlFor="HolidayTimeStartEdit">Enter Holiday start time</label>
                    <DatePicker startDate={self.state.startDate} dateFormat="MM/DD/YYYY" selected={self.state.firstSelectedDate} onChange={self.handleFirstDatePick}/>
                    <label htmlFor="HolidayTimeEndEdit">Enter Holiday end time</label>
                    <DatePicker startDate={self.state.startDate} dateFormat="MM/DD/YYYY" selected={self.state.secondSelectedDate} onChange={self.handleSecondDatePick}/>

                    <button key={user.Email} className="btn btn-success" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>);
                })}

</div>
            );

        } else {
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

    }
});