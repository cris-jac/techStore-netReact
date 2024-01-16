using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreContext _dbContext;

    public ProductsController(StoreContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = await _dbContext.Products.ToListAsync();
        
        if (products == null) return BadRequest("There are no products");

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (product == null) return NotFound("Product with this ID was not found");

        return Ok(product);
    }
}