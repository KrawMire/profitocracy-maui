namespace Profitocracy.Mobile.Views.Setup;

public partial class SetupPage : ContentPage
{
	public SetupPage()
	{
		InitializeComponent();
	}
	
	protected override bool OnBackButtonPressed()
	{
		return true;
	}
	
	private void Button_OnClicked(object? sender, EventArgs e)
	{
		Shell.Current.Navigation.PopAsync();
	}
}