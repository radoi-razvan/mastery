using Mastery.DTOs;
using Mastery.Models;

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
        void DeleteFile(Week week);
    }
}
