using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;

namespace Test_WebApplication.Pages
{
    public class ExportModel : PageModel
    {
        public DateTime? SelectedDate { get; set; }
        public List<ExportItem> ExportData { get; set; } = new List<ExportItem>();

        public void OnGet(DateTime? selectedDate)
        {
            SelectedDate = selectedDate ?? DateTime.Today; // Default to today if no date is selected
            GenerateExportData(SelectedDate.Value);
        }

        private void GenerateExportData(DateTime date)
        {
            // Clear existing export data
            ExportData.Clear();

            // Generate different export data based on the day of the week
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    ExportData.Add(new ExportItem { Sku = "SKU123", Quantity = 10, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU456", Quantity = 15, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU789", Quantity = 20, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Tuesday:
                    ExportData.Add(new ExportItem { Sku = "SKU321", Quantity = 5, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU654", Quantity = 10, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU987", Quantity = 25, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Wednesday:
                    ExportData.Add(new ExportItem { Sku = "SKU111", Quantity = 8, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU222", Quantity = 12, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU333", Quantity = 18, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Thursday:
                    ExportData.Add(new ExportItem { Sku = "SKU444", Quantity = 7, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU555", Quantity = 14, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU666", Quantity = 22, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Friday:
                    ExportData.Add(new ExportItem { Sku = "SKU777", Quantity = 9, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU888", Quantity = 11, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU999", Quantity = 30, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Saturday:
                    ExportData.Add(new ExportItem { Sku = "SKU000", Quantity = 6, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU1234", Quantity = 13, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU5678", Quantity = 19, DateAdded = date, Location = "Warehouse C" });
                    break;
                case DayOfWeek.Sunday:
                    ExportData.Add(new ExportItem { Sku = "SKU4321", Quantity = 4, DateAdded = date, Location = "Warehouse A" });
                    ExportData.Add(new ExportItem { Sku = "SKU8765", Quantity = 16, DateAdded = date, Location = "Warehouse B" });
                    ExportData.Add(new ExportItem { Sku = "SKU5432", Quantity = 21, DateAdded = date, Location = "Warehouse C" });
                    break;
            }
        }
    }

    public class ExportItem
    {
        public string Sku { get; set; }
        public int Quantity { get; set; }
        public DateTime DateAdded { get; set; }
        public string Location { get; set; }
    }
}
