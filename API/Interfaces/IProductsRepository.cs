using API.Models;

namespace API.Interfaces;

public interface IProductsRepository : IGenericRepository<Product>
{
    Task<Product> GetById(int id);
    Task<List<Product>> FilterResult(string searchTerm, string sortBy, string brands, string categories);
}