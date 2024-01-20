using API.Data;
using API.Data.Migrations;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ShoppingCartsController : ApiControllerBase
{
    // private readonly StoreContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ShoppingCartsController(
        StoreContext context,
        IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor
    )
    {
        // _context = context;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet(Name = "GetShoppingCart")]
    public async Task<ActionResult> GetShoppingCart()
    {
        // get cart
        // var shoppingCart = await _context.ShoppingCarts
        //     .Include(i => i.Items)
        //     .ThenInclude(p => p.Product)
        //     .FirstAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        var shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor);

        // create cart
        if (shoppingCart == null)
        {
            shoppingCart = _unitOfWork.ShoppingCart.CreateShoppingCart(_httpContextAccessor);
        }

        // map
        var shoppingCartDto = new ShoppingCartDto
        {
            Id = shoppingCart.Id,
            BuyerId = shoppingCart.BuyerId,
            Items = shoppingCart.Items.Select(item => new CartItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                PriceInARS = item.Product.PriceInARS,
                PictureUrl = item.Product.PictureUrl,
                Category = item.Product.Category,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            }).ToList()
        }; 

        return Ok(shoppingCartDto);
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToShoppingCart(int productId, int quantity)
    {
        // get cart
        var shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor);

        // create cart
        if (shoppingCart == null)
        {
            shoppingCart = _unitOfWork.ShoppingCart.CreateShoppingCart(_httpContextAccessor);
        }

        // get product
        var product = await _unitOfWork.Products.GetById(productId);
        if (product == null)
        {
            return NotFound();
        }

        // add item
        shoppingCart.AddItem(product, quantity);

        // save changes
        await _unitOfWork.CompleteAsync();

        return Created();
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
    {
        // get cart
        ShoppingCart shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor);

        if (shoppingCart == null) return NotFound();

        // remove item or reduce
        shoppingCart.RemoveItem(productId, quantity);

        // save changes
        await _unitOfWork.CompleteAsync();

        return Ok();
    }
    

    // private async Task<ShoppingCart> RetrieveShoppingCart()
    // {
    //     var shoppingCart = await _context.ShoppingCarts
    //         .Include(i => i.Items)
    //         .ThenInclude(p => p.Product)
    //         .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);

    //     return shoppingCart;
    // }

    // private ShoppingCart CreateShoppingCart()
    // {
    //     var buyerId = Guid.NewGuid().ToString();

    //     var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddMinutes(3) };

    //     Response.Cookies.Append("buyerId", buyerId, cookieOptions);

    //     var cart = new ShoppingCart{ BuyerId = buyerId };

    //     _context.ShoppingCarts.Add(cart);

    //     return cart;
    // }


}