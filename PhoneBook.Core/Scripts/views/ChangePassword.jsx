module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    SendToServer: function(es) {
        es.preventDefault();
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
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
        }).success(function () {
            React.unmountComponentAtNode(document.getElementById('Settings'));
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
        <input type="password" required={true}
                title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                placeholder="Old Password" id="OldPassword" className="form-control"/>
        <input type="password" required={true}
                title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
                placeholder="New Password" id="NewPassword" className="form-control"/>
        <input type="password" required={true}
title="Password between 8 and 20 characters, including UPPER/lowercase, numbers and symbols"
pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
placeholder="Confirm Password" id="ConfPassword" className="form-control"/>
<button className="btn btn-success" type="submit">Submit</button>
</form>
</div>
        );
}
});