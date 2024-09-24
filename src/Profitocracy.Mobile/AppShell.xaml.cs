using Profitocracy.Core.Persistence;
using Profitocracy.Mobile.Constants;
using Profitocracy.Mobile.Views.Setup;

namespace Profitocracy.Mobile;

public partial class AppShell : Shell
{
	private readonly IProfileRepository _profileRepository;
	
	public AppShell(IProfileRepository profileRepository)
	{
		InitializeComponent();
		
		Routing.RegisterRoute(RoutesConstants.SetupPage, typeof(SetupPage));
		_profileRepository = profileRepository;
	}

	private async void AppShell_OnLoaded(object? sender, EventArgs e)
	{
		try
		{
			var profile = await _profileRepository.GetCurrentProfileId();
			
			if (profile is null)
			{
				await Current.GoToAsync(RoutesConstants.SetupPage);
			}
		}
		catch (Exception ex)
		{
			await DisplayAlert("Alert", ex.Message, "OK");
		}
	}
}