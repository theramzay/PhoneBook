var Dropzone = require('react-dropzone');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            files: []
        };

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
    onDrop: function (files) {
        this.setState({
            files: files
        });
    },

    onOpenClick: function () {
        this.refs.dropzone.open();
    },
render: function () {
    return (
        <div>
<form id="dropForm" onSubmit={this.SendToServer} className="dropzone">
  <div className="fallback">
    <input name="file" type="file" multiple={true} />
  </div>

    <div>
                <Dropzone ref="dropzone" onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button type="button" onClick={this.onOpenClick}>
                    Open Dropzone
                </button>
        {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                </div> : null}
    </div>
</form>

</div>
        );
}
});