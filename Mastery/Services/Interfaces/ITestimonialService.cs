using Mastery.DTOs;

namespace Mastery.Services.Interfaces
{
    public interface ITestimonialService 
    {
        Task AddAsync(int courseId, TestimonialDTO item);
        Task RemoveAsync(int id);
        Task UpdateAsync(int id, TestimonialDTO item);
        Task<TestimonialDTO> GetAsync(int id);
        Task<IEnumerable<TestimonialDTO>> GetAllAsync(int courseId);
        bool TestimonialExists(int id);
    }
}
