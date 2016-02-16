//using System.Security.Claims;
//using System.Web;
//using System.Web.Http;
//using System.Web.Http.Controllers;

//namespace PhoneBook.Core.Util
//{
//    public class ClaimAuth : AuthorizeAttribute
//    {
//        public string Role { get; set; }

//        protected override bool IsAuthorized(HttpActionContext actionContext)
//        {
//            ClaimsIdentity claimsIdentity;
//            var httpContext = HttpContext.Current;
//            if (!(httpContext.User.Identity is ClaimsIdentity))   TODO: FOR FUTURE, OR MAYBE FOR NEVER =)
//            {
//                return false;
//            }

//            claimsIdentity = httpContext.User.Identity as ClaimsIdentity;
//            var subIdClaims = claimsIdentity.FindFirst("Role");
//            if (subIdClaims == null)
//            {
//                // just extra defense
//                return false;
//            }

//            var userSubId = subIdClaims.Value;

//            if (!Role.Contains(userSubId))
//            {
//                return false;
//            }

//            //Continue with the regular Authorize check
//            return base.IsAuthorized(actionContext);
//        }
//    }
//}