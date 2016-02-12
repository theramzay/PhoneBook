using System;
using Microsoft.AspNet.Identity.EntityFramework;

namespace PhoneBook.Domain.Entities
{
    internal class User : IdentityUser
    {
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string PathToPhoto { get; set; }
        public string PathToTmbOfPhoto { get; set; }
        public string PositionInCompany { get; set; }
        public string PhonePrivate { get; set; }
        public string PhoneWork { get; set; }
        public string Notes { get; set; }
        public DateTime HolidayTime { get; set; }
        public bool BusinessTrip { get; set; }
        public string Boss { get; set; } //Temp implementation TODO: create relation
        public string NotesForBoss { get; set; }
    }
}