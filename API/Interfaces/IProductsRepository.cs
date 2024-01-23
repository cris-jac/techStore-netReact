using API.Models;
using API.Utilities;

namespace API.Interfaces;

public interface IProductsRepository : IGenericRepository<Product>
{
    Task<Product> GetById(int id);
    Task<PagedList<Product>> GetFilteredResult(
        ProductParams productParams
        // , string searchTerm, string sortBy, string brands, string categories
        );
}