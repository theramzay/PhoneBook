using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.Web.WebSockets;
using PhoneBook.Core.Models;
using PhoneBook.Core.Util;

namespace PhoneBook.Core.Controllers
{
    [RoutePrefix("api/Chat")]
    public class ChatController : ApiController
    {
        public HttpResponseMessage Get(string name)
        {
            HttpContext.Current.AcceptWebSocketRequest(
                new ChatSocketHandler(name));
            return new HttpResponseMessage(
                HttpStatusCode.SwitchingProtocols);
        }

        private class ChatSocketHandler : WebSocketHandler
        {
            private static readonly WebSocketCollection Sockets =
                new WebSocketCollection();

            private readonly ChatModels _user = new ChatModels();

            public ChatSocketHandler(string name)
            {
                var random = new Random();
                var color = $"#{random.Next(0x1000000):X6}";
                _user.Color = color;
                _user.Name = name;
            }

            public override void OnOpen()
            {
                Sockets.Add(this);
                Sockets.Broadcast(MessagesHelper.Create(color: _user.Color, message: "joined.", type: "joined", from: _user.Name));
                Send(MessagesHelper.Create(color: _user.Color, message: "Welcome", type: "welcome", from: _user.Name));
            }

            public override void OnMessage(string message) => Sockets.Broadcast(MessagesHelper.Create(color: _user.Color, message: message, type: "standard", from: _user.Name));

            public override void OnClose()
            {
                Sockets.Remove(this);
                Sockets.Broadcast(MessagesHelper.Create(color: _user.Color, message: "left.", type: "logout", from: _user.Name));
            }
        }
    }
}