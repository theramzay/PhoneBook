using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Concrete
{
    internal class DBcon : IdentityDbContext<User>, IRepository
    {
        public DBcon() : base("DBcon", false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public static DBcon Create()
        {
            return new DBcon();
        }
    }
}