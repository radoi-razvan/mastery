using Mastery.Models;
using System.IdentityModel.Tokens.Jwt;

namespace Mastery.Services.Interfaces
{
    public interface ITokenService
    {
        public Task<string> GenerateToken(ApplicationUser user);
        public JwtSecurityToken Verify(string jwt);
    }
}
