using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Concrete
{
    public class DBcon : IdentityDbContext<User>, IRepository
    {
        public DBcon() : base("DBcon", true)
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
            
        }

        public static DBcon Create()
        {
            return new DBcon();
        }
    }
}