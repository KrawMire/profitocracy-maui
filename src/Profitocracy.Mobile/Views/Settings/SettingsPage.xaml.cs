using Profitocracy.Mobile.Views.Settings.CategoriesSettings;
using Profitocracy.Mobile.Views.Settings.LanguageSettings;
using Profitocracy.Mobile.Views.Settings.ThemeSettings;

namespace Profitocracy.Mobile.Views.Settings;

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

	private void ThemeButton_OnClicked(object? sender, TappedEventArgs e)
	{
		var themePage = Handler?.MauiContext?.Services.GetService<ThemeSettingsPage>();

		if (themePage is not null)
		{
			Navigation.PushAsync(themePage);
		}
	}

	private void LanguageButton_OnClicked(object? sender, TappedEventArgs e)
	{
		var langPage = Handler?.MauiContext?.Services.GetService<LanguageSettingsPage>();

		if (langPage is not null)
		{
			Navigation.PushAsync(langPage);
		}
	}
}