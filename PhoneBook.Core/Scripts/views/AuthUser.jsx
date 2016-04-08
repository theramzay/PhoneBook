module.exports = React.createClass({
    getInitialState: function() {
        return {
            Email: "",
            Password: ""
        };
    },
    submitAuth: function (e) {
        e.preventDefault();

        var data = {
            grant_type: "password",
            username: this.refs.EmailAuth.value,
            Password: this.refs.PasswordAuth.value
        };

        $.ajax({
            type: "POST",
            url: this.props.url,
            data: data
        }).success((data)=> {
            $("#whoLog").text(data.userName);
            $("#authBtn").addClass("hidden");
            $("#regBtn").addClass("hidden");
            $("#hello").removeClass("hidden");
            $("#authorizationModal").modal("hide");
            $.cookie("tokenInfo", data.access_token);
            $.cookie("userName", data.userName);
            this.getClaims();
        }).fail((err)=> {
            alert("Error under login");
            console.log("error", err);
        });


    },
    getClaims: function() {
        $.ajax({
            headers: {
                'Authorization': "bearer " + $.cookie("tokenInfo"),
                'Content-Type': "application/json"
            },
            type: "GET",
            url: "api/Account/AllUserInfo"
        }).success((data)=> {
            var strOfCookies = data.Claims.reduce((x, y) => x + ";" + y.ClaimValue, "");
            $.cookie("claims", strOfCookies);
        }).fail(()=> { console.log("fuck"); });
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
                <input placeholder="email" required={true} className="form-control" ref="EmailAuth" type="email" name="EmailAuth" label="Email:"/><br/><br/>
                <label>Enter password</label><br/>
                <input placeholder="password" required={true} title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$" className="form-control" ref="PasswordAuth" type="password" name="PasswordAuth" label="Password:"/><br/><br/>
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