using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Mastery.Services.Interfaces;
using Mastery.DTOs;

namespace Mastery.Controllers
{
    [Route("courses/{courseId}/testimonials")]
    [Authorize]
    [ApiController]
    public class TestimonialsController : ControllerBase
    {
        private readonly ITestimonialService _testimonialService;
        private readonly ILogger<TestimonialsController> _logger;

        public TestimonialsController(ITestimonialService testimonialService, ILogger<TestimonialsController> logger)
        {
            _testimonialService = testimonialService;
            _logger = logger;
        }

        // GET: courses/{courseId}/testimonials
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestimonialDTO>>> GetTestimonials(int courseId)
        {
            var testimonials = await _testimonialService.GetAllAsync(courseId);
            _logger.LogInformation("All testimonials retrieved");
            return Ok(testimonials);
        }

        // GET: courses/{courseId}/testimonials/5
        [Authorize(Roles = "Mentor,Client")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TestimonialDTO>> GetTestimonial(int id)
        {
            var testimonial = await _testimonialService.GetAsync(id);

            if (testimonial == null)
            {
                _logger.LogInformation("Testimonial not found");
                return NotFound();
            }

            _logger.LogInformation("Testimonial retrieved");
            return Ok(testimonial);
        }

        // PUT: courses/{courseId}/testimonials/id
        [Authorize(Roles = "Mentor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTestimonial(int id, TestimonialDTO testimonial)
        {
            try
            {
                await _testimonialService.UpdateAsync(id, testimonial);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TestimonialExists(id))
                {
                    _logger.LogInformation("Testimonial not found");
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            _logger.LogInformation("Testimonial edited");

            return NoContent();
        }

        // POST: courses/{courseId}/testimonials
        [Authorize(Roles = "Mentor")]
        [HttpPost]
        public async Task<ActionResult<TestimonialDTO>> PostTestimonial(int courseId, TestimonialDTO testimonial)
        {
            await _testimonialService.AddAsync(courseId, testimonial);
            _logger.LogInformation("A new testimonial added");

            return CreatedAtAction("PostTestimonial", new { message = "A new testimonial added" });
        }

        // DELETE: courses/{courseId}/testimonials/id
        [Authorize(Roles = "Mentor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestimonial(int courseId, int id)
        {
            var testimonial = await _testimonialService.GetAsync(id);
            if (testimonial == null)
            {
                _logger.LogInformation("Testimonial not found");
                return NotFound();
            }

            await _testimonialService.RemoveAsync(id);
            _logger.LogInformation("Testimonial removed");

            return NoContent();
        }

        private bool TestimonialExists(int id)
        {
            return _testimonialService.TestimonialExists(id);
        }
    }
}
