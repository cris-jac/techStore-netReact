using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController : ApiControllerBase
{
    private readonly PaymentService _paymentService;
    private readonly StoreContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PaymentsController(
        PaymentService paymentService, 
        StoreContext context,
        IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _paymentService = paymentService;
        _context = context;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("id")]
    public async Task<ActionResult> GetPreference(string preferenceId)
    {
        var preference = await _paymentService.GetPreference(preferenceId);

        if (preference == null) return NotFound("Preference with this id does not exists");

        return Ok(preference);
    }

    [HttpPost]
    public async Task<ActionResult> CreatePaymentPreference()
    {
        // get buyerId
        var buyerId = _unitOfWork.ShoppingCart.GetBuyerId(_httpContextAccessor);

        // get cart using the buyerId
        var shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor, buyerId);

        if (shoppingCart == null) return NotFound("Error retrieving shopping cart");

        // create preference
        var paymentIntent = await _paymentService.CreatePaymentOrder(shoppingCart);

        if (paymentIntent == null) return BadRequest("Error while trying to create preference");

        // get data from response
        shoppingCart.PreferenceClientId = paymentIntent.client_id;
        shoppingCart.PreferenceId = paymentIntent.id;

        // 
        _context.Update(shoppingCart);

        // 
        var result = await _context.SaveChangesAsync() > 0;

        //
        if (!result) return BadRequest("Error while saving changes to cart");

        return Ok(shoppingCart);
    }
}