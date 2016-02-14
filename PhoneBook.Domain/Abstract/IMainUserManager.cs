using System.Threading.Tasks;

namespace PhoneBook.Domain.Abstract
{
    public interface IMainUserManager
    {
        Task ChangePasswordAsync(string email, string currentPassword, string newPassword);
        Task CreateAsync(string email, string password, bool isConfirmed = false);
    }
}