using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;

namespace Profitocracy.Mobile.Views.Pages.Home;

public partial class HomePage : ContentPage
{
	private readonly IProfileService _profileService;
	public HomePage(IProfileService profileService)
	{
		_profileService = profileService;
		InitializeComponent();
	}
}