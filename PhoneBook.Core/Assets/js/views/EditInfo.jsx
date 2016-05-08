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
      FirstName: this.refs.FirstNameEdit.value,
      MiddleName: this.refs.MiddleNameEdit.value,
      LastName: this.refs.LastNameEdit.value,
      PhonePrivate: this.refs.PhonePrivateEdit.value,
      PhoneWork: this.refs.PhoneWorkEdit.value,
      Notes: this.refs.NotesEdit.value
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
        <Info
          changed={true}
          url="api/Account/AllUserInfo"/>,
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

          <label htmlFor="FirstNameEdit">
            Enter First Name
          </label>

          <input
            type="text"
            placeholder={this.props.FirstName}
            ref="FirstNameEdit"
            className="form-control"/>


          <label htmlFor="MiddleNameEdit">
            Enter Middle Name
          </label>

          <input
            type="text"
            placeholder={this.props.MiddleName}
            ref="MiddleNameEdit"
            className="form-control"/>


          <label htmlFor="LastNameEdit">
            Enter Last Name
          </label>

          <input
            type="text"
            placeholder={this.props.LastName}
            ref="LastNameEdit"
            className="form-control"/>


          <label htmlFor="PhonePrivateEdit">
            Enter your private phone
          </label>

          <input
            type="text"
            placeholder={this.props.PhonePrivate}
            ref="PhonePrivateEdit"
            className="form-control"/>


          <label htmlFor="PhoneWorkEdit">
            Enter your work phone
          </label>

          <input
            type="text"
            placeholder={this.props.PhoneWork}
            ref="PhoneWorkEdit"
            className="form-control"/>


          <label htmlFor="NotesEdit">
            Enter your note
          </label>

          <input
            type="text"
            placeholder={this.props.Notes}
            ref="NotesEdit"
            className="form-control"/>

          <button className="btn btn-success" type="submit">Submit</button>

        </form>

      </div>
    );
  }
});
