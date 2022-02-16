using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "varchar(30)")]
        public string? FirstName { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string? LastName { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string? AdressTest { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string? TestField { get; set; }

    }
}
