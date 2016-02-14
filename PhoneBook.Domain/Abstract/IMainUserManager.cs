using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Abstract
{
    public interface IMainUserManager
    {
        Task<IdentityResult> ChangePasswordAsync(string email, string currentPassword, string newPassword);
        Task<IdentityResult> CreateAsync(string email, string password, bool isConfirmed = false);
        Task<List<User>> ShowAsync();
    }
}