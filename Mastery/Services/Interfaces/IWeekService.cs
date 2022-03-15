using Mastery.DTOs;

namespace Mastery.Services.Interfaces
{
    public interface IWeekService 
    {
        Task AddAsync(int courseId, WeekDTO item);
        Task RemoveAsync(int courseId, int id);
        Task UpdateAsync(int id, WeekDTO item);
        Task<WeekDTO> GetAsync(int id);
        Task<IEnumerable<WeekDTO>> GetAllAsync(int courseId);
        bool WeekExists(int id);
    }
}
