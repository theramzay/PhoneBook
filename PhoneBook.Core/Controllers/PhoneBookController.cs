using System.Threading.Tasks;
using System.Web.Http;
using PhoneBook.Core.Models;
using PhoneBook.Domain.Abstract;

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
            var response = await _mainUserManager.CreateAsync(newUser.Email, newUser.Password);
            return Ok(new {Msg = response.Errors, IsOk = response.Succeeded});
        }

        [Route("All")]
        [HttpGet]
        public async Task<IHttpActionResult> AllUsers()
        {
            var response = await _mainUserManager.ShowAsync();
            return Ok(response);
        }
    }
}