using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Test_WebApplication.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public string Message { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }

        public IActionResult OnPostLogin()
        {
            if ((Username == "test" && Password == "password") || 
                (Username == "testing1" && Password == "password1"))
            {
                // Redirect to Dashboard page on successful login
                return RedirectToPage("/Dashboard");
            }

            Message = "Invalid username or password.";
            return Page(); // Return to the same page with an error message
        }
    }
}
