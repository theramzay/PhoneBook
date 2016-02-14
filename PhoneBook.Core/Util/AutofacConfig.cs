using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Concrete;
using PhoneBook.Domain.Entities;
using PhoneBook.Domain.Infrastructure;

namespace PhoneBook.Core.Util
{
    public class AutofacConfig
    {
        public static void Configure()
        {
            //Autofac configuration
            var builder = new ContainerBuilder();
            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            // OPTIONAL: Register the Autofac filter provider.
            //builder.RegisterWebApiFilterProvider(config);

            //dependenses resolving
            builder.RegisterType<MainUserManager>().As<IMainUserManager>().InstancePerRequest();
            builder.RegisterType<UserStore<User>>().As<IUserStore<User>>().WithParameter("context", new DBcon());


            builder.RegisterType<ApplicationUserManager>().AsSelf();
            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}