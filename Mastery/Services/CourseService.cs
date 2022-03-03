using AutoMapper;
using Mastery.Data;
using Mastery.DTOs;
using Mastery.Models;
using Mastery.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Services
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public CourseService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task AddAsync(CourseDTO item)
        {
            var model = _mapper.Map<Course>(item);
            await _db.Courses.AddAsync(model);
            await _db.SaveChangesAsync();
        }

        public bool CourseExists(int id)
        {
            return _db.Courses.Any(e => e.CourseId == id); 
        }

        public async Task<IEnumerable<CourseDTO>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<CourseDTO>>(await _db.Courses.ToListAsync());
        }

        public async Task<CourseDTO> GetAsync(int id)
        {
            return _mapper.Map<CourseDTO>(await _db.Courses.FindAsync(id));
        }

        public async Task RemoveAsync(int courseId)
        {
            var course = _db.Courses.Find(courseId);
            var testimonials = _db.Testimonials.Where(t => t.CourseId == courseId);
            var courseClients = _db.CourseClients.Where(cc => cc.CourseId == courseId);
            var courseWeeks = _db.CourseWeeks.Where(cw => cw.CourseId == courseId);
            var courseWeeksIds = courseWeeks.Select(cw => cw.WeekId).ToList();
            var weeks = _db.Weeks.Where(w => courseWeeksIds.Contains(w.WeekId));

            foreach (var testimonial in testimonials)
            {
                _db.Testimonials.Remove(testimonial);
            }

            foreach (var courseClient in courseClients)
            {
                _db.CourseClients.Remove(courseClient);
            }

            foreach (var courseWeek in courseWeeks)
            {
                _db.CourseWeeks.Remove(courseWeek);
            }

            foreach (var week in weeks)
            {
                _db.Weeks.Remove(week);
            }

            if (course is not null)
            {
                _db.Courses.Remove(course);
                await _db.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentNullException(nameof(course));
            }
        }

        public async Task UpdateAsync(int id, CourseDTO item)
        {
            Course? course = _db.Courses.Find(id);
            if (course is not null)
            {
                course.Name = item.Name;
                course.Category = item.Category;
                course.Price = item.Price;
                course.Description = item.Description;
                course.StartingDate = item.StartingDate;

                await _db.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentNullException(nameof(course));
            }
        }
    }
}
