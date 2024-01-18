using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly StoreContext _dbContext;
    internal DbSet<T> _dbSet { get; set; }
    public GenericRepository(StoreContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<T>();
    }

    public async Task<bool> AddEntity(T entity)
    {
        await _dbSet.AddAsync(entity);
        return true;
    }

    public async Task<bool> DeleteEntity(T entity)
    {
        _dbSet.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public Task<List<T>> GetAllAsync()
    {
        return _dbSet.ToListAsync();
    }
}