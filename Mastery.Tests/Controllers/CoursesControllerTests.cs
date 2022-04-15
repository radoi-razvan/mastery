using Xunit;
using AutoFixture;
using Moq;
using FluentAssertions;
using Mastery.Services.Interfaces;
using Mastery.Controllers;
using Microsoft.Extensions.Logging;
using Mastery.Models;
using Microsoft.AspNetCore.Identity;
using Mastery.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Mastery.Tests
{
    public class CoursesControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<ICourseService> _serviceMock;
        private readonly Mock<ILogger<CoursesController>> _loggerMock;
        //private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
        private readonly CoursesController _sut;

        public CoursesControllerTests()
        {
            _fixture = new Fixture();
            _serviceMock = _fixture.Freeze<Mock<ICourseService>>();
            _loggerMock = _fixture.Freeze<Mock<ILogger<CoursesController>>>();
            //_userManagerMock = _fixture.Freeze<Mock<UserManager<ApplicationUser>>>();
            //_userManagerMock = new Mock<UserManager<ApplicationUser>>();

            //_userManagerMock = new Mock<UserManager<ApplicationUser>>();
            //_userManagerMock.Setup(x => x.GetUserId(null))
            //.Returns( "123456789");

            var userStore = new Mock<IUserStore<ApplicationUser>>();
            var _userManagerMock = new UserManager<ApplicationUser>(userStore.Object, null, null, null, null, null, null, null, null);
         
            _sut = new CoursesController(_serviceMock.Object, _loggerMock.Object, _userManagerMock);
        }

        [Fact]
        public async Task GetCourses_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var coursesMock = _fixture.Create<IEnumerable<CourseDetailsDTO>>();
            _serviceMock.Setup(x => x.GetAllAsync()).ReturnsAsync(coursesMock);

            // Act
            var result = await _sut.GetCourses().ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            //result.Should().BeAssignableTo<IEnumerable<CourseDetailsDTO>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull()
                .And.BeOfType(coursesMock.GetType());
            _serviceMock.Verify(x => x.GetAllAsync(), Times.Once);

        }

        //[TestMethod]
        //public void Withdraw_ValidAmount_ChangesBalance()
        //{
        //    // arrange
        //    double currentBalance = 10.0;
        //    double withdrawal = 1.0;
        //    double expected = 9.0;
        //    var account = new CheckingAccount("JohnDoe", currentBalance);

        //    // act
        //    account.Withdraw(withdrawal);

        //    // assert
        //    Assert.AreEqual(expected, account.Balance);
        //}


    }
}