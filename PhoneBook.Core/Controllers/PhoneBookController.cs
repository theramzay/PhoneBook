using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using PhoneBook.Core.Models;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Core.Controllers
{
    [RequireHttps]
    [System.Web.Http.RoutePrefix("api/PhoneBook")]
    public class PhoneBookController : ApiController
    {
        private readonly IMainUserManager _mainUserManager;

        public PhoneBookController(IMainUserManager mainUserManager)
        {
            _mainUserManager = mainUserManager;
        }

        [System.Web.Http.Route("Create")]
        [System.Web.Http.HttpPost]
        public async Task<IHttpActionResult> Create(AccountRegistrationModel newUser)
        {
            if (!ModelState.IsValid) return BadRequest("Something frong with registration!");
            var response = await _mainUserManager.CreateAsync(new User {Email = newUser.Email,Password = newUser.Password});
            return Ok(new {Msg = response.Errors, IsOk = response.Succeeded});
        }

        [System.Web.Http.Route("AddClaim")]
        [System.Web.Http.HttpPost]
        public async Task<IHttpActionResult> AddClaim(ClaimAddModel c)
        {
            if (!ModelState.IsValid) return BadRequest("Something frong with adding claim to user!");
            var response = await _mainUserManager.AddClaimToUserAsync(c.Email, c.Name);
            return Ok(new {Msg = response.Errors, IsOk = response.Succeeded});
        }

        [System.Web.Http.Route("All")]
        [System.Web.Http.HttpGet]
        public async Task<IHttpActionResult> AllUsers()
        {
            var response = await _mainUserManager.ShowAsync();
            return Ok(response);
        }

        [System.Web.Http.Route("ClaimTest")]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Authorize(Roles = "user")]
        //[ClaimAuth(Role = "user")]
        public IHttpActionResult ClaimTest()
        {
            return Ok(new {Message = "Hello!", lol = "yep"});
        }

        [System.Web.Http.Route("ClaimTestModer")]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Authorize(Roles = "Moder")]
        //[ClaimAuth(Role = "user")]
        public IHttpActionResult ClaimTestModer()
        {
            return Ok(new {Message = "Hello!", lol = "yep"});
        }
    }
}