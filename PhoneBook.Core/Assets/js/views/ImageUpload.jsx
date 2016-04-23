var DropzoneComponent = require('react-dropzone-component');
var Info = require('./Info');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            componentConfig: {

                postUrl: this.props.url
            },
            djsConfig: {
                addRemoveLinks: true,
                headers: {
                    'Authorization': "bearer " + Cookie.load('tokenInfo')
                }
            },
            eventHandlers: {
                complete: () => {
                    ReactDOM.unmountComponentAtNode(document.getElementById('Settings'));
                    ReactDOM.render(
            <Info changed={true} url="api/Account/AllUserInfo"/>,
            document.getElementById("content")
            );
                }
            }
        };
    },
render: function () {
    return (
        <div>
            <DropzoneComponent config={this.state.componentConfig} eventHandlers={this.state.eventHandlers} djsConfig={this.state.djsConfig}/>
</div>
        );
}
});