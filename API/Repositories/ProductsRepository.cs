using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class ProductsRepository : GenericRepository<Product>, IProductsRepository
{
    public ProductsRepository(StoreContext _dbContext) : base(_dbContext)
    {
    }

    public async Task<Product> GetById(int id)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Product>> FilterResult(string sortBy, string searchTerm, string brands, string categories)
    {
        var filteredResult = await _dbSet
            .Sort(sortBy)
            .Search(searchTerm)
            .Filter(brands, categories)
            .ToListAsync();

        return filteredResult;
    }
}