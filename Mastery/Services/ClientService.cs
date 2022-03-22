﻿using AutoMapper;
using Mastery.Data;
using Mastery.DTOs;
using Mastery.Models;
using Mastery.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Services
{
    public class ClientService : IClientService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ClientService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task AddAsync(int courseId, string userId, CourseClientDTO courseClient)
        {

            var newCourseClient = new CourseClient()
            {
                CourseId = courseId,
                ClientId = userId,
                LastYearIncomeRange = courseClient.LastYearIncomeRange,
                JobTitle = courseClient.JobTitle
            };
            _db.CourseClients.Add(newCourseClient);
            await _db.SaveChangesAsync();
        }

        public async Task Remove(int courseId, string userId)
        {
            var courseClient = _db.CourseClients
                .Where(cc => cc.CourseId == courseId && cc.ClientId == userId).First();

            _db.CourseClients.Remove(courseClient);
            await _db.SaveChangesAsync();
        }

        public async Task <IEnumerable<CourseDTO>> GetAttendedCourses(string clientId)
        {
            var attendedCoursesIds = _db.CourseClients
               .Where(cc => cc.ClientId == clientId)
               .Select(cp => cp.CourseId);

            return _mapper.Map<IEnumerable<CourseDTO>>(await _db.Courses
                .Where(c => attendedCoursesIds.Contains(c.CourseId)).ToListAsync());
        }

        public List<object> GetTotalCoursesClients()
        {
            List<object> totalCoursesClientsList = new List<object>() { };
            foreach (var course in _db.Courses)
            {
                var totalCourseClients = _db.CourseClients
                    .Count(cp => cp.CourseId == course.CourseId);
                totalCoursesClientsList.Add(new
                {
                    CourseId = course.CourseId,
                    TotalCourseClients = totalCourseClients
                });
            }
            return totalCoursesClientsList;
        }

        public async Task<IEnumerable<ClientDetailsDTO>> GetCourseClients(string userId)
        {
            List<ClientDetailsDTO> result = new();
            var mentorCoursesIds = _db.Courses.Where(c => c.MentorId == userId)
                .Select(c => c.CourseId);
            var clients = _db.CourseClients.Where(cc => mentorCoursesIds.Contains(cc.CourseId));
            foreach (var client in clients)
            {
                var userDetails = await _db.Users.Where(u => u.Id == client.ClientId).FirstAsync();
                var course = await _db.Courses.Where(c => c.CourseId == client.CourseId).FirstAsync();

                ClientDetailsDTO clientDetails = new()
                {
                    CourseClientId = client.CourseClientId,
                    CourseId = client.CourseId,
                    ClientId = client.ClientId,
                    LastYearIncomeRange = client.LastYearIncomeRange,
                    JobTitle = client.JobTitle,
                    FirstName = userDetails.FirstName,
                    LastName = userDetails.LastName,
                    Country = userDetails.Country,
                    City = userDetails.City,
                    Email = userDetails.Email,
                    PhoneNumber = userDetails.PhoneNumber,
                    CourseName = course.Name,
                };
                result.Add(clientDetails); 
            }

            return result;
        }

        public MentorDTO GetMentor(string userId)
        {
            var mentor = _db.Users.Find(userId);
            var mentorDTO = new MentorDTO();

            if (mentor is not null)
            {
                mentorDTO.FirstName = mentor.FirstName;
                mentorDTO.LastName = mentor.LastName;
                mentorDTO.Country = mentor.Country;
                mentorDTO.City = mentor.City;
            }

            return mentorDTO;
        }
    }
}
