using Mastery.DTOs;

namespace Mastery.Services.Interfaces
{
    public interface ICourseService : IService<CourseDTO>
    {
        bool CourseExists(int id);
    }
}
