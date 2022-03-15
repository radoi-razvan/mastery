namespace Mastery.DTOs
{
    public class CourseClientDTO
    {
        public int CourseClientId { get; set; }
        public int CourseId { get; set; }
        public string ClientId { get; set; } = null!;
        public string LastYearIncomeRange { get; set; } = null!;
        public string JobTitle { get; set; } = null!;

    }
}
