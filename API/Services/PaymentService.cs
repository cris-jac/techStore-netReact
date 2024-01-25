using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using RestSharp;

namespace API.Services;

public class PaymentService
{
    private readonly IConfiguration _config;

    public PaymentService(IConfiguration config)
    {
        _config = config;
    }

    public async Task<CreatePreferenceResponseDto> CreatePaymentOrder(ShoppingCart shoppingCart)
    {
        // Map Cart items into preference items
        var preferenceItems = shoppingCart.Items.Select(item => new PreferenceItemDto 
        {
            title = item.Product.Name,
            description = item.Product.Description,
            picture_url = item.Product.PictureUrl,
            quantity = item.Quantity,
            unit_price = (decimal)(item.Product.PriceInARS/1000),
        }).ToList();

        // Set url
        var url = _config.GetSection("MercadoPagoSettings:RequestUrl").Value;

        // set token
        var accessToken = _config.GetSection("MercadoPagoSettings:AccessToken").Value;

        // set body
        var body = new CreatePreferenceRequestDto
        {
            items = preferenceItems
        };

        // set 
        var client = new RestClient(url);
        var request = new RestRequest("");
        request.Method = Method.Post;

        // add headers
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Authorization", $"Bearer {accessToken}");

        // add json body
        request.AddJsonBody(body);

        // execute the request
        var response = await client.ExecuteAsync(request);

        // check for success
        if ((int)response.StatusCode >= 200 && (int)response.StatusCode < 300)
        {
            var paymentData = JsonConvert.DeserializeObject<CreatePreferenceResponseDto>(response.Content);

            return paymentData;
        }

        return null;
    }


    public async Task<GetPreferenceDto> GetPreference(string preferenceId)
    {
        // Set url
        var url = _config.GetSection("MercadoPagoSettings:RequestUrl").Value;

        // set token
        var accessToken = _config.GetSection("MercadoPagoSettings:AccessToken").Value;

        // set 
        var client = new RestClient(url);
        var request = new RestRequest($"/{preferenceId}");
        request.Method = Method.Get;

        // add headers
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("Authorization", $"Bearer {accessToken}");

        // execute the request
        var response = await client.ExecuteAsync(request);

        // check for success
        if ((int)response.StatusCode >= 200 && (int)response.StatusCode < 300)
        {
            var preferenceData = JsonConvert.DeserializeObject<GetPreferenceDto>(response.Content);

            return preferenceData;
        }

        return null;
    }
}