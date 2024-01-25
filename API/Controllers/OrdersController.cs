using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using API.Models.OrderAggregate;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class OrdersController : ApiControllerBase
{
    private readonly StoreContext _context;

    public OrdersController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderItems)
                .ThenInclude(i => i.ItemOrdered)
            .Where(x => x.BuyerId == User.Identity.Name)
            .ToListAsync();

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

        return Ok(ordersDto);
    }

    [HttpGet("id", Name = "GetOrder")]
    public async Task<ActionResult> GetOrder(int id)
    {
        var order = await _context.Orders  
            .Include(o => o.ShippingAddress)
            .Include(o => o.OrderItems)
                .ThenInclude(i => i.ItemOrdered)        // Added for select issues?
            .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound("No orders here");

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
        var shoppingCart = await _context.ShoppingCarts
            .RetrieveCartWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();
        
        if (shoppingCart == null) return BadRequest($"Could not locate the cart: {User.Identity.Name} and");

        var items = new List<OrderItem>();

        foreach (var item in shoppingCart.Items)
        {
            var productItem = await _context.Products.FindAsync(item.ProductId);

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

        _context.Orders.Add(order);
        _context.ShoppingCarts.Remove(shoppingCart);    // Remove the shopping cart

        // update the user address
        if (orderDto.SaveAddress)
        {
            var user = await _context.Users
                .Include(u => u.Address)    // It's causing issues
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

                _context.Update(user);
            }
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetOrder", new { id = order.Id });

        return BadRequest("Problem creating order");
    }
}