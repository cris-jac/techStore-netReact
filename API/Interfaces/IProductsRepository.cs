using API.Models;

namespace API.Interfaces;

public interface IProductsRepository : IGenericRepository<Product>
{
    Task<Product> GetById(int id);
}