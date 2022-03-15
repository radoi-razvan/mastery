using Mastery.Models;
using System.ComponentModel.DataAnnotations;

namespace Mastery.DTOs
{
    public class WeekDTO
    {
        public int WeekId { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public string VideoLink { get; set; } = null!;
        [Required]
        public string HomeworkTitle { get; set; } = null!;
        [Required]
        public string ConsultationCallLink { get; set; } = null!;
    }
}
