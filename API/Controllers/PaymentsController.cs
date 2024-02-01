using System.Net;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Models;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController : ApiControllerBase
{
    private readonly PaymentService _paymentService;
    // private readonly StoreContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private ApiResponse _response;
    public PaymentsController(
        PaymentService paymentService, 
        // StoreContext context,
        IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _paymentService = paymentService;
        // _context = context;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
        _response = new ApiResponse();
    }

    [HttpGet("id")]
    public async Task<ActionResult> GetPreference(string preferenceId)
    {
        var preference = await _paymentService.GetPreference(preferenceId);

        if (preference == null)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.NotFound;
            _response.ErrorMessages.Add("Preference with this id does not exist");
            return NotFound(_response);
        } 

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.OK;
        _response.Result = preference;
        return Ok(_response);
    }

    [HttpPost]
    public async Task<ActionResult> CreatePaymentPreference()
    {
        // get buyerId
        var buyerId = _unitOfWork.ShoppingCart.GetBuyerId(_httpContextAccessor);

        // get cart using the buyerId
        var shoppingCart = await _unitOfWork.ShoppingCart.RetrieveShoppingCart(_httpContextAccessor, buyerId);

        if (shoppingCart == null)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.NotFound;
            _response.ErrorMessages.Add("Error retrieving shopping cart");
            return NotFound(_response);
        }

        // create preference
        var paymentIntent = await _paymentService.CreatePaymentOrder(shoppingCart);

        if (paymentIntent == null)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Error while trying to create preference");
            return BadRequest(_response);
        }

        // get data from response
        shoppingCart.PreferenceClientId = paymentIntent.client_id;
        shoppingCart.PreferenceId = paymentIntent.id;

        // Update the shopping cart
        // _context.Update(shoppingCart);
        bool updateCart = await _unitOfWork.ShoppingCart.UpdateEntity(shoppingCart);
        if (!updateCart)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Error while trying to create preference");
            return BadRequest("");
        }

        // 
        var result = await _unitOfWork.CompleteAsync() > 0;

        //
        if (!result)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.BadRequest;
            _response.ErrorMessages.Add("Error while saving changes to cart");
            return BadRequest(_response);
        }

        _response.IsSuccess = true;
        _response.StatusCode = HttpStatusCode.OK;
        _response.Result = shoppingCart;
        return Ok(_response);
    }
}