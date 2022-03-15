using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "varchar(30)")]
        public string FirstName { get; set; } = null!;
        [Column(TypeName = "varchar(30)")]
        public string LastName { get; set; } = null!;
        [Column(TypeName = "varchar(100)")]
        public string Country { get; set; } = null!;
        [Column(TypeName = "varchar(100)")]
        public string City { get; set; } = null!;
    }
}
