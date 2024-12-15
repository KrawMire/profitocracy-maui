using Profitocracy.Core.Domain.Model.Settings.ValueObjects;
using Profitocracy.Mobile.ViewModels.Settings;

namespace Profitocracy.Mobile.Views.Settings.ThemeSettings;

public partial class ThemeSettingsPage : ContentPage
{
    private readonly ThemeSettingsPageViewModel _viewModel;
    
    public ThemeSettingsPage(ThemeSettingsPageViewModel viewModel)
    {
        _viewModel = viewModel;
        BindingContext = _viewModel;
        InitializeComponent();
    }
    
    private async Task ChangeTheme(Theme theme)
    {
        try
        {
            await _viewModel.ChangeTheme(theme);
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", ex.Message, "OK");
        }
    }

    private async void LightTheme_OnSelected(object? sender, EventArgs e)
    {
        await ChangeTheme(Theme.Light);
    }

    private async void DarkTheme_OnSelected(object? sender, EventArgs e)
    {
        await ChangeTheme(Theme.Dark);
    }

    private async void SystemTheme_OnSelected(object? sender, EventArgs e)
    {
        await ChangeTheme(Theme.System);
    }

    private async void ThemeSettingsPage_OnLoaded(object? sender, EventArgs e)
    {
        await _viewModel.Initialize();
    }
}