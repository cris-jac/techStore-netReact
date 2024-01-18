namespace API.Interfaces;

public interface IUnitOfWork
{
    IProductsRepository Products { get; }
    Task CompleteAsync();
}