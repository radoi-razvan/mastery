﻿using Mastery.DTOs;

namespace Mastery.Services.Interfaces
{
    public interface IClientService
    {
        Task AddAsync(int courseId, string userId, CourseClientDTO courseClient);
        Task Remove(int courseId, string userId);
        List<object> GetTotalCoursesClients();
        Task <IEnumerable<CourseDTO>> GetAttendedCourses(string clientId);
        Task <IEnumerable<CourseClientDTO>> GetCourseClients(string userId);
        MentorDTO GetMentor(string userId);
    }
}