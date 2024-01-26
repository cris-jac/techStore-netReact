using API.Data;
using API.Interfaces;
using API.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class OrdersRepository : GenericRepository<Order>, IOrdersRepository
{
    public OrdersRepository(StoreContext _dbContext) : base(_dbContext)
    {

    }

    public async Task<List<Order>> GetAllOrdersByUser(string buyerUsername)
    {
        var orders = await _dbSet
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderItems)
                .ThenInclude(i => i.ItemOrdered)
            .Where(x => x.BuyerId == buyerUsername)     // User.Identity.Name
            .ToListAsync();

        return orders;
    }

    public async Task<Order> GetOrderByUser(int id, string buyerUsername)
    {
        var order = await _dbSet  
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderItems)
                .ThenInclude(i => i.ItemOrdered)        
            .Where(x => x.BuyerId == buyerUsername && x.Id == id)
            .FirstOrDefaultAsync();

        return order;
    }
}