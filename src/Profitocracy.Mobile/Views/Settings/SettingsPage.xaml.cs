using Profitocracy.Mobile.Views.Settings.CategoriesSettings;

namespace Profitocracy.Mobile.Views.Pages.Settings;

public partial class SettingsPage : ContentPage
{
	public SettingsPage()
	{
		InitializeComponent();
	}

	private void CategoriesButton_OnClicked(object? sender, EventArgs e)
	{
		var categoriesPage = Handler?.MauiContext?.Services.GetService<ExpenseCategoriesSettingsPage>();

		if (categoriesPage is not null)
		{
			Navigation.PushAsync(categoriesPage);	
		}
	}
}