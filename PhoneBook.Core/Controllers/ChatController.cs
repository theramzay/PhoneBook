using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.Web.WebSockets;
using PhoneBook.Core.Models;

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

            ChatUser User = new ChatUser();

            public ChatSocketHandler(string name)
            {
                var random = new Random();
                var color = $"#{random.Next(0x1000000):X6}";
                User.Color = color;
                User.Name = name;
            }

            public override void OnOpen()
            {
                Sockets.Add(this);
                Sockets.Broadcast(
                    $"<h3><i style=color:{User.Color}>{User.Name} joined.</i><h3>");
                Send($"<h3><i style=color:{User.Color}>Welcome {User.Name}.</i><h3>");
            }

            public override void OnMessage(string message)
            {
                Sockets.Broadcast($"<p class=\"jumbotron\"><b><span style=color:{User.Color}>{User.Name}<span /></b> {message}</p>");
            }

            public override void OnClose()
            {
                Sockets.Remove(this);
                Sockets.Broadcast(
                    $"<h3><i style=color:{User.Color}>{User.Name} left.</i><h3>");
            }
        }
    }
}