module.exports = React.createClass({
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
        var claimsKey = "claims";

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
            $.cookie(tokenKey, data.access_token);
            $.cookie(userNameKey, data.userName);
            console.log(data.access_token);
            self.getClaims();
        }).fail(function(data) {
            alert("Error under login");
        });


    },
    getClaims: function () {
        var tokenKey = "tokenInfo";
        var claimsKey = "claims";
        $.ajax({
            headers: {
                'Authorization': "bearer " + $.cookie(tokenKey),
                'Content-Type': "application/json"
            },
            type: "GET",
            url: 'api/Account/AllUserInfo'
        }).success(function(data) {
            var strOfCookies = data.Claims.reduce((x, y) => x + ";" +  y.ClaimValue, "");
            $.cookie(claimsKey, strOfCookies);
            console.log(data.Claims);
        }).fail(function() { console.log("fuck"); });
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