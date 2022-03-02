namespace Mastery.Models
{
    public class Client : ApplicationUser
    {
        public List<CourseClient>? CoursesClient { get; set; }
    }
}
