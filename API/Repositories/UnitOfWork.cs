using System.ComponentModel.DataAnnotations;
using API.Data;
using API.Interfaces;

namespace API.Repositories;

public class UnitOfWork : IUnitOfWork
{
    // public IProductsRepository Products => throw new NotImplementedException();
    private readonly StoreContext _dbContext;
    public IProductsRepository Products { get; private set; }
    public IShoppingCartRepository ShoppingCart { get; private set; }
    public IOrdersRepository Orders { get; private set; }

    public UnitOfWork(StoreContext dbContext)
    {
        _dbContext = dbContext;
        Products = new ProductsRepository(dbContext);
        ShoppingCart = new ShoppingCartRepository(dbContext);
        Orders = new OrdersRepository(dbContext);
    }

    public async Task<int> CompleteAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }

    // public IEnumerable<ValidationResult> GetValidationsErrors()
    // {
    //     return _dbContext.GetValidationResu
    // }
}