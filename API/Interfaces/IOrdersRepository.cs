using API.Models.OrderAggregate;

namespace API.Interfaces;

public interface IOrdersRepository : IGenericRepository<Order>
{
    Task<List<Order>> GetAllOrdersByUser(string buyerUsername);
    Task<Order> GetOrderByUser(int id, string buyerUsername);
}