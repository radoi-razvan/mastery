<div id="top"></div>

# Mastery

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-features">Main Features</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#visuals">Visuals</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#development-team">Development Team</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![main_page.jpg][main-page]

A mentoring app where you can organize self development and business courses from wherever you are and make sure your clients achieve their desired outcomes. Used technologies: ASP.NET Core, C#, SQL Server, HTML, CSS, Bootstrap, JavaScript, React.

<p align="right">(<a href="#top">back to top</a>)</p>


### Main Features

- Courses, weeks and testimonials display
- User authentication with JWT
- Role based accounts, mentor and client
- The mentor can perform CRUD (Create, Read, Update, Delete) operations on courses, weeks and testimonials
- The mentor can perform CRUD operations on his owned courses only
- The mentor has access to the details of the clients that attend his courses
- The client can enroll to a course or cancel his membership 
- Total course members display
- Toaster notifications
- Active page display
- PDF upload & download

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Back End:
* [ASP .NET Core][asp-net-core]
* [C#][c#]

Front End:
* [HTML][html]
* [CSS][css]
* [JavaScript][js]
* [React.js][react]
* [Bootstrap][bootstrap]

Database Management:
* [Microsoft SQL Server][msql-server]
* [Microsoft SQL Server Management Studio][ssms]

IDE:
* [Microsoft Visual Studio][visual-studio]
* [Microsoft Visual Studio Code][visual-studio-code]

<p align="right">(<a href="#top">back to top</a>)</p>

### Visuals

Swagger page:

![swagger_view.jpg][swagger-view]

Register Different Passwords:

![register_different_passwords.jpg][register-different-passwords]

Register Unauthorized Operation:

![register_unauthorized_operation.jpg][register-unauthorized-operation]

Login Invalid Credentials:

![login_invalid_credentials.jpg][login-invalid-credentials] 

Client Courses Page:

![client_courses_view.jpg][client-courses-view]

Mentor Courses Page:

![owned_courses.jpg][owned-courses]

Add Course Form:

![add_course_form.jpg][add-course-form]

Edit Course Form:

![edit_course_form.jpg][edit-course-form]

Owner Weeks Page:

![owned_weeks.jpg][owned-weeks]

Add Week Form:

![add_week_form.jpg][add-week-form]

Edit Week Form:

![edit_week_form.jpg][edit-week-form]

Owner Testimonial Page:

![owned_testimonials.jpg][owned-testimonials]

Add Testimonial Form:

![add_testimonial_form.jpg][add-testimonial-form]

Edit Testimonial Form:

![edit_testimonial_form.jpg][edit-testimonial-form] 

Clients Details:

![clients_details.jpg][clients-details]

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

- Create a database.
- In Visual Studio update the database from the Package Manager Console.
- In Visual Studio right-click the project and select `Manage User Secrets` and complete it with the following structure and your details:
```
{
  "Mastery:ConnectionStrings:MasteryContext": "xxxxxxxxxxxxxxxx",
  "Mastery:JWTSettings:TokenKey": "xxxxxxxxxxxxxxxx"
}
```
- In Visual Studio Code add a `.env` file in the `mastery-react-app` folder with the following structure and complete it with your own ports: 
```
REACT_APP_BASE_URL_BACKEND=https://localhost:xxxxx
REACT_APP_BASE_URL_FRONTEND=http://localhost:xxxx

```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

- In Visual Studio run the backend project with IIS Express.
- In Visual Studio Code type the following command in terminal: `npm install react-scripts --save` then run the frontend project by typing the following command: `npm start`.

<p align="right">(<a href="#top">back to top</a>)</p>


## Development Team

* [Radoi Razvan's GitHub][radoi-razvan]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[asp-net-core]: https://dotnet.microsoft.com/en-us/learn/aspnet/what-is-aspnet-core
[ef-core]: https://docs.microsoft.com/en-us/ef/core/
[c#]: https://docs.microsoft.com/en-us/dotnet/csharp/
[html]: https://html.com/
[css]: https://www.w3.org/Style/CSS/Overview.en.html
[js]: https://www.javascript.com/
[react]: https://reactjs.org/
[bootstrap]: https://getbootstrap.com
[msql-server]: https://www.microsoft.com/en-us/sql-server/sql-server-2019
[ssms]: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
[visual-studio]: https://visualstudio.microsoft.com/
[visual-studio-code]: https://code.visualstudio.com/

[radoi-razvan]: https://github.com/radoi-razvan

[swagger-view]: project_photos/swagger_view.jpg
[main-page]: project_photos/main_page.jpg
[register-different-passwords]: project_photos/register_different_passwords.jpg
[register-unauthorized-operation]: project_photos/register_unauthorized_operation.jpg
[login-invalid-credentials]: project_photos/login_invalid_credentials.jpg
[client-courses-view]: project_photos/client_courses_view.jpg
[owned-courses]: project_photos/owned_courses.jpg
[add-course-form]: project_photos/add_course_form.jpg
[edit-course-form]: project_photos/edit_course_form.jpg
[owned-weeks]: project_photos/owned_weeks.jpg
[add-week-form]: project_photos/add_week_form.jpg
[edit-week-form]: project_photos/edit_week_form.jpg
[owned-testimonials]: project_photos/owned_testimonials.jpg
[add-testimonial-form]: project_photos/add_testimonial_form.jpg
[edit-testimonial-form]: project_photos/edit_testimonial_form.jpg
[clients-details]: project_photos/clients_details.jpg