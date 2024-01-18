namespace API.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<bool> AddEntity(T entity);
    Task<bool> DeleteEntity(T entity);
}