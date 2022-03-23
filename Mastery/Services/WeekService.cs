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

        public async Task AddAsync(int courseId, WeekFormDTO item)
        {
            Week model = new ();
            model.Number = item.Number;
            model.VideoLink = item.VideoLink;
            model.HomeworkTitle = item.HomeworkTitle;
            model.ConsultationCallLink = item.ConsultationCallLink;

            await _db.Weeks.AddAsync(model);
            await _db.SaveChangesAsync();

            int weekId = _db.Weeks.Max(w => w.WeekId);

            var courseWeek = new CourseWeek()
            {
                CourseId = courseId,
                WeekId = weekId
            };
            await _db.CourseWeeks.AddAsync(courseWeek);
            await _db.SaveChangesAsync();

            await UploadFile(item, weekId);
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
                DeleteFile(week);
                _db.Weeks.Remove(week);
            }
            else
            {
                throw new ArgumentNullException(nameof(week));
            }
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, WeekFormDTO item)
        {
            Week week = _db.Weeks.Where(w => w.WeekId == id).First();

            DeleteFile(week);

            week.Number = item.Number;
            week.VideoLink = item.VideoLink;
            week.HomeworkTitle = item.HomeworkTitle;
            week.ConsultationCallLink = item.ConsultationCallLink;

            await _db.SaveChangesAsync();

            await UploadFile(item, id);
        }

        public bool WeekExists(int id)
        {
            return _db.Weeks.Any(w => w.WeekId == id);
        }

        public async Task UploadFile(WeekFormDTO weekFormDTO, int weekId)
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string currentFilePathString = $"{currentDirectory}\\HomeworkFiles";
            currentFilePathString = Path.Combine(currentFilePathString, 
                $"Week_{weekFormDTO.Number}_{weekFormDTO.HomeworkTitle}_{weekId}.pdf");

            if (File.Exists(currentFilePathString))
            {
                File.Delete(currentFilePathString);
            }

            using (FileStream fileStream = File.Create(currentFilePathString))
            {
                await weekFormDTO.File.CopyToAsync(fileStream);
            }
        }

        public DownloadFileDTO DownloadFile(int weekId)
        {
            Week week = _db.Weeks.Where( w => w.WeekId == weekId).First();

            string currentDirectory = Directory.GetCurrentDirectory();
            string pathString = $"{currentDirectory}\\HomeworkFiles\\Week_{week.Number}_{week.HomeworkTitle}_{weekId}.pdf";

            byte[] fileBytes = File.ReadAllBytes(pathString);

            DownloadFileDTO downloadFileDTO = new ();
            downloadFileDTO.FileBytes = fileBytes;
            downloadFileDTO.FileName = $"Week_{week.Number}_{week.HomeworkTitle}_{weekId}.pdf";

            return downloadFileDTO;
        }

        public void DeleteFile(Week week)
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string currentFilePathString = $"{currentDirectory}\\HomeworkFiles";
            currentFilePathString = Path.Combine(currentFilePathString,
                $"Week_{week.Number}_{week.HomeworkTitle}_{week.WeekId}.pdf");

            if (File.Exists(currentFilePathString))
            {
                File.Delete(currentFilePathString);
            }
        }

    }

}
