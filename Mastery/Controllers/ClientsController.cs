using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mastery.Models;
using Microsoft.AspNetCore.Authorization;
using Mastery.Services.Interfaces;
using Mastery.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Mastery.Controllers
{
    [Route("courses")]
    [Authorize]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly ILogger<ClientsController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public ClientsController(IClientService clientService, ILogger<ClientsController> logger, 
            UserManager<ApplicationUser> userManager)
        {
            _clientService = clientService;
            _logger = logger;
            _userManager = userManager;
        }

        // GET: courses/total/clients
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet]
        [Route("total/clients")]
        public ActionResult<List<object>> GetTotalCoursesClients()
        {
            _logger.LogInformation("Total courses clients retrieved");
            return Ok(_clientService.GetTotalCoursesClients());
        }

        // POST: courses/{courseId}/clients
        [Authorize(Roles = "Client")]
        [HttpPost]
        [Route("{courseId}/clients")]
        public async Task<ActionResult<CourseClientDTO>> EnrollClient(int courseId, CourseClientDTO courseClient)
        {
            var clientId =  _userManager.GetUserId(User);
            await _clientService.AddAsync(courseId, clientId, courseClient);
            _logger.LogInformation("A new client added");

            return CreatedAtAction("EnrollClient", new { message = "A new client added" });
        }

        // DELETE: courses/{courseId}/clients
        [Authorize(Roles = "Client")]
        [HttpDelete]
        [Route("{courseId}/clients")]
        public async Task<IActionResult> DeleteClient(int courseId)
        {
            var clientId = _userManager.GetUserId(User);
            await _clientService.Remove(courseId, clientId);
            _logger.LogInformation("Client removed");

            return NoContent();
        }


        // GET: courses/clients
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet]
        [Route("clients")]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetAttendedCourses()
        {
            var clientId = _userManager.GetUserId(User);
            var courses = await _clientService.GetAttendedCourses(clientId);
            _logger.LogInformation("Attended courses retrieved");

            return Ok(courses);
        }

        // GET: courses/clients/details
        [Authorize(Roles = "Mentor")]
        [HttpGet]
        [Route("clients/details")]
        public async Task<ActionResult<IEnumerable<ClientDetailsDTO>>> GetCourseClientsDetails()
        {
            var mentorId = _userManager.GetUserId(User);
            var courseClients = await _clientService.GetCourseClients(mentorId);
            _logger.LogInformation("Clients details retrieved");

            return Ok(courseClients);
        }

        // GET: courses/mentor/5
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet]
        [Route("mentor/{menotrId}")]
        public ActionResult<MentorDTO> GetCourseMentor(string mentorId)
        {
            var mentor = _clientService.GetMentor(mentorId);
            _logger.LogInformation("Mentor details retrieved");

            return Ok(mentor);
        }

    }
}
