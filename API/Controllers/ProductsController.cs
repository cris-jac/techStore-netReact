using System.Net;
using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController : ApiControllerBase
{
    // private readonly StoreContext _dbContext;
    private readonly IUnitOfWork _unitOfWork;
    private ApiResponse _response;
    public ProductsController(
        // StoreContext dbContext,
        IUnitOfWork unitOfWork
    )
    {
        // _dbContext = dbContext;
        _unitOfWork = unitOfWork;
        _response = new ApiResponse();
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse>> GetProducts()
    {
        try
        {
            List<Product> products = await _unitOfWork.Products.GetAllAsync();
            
            if (products == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("There are no products");

                return NotFound(_response);
            }

            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = products;

            return Ok(_response);
            
        }
        catch (Exception ex)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.InternalServerError;
            _response.ErrorMessages.Add(ex.ToString());   
            
            return _response;
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse>> GetProduct(int id)
    {
        try
        {
            Product product = await _unitOfWork.Products.GetById(id);
        
            if (product == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("Product not found");
                
                return NotFound(_response);
            }

            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = product;

            return Ok(_response);
        }
        catch (Exception ex)
        {
            _response.IsSuccess = false;
            _response.StatusCode = HttpStatusCode.InternalServerError;
            _response.ErrorMessages.Add(ex.ToString());   

            return _response;
        }
    }
}