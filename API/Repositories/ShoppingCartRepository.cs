using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class ShoppingCartRepository : GenericRepository<ShoppingCart>, IShoppingCartRepository
{
    public ShoppingCartRepository(StoreContext _dbContext) : base(_dbContext)
    {
    }

    public ShoppingCart CreateShoppingCart(IHttpContextAccessor httpContextAccessor)
    {
        string buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddMinutes(5)
        };

        httpContextAccessor.HttpContext.Response.Cookies.Append("buyerId", buyerId, cookieOptions);

        ShoppingCart newShoppingCart = new ShoppingCart { BuyerId = buyerId };

        _dbSet.Add(newShoppingCart);

        return newShoppingCart;
    }

    public async Task<ShoppingCart> RetrieveShoppingCart(IHttpContextAccessor httpContextAccessor)
    {
        string buyerIdFromCookies = GetBuyerId(httpContextAccessor);

        ShoppingCart shoppingCartFromDb = await _dbSet
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerIdFromCookies);

        return shoppingCartFromDb;
    }

    private string GetBuyerId(IHttpContextAccessor httpContextAccessor)
    {
        return httpContextAccessor.HttpContext.Request.Cookies["buyerId"];
    }
}