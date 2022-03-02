using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public List<Testimonial>? Testimonials { get; set; }
        public List<CourseWeek>? CourseWeeks { get; set; }
        public List<CourseClient>? CourseClients { get; set; }
    }
}
