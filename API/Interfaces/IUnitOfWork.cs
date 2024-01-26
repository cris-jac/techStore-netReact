namespace API.Interfaces;

public interface IUnitOfWork
{
    IProductsRepository Products { get; }
    IShoppingCartRepository ShoppingCart { get; }
    IOrdersRepository Orders { get; }
    Task<int> CompleteAsync();
}