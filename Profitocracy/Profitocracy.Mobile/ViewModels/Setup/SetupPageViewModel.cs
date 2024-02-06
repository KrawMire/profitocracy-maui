using System.Globalization;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.ViewModels.Common;

namespace Profitocracy.Mobile.ViewModels.Setup;

public class SetupPageViewModel : ViewModelBase
{
    private string _name = "";
    private decimal _initialBalance;

    private readonly IProfileService _profileService;
    
    public SetupPageViewModel(IProfileService profileService)
    {
        _profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
    }

    public string Name
    {
        get => _name;
        set
        {
            if (_name == value)
            {
                return;
            }
            
            _name = value;
            OnPropertyChanged();
        }
    }

    public string InitialBalance
    {
        get => _initialBalance.ToString(CultureInfo.InvariantCulture);
        set
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                _initialBalance = 0;
                OnPropertyChanged();
                return;
            }

            if (!decimal.TryParse(value, out var numValue))
            {
                Shell.Current.DisplayAlert(
                    "Invalid format", 
                    "Balance must be a number", 
                    "OK");
                OnPropertyChanged();
                return;
            }

            if (numValue == _initialBalance)
            {
                return;
            }

            _initialBalance = numValue;
            OnPropertyChanged();
        }
    }

    public async void CreateFirstProfile()
    {
        //TODO: Create initial profile
    }
}