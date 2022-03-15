using AutoMapper;
using Mastery.Data;
using Mastery.DTOs;
using Mastery.Models;
using Mastery.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Services
{
    public class WeekService : IWeekService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public WeekService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task AddAsync(int courseId, WeekDTO item)
        {
            var model = _mapper.Map<Week>(item);
            await _db.Weeks.AddAsync(model);
            await _db.SaveChangesAsync();

            var courseWeek = new CourseWeek()
            {
                CourseId = courseId,
                WeekId = _db.Weeks.Max(w => w.WeekId)
            };
            await _db.CourseWeeks.AddAsync(courseWeek);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<WeekDTO>> GetAllAsync(int courseId)
        {
            var weekIds = _db.CourseWeeks.Where(cw => cw.CourseId == courseId)
                                                      .Select(cw => cw.WeekId);
            return _mapper.Map<IEnumerable<WeekDTO>>(await _db.Weeks.Where(w => weekIds
            .Contains(w.WeekId)).ToListAsync());
        }

        public async Task<WeekDTO> GetAsync(int id)
        {
            return _mapper.Map<WeekDTO>(await _db.Weeks.FindAsync(id));
        }

        public async Task RemoveAsync(int courseId, int id)
        {
            var courseWeek = _db.CourseWeeks.Where(cw => cw.CourseId == courseId
                                                         && cw.WeekId == id)
                                                         .First();
            _db.CourseWeeks.Remove(courseWeek);

            var week = _db.Weeks.Find(id);
            if (week is not null)
            {
                _db.Weeks.Remove(week);
            }
            else
            {
                throw new ArgumentNullException(nameof(week));
            }
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, WeekDTO item)
        {
            Week? week = _db.Weeks.Find(id);
            if (week is not null)
            {
                week.Number = item.Number;
                week.VideoLink = item.VideoLink;
                week.HomeworkTitle = item.HomeworkTitle;
                week.ConsultationCallLink = item.ConsultationCallLink;

                await _db.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentNullException(nameof(week));
            }
        }

        public bool WeekExists(int id)
        {
            return _db.Weeks.Any(w => w.WeekId == id);
        }
    }
}
