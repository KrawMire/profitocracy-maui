using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.ViewModels.Categories;

namespace Profitocracy.Mobile.Views.Settings.CategoriesSettings;

public partial class AddExpenseCategoryPage : BaseContentPage
{
    private readonly AddExpenseCategoryPageViewModel _viewModel;
    
    public AddExpenseCategoryPage(AddExpenseCategoryPageViewModel viewModel)
    {
        InitializeComponent();
        
        _viewModel = viewModel;
        BindingContext = _viewModel;
    }

    private void CloseButton_OnClicked(object? sender, EventArgs e)
    {
        ProcessAction(async () =>
        {
            await Navigation.PopModalAsync(); 
        });
    }

    private void AddCategoryButton_OnClicked(object? sender, EventArgs e)
    {
        ProcessAction(async () =>
        {
            await _viewModel.CreateCategory();
            await Navigation.PopModalAsync();
        });
    }
}