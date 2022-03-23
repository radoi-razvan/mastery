using Mastery.DTOs;

namespace Mastery.Services.Interfaces
{
    public interface ICourseService 
    {
        Task AddAsync(CourseDTO item);
        Task RemoveAsync(int id);
        Task UpdateAsync(int id, CourseDTO item);
        Task<CourseDTO> GetAsync(int id);
        Task<IEnumerable<CourseDetailsDTO>> GetAllAsync();
        bool CourseExists(int id);
    }
}
