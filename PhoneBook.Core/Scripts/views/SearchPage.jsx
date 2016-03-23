var SearchPage = React.createClass({
    getInitialState: function () {
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
        }).success(function (data) {
            self.setState({
                founded: data
            });
        });
    },
    SendInfoToServer: function (e) {
        //e.defaultPrevented();
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        var data = {
            Email: $("#EmailEdit").val(),
            FirstName: $("#FirstNameEdit").val(),
            MiddleName: $("#MiddleNameEdit").val(),
            LastName: $("#LastNameEdit").val(),
            PhonePrivate: $("#PhonePrivateEdit").val(),
            PhoneWork: $("#PhoneWorkEdit").val(),
            Notes: $("#NotesEdit").val(),
            NotesForBoss: $("#NotesForBossEdit").val(),
            HolidayTimeStart: $("#HolidayTimeStartEdit").val(),
            HolidayTimeEnd: $("#HolidayTimeEndEdit").val()
        };
        console.log(data);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: '/api/Account/UpdateAllUserInfoByAdmin',
            data: data
        }).success(function (data) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            console.log(data);
        }).fail(function (ee) {
            alert(ee);
        });
    },
    componentWillReceiveProps: function (newProp) {
        this.setState({ searchData: newProp.searchData });
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.searchData !== this.state.searchData) {
            this.loadFromServer();
        }
    },
    componentDidMount: function () {
        this.loadFromServer();
    },
    dataPickerInit: function() {
        $('.datetimepicker').datetimepicker({ value: '2015/04/15 05:03', step: 10 });
    },
    render: function () {
        var self = this;
        var claimsKey = "claims";
        if (typeof $.cookie(claimsKey) === "undefined") $.cookie(claimsKey, "notauth");
        if ($.cookie(claimsKey).indexOf("Admin") !== -1) {
            return (
            <div>
    {this.state.founded.map(function (user) {
        return (<div id="TableOfSerach">
<div className="row jumbotron">
    <div className="col-sm-3">
        <img style={{ verticalAlign: "middle" }} src={user.PathToTmbOfPhoto} alt="user photo"/>
            </div>
            <div className="col-sm-4">
                    <form onSubmit={self.SendInfoToServer}>
        <label htmlFor="EmailEdit">Enter Email</label>
        <input type="text" placeholder={user.Email}
               id="EmailEdit" className="form-control" value={user.Email} />
        <label htmlFor="FirstNameEdit">Enter First Name</label>
        <input type="text" placeholder={user.FirstName}
               id="FirstNameEdit" className="form-control" />

        <label htmlFor="MiddleNameEdit">Enter Middle Name</label>
        <input type="text" placeholder={user.MiddleName}
               id="MiddleNameEdit" className="form-control" />

        <label htmlFor="LastNameEdit">Enter Last Name</label>
        <input type="text" placeholder={user.LastName}
               id="LastNameEdit" className="form-control" />

        <label htmlFor="PhonePrivateEdit">Enter your private phone</label>
        <input type="text" placeholder={user.PhonePrivate}
               id="PhonePrivateEdit" className="form-control" />

        <label htmlFor="PhoneWorkEdit">Enter your work phone</label>
        <input type="text" placeholder={user.PhoneWork}
               id="PhoneWorkEdit" className="form-control" />

        <label htmlFor="NotesEdit">Enter your note</label>
        <input type="text" placeholder={user.Notes}
               id="NotesEdit" className="form-control" />
        <label htmlFor="NotesEdit">Enter boss note</label>
        <input type="text" placeholder={user.NotesForBoss}
               id="NotesForBossEdit" className="form-control" />

       <input type="date" placeholder={user.HolidayTimeStart}
              id="HolidayTimeStartEdit" className="form-control" />
        <input type="date" value={user.HolidayTimeEnd}
               id="HolidayTimeEndEdit" className="form-control" />

<input className="datetimepicker" onClick={self.dataPickerInit} />

        <button className="btn btn-success" type="submit">Submit</button>
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
    {this.state.founded.map(function (user) {
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