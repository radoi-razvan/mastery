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
        public string VideoLink { get; set; } = null!;
        [Required]
        public string HomeworkTitle { get; set; } = null!;
        [Required]
        public string ConsultationCallLink { get; set; } = null!;
        public List<CourseWeek>? CourseWeeks { get; set; }
    }
}
