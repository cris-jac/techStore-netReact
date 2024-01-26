using API.Models;

namespace API.Interfaces;

public interface IShoppingCartRepository: IGenericRepository<ShoppingCart>
{
    Task<ShoppingCart> RetrieveShoppingCart(IHttpContextAccessor httpContextAccessor, string buyerIdFromCookies);
    ShoppingCart CreateShoppingCart(IHttpContextAccessor httpContextAccessor);
    string GetBuyerId(IHttpContextAccessor httpContextAccessor);
    Task<ShoppingCart> GetShoppingCartByUser(string buyerUsername);
}