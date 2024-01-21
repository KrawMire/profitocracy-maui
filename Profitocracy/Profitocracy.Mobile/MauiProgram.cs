using Microsoft.Extensions.Logging;
using Profitocracy.BusinessLogic;
using Profitocracy.Infrastructure;
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
			});

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
}