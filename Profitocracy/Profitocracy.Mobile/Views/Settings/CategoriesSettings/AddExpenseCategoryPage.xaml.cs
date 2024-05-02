using Profitocracy.Mobile.ViewModels.Categories;

namespace Profitocracy.Mobile.Views.Settings.CategoriesSettings;

public partial class AddExpenseCategoryPage : ContentPage
{
    private readonly AddExpenseCategoryPageViewModel ViewModel;
    
    public AddExpenseCategoryPage(AddExpenseCategoryPageViewModel viewModel)
    {
        InitializeComponent();
        
        ViewModel = viewModel;
        BindingContext = ViewModel;
    }

    private async void CloseButton_OnClicked(object? sender, EventArgs e)
    {
        await Navigation.PopModalAsync();
    }

    private async void AddCategoryButton_OnClicked(object? sender, EventArgs e)
    {
        try
        {
            await ViewModel.CreateCategory();
            await Navigation.PopModalAsync();
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", ex.Message, "OK");
        }
    }
}