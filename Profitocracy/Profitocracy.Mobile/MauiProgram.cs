using Microsoft.Extensions.Logging;
using Profitocracy.BusinessLogic;
using Profitocracy.Infrastructure;
using Profitocracy.Mobile.Views.Pages.Home;
using Profitocracy.Mobile.Views.Pages.Transactions;

namespace Profitocracy.Mobile;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			})
			.RegisterAppServices()
			.RegisterViewModels()
			.RegisterViews()
			.RegisterModels();

#if DEBUG
		builder.Logging.AddDebug();
#endif

		var infrastructureConfig = new InfrastructureConfiguration
		{
			AppDirectoryPath = FileSystem.AppDataDirectory 
		};
		
		builder.Services.RegisterInfrastructureServices(infrastructureConfig);
		builder.Services.RegisterServices();
		builder.Services.AddSingleton<TransactionsPage>();

		return builder.Build();
	}
	
	private static MauiAppBuilder RegisterAppServices(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services.AddSingleton<AppShell>();

		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViewModels(this MauiAppBuilder mauiAppBuilder)
	{

		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViews(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services.AddSingleton<HomePage>();
		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterModels(this MauiAppBuilder mauiAppBuilder)
	{

		return mauiAppBuilder;
	}
}