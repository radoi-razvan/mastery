using Mastery.Models;
using System.ComponentModel.DataAnnotations;

namespace Mastery.DTOs
{
    public class CourseDTO
    {
        public int CourseId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Category { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public DateTime StartingDate { get; set; }
        public string? MentorId { get; set; }
        public Mentor? Mentor { get; set; }
    }
}
