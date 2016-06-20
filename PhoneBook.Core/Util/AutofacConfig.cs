using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Owin;
using PhoneBook.Core.Controllers;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;
using PhoneBook.Infrastructure.Concrete;
using PhoneBook.Infrastructure.Infrastructure;

namespace PhoneBook.Core.Util
{
    public class AutofacConfig
    {
        public static void Configure(IAppBuilder app)
        {
            //Autofac configuration
            var builder = new ContainerBuilder();
            // Get your HttpConfiguration.
            var config = new HttpConfiguration();

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<AccountController>().InstancePerRequest();
            builder.RegisterType<PhoneBookContext>().InstancePerRequest();

            //dependenses resolving
            builder.RegisterType<MainUserManager>().As<IMainUserManager>().InstancePerRequest();
            builder.Register(c => new UserStore<User>(c.Resolve<PhoneBookContext>())).AsImplementedInterfaces().InstancePerRequest();


            builder.RegisterType<ApplicationUserManager>().AsSelf();

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            app.UseAutofacWebApi(config);
            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);
        }

        public static void Configure()
        {
            //Autofac configuration
            var builder = new ContainerBuilder();
            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<AccountController>().InstancePerRequest();

            //dependenses resolving
            builder.RegisterType<MainUserManager>().As<IMainUserManager>().InstancePerRequest();
            builder.RegisterType<UserStore<User>>().As<IUserStore<User>>().WithParameter("context", new PhoneBookContext());


            builder.RegisterType<ApplicationUserManager>().AsSelf();

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}