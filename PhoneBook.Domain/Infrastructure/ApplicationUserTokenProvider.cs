using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Infrastructure
{
    public class ApplicationUserTokenProvider<TUser,Tstring> : IUserTokenProvider<User, string>
    {
        public Task<string> GenerateAsync(string purpose, UserManager<User, string> manager, User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ValidateAsync(string purpose, string token, UserManager<User, string> manager, User user)
        {
            throw new NotImplementedException();
        }

        public Task NotifyAsync(string token, UserManager<User, string> manager, User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsValidProviderForUserAsync(UserManager<User, string> manager, User user)
        {
            throw new NotImplementedException();
        }
    }
}