using Mastery.Models;
using System.ComponentModel.DataAnnotations;

namespace Mastery.DTOs
{
    public class TestimonialDTO
    {
        public int TestimonialId { get; set; }
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        public string Comment { get; set; } = null!;
        [Required]
        public int Rating { get; set; }
        public int CourseId { get; set; }
    }
}
