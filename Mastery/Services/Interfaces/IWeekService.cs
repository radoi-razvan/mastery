using Mastery.DTOs;
using Mastery.Models;

namespace Mastery.Services.Interfaces
{
    public interface IWeekService 
    {
        Task AddAsync(int courseId, WeekFormDTO item);
        Task RemoveAsync(int courseId, int id);
        Task UpdateAsync(int id, WeekFormDTO item);
        Task<WeekDTO> GetAsync(int id);
        Task<IEnumerable<WeekDTO>> GetAllAsync(int courseId);
        bool WeekExists(int id);
        Task UploadFile(WeekFormDTO weekFormDTO, int weekId);
        DownloadFileDTO DownloadFile(int weekId);
        void DeleteFile(Week week);
    }
}
