using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class Testimonial
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public Course? Course { get; set; }
    }
}
