using Profitocracy.Mobile.ViewModels.Home;

namespace Profitocracy.Mobile.Views.Pages.Home;

public partial class HomePage : ContentPage
{
	public readonly HomePageViewModel ViewModel;
	
	public HomePage(HomePageViewModel viewModel)
	{
		InitializeComponent();
		
		ViewModel = viewModel ?? throw new ArgumentNullException(nameof(viewModel));
		BindingContext = ViewModel;
	}

	private void HomePage_OnAppear(object? sender, EventArgs e)
	{
		ViewModel.Initialize();
	}
}