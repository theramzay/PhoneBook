using System.Collections.Generic;
using System.Security.Claims;
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
        Task<IdentityResult> AddClaimToUserAsync(string email, string claimName);
        Task<User> FindAsync(string name, string password);
        Task<ClaimsIdentity> CreateIdentityAsync(User user, string authenticationType);
    }
}