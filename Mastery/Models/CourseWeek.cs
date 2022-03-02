using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class CourseWeek
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseWeekId { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; }
        public int WeekId { get; set; }
        public Week? Week { get; set; }
    }
}
