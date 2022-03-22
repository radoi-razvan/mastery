using Mastery.DTOs;

namespace Mastery.Services.Interfaces
{
    public interface IClientService
    {
        Task AddAsync(int courseId, string userId, CourseClientDTO courseClient);
        Task Remove(int courseId, string userId);
        List<object> GetTotalCoursesClients();
        Task <IEnumerable<CourseDTO>> GetAttendedCourses(string clientId);
        Task <IEnumerable<ClientDetailsDTO>> GetCourseClients(string userId);
        IEnumerable<MentorDTO> GetMentors();
    }
}
