using Mastery.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Mastery.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; } = null!;
        public DbSet<Course> Courses { get; set; } = null!;
        public DbSet<Week> Weeks { get; set; } = null!;
        public DbSet<Testimonial> Testimonials { get; set; } = null!;
        public DbSet<CourseWeek> CourseWeeks { get; set; } = null!;
        public DbSet<CourseClient> CourseClients { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "Mentor", NormalizedName = "MENTOR" },
                new IdentityRole { Name = "Client", NormalizedName = "CLIENT" }
            );
            builder.Entity<Mentor>().HasBaseType<ApplicationUser>();
            builder.Entity<Client>().HasBaseType<ApplicationUser>();
            builder.Entity<Course>().ToTable("Course");
            builder.Entity<Week>().ToTable("Week");
            builder.Entity<Testimonial>().ToTable("Testimonial");
            builder.Entity<CourseWeek>().ToTable("CourseWeek")
                                                 .HasOne(c => c.Course)
                                                 .WithMany(ce => ce.CourseWeeks)
                                                 .HasForeignKey(ci => ci.CourseId);
            builder.Entity<CourseWeek>().ToTable("CourseWeek")
                                                 .HasOne(c => c.Week)
                                                 .WithMany(ce => ce.CourseWeeks)
                                                 .HasForeignKey(ci => ci.WeekId);
            builder.Entity<CourseClient>().ToTable("CourseClient")
                                                    .HasOne(c => c.Course)
                                                    .WithMany(ce => ce.CourseClients)
                                                    .HasForeignKey(ci => ci.CourseId);
            builder.Entity<CourseClient>().ToTable("CourseClient")
                                                    .HasOne(c => c.Client)
                                                    .WithMany(ce => ce.CoursesClient)
                                                    .HasForeignKey(ci => ci.ClientId);
        }
    }
}
