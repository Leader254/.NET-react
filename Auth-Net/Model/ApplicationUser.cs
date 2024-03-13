using Microsoft.AspNetCore.Identity;

namespace Auth_Net.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string PhoneNumber {  get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public DateTime BirthDay { get; set; } = DateTime.MinValue;
    }
}
