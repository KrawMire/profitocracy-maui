using Profitocracy.Mobile.ViewModels.Setup;

namespace Profitocracy.Mobile.Views.Setup;

public partial class SetupPage : ContentPage
{
	private readonly SetupPageViewModel _viewModel;
	
	public SetupPage(SetupPageViewModel viewModel)
	{
		InitializeComponent();
		
		_viewModel = viewModel;
		BindingContext = _viewModel;
	}
	
	protected override bool OnBackButtonPressed()
	{
		return true;
	}
	
	private async void Button_OnClicked(object? sender, EventArgs e)
	{
		try
		{
			await _viewModel.CreateFirstProfile();
			await Navigation.PopModalAsync();
		}
		catch (Exception ex)
		{
			await DisplayAlert("Error", ex.Message, "OK");
		}
	}
}