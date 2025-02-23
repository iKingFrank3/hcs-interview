using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;

namespace Test_WebApplication.Pages
{
    public class InventoryModel : PageModel
    {
        public DateTime? SelectedDate { get; set; }
        public List<InventoryItem> MockData { get; set; } = new List<InventoryItem>();

        public void OnGet(DateTime? selectedDate)
        {
            SelectedDate = selectedDate ?? DateTime.Today; // Default to today if no date is selected
            GenerateMockData(SelectedDate.Value);
        }

        private void GenerateMockData(DateTime date)
        {
            // Clear existing mock data
            MockData.Clear();

            // Generate different mock data based on the day of the week
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    MockData.Add(new InventoryItem { Sku = "SKU123", Quantity = 10, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU456", Quantity = 15, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU789", Quantity = 20, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Tuesday:
                    MockData.Add(new InventoryItem { Sku = "SKU321", Quantity = 5, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU654", Quantity = 10, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU987", Quantity = 25, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Wednesday:
                    MockData.Add(new InventoryItem { Sku = "SKU111", Quantity = 8, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU222", Quantity = 12, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU333", Quantity = 18, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Thursday:
                    MockData.Add(new InventoryItem { Sku = "SKU444", Quantity = 7, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU555", Quantity = 14, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU666", Quantity = 22, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Friday:
                    MockData.Add(new InventoryItem { Sku = "SKU777", Quantity = 9, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU888", Quantity = 11, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU999", Quantity = 30, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Saturday:
                    MockData.Add(new InventoryItem { Sku = "SKU000", Quantity = 6, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU1234", Quantity = 13, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU5678", Quantity = 19, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Sunday:
                    MockData.Add(new InventoryItem { Sku = "SKU4321", Quantity = 4, DateAdded = date, Location = "Warehouse A" });
                    MockData.Add(new InventoryItem { Sku = "SKU8765", Quantity = 16, DateAdded = date, Location = "Warehouse B" });
                    MockData.Add(new InventoryItem { Sku = "SKU5432", Quantity = 21, DateAdded = date, Location = "Warehouse C" });
                    break;
            }
        }
    }

    public class InventoryItem
    {
        public string Sku { get; set; }
        public int Quantity { get; set; }
        public DateTime DateAdded { get; set; }
        public string Location { get; set; }
    }
}