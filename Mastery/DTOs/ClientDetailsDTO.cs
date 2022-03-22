namespace Mastery.DTOs
{
    public class ClientDetailsDTO
    {
        public int CourseClientId { get; set; }
        public int CourseId { get; set; }
        public string ClientId { get; set; } = null!;
        public string LastYearIncomeRange { get; set; } = null!;
        public string JobTitle { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string CourseName { get; set; } = null!;
    }
}
