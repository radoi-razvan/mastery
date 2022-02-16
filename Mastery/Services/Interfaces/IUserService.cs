using Mastery.DTOs;
using Mastery.Models;

namespace Mastery.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> Register(RegisterDto registerDto);
        Task<ApplicationUser?> GetByUsernameAsync(string username);
    }
}
