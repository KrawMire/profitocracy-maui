using Profitocracy.Mobile.ViewModels.Categories;

namespace Profitocracy.Mobile.Views.Settings.CategoriesSettings;

public partial class ExpenseCategoriesSettingsPage : ContentPage
{
	private readonly ExpenseCategoriesSettingsPageViewModel _viewModel;
	
	public ExpenseCategoriesSettingsPage(ExpenseCategoriesSettingsPageViewModel viewModel)
	{
		_viewModel = viewModel;
		BindingContext = _viewModel;
		
		InitializeComponent();

		CategoriesCollectionView.ItemsSource = _viewModel.Categories;
	}

	private void UpdateCategoriesList(object? sender, EventArgs e)
	{
		_viewModel.Initialize();
	}

	private async void AddCategoryButton_OnClicked(object? sender, EventArgs e)
	{
		var addPage = Handler?.MauiContext?.Services.GetService<AddExpenseCategoryPage>();

		if (addPage is null)
		{
			await DisplayAlert(
				"Error",
				"Cannot open category adding page",
				"OK");
			return;
		}

		await Navigation.PushModalAsync(addPage);
	}

	private void SwipeItem_OnInvoked(object? sender, EventArgs e)
	{
		
	}
}