var Info = require('./Info');
module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    SendToServer: function(es) {
        es.preventDefault();
        var data = {
            FirstName: $("#FirstNameEdit").val(),
            MiddleName: $("#MiddleNameEdit").val(),
            LastName: $("#LastNameEdit").val(),
            PhonePrivate: $("#PhonePrivateEdit").val(),
            PhoneWork: $("#PhoneWorkEdit").val(),
            Notes: $("#NotesEdit").val()
        };
        $.ajax({
            headers: {
                'Authorization': "bearer " + Cookie.load('tokenInfo')
            },
            type: "POST",
            url: this.props.url,
            data: data
        }).success(function () {
            ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
            ReactDOM.render(
            <Info changed={true} url="api/Account/AllUserInfo"/>,
            document.getElementById("content")
            );
        }).fail(function(ee) {
        alert(ee);
    });
},
render: function() {
    return (
        <div>
<form onSubmit={this.SendToServer}>
    <label htmlFor="FirstNameEdit">Enter First Name</label>
    <input type="text" placeholder={this.props.FirstName}
id="FirstNameEdit" className="form-control"/>

<label htmlFor="MiddleNameEdit">Enter Middle Name</label>
<input type="text" placeholder={this.props.MiddleName}
id="MiddleNameEdit" className="form-control"/>

<label htmlFor="LastNameEdit">Enter Last Name</label>
<input type="text" placeholder={this.props.LastName}
id="LastNameEdit" className="form-control"/>

<label htmlFor="PhonePrivateEdit">Enter your private phone</label>
<input type="text" placeholder={this.props.PhonePrivate}
id="PhonePrivateEdit" className="form-control"/>

<label htmlFor="PhoneWorkEdit">Enter your work phone</label>
<input type="text" placeholder={this.props.PhoneWork}
id="PhoneWorkEdit" className="form-control"/>

<label htmlFor="NotesEdit">Enter your note</label>
<input type="text" placeholder={this.props.Notes}
id="NotesEdit" className="form-control"/>
<button className="btn btn-success" type="submit">Submit</button>
</form>
</div>
        );
}
});