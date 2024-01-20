namespace API.Interfaces;

public interface IUnitOfWork
{
    IProductsRepository Products { get; }
    IShoppingCartRepository ShoppingCart { get; }
    Task CompleteAsync();
}