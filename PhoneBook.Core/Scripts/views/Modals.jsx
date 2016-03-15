var AddUser = React.createClass({
    getInitialState: function() {
        return {
            Email: "",
            Password: "",
            ConfirmPassword: ""
        };
    },
    submit: function(e) {
        e.preventDefault();
        var self = this;

        console.log(this.state);
        if ($("#Password").val() == $("#ConfirmPassword").val()) {
            var data = {
                Email: $("#Email").val(),
                Password: $("#Password").val(),
                ConfirmPassword: $("#ConfirmPassword").val()
            };

            // Submit form via jQuery/AJAX
            $.ajax({
                type: "POST",
                url: this.props.url,
                data: data
            })
                .done(function () {
                    self.clearForm();
                    $("#registrationModal").modal("hide");
                })
                .fail(function () {
                    console.log("failed to register");
                });
        } else {
            alert("Password are not equivalented");
        }
    },
    clearForm: function() {
        this.setState({
            Email: "",
            Password: "",
            ConfirmPassword: ""
        });
    },
    checkFirst: function() {
        var pass = $("#Password");
        var repass = $("#ConfirmPassword");
        pass.setCustomValidity(pass.validity.patternMismatch ? pass.title : '');
        if (pass.checkValidity()) repass.pattern = pass.value;
    },
    checkSecond: function () {
        var repass = $("#ConfirmPassword");
        repass.setCustomValidity(repass.validity.patternMismatch ? repass.title : '');
    },
    render: function() {
        return (
            <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Registration</h4>
        </div>
        <div className="modal-body">
            <form onSubmit={this.submit}>
                <fieldset>
                    <legend>Registration form</legend>
                <input placeholder="Email" required={true}
                       className="form-control" id="Email"
                       type="email" name="Email" label="Email:" />
                <label>Enter password</label><br />
                <input placeholder="Password"
                       onChange={this.checkFirst}
                       required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                       pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                       className="form-control" id="Password" type="password" name="Password" label="Password:" />
                <label>Re-enter password</label><br />
                <input placeholder="Confirm password"
                       onChange={this.checkSecond}
                       required={true} title="Please enter the same Password as above"
                       pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" className="form-control"
                       id="ConfirmPassword" type="password" name="ConfirmPassword" label="ConfirmPassword:" />
                <button className="btn btn-success" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
        );
    }
});


var AuthUser = React.createClass({
    getInitialState: function() {
        return {
            Email: "",
            Password: ""
        };
    },
    submitAuth: function(e) {
        var self;

        e.preventDefault();
        self = this;

        console.log(this.state);

        var tokenKey = "tokenInfo";
        var userNameKey = "userName";

        var data = {
            grant_type: "password",
            username: $("#EmailAuth").val(),
            Password: $("#PasswordAuth").val()
        };

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function(data) {
            console.log(data);
            $("#whoLog").text(data.userName);
            $("#authBtn").addClass("hidden");
            $("#regBtn").addClass("hidden");
            $("#hello").removeClass("hidden");
            $("#authorizationModal").modal("hide");
            // сохраняем в хранилище sessionStorage токен доступа
            sessionStorage.setItem(tokenKey, data.access_token);
            sessionStorage.setItem(userNameKey, data.userName);
            console.log(data.access_token);
        }).fail(function(data) {
            alert("Error under login");
        });

    },
    clearForm: function() {
        this.setState({
            Email: "",
            Password: ""
        });
    },
    render: function() {
        return (
            <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Authorization</h4>
        </div>
        <div className="modal-body">
            <form onSubmit={this.submitAuth}>
                <label>Enter email</label><br/>
                <input placeholder="email" required={true}
                        className="form-control" id="EmailAuth" type="email" name="EmailAuth" label="Email:"/><br/><br/>
                <label>Enter password</label><br/>
                <input placeholder="password" required={true}
                        title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                        className="form-control" id="PasswordAuth" type="password" name="PasswordAuth" label="Password:"/><br/><br/>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
        );
    }
});


ReactDOM.render(
    <AddUser url="api/Account/Register"/>,
    document.getElementById("registrationModal")
);

ReactDOM.render(
    <AuthUser url="/Token"/>,
    document.getElementById("authorizationModal")
);