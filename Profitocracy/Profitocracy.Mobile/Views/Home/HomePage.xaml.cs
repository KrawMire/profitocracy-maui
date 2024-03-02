using Profitocracy.Mobile.ViewModels.Home;

namespace Profitocracy.Mobile.Views.Pages.Home;

public partial class HomePage : ContentPage
{
	public readonly HomePageViewModel ViewModel;
	
	public HomePage(HomePageViewModel viewModel)
	{
		ViewModel = viewModel ?? throw new ArgumentNullException(nameof(viewModel));
		BindingContext = ViewModel;
		InitializeComponent();
	}

	private void HomePage_OnNavigated(object? sender, EventArgs e)
	{
		ViewModel.Initialize();
	}
}