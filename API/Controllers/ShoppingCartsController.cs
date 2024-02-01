using System.Net;
using API.Data;
// using API.Data.Migrations;
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
    private ApiResponse _response;
    public ShoppingCartsController(
        // StoreContext context,
        IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor
    )
    {
        // _context = context;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
        _response = new ApiResponse();
    }

    [HttpGet(Name = "GetShoppingCart")]
    public async Task<ActionResult> GetShoppingCart()
    {
        // get buyerId
        var buyerId = _unitOfWork.ShoppingCart.GetBuyerId(_httpContextAccessor);

        // get cart using the buyerId
        var shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor, buyerId);

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

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.OK;
        _response.Result = shoppingCartDto;
        return Ok(_response);
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToShoppingCart(int productId, int quantity)
    {
        // get buyerId
        var buyerId = _unitOfWork.ShoppingCart.GetBuyerId(_httpContextAccessor);

        // get cart
        var shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor, buyerId);

        // create cart
        if (shoppingCart == null)
        {
            shoppingCart = _unitOfWork.ShoppingCart.CreateShoppingCart(_httpContextAccessor);
        }

        // get product
        var product = await _unitOfWork.Products.GetById(productId);
        if (product == null)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.NotFound;
            _response.ErrorMessages.Add("Product does not exist");
            return NotFound(_response);
        }

        // add item
        shoppingCart.AddItem(product, quantity);

        // save changes
        await _unitOfWork.CompleteAsync();

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.Created;
        return Ok(_response);
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
    {
        // get buyerId
        var buyerId = _unitOfWork.ShoppingCart.GetBuyerId(_httpContextAccessor);

        // get cart
        ShoppingCart shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor, buyerId);

        if (shoppingCart == null) 
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.NotFound;
            _response.ErrorMessages.Add("Shopping cart does not exist");
            return NotFound(_response);
        }

        // remove item or reduce
        shoppingCart.RemoveItem(productId, quantity);

        // save changes
        await _unitOfWork.CompleteAsync();

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.OK;
        return Ok(_response);
    }
}