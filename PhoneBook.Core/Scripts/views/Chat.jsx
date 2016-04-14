require('signalr-amd');
var $ = require('jquery');
require('../hubs.js');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            Color: "",
            Chat: $.connection.chatHub
    };
    },
    componentDidMount: function () {
        //
        //this.setState({
        //    Chat: {
        //        client: {
        //            addMessage: {
        //                function(name, message, color) {
        //    var text = '<p class="jumbotron"><b>' + `<span style="color:${color};">` + htmlEncode(name) + '<span />' + '</b>: ' + htmlEncode(message) + '</p>';
        //    $('#chatroom').append(text);
        //                }
        //            }
        //        }
        //    }
        //});
        //console.log(this.state.Chat.client);
        var chat = $.connection.chatHub;
        chat.client.addMessage = function (name, message, color) {
            // Добавление сообщений на веб-страницу
            var text = '<p class="jumbotron"><b>' + `<span style="color:${color};">` + htmlEncode(name) + '<span />' + '</b>: ' + htmlEncode(message) + '</p>';
            $('#chatroom').append(text);
        };

            // Ссылка на автоматически-сгенерированный прокси хаба
            
            // Объявление функции, которая хаб вызывает при получении сообщений


            // Функция, вызываемая при подключении нового пользователя
            chat.client.onConnected =  (id, userName, allUsers,color) => {
                // установка в скрытых полях имени и id текущего пользователя
                $('#hdId').val(id);
                $('#username').val(userName);
                this.setState({ Color: color });
                $('#header').html('<h3>Hello, ' + '<span id="username">' + userName + '<span/>' + '</h3>');
                $('#username').css("color", color);

                // Добавление всех пользователей
                for (var i = 0; i < allUsers.length; i++) {

                    AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
                }
            }

            // Добавляем нового пользователя
            chat.client.onNewUserConnected =  (id, name,color) => {

                AddUser(id, name,color);
            }

            // Удаляем пользователя
            chat.client.onUserDisconnected = (id, userName) => {

                $('#' + id).remove();
            }

            // Открываем соединение
            $.connection.hub.start().done(()=> {

                $('#chatForm').submit(()=> {
                    // Вызываем у хаба метод Send
                    chat.server.send($.cookie("userName"), $('#message').val(), this.state.Color);
                    $('#message').val('');
                });
                chat.server.connect($.cookie("userName"));
            });

        // Кодирование тегов
        function htmlEncode(value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }
        //Добавление нового пользователя
        function AddUser(id, name) {

            var userId = $('#hdId').val();

            if (userId != id) {
                $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
            }
        }
        //

    },
    render: function() {
        return (
<div>
    <h2>Chat room</h2>
    <div className="main">
        <div id="chatBody">
            <div id="header"></div>
            <form id="chatForm">
                <input placeholder="enter message" type="text" id="message" className="form-control" />
                <input type="submit" id="sendmessage" value="Send" className="btn btn-success" />
            </form>
            <div id="chatroom"></div>

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