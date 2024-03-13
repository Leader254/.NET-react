using System.ComponentModel.DataAnnotations;

namespace Auth_Net.Model
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }
    }

}
