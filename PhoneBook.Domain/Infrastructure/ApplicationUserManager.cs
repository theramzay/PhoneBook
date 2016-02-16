using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Owin.Security.AesDataProtectorProvider;
using Owin.Security.AesDataProtectorProvider.CrypticProviders;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Infrastructure
{
    public class ApplicationUserManager : UserManager<User>
    {
        public ApplicationUserManager(IUserStore<User> store)
            : base(store)
        {
            // Configure validation logic for usernames.
            UserValidator = new UserValidator<User>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords.
            PasswordValidator = new PasswordValidator
            {
                RequiredLength = 8,
                RequireLowercase = true,
                RequireUppercase = true,
                RequireDigit = true
            };

            // Configure user lockout defaults
            UserLockoutEnabledByDefault = false;
            DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            MaxFailedAccessAttemptsBeforeLockout = 5;
            var dataProtectionProvider = new AesDataProtectorProvider(new Sha512CspFactory(), new Sha256CspFactory(),
                new AesCspFactory());
            UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
        }
    }
}