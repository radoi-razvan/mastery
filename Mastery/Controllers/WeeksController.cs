using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Mastery.Services.Interfaces;
using Mastery.DTOs;

namespace Mastery.Controllers
{
    [Route("courses/{courseId}/weeks")]
    [Authorize]
    [ApiController]
    public class WeeksController : ControllerBase
    {
        private readonly IWeekService _weekService;
        private readonly ILogger<WeeksController> _logger;

        public WeeksController(IWeekService weekService, ILogger<WeeksController> logger)
        {
            _weekService = weekService;
            _logger = logger;
        }

        // GET: courses/{courseId}/weeks
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeekDTO>>> GetWeeks(int courseId)
        {
            var weeks = await _weekService.GetAllAsync(courseId);
            _logger.LogInformation("All weeks retrieved");
            return Ok(weeks);
        }

        // GET: courses/{courseId}/weeks/5
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet("{id}")]
        public async Task<ActionResult<WeekDTO>> GetWeek(int id)
        {
            var week = await _weekService.GetAsync(id);

            if (week == null)
            {
                _logger.LogInformation("Week not found");
                return NotFound();
            }

            _logger.LogInformation("Week retrieved");
            return Ok(week);
        }

        // PUT: courses/{courseId}/weeks/id
        [Authorize(Roles = "Mentor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeek(int id, WeekDTO week)
        {
            try
            {
                await _weekService.UpdateAsync(id, week);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeekExists(id))
                {
                    _logger.LogInformation("Week not found");
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            _logger.LogInformation("Week edited");

            return NoContent();
        }

        // POST: courses/{courseId}/weeks
        [Authorize(Roles = "Mentor")]
        [HttpPost]
        public async Task<ActionResult<WeekDTO>> PostWeek(int courseId, WeekDTO week)
        {
            await _weekService.AddAsync(courseId, week);
            _logger.LogInformation("A new week added");

            return CreatedAtAction("PostWeek", new { message = "A new week added" });
        }

        // DELETE: courses/{courseId}/weeks/id
        [Authorize(Roles = "Mentor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeek(int courseId, int id)
        {
            var week = await _weekService.GetAsync(id);
            if (week == null)
            {
                _logger.LogInformation("Testimonial not found");
                return NotFound();
            }

            await _weekService.RemoveAsync(courseId, id);
            _logger.LogInformation("Testimonial removed");

            return NoContent();
        }

        private bool WeekExists(int id)
        {
            return _weekService.WeekExists(id);
        }


    }
}
