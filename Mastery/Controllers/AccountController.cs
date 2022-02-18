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

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoggedUserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                if (user != null)
                {
                    _logger.LogInformation($"Failed login the user with email {loginDto.Email}. [ Wrong password ]");
                }
                return Unauthorized(new ProblemDetails { Title = "Wrong email/password" });
            }

            var loggedUserDto = new LoggedUserDto
            {
                Id = user.Id,
                UserName = user.Email,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                AdressTest = user.AdressTest,
                TestField = user.TestField,
                PhoneNumber = user.PhoneNumber,
                Token = await _tokenService.GenerateToken(user),
                Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
            };

            _logger.LogInformation($"Successful log in the user with email {loginDto.Email}. Token: {loggedUserDto.Token}");


            Response.Cookies.Append("jwt", loggedUserDto.Token, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(1),
                Secure = true,
                SameSite = SameSiteMode.None,
        });

            return Ok(loggedUserDto);
        }

   
        [Authorize(Roles = "Admin,Client")]
        //[Authorize(Roles = "Admin")]
        //[Authorize(Roles = "Client")]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            _logger.LogInformation($"Successful logout");

            return Ok(new
            {
                message = "success"
            });
        }

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

        [Authorize(Roles = "Admin,Client")]
        [HttpGet("user")]
        public async Task<ActionResult<LoggedUserDto>> GetUser()
        {

            //try
            //{
            //    var jwt = Request.Cookies["jwt"];
            //    var token = _tokenService.Verify(jwt);
            //    // var userId = token.Claims.ToArray()[2].Value;
            //    var userName = token.Claims.ToArray()[1].Value;

            //    var user = await _userService.GetByUsernameAsync(userName);

            //    if (user == null)
            //    {
            //        return Unauthorized(new ProblemDetails { Title = "Not Logged in" });
            //    }

            //    return Ok(new LoggedUserDto
            //    {
            //        Id = user.Id,
            //        UserName = user.Email,
            //        Email = user.Email,
            //        FirstName = user.FirstName,
            //        LastName = user.LastName,
            //        AdressTest = user.AdressTest,
            //        TestField = user.TestField,
            //        PhoneNumber = user.PhoneNumber,
            //        PhoneNumberConfirmed = user.PhoneNumberConfirmed,
            //        Token = await _tokenService.GenerateToken(user),
            //        Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
            //    });
            //}
            //catch (Exception)
            //{
            //    return Unauthorized(new ProblemDetails { Title = "Not Logged in" });
            //}
            var user = await _userService.GetByUsernameAsync(User.Identity?.Name);

            if (user == null)
            {
                return Unauthorized(new ProblemDetails { Title = "Not Logged in" });
            }

            return Ok(new LoggedUserDto
            {
                Id = user.Id,
                UserName = user.Email,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                AdressTest = user.AdressTest,
                TestField = user.TestField,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                Token = await _tokenService.GenerateToken(user),
                Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
            });
        }

    }
}