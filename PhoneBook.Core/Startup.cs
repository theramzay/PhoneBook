using System;
using System.Web.Http;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PhoneBook.Core;
using PhoneBook.Core.Util;

[assembly: OwinStartup(typeof (Startup))]

namespace PhoneBook.Core
{
    public class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            AutofacConfig.Configure(app);


            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            //var httpConfiguration = new HttpConfiguration();

            //// Configure Web API Routes:
            //// - Enable Attribute Mapping
            //// - Enable Default routes at /api.
            //httpConfiguration.MapHttpAttributeRoutes();
            //httpConfiguration.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            //app.UseOAuthAuthorizationServer(new MyOAuthOptions());
            //app.UseJwtBearerAuthentication(new MyJwtOptions());

            // Configure & enable the application for OAuth based flow
            PublicClientId = "self";
            app.UseOAuthBearerTokens(
                OAuthOptions = new OAuthAuthorizationServerOptions
                {
                    TokenEndpointPath = new PathString("/Token"),
                    Provider = new ApplicationOAuthProvider(PublicClientId),
                    AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                    AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                    // In production mode set AllowInsecureHttp = false
                    AllowInsecureHttp = true
                });

            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalBearer);
            app.UseGoogleAuthentication(
                clientId: "746837581939-gimncv6el35gvkhchcqghq92h38j35c7.apps.googleusercontent.com",
                clientSecret: "zikgTnP-l2K4PVAmH4wtiij9");

            //app.UseWebApi(httpConfiguration);
            //ConfigureAuth(app);
        }
    }
}