using System.Threading.Tasks;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Infrastructure
{
    internal class MainUserManager
    {
        private readonly ApplicationUserManager _applicationUserManager;

        public MainUserManager(ApplicationUserManager applicationUserManager)
        {
            _applicationUserManager = applicationUserManager;
        }

        public Task CreateAsync(string email, string password, bool isConfirmed = false)
        {
            return _applicationUserManager.CreateAsync(new User
            {
                Email = email,
                Password = password,
                EmailConfirmed = isConfirmed
            }, password);
        }

        public Task ChangePasswordAsync(string email, string currentPassword, string newPassword)
        {
            return
                _applicationUserManager.ChangePasswordAsync(
                    _applicationUserManager.FindByEmailAsync(email).Id.ToString(), currentPassword, newPassword);
        }
    }
}