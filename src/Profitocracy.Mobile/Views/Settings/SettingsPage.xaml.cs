using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Resources.Strings;
using Profitocracy.Mobile.Views.Settings.CategoriesSettings;
using Profitocracy.Mobile.Views.Settings.LanguageSettings;
using Profitocracy.Mobile.Views.Settings.ThemeSettings;

namespace Profitocracy.Mobile.Views.Settings;

public partial class SettingsPage : BaseContentPage
{
	public SettingsPage()
	{
		InitializeComponent();
	}

	private void ProfilesButton_OnClicked(object? sender, TappedEventArgs e)
	{
		DisplayAlert(
			AppResources.InfoAlert_FeatureNotAvailable_Title, 
			AppResources.InfoAlert_FeatureNotAvailable_Message,
			AppResources.InfoAlert_FeatureNotAvailable_Ok);
	}
	
	private void CategoriesButton_OnClicked(object? sender, EventArgs e)
	{
		ProcessAction(async () =>
		{
			var categoriesPage = Handler?.MauiContext?.Services.GetService<ExpenseCategoriesSettingsPage>();

			if (categoriesPage is not null)
			{
				await Navigation.PushAsync(categoriesPage);
			}
		});
	}

	private void ThemeButton_OnClicked(object? sender, TappedEventArgs e)
	{
		ProcessAction(async () =>
		{
			var themePage = Handler?.MauiContext?.Services.GetService<ThemeSettingsPage>();

			if (themePage is not null)
			{
				await Navigation.PushAsync(themePage);
			}
		});
	}

	private void LanguageButton_OnClicked(object? sender, TappedEventArgs e)
	{
		ProcessAction(async () =>
		{
			var langPage = Handler?.MauiContext?.Services.GetService<LanguageSettingsPage>();

			if (langPage is not null)
			{
				await Navigation.PushAsync(langPage);
			}
		});
	}
}