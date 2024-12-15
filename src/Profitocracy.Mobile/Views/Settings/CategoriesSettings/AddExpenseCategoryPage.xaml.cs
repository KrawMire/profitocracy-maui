using Profitocracy.Mobile.ViewModels.Categories;

namespace Profitocracy.Mobile.Views.Settings.CategoriesSettings;

public partial class AddExpenseCategoryPage : ContentPage
{
    private readonly AddExpenseCategoryPageViewModel _viewModel;
    
    public AddExpenseCategoryPage(AddExpenseCategoryPageViewModel viewModel)
    {
        InitializeComponent();
        
        _viewModel = viewModel;
        BindingContext = _viewModel;
    }

    private async void CloseButton_OnClicked(object? sender, EventArgs e)
    {
        await Navigation.PopModalAsync();
    }

    private async void AddCategoryButton_OnClicked(object? sender, EventArgs e)
    {
        try
        {
            await _viewModel.CreateCategory();
            await Navigation.PopModalAsync();
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", ex.Message, "OK");
        }
    }
}