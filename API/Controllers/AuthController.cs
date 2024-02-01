using System.Net;
using API.Data;
using API.DTOs;
using API.Models;
using API.Services;
using API.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AuthController : ApiControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    // private readonly StoreContext _context;
    private ApiResponse _response;
    public AuthController(
        UserManager<User> userManager, 
        // StoreContext context,
        TokenService tokenService
    )
    {
        _userManager = userManager;
        // _context = context;
        _tokenService = tokenService;
        _response = new ApiResponse();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user == null) 
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.Unauthorized;
            _response.ErrorMessages.Add("Username does not exists");
            return Unauthorized(_response);
        }

        if (!await _userManager.CheckPasswordAsync(user, loginDto.Password)) 
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.Unauthorized;
            _response.ErrorMessages.Add("User with this password does not exist");
            return Unauthorized(_response); 
        }

        var loginResponse = new LoginResponseDto
        {
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user)
        };

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.OK;
        _response.Result = loginResponse;
        return Ok(_response);
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User
        {
            Email = registerDto.Email,
            UserName = registerDto.Username
        };

        var setPassword = await _userManager.CreateAsync(user, registerDto.Password);

        if (!setPassword.Succeeded)
        {
            foreach(var error in setPassword.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await _userManager.AddToRoleAsync(user, SD.Role_Customer);

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.Created;
        return Ok(_response);
    }

    // 
    // [HttpGet]
    // public async Task<ActionResult> GetAllUsers()
    // {
    //     var users = await _context.Users.ToListAsync();
    //     return Ok(users);
    // }
}