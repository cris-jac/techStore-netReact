using API.Data;
using API.Interfaces;

namespace API.Repositories;

public class UnitOfWork : IUnitOfWork
{
    // public IProductsRepository Products => throw new NotImplementedException();
    private readonly StoreContext _dbContext;
    public IProductsRepository Products { get; private set; }
    public IShoppingCartRepository ShoppingCart { get; private set; }
    public UnitOfWork(StoreContext dbContext)
    {
        _dbContext = dbContext;
        Products = new ProductsRepository(dbContext);
        ShoppingCart = new ShoppingCartRepository(dbContext);
    }

    public async Task CompleteAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}