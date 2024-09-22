using Profitocracy.Mobile.ViewModels.Categories;

namespace Profitocracy.Mobile.Views.Settings.CategoriesSettings;

public partial class ExpenseCategoriesSettingsPage : ContentPage
{
	public ExpenseCategoriesSettingsPageViewModel ViewModel;
	
	public ExpenseCategoriesSettingsPage(ExpenseCategoriesSettingsPageViewModel viewModel)
	{
		ViewModel = viewModel ?? throw new ArgumentNullException(nameof(viewModel));
		BindingContext = ViewModel;
		
		InitializeComponent();

		CategoriesCollectionView.ItemsSource = ViewModel.Categories;
	}

	private void UpdateCategoriesList(object? sender, EventArgs e)
	{
		ViewModel.Initialize();
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