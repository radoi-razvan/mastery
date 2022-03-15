using System.ComponentModel.DataAnnotations;

namespace Mastery.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        [Required]
        public string Role { get; set; } = null!;
        [Required]
        public string Country { get; set; } = null!;
        [Required]
        public string City { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
    }
}
