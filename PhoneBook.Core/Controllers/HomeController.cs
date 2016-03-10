using System.Web.Mvc;

namespace PhoneBook.Core.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Phone Book";

            return View();
        }
    }
}