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
        }
    }
}