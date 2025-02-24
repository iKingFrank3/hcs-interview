using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Test_WebApplication.Pages
{
    public class SettingsModel : PageModel
    {
        [BindProperty]
        public string username { get; set; }

        [BindProperty]
        public string password { get; set; }
        public void OnGet() 
        {
            username = "admin";
            password = "admin";
        }
    }
}
