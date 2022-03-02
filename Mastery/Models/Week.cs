using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class Week
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WeekId { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public string? VideoLink { get; set; }
        [Required]
        public string? HomeworkTitle { get; set; }
        [Required]
        public string? ConsultationCallLink { get; set; }
        public List<CourseWeek>? CourseWeeks { get; set; }
    }
}
