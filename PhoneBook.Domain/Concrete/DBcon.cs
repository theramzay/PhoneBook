using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Domain.Concrete
{
    class DBcon : IdentityDbContext<User>
    {
        public DBcon():base("DBcon", throwIfV1Schema:false)
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
