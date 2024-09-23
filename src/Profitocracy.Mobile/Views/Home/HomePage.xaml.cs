using Profitocracy.Mobile.ViewModels.Home;

namespace Profitocracy.Mobile.Views.Pages.Home;

public partial class HomePage : ContentPage
{
	public readonly HomePageViewModel ViewModel;
	
	public HomePage(HomePageViewModel viewModel)
	{
		ViewModel = viewModel;
		BindingContext = ViewModel;
		InitializeComponent();

		CategoriesExpensesCollectionView.ItemsSource = ViewModel.CategoriesExpenses;
	}

	private void HomePage_OnNavigated(object? sender, EventArgs e)
	{
		ViewModel.Initialize();
	}
}