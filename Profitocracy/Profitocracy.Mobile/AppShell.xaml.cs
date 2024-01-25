using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Mobile.Views.Setup;

namespace Profitocracy.Mobile;

public partial class AppShell : Shell
{
	private readonly IProfileService _profileService;
	
	public AppShell(IProfileService profileService)
	{
		InitializeComponent();
		
		Routing.RegisterRoute("SetupFirstProfile", typeof(SetupPage));

		_profileService = profileService ?? throw new ArgumentNullException(nameof(profileService));
	}

	private async void AppShell_OnLoaded(object? sender, EventArgs e)
	{
		try
		{
			var profile = await _profileService.GetCurrentProfile();
			
			if (profile is null)
			{
				await Current.GoToAsync("SetupFirstProfile");
			}
		}
		catch (Exception ex)
		{
			await DisplayAlert("Alert", ex.Message, "OK");
		}
	}
}