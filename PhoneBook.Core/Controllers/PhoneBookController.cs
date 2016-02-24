using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using PhoneBook.Core.Models;
using PhoneBook.Domain.Abstract;
using PhoneBook.Domain.Entities;

namespace PhoneBook.Core.Controllers
{
    [RoutePrefix("api/PhoneBook")]
    public class PhoneBookController : ApiController
    {
        private readonly IMainUserManager _mainUserManager;

        public PhoneBookController(IMainUserManager mainUserManager)
        {
            _mainUserManager = mainUserManager;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IHttpActionResult> Create(AccountRegistrationModel newUser)
        {
            if (!ModelState.IsValid) return BadRequest("Something frong with registration!");
            var response =
                await _mainUserManager.CreateAsync(new User {Email = newUser.Email, Password = newUser.Password});
            return Ok(new {Msg = response.Errors, IsOk = response.Succeeded});
        }

        [Route("AddClaim")]
        [HttpPost]
        public async Task<IHttpActionResult> AddClaim(ClaimAddModel c)
        {
            if (!ModelState.IsValid) return BadRequest("Something frong with adding claim to user!");
            var response = await _mainUserManager.AddClaimToUserAsync(c.Email, c.Name);
            return Ok(new {Msg = response.Errors, IsOk = response.Succeeded});
        }

        [Route("All")]
        [HttpGet]
        public async Task<IHttpActionResult> AllUsers()
        {
            var response = await _mainUserManager.ShowAsync();
            return Ok(response);
        }

        [Route("ClaimTest")]
        [HttpGet]
        [Authorize(Roles = "user")]
        //[ClaimAuth(Role = "user")]
        public IHttpActionResult ClaimTest()
        {
            return Ok(new {Message = "Hello!", lol = "yep"});
        }

        [Route("ClaimTestModer")]
        [HttpGet]
        [Authorize(Roles = "Moder")]
        //[ClaimAuth(Role = "user")]
        public IHttpActionResult ClaimTestModer()
        {
            return Ok(new {Message = "Hello!", lol = "yep"});
        }
    }
}