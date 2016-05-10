using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Concrete
{
    public class PhoneBookContext : IdentityDbContext<User>, IRepository
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