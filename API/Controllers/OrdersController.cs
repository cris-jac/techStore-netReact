using System.Net;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using API.Models;
using API.Models.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class OrdersController : ApiControllerBase
{
    // private readonly StoreContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<User> _userManager;
    private ApiResponse _response;
    public OrdersController(
        // StoreContext context,
        IUnitOfWork unitOfWork,
        UserManager<User> userManager
    )
    {
        // _context = context;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _response = new ApiResponse();
    }

    [HttpGet]
    public async Task<ActionResult> GetOrders()
    {
        // var orders = await _context.Orders
        //     .Include(o => o.ShippingAddress)
        //     .Include(o => o.OrderItems)
        //         .ThenInclude(i => i.ItemOrdered)
        //     .Where(x => x.BuyerId == User.Identity.Name)
        //     .ToListAsync();
        var orders = await _unitOfWork.Orders.GetAllOrdersByUser(User.Identity.Name);

        var ordersDto = orders.Select(order => new OrderDto
        {
            Id = order.Id,
            Buyer = order.BuyerId,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            DeliveryFee = order.DeliveryFee,
            Subtotal = order.Subtotal,
            OrderStatus = order.OrderStatus.ToString(),
            Total = order.GetTotal(),
            OrderItems = order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList()
        }); 

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.OK;
        _response.Result = ordersDto;
        return Ok(_response);
    }

    [HttpGet("id", Name = "GetOrder")]
    public async Task<ActionResult> GetOrder(int id)
    {
        // var order = await _context.Orders  
        //     .Include(o => o.ShippingAddress)
        //     .Include(o => o.OrderItems)
        //         .ThenInclude(i => i.ItemOrdered)        // Added for select issues?
        //     .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
        //     .FirstOrDefaultAsync();

        var order = await _unitOfWork.Orders.GetOrderByUser(id, User.Identity.Name);

        if (order == null) 
        {
            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.NotFound;
            _response.ErrorMessages.Add("Order not found");
            return NotFound(_response);
        }
        var orderDto = new OrderDto
        {
            Id = order.Id,
            Buyer = order.BuyerId,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            DeliveryFee = order.DeliveryFee,
            Subtotal = order.Subtotal,
            OrderStatus = order.OrderStatus.ToString(),
            Total = order.GetTotal(),
            OrderItems = order.OrderItems.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered?.Name,
                PictureUrl = item.ItemOrdered?.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList()
        };

        return Ok(orderDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateOrder(CreateOrderDto orderDto)
    {
        // var shoppingCart = await _context.ShoppingCarts
        //     .RetrieveCartWithItems(User.Identity.Name)
        //     .FirstOrDefaultAsync();
        var shoppingCart = await _unitOfWork.ShoppingCart.GetShoppingCartByUser(User.Identity.Name);
        
        if (shoppingCart == null) 
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.NotFound;
            _response.ErrorMessages.Add($"Could not locate the cart for user: {User.Identity.Name}");   
            return BadRequest(_response);
        }
        var items = new List<OrderItem>();

        foreach (var item in shoppingCart.Items)
        {
            // var productItem = await _context.Products.FindAsync(item.ProductId);
            var productItem = await _unitOfWork.Products.GetById(item.ProductId);

            var itemOrdered = new ProductItemOrdered
            {
                ProductId = productItem.Id,
                Name = productItem.Name,
                PictureUrl = productItem.PictureUrl
            };

            var orderItem = new OrderItem
            {
                ItemOrdered = itemOrdered,
                Price = productItem.PriceInARS,
                Quantity = item.Quantity
            };

            items.Add(orderItem);
            productItem.QuantityInStock -= item.Quantity;
        }

        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = subtotal > 100000 ? 0 : 3000; 

        // Create the order
        var order = new Order
        {
            OrderItems = items,
            BuyerId = User.Identity.Name,
            ShippingAddress = orderDto.ShippingAddress,
            Subtotal = subtotal,
            DeliveryFee = deliveryFee
        };

        // _context.Orders.Add(order);
        // var res = await _unitOfWork.Orders.AddEntity(order);
        // if (res) return BadRequest("");
        
        // if (!await _unitOfWork.Orders.AddEntity(order)) return BadRequest("");

        // Add order to db
        bool addOrder = await _unitOfWork.Orders.AddEntity(order);
        if (!addOrder) return BadRequest("Error while adding order to DB");
        
        // var orderResult = await _unitOfWork.CompleteAsync() > 0;
        // if (!orderResult) return BadRequest("Error while saving order");

        // Remove the shopping cart
        // _context.ShoppingCarts.Remove(shoppingCart);    
        bool deleteCart = await _unitOfWork.ShoppingCart.DeleteEntity(shoppingCart);
        if (!deleteCart) return BadRequest("Error while deleting cart to DB");

        // var cartResult = await _unitOfWork.CompleteAsync() > 0;
        // if (!cartResult) return BadRequest("Error while saving cart");

        // update the user address
        if (orderDto.SaveAddress)
        {
            // var user = await _context.Users
            //     .Include(u => u.Address)    // It's causing issues
            //     .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            var user = await _userManager.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

            if (user != null) 
            {
                if (user.Address != null)
                {
                    // Update Address
                    if (user != null)
                    {
                        user.Address.FullName = orderDto.ShippingAddress.FullName;
                        user.Address.StreetName = orderDto.ShippingAddress.StreetName;
                        user.Address.StreetNumber = orderDto.ShippingAddress.StreetNumber;
                        user.Address.AdditionalInfo = orderDto.ShippingAddress.AdditionalInfo;
                        user.Address.PostalCode = orderDto.ShippingAddress.PostalCode;
                        user.Address.Locality = orderDto.ShippingAddress.Locality;
                        user.Address.Province = orderDto.ShippingAddress.Province;
                        user.Address.Country = orderDto.ShippingAddress.Country;
                    }

                    // user.Address = new UserAddress
                    // {
                    //     FullName = orderDto.ShippingAddress.FullName,
                    //     StreetName = orderDto.ShippingAddress.StreetName,
                    //     StreetNumber = orderDto.ShippingAddress.StreetNumber,
                    //     AdditionalInfo = orderDto.ShippingAddress.AdditionalInfo,
                    //     PostalCode = orderDto.ShippingAddress.PostalCode,
                    //     Locality = orderDto.ShippingAddress.Locality,
                    //     Province = orderDto.ShippingAddress.Province,
                    //     Country = orderDto.ShippingAddress.Country,
                    // };
                }
                else
                {
                    // Assign Address
                    user.Address = new UserAddress
                    {
                        FullName = orderDto.ShippingAddress.FullName,
                        StreetName = orderDto.ShippingAddress.StreetName,
                        StreetNumber = orderDto.ShippingAddress.StreetNumber,
                        AdditionalInfo = orderDto.ShippingAddress.AdditionalInfo,
                        PostalCode = orderDto.ShippingAddress.PostalCode,
                        Locality = orderDto.ShippingAddress.Locality,
                        Province = orderDto.ShippingAddress.Province,
                        Country = orderDto.ShippingAddress.Country,
                    };
                }

                // _context.Update(user);
                var updateUser = await _userManager.UpdateAsync(user);
                if (!updateUser.Succeeded) return BadRequest("Error updating the user");
            }
        }

        // var result = await _context.SaveChangesAsync() > 0;
        // var result = await _unitOfWork.CompleteAsync() > 0;
        var result = addOrder && deleteCart;
        
        if (result) 
        {
            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.Created;
            _response.Result = new { order.Id };
            return Ok(_response);
            // CreatedAtRoute("GetOrder", new { id = order.Id });
        }

        _response.IsSuccess = false;
        _response.StatusCode = HttpStatusCode.BadRequest;
        _response.ErrorMessages.Add("Problem posting order");
        return BadRequest(_response);
    }
}