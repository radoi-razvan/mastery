namespace Mastery.Models
{
    public class Mentor : ApplicationUser
    {
        public List<Course>? Courses { get; set; }
    }
}
