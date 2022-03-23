namespace Mastery.DTOs
{
    public class CourseDetailsDTO
    {
        public int CourseId { get; set; }
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public decimal Price { get; set; }
        public string Description { get; set; } = null!;
        public DateTime StartingDate { get; set; }
        public string? MentorId { get; set; }
        public string? MentorName { get; set; }
    }
}
