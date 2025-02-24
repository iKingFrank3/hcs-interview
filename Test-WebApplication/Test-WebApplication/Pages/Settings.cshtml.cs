using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Test_WebApplication.Pages
{
    public class SettingsModel : PageModel
    {
        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public string SaveMessage { get; set; }

        public void OnGet() 
        {
            Username = "admin";
            Password = "admin";
        }

        public void OnPost()
        {
            SaveMessage = "Settings saved successfully!";
        }
    }
}
