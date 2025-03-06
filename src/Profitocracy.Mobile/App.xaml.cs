namespace Profitocracy.Mobile;

public partial class App : Application
{
	private readonly AppInit _appInit;
	private readonly IServiceProvider _serviceProvider;
	
	public App(AppInit appInit, IServiceProvider serviceProvider)
	{
		InitializeComponent();
		
		_appInit = appInit;
		_serviceProvider = serviceProvider;
	}

	protected override Window CreateWindow(IActivationState? activationState)
	{
		_appInit.Initialized += (_, _) => Windows[0].Page = _serviceProvider.GetRequiredService<AppShell>();
		Windows[0].Page = _appInit;

		return Windows[0];
	}
}