using API.Data;
using API.Interfaces;
using API.Models;
using API.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class ShoppingCartRepository : GenericRepository<ShoppingCart>, IShoppingCartRepository
{
    public ShoppingCartRepository(StoreContext _dbContext) : base(_dbContext)
    {
    }

    public ShoppingCart CreateShoppingCart(IHttpContextAccessor httpContextAccessor)
    {
        var buyerId = httpContextAccessor.HttpContext.User.Identity?.Name;

        if (string.IsNullOrEmpty(buyerId))
        {
            buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddMinutes(5)
            };

            httpContextAccessor.HttpContext.Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        }

        ShoppingCart newShoppingCart = new ShoppingCart { BuyerId = buyerId };

        _dbSet.Add(newShoppingCart);

        return newShoppingCart;
    }

    public async Task<ShoppingCart> RetrieveShoppingCart(IHttpContextAccessor httpContextAccessor, string buyerIdFromCookies)
    {
        // check, if there's buyerId, delete it
        if (string.IsNullOrEmpty(buyerIdFromCookies))
        {
            httpContextAccessor.HttpContext.Response.Cookies.Delete("buyerId");
            return null;
        }

        // get cart using the buyerId
        ShoppingCart shoppingCartFromDb = await _dbSet
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerIdFromCookies);

        return shoppingCartFromDb;
    }

    public async Task<ShoppingCart> GetShoppingCartByUser(string buyerUsername)
    {
        ShoppingCart cart = await _dbSet
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .Where(b => b.BuyerId == buyerUsername)
            .FirstOrDefaultAsync();
        
        return cart;
    }

    public string GetBuyerId(IHttpContextAccessor httpContextAccessor)
    {
        return httpContextAccessor.HttpContext.User.Identity?.Name ?? httpContextAccessor.HttpContext.Request.Cookies["buyerId"];
    }
}