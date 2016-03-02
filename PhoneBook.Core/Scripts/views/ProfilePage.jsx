var ChangePassword = React.createClass({
    getInitialState: function() {
        return {};
    },
    SendToServer: function(es) {
        es.preventDefault();
        var tokenKey = "tokenInfo";
        var token = sessionStorage.getItem(tokenKey);
        var data = {
            OldPassword: $("#OldPassword").val(),
            NewPassword: $("#NewPassword").val(),
            ConfirmPassword: $("#ConfPassword").val()
        };
        //console.log(data);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function(data) {
            console.log(data);
        }).fail(function(ee) {
            alert(ee);
        });
    },
    componentDidMount: function() {
        console.log(this.props.url);
    },
    render: function() {
        return (
            <div>
    <form onSubmit={this.SendToServer}>
        <input type="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" placeholder="Old Password" id="OldPassword" className="form-control"/>
        <input type="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" placeholder="New Password" id="NewPassword" className="form-control"/>
        <input type="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" placeholder="Confirm Password" id="ConfPassword" className="form-control"/>
        <button className="btn btn-success" type="submit">Submit</button>
    </form>
</div>
        );
    }
});

var EditInfo = React.createClass({
    getInitialState: function() {
        return {};
    },
    SendToServer: function(es) {
        es.preventDefault();
        var tokenKey = "tokenInfo";
        var token = sessionStorage.getItem(tokenKey);
        var data = {
            FirstName: $("#FirstNameEdit").val(),
            MiddleName: $("#MiddleNameEdit").val(),
            LastName: $("#LastNameEdit").val(),
            PhonePrivate: $("#PhonePrivateEdit").val(),
            PhoneWork: $("#PhoneWorkEdit").val(),
            Notes: $("#NotesEdit").val()
        };
        //console.log(data);
        $.ajax({
            headers: {
                'Authorization': "bearer " + token
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function(data) {
            console.log(data);
        }).fail(function(ee) {
            alert(ee);
        });
    },
    componentDidMount: function() {
        console.log(this.props.url);
    },
    render: function() {
        return (
            <div>
    <form onSubmit={this.SendToServer}>
        <label htmlFor="FirstNameEdit">Enter First Name</label>
        <input type="text" placeholder={this.props.FirstName} id="FirstNameEdit" className="form-control"/>

        <label htmlFor="MiddleNameEdit">Enter Middle Name</label>
        <input type="text" placeholder={this.props.MiddleName} id="MiddleNameEdit" className="form-control"/>

        <label htmlFor="LastNameEdit">Enter Last Name</label>
        <input type="text" placeholder={this.props.LastName} id="LastNameEdit" className="form-control"/>

        <label htmlFor="PhonePrivateEdit">Enter your private phone</label>
        <input type="text" placeholder={this.props.PhonePrivate} id="PhonePrivateEdit" className="form-control"/>

        <label htmlFor="PhoneWorkEdit">Enter your work phone</label>
        <input type="text" placeholder={this.props.PhoneWork} id="PhoneWorkEdit" className="form-control"/>

        <label htmlFor="NotesEdit">Enter your note</label>
        <input type="text" placeholder={this.props.Notes} id="NotesEdit" className="form-control"/>
        <button className="btn btn-success" type="submit">Submit</button>
    </form>
</div>
        );
    }
});


var Info = React.createClass({
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
            url: this.props.url
        }).success(function(data) {
            self.setState({
                FirstName: data.FirstName,
                MiddleName: data.MiddleName,
                LastName: data.LastName,
                PositionInCompany: data.PositionInCompany,
                PhonePrivate: data.PhonePrivate,
                PhoneWork: data.PhoneWork,
                Notes: data.Notes,
                Boss: data.Boss
            });
        }).fail(function() {
            alert("Error");
        });
    },
    getInitialState: function() {
        return {
            data: [],
            cP: false,
            cI: false
        };
    },
    componentDidMount: function() {
        this.loadFromServer();
        console.log(this.props.url);
    },
    ChangePassword: function () {
        if (this.state.c) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            console.log(this.state.c);
            this.state.c = false;
        } else {
            ReactDOM.render(
       <ChangePassword url="api/Account/ChangePassword"/>,
       document.getElementById("Settings")
        );
            console.log(this.state.c);
            this.state.c = true;
        }
    },
    EditInfo: function () {
        if (this.state.c) {
            React.unmountComponentAtNode(document.getElementById('Settings'));
            console.log(this.state.c);
            this.state.c = false;
        } else {
            ReactDOM.render(
    <EditInfo FirstName={this.state.FirstName}
        MiddleName={this.state.MiddleName} 
        LastName={this.state.LastName} 
        PositionInCompany={this.state.PositionInCompany} 
        PhonePrivate={this.state.PhonePrivate} 
        PhoneWork={this.state.PhoneWork} 
        Notes={this.state.Notes} 
        url="api/Account/UpdateAllUserInfo"/>,
document.getElementById("Settings")
        );
            console.log(this.state.c);
            this.state.c = true;
        }

    },
    render: function() {
        return (
            <div>
    Info about you: <br/>
    Yours First Name is - {this.state.FirstName} <br/>
    Yours Middle Name is - {this.state.MiddleName} <br/>
    Yours Last Name is - {this.state.LastName} <br/>
    Yours Position in company is - {this.state.PositionInCompany} <br/>
    Yours Private phone is - {this.state.PhonePrivate} <br/>
    Yours Work phone is - {this.state.PhoneWork} <br/>
    Yours Note is - {this.state.Notes} <br/>
    Yours Boss is - {this.state.Boss} <br/>
    Other content under hard development =) <br/>
    <ul>
        <li>
            <a onClick={this.ChangePassword} href="#ChangePassword">Change password</a>
        </li>
        <li>
            <a onClick={this.EditInfo} href="#ChangePassword">Change info</a>
        </li>
    </ul>
    <div id="Settings"></div>
</div>
        );
    }
});