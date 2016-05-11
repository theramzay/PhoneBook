using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Abstract;

namespace PhoneBook.Domain.Entities
{
    public class User : IdentityUser
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
        public DateTime HolidayTimeStart { get; set; }
        public DateTime HolidayTimeEnd { get; set; }
        public bool BusinessTrip { get; set; }
        public string Boss { get; set; } //Temp implementation TODO: create relation
        public string NotesForBoss { get; set; }
        public DateTime DayOfRegistration { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(IMainUserManager manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}