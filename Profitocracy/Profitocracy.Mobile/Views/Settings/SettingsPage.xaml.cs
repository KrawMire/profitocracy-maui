namespace Profitocracy.Mobile.Views.Pages.Settings;

public partial class SettingsPage : ContentPage
{
	public SettingsPage()
	{
		InitializeComponent();
	}

	private void ThemeSettingsButton_OnClicked(object? sender, EventArgs e)
	{
		
	}

	private void CategoriesButton_OnClicked(object? sender, EventArgs e)
	{
		Navigation.PushAsync(new ExpenseCategoriesSettingsPage());
	}
}