namespace Mastery.DTOs
{
    public class WeekFormDTO
    {
        public int WeekId { get; set; }
        public int Number { get; set; }
        public string VideoLink { get; set; } = null!;
        public string HomeworkTitle { get; set; } = null!;
        public string ConsultationCallLink { get; set; } = null!;
        public IFormFile File { get; set; } = null!;
    }
}
