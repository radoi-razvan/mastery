using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public List<Testimonial>? Testimonials { get; set; }
        public List<CourseWeek>? CourseWeeks { get; set; }
        public List<CourseClient>? CourseClients { get; set; }
    }
}
