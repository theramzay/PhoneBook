module.exports = React.createClass({
    getInitialState: function () {
        return {};

    },
    componentDidMount: function () {
        var url = this.props.url;
        var tokenKey = "tokenInfo";
        var token = $.cookie(tokenKey);
        $("#dropForm").dropzone({
            url: url, headers: {
                'Authorization': "bearer " + token
            }
        }).on("success",()=> {
            React.unmountComponentAtNode(document.getElementById('Settings')); //TODO: Make this WORK!
            ReactDOM.render(
<Info changed={true} url="api/Account/AllUserInfo"/>,
            document.getElementById("content")
        );
    });
},
render: function () {
    return (
        <div>
<form id="dropForm" onSubmit={this.SendToServer} className="dropzone">
  <div className="fallback">
    <input name="file" type="file" multiple={true} />
  </div>
</form>

</div>
        );
}
});