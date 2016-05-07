namespace PhoneBook.Core.Models
{
    public class ChatModels
    {
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }

    public class ChatMessages
    {
        public string Color { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public string From { get; set; }
    }
}