using Microsoft.Owin;
using Owin;
using PhoneBook.Core.App_Start;

[assembly: OwinStartup(typeof (Startup))]

namespace PhoneBook.Core.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
        }
    }
}