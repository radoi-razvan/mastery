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
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly ILogger<CoursesController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;

        public CoursesController(ICourseService courseService, ILogger<CoursesController> logger, UserManager<ApplicationUser> userManager)
        {
            _courseService = courseService;
            _logger = logger;
            _userManager = userManager;
        }

        // GET: courses
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDetailsDTO>>> GetCourses()
        {
            var courses = await _courseService.GetAllAsync();
            _logger.LogInformation("All courses retrieved");
            return Ok(courses);
        }

        // GET: courses/5
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDTO>> GetCourse(int id)
        {
            var course = await _courseService.GetAsync(id);

            if (course == null)
            {
                _logger.LogInformation("Course not found");
                return NotFound();
            }

            _logger.LogInformation("Course retrieved");
            return Ok(course);
        }

        // PUT: courses/5
        [Authorize(Roles = "Mentor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, CourseDTO course)
        {
            try
            {
                await _courseService.UpdateAsync(id, course);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    _logger.LogInformation("Course not found");
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            _logger.LogInformation("Course edited");

            return NoContent();
        }

        // POST: courses
        [Authorize(Roles = "Mentor")]
        [HttpPost]
        public async Task<ActionResult<CourseDTO>> PostCourse(CourseDTO course)
        {
            course.MentorId = _userManager.GetUserId(User);
            CourseDTO lastAddedCourse = await _courseService.AddAsync(course);
            _logger.LogInformation("A new course added");

            return CreatedAtAction("PostCourse", lastAddedCourse);
        }

        // DELETE: courses/5
        [Authorize(Roles = "Mentor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _courseService.GetAsync(id);
            if (course == null)
            {
                _logger.LogInformation("Course not found");
                return NotFound();
            }

            await _courseService.RemoveAsync(id);
            _logger.LogInformation("Course removed");

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return _courseService.CourseExists(id); 
        }
    }
}
