using Profitocracy.Mobile.ViewModels.Setup;

namespace Profitocracy.Mobile.Views.Setup;

public partial class SetupPage : ContentPage
{
	public readonly SetupPageViewModel ViewModel;
	
	public SetupPage(SetupPageViewModel viewModel)
	{
		InitializeComponent();
		
		ViewModel = viewModel;
		BindingContext = ViewModel;
	}
	
	protected override bool OnBackButtonPressed()
	{
		return true;
	}
	
	private async void Button_OnClicked(object? sender, EventArgs e)
	{
		try
		{
			ViewModel.CreateFirstProfile();
			await Navigation.PopModalAsync();
		}
		catch (Exception ex)
		{
			await DisplayAlert("Error", ex.Message, "OK");
		}
	}
}