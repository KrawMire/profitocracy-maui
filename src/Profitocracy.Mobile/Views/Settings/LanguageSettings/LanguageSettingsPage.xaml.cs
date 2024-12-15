using Profitocracy.Mobile.Resources.Strings;
using Profitocracy.Mobile.Services;
using Profitocracy.Mobile.ViewModels.Settings;

namespace Profitocracy.Mobile.Views.Settings.LanguageSettings;

public partial class LanguageSettingsPage : ContentPage
{
    private readonly LanguageSettingsViewModel _viewModel;
    
    public LanguageSettingsPage(LanguageSettingsViewModel viewModel)
    {
        _viewModel = viewModel;
        InitializeComponent();
        
        BindingContext = _viewModel;
    }
    
    private async void LanguageSettingsPage_OnLoaded(object? sender, EventArgs e)
    {
        await _viewModel.Initialize();
    }
    
    private async void EnglishLanguage_OnSelected(object? sender, TappedEventArgs e)
    {
        await ChangeLanguage(LocalizationService.English);
    }
    
    private async void RussianLanguage_OnSelected(object? sender, TappedEventArgs e)
    {
        await ChangeLanguage(LocalizationService.Russian);
    }

    private async Task ChangeLanguage(string language)
    {
        await _viewModel.ChangeLanguage(language);
        
        await DisplayAlert(
            AppResources.ChangeLanguageAlertTitle, 
            AppResources.ChangeLanguageAlertMessage,
            AppResources.ChangeLanguageAlertOk);
    }
}