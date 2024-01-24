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
    private readonly StoreContext _context;

    public AuthController(
        UserManager<User> userManager, 
        TokenService tokenService,
        StoreContext context
    )
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user == null) return Unauthorized("User does not exists");

        if (!await _userManager.CheckPasswordAsync(user, loginDto.Password)) return Unauthorized("User with this password does not exist"); 

        var response = new LoginResponseDto
        {
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user)
        };

        return Ok(response);
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

        return Created();
    }

    [HttpGet]
    public async Task<ActionResult> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }
}