using AutoMapper;
using Mastery.DTOs;
using Mastery.Models;

namespace Mastery.Utils
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Course, CourseDTO>().ReverseMap();
            CreateMap<Week, WeekDTO>().ReverseMap();
            CreateMap<Testimonial, TestimonialDTO>().ReverseMap();
            CreateMap<CourseClient, CourseClientDTO>().ReverseMap();
        }
    }

}
