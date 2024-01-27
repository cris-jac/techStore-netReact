using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Models;
using API.Utilities;
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

    public async Task<PagedList<Product>> GetFilteredResult(
        ProductParams productParams
        // , string sortBy, string searchTerm, string brands, string categories
    )
    {
        var query = _dbSet.AsQueryable();

        var filteredResult = query
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Categories)
            .Sort(productParams.SortBy)
            ;
            // .ToListAsync();

        var pagedList = await PagedList<Product>.ToPagedList(filteredResult, productParams.PageNumber, productParams.PageSize);

        return pagedList;
    }

    public async Task<List<string>> GetCategories()
    {
        List<string> categories = await _dbSet.Select(x => x.Category).Distinct().ToListAsync();
        return categories;
    }

        public async Task<List<string>> GetBrands()
    {
        List<string> brands = await _dbSet.Select(x => x.Brand).Distinct().ToListAsync();
        return brands;
    }
}