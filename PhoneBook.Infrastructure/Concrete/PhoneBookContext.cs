using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Infrastructure.Concrete
{
    public class PhoneBookContext : IdentityDbContext<User>
    {
        public PhoneBookContext() : base("PhoneBookContext", true)
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
            
        }

        public  PhoneBookContext Create()
        {
            return new PhoneBookContext();
        }
    }
}