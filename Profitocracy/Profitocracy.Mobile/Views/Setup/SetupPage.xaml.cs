using Profitocracy.Mobile.ViewModels.Setup;

namespace Profitocracy.Mobile.Views.Setup;

public partial class SetupPage : ContentPage
{
	public readonly SetupPageViewModel ViewModel;
	
	public SetupPage(SetupPageViewModel viewModel)
	{
		InitializeComponent();
		
		ViewModel = viewModel ?? throw new ArgumentNullException(nameof(viewModel));
		BindingContext = ViewModel;
	}
	
	protected override bool OnBackButtonPressed()
	{
		return true;
	}
	
	private async void Button_OnClicked(object? sender, EventArgs e)
	{
		var debugStr = $"{ViewModel.Name} - Profile name,\n{ViewModel.InitialBalance} - Initial Balance";

		await DisplayAlert("Debug info", debugStr, "OK");
		await Shell.Current.Navigation.PopAsync();
	}
}