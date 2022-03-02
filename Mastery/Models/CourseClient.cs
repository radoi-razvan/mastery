using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mastery.Models
{
    public class CourseClient
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseClientId { get; set; }
        public int CourseId { get; set; }
        public Course? Course { get; set; }
        public string? ClientId { get; set; }
        public Client? Client { get; set; }
        [Required]
        public string? LastYearIncomeRange { get; set; }
        [Required]
        public string? JobTitle { get; set; }
    }
}
