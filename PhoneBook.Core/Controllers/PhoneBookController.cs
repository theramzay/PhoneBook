using System.Web.Http;
using PhoneBook.Core.Models;
using PhoneBook.Domain.Abstract;

namespace PhoneBook.Core.Controllers
{
    public class PhoneBookController : ApiController
    {
        private readonly IMainUserManager _mainUserManager;

        public PhoneBookController(IMainUserManager mainUserManager)
        {
            _mainUserManager = mainUserManager;
        }

        [HttpPost]
        public IHttpActionResult Create(AccountRegistrationModel newUser)
        {
            if (!ModelState.IsValid) return BadRequest("Something frong with registration!");
            _mainUserManager.CreateAsync(newUser.Email, newUser.Password);
            return Ok("Registration complete");
        }
    }
}