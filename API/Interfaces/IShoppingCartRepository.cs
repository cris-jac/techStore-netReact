using API.Models;

namespace API.Interfaces;

public interface IShoppingCartRepository: IGenericRepository<ShoppingCart>
{
    Task<ShoppingCart> RetrieveShoppingCart(IHttpContextAccessor httpContextAccessor);
    ShoppingCart CreateShoppingCart(IHttpContextAccessor httpContextAccessor);
}