using System.ComponentModel.DataAnnotations;

namespace PhoneBook.Core.Models
{
    public class AccountRegistrationModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

}