using Mastery.Models;
using System.ComponentModel.DataAnnotations;

namespace Mastery.DTOs
{
    public class CourseDTO
    {
        public int CourseId { get; set; }
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Category { get; set; } = null!;
        [Required]
        public decimal Price { get; set; } 
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public DateTime StartingDate { get; set; }
        public string MentorId { get; set; } = null!;
        public Mentor? Mentor { get; set; }
    }
}
