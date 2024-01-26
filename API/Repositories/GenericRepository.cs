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
        _dbSet.Add(entity);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteEntity(T entity)
    {
        _dbSet.Remove(entity);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public Task<List<T>> GetAllAsync()
    {
        return _dbSet.ToListAsync();
    }

    public async Task<bool> UpdateEntity(T entity)
    {
        _dbSet.Update(entity);
        return await _dbContext.SaveChangesAsync() > 0;
    }
}