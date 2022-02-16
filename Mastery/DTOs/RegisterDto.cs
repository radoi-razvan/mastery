using System.ComponentModel.DataAnnotations;

namespace Mastery.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? AddressTest { get; set; }
        [Required]
        public string? TestField { get; set; }
        [Required]
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Role { get; set; }
    }
}
