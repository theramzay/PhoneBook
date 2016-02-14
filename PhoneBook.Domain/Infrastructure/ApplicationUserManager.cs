using System;
using Microsoft.AspNet.Identity;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Infrastructure
{
    public class ApplicationUserManager : UserManager<User>
    {
        private IUserStore<User> _store;
        private IUserTokenProvider<User, string> _userTokenProvider;

        public ApplicationUserManager(IUserStore<User> store, IUserTokenProvider<User, string> userTokenProvider)
            : base(store)
        {
            _store = store;
            _userTokenProvider = userTokenProvider;

            // Configure validation logic for usernames.
            UserValidator = new UserValidator<User>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords.
            PasswordValidator = new PasswordValidator
            {
                RequiredLength = 8
            };

            // Configure user lockout defaults
            UserLockoutEnabledByDefault = true;
            DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            MaxFailedAccessAttemptsBeforeLockout = 5;
            UserTokenProvider = userTokenProvider;

        }
    }
}