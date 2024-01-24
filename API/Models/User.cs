using Microsoft.AspNetCore.Identity;

namespace API.Models;

public class User : IdentityUser<int>
{
    public int UserAddressId { get; set; }      // Instead of using [Owned]
    public UserAddress Address { get; set; }   
}