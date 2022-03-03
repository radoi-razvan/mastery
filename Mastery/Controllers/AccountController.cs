using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Mastery.Models;
using Mastery.DTOs;
using Mastery.Services;
using Mastery.Services.Interfaces;

namespace Mastery.Controllers
{
    [Authorize]
    [ApiController]
    [Route("account")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly ILogger<AccountController> _logger;
        private readonly IUserService _userService;

        public AccountController(ILogger<AccountController> logger, UserManager<ApplicationUser> userManager,
            TokenService tokenService, IUserService userService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _logger = logger;
            _userService = userService;
        }

        // POST: account/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                if (user != null)
                {
                    _logger.LogInformation($"Failed login the user with email {loginDto.Email}. [ Wrong password ]");
                }
                return Unauthorized(new ProblemDetails { Title = "Invalid credentials" });
            }

            var token = await _tokenService.GenerateToken(user);
            _logger.LogInformation($"Successful log in the user with email {loginDto.Email}. Token: {token}");


            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                Secure = true,
                SameSite = SameSiteMode.None,
        });

            return Ok(new
            {
                message = "Successful login"
            });
        }

        // POST: account/logout
        [Authorize(Roles = "Mentor,Client")]
        [HttpPost("logout")]
        public IActionResult Logout()
        {

            Response.Cookies.Delete("jwt", new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                Secure = true,
                SameSite = SameSiteMode.None,
            });

            _logger.LogInformation($"Successful logout");

            return Ok(new
            {
                message = "Successful logout"
            });
        }

        // POST: account/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var result = await _userService.Register(registerDto);

            if (!result)
            {
                return ValidationProblem(new ValidationProblemDetails { Title = "Could not Register Account" });
            }

            _logger.LogInformation($"New account created with email {registerDto.Email}");

            return StatusCode(201);
        }

        // GET: account/user
        [AllowAnonymous]
        [HttpGet("user")]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            var userName = User.Identity?.Name;
            if (userName is not null)
            {
                var user = await _userService.GetByUsernameAsync(userName);
                if (user is not null)
                {
                    return Ok(new UserDto
                    {
                        Id = user.Id,
                        UserName = user.Email,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Country = user.Country,
                        City = user.City,
                        PhoneNumber = user.PhoneNumber,
                        PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
                    });
                }
            }

            return Ok(new { });
        }

    }
}