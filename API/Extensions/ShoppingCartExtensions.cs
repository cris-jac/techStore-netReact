using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ShoppingCartExtensions
{
    
    public static IQueryable<ShoppingCart> RetrieveCartWithItems(this IQueryable<ShoppingCart> query, string buyerId)
    {
        return query
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .Where(b => b.BuyerId == buyerId);
    }
}