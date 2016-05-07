using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using PhoneBook.Core.Models;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Core.Controllers
{
    public class ChatHub : Hub
    {
        static List<ChatModels> Users = new List<ChatModels>();

        // Отправка сообщений
        public void Send(string name, string message,string color)
        {
            Clients.All.addMessage(name, message,color);
        }

        // Подключение нового пользователя
        public void Connect(string userName)
        {
            var id = Context.ConnectionId;


            if (!Users.Any(x => x.ConnectionId == id))
            {
                var random = new Random();
                var color = $"#{random.Next(0x1000000):X6}";
                Users.Add(new ChatModels { ConnectionId = id, Name = userName, Color = color});

                // Посылаем сообщение текущему пользователю
                Clients.Caller.onConnected(id, userName, Users,color);

                // Посылаем сообщение всем пользователям, кроме текущего
                Clients.AllExcept(id).onNewUserConnected(id, userName,color);
            }
        }

        // Отключение пользователя
        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            var item = Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            if (item != null)
            {
                Users.Remove(item);
                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.Name);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}