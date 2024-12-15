namespace Profitocracy.Mobile;

public partial class App : Application
{
	public App(AppInit appInit, IServiceProvider serviceProvider)
	{
		InitializeComponent();
		appInit.Initialized += (_, _) => MainPage = serviceProvider.GetRequiredService<AppShell>();

		MainPage = appInit;
	}
}