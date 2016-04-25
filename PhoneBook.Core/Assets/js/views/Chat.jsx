require("signalr-amd");
require("../hubs.js");

module.exports = React.createClass({
    getInitialState: function() {

        return {
            Color: Cookie.load("color"),
            userId: "",
            userName: Cookie.load("userName"),
            text: []
        };
    },
    componentDidMount: function() {
        $.connection.chatHub.client.addMessage = (name, message, color) => {
            var msg = `<p class="jumbotron"><b><span style=color:${color}>${this.htmlEncode(name)}<span /></b> ${this.htmlEncode(message)}</p>`;
            $('#chatroom').append(msg);
        };

        /*Да, я знаю что .append() это совсем ужас, но я 9ть часов потратил что бы завести
        это через реакт.стейт, ни никак, jQuery.signalR упорно запоминает this который
        указывает уже на дохлый объект после первого же перемонтирования.
        Т.Е this._reactInternalInstance == undefined внутри контекста
        $.connection.chatHub.client.addMessage = (name, message, color) => {...};*/

        //var self = this;
        //function f(msg) {
        //    console.log("f func", self);
        //    self.setState({ text: self.state.text.concat(msg) });
        //}
        //$.connection.chatHub.client.addMessage = (name, message, color) => {
        //    var msg = `<p class="jumbotron"><b><span style=color:${color}>${self.htmlEncode(name)}<span /></b> ${self.htmlEncode(message)}</p>`;
        //    f(msg);
        //};
        $.connection.chatHub.client.onConnected = (id, userName, allUsers, color) => {
            this.setState({ Color: color, userId: id, userName: userName });
            Cookie.save("color", color);
            $("#username").css("color", color);

            for (let i = 0; i < allUsers.length; i++) {
                this.AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
            }
        };
        $.connection.chatHub.client.onNewUserConnected = (id, name, color) => { this.AddUser(id, name, color); };
        $.connection.chatHub.client.onUserDisconnected = (id, userName) => { $(`#}${id}`).remove(); };
        $.connection.hub.start().done(() => { $.connection.chatHub.server.connect(this.state.userName); });

        //

    },
    htmlEncode: function(value) {
        const encodedValue = $("<div />").text(value).html();
        return encodedValue;
    },
    AddUser: function(id, name, color) {
        if (this.state.userId != id) {
            $("#chatusers").append(`<p id="${id}"><b>${name}</b></p>`);
        }
    },
    sendMsg: function() {
        $.connection.chatHub.server.send(Cookie.load("userName"), $("#message").val(), this.state.Color);
        this.refs.message.value = "";
    },
    render: function() {
        return (
            <div>
    <h2>Chat room</h2>
    <div className="main">
        <div id="chatBody">
            <div id="header">
                <h3>Hello, <span id="username" style={{ color: this.state.Color }}>{this.state.userName}</span></h3>
            </div>
            <form id="chatForm" onSubmit={this.sendMsg}>
                <input placeholder="enter message" type="text" id="message" ref="message" className="form-control"/>
                <input type="submit" id="sendmessage" value="Send" className="btn btn-success"/>
            </form>
            <div id="chatroom" dangerouslySetInnerHTML={{ __html: this.state.text }}></div>

            <div id="chatusers">
                <p>
                    <b>All users</b>
                </p>
            </div>
        </div>
        <input id="hdId" type="hidden"/>
        <input id="username" type="hidden"/>
    </div>
</div>
        );
    }
});