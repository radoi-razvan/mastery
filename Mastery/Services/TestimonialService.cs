using AutoMapper;
using Mastery.Data;
using Mastery.DTOs;
using Mastery.Models;
using Mastery.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Services
{
    public class TestimonialService : ITestimonialService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public TestimonialService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task AddAsync(int courseId, TestimonialDTO item)
        {
            var model = _mapper.Map<Testimonial>(item);
            model.CourseId = courseId;
            await _db.Testimonials.AddAsync(model);
            await _db.SaveChangesAsync();
        }

        public bool TestimonialExists(int id)
        {
            return _db.Testimonials.Any(e => e.TestimonialId == id);
        }

        public async Task<IEnumerable<TestimonialDTO>> GetAllAsync(int courseId)
        {
            return _mapper.Map<IEnumerable<TestimonialDTO>>(await _db.Testimonials
                .Where(t => t.CourseId == courseId).ToListAsync());
        }

        public async Task<TestimonialDTO> GetAsync(int id)
        {
            return _mapper.Map<TestimonialDTO>(await _db.Testimonials.FindAsync(id));
        }

        public async Task RemoveAsync(int id)
        {
            var testimonial = _db.Testimonials.Find(id);
            if (testimonial is not null)
            {
                _db.Testimonials.Remove(testimonial);
                await _db.SaveChangesAsync();
            } else
            {
                throw new ArgumentNullException(nameof(testimonial));
            }

        }

        public async Task UpdateAsync(int id, TestimonialDTO item)
        {
            Testimonial? testimonial = _db.Testimonials.Find(id);
            if (testimonial is not null)
            {
                testimonial.FirstName = item.FirstName;
                testimonial.LastName = item.LastName;
                testimonial.Comment = item.Comment;
                testimonial.Rating = item.Rating;

                await _db.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentNullException(nameof(testimonial));
            }
        }
    }
}