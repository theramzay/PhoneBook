using System;
using System.Collections.Generic;

namespace PhoneBook.Core.Models
{
    // Models returned by AccountController actions.

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserInfoViewModel
    {
        public string Email { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }
    }

    public class PersonalUserInfoViewModer
    {
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
        public string Boss { get; set; } 
        public string NotesForBoss { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }
}