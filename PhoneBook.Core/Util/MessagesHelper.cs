using System.Web.Helpers;
using PhoneBook.Core.Models;

namespace PhoneBook.Core.Util
{
    public static class MessagesHelper
    {
        public static string Create(string color, string message, string type, string from)
        {
            var msg = new ChatMessages {Color = color, From = from, Type = type, Message = message};
            var jsonMsg = Json.Encode(msg);
            return jsonMsg;
        }
    }
}