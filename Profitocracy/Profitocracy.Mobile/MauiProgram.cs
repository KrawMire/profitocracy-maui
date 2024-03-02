using Microsoft.Extensions.Logging;
using Profitocracy.BusinessLogic;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Infrastructure;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Mappers;
using Profitocracy.Mobile.Models.Profile;
using Profitocracy.Mobile.Models.Transaction;
using Profitocracy.Mobile.ViewModels.Home;
using Profitocracy.Mobile.ViewModels.Setup;
using Profitocracy.Mobile.ViewModels.Transactions;
using Profitocracy.Mobile.Views.Pages.Home;
using Profitocracy.Mobile.Views.Pages.Transactions;
using Profitocracy.Mobile.Views.Setup;
using Profitocracy.Mobile.Views.Transactions;

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
			.RegisterModels()
			.RegisterPresentationMappers();

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
		_ = mauiAppBuilder.Services.AddTransient<HomePageViewModel>();
		_ = mauiAppBuilder.Services.AddTransient<SetupPageViewModel>();
		_ = mauiAppBuilder.Services.AddTransient<AddTransactionPageViewModel>();
		_ = mauiAppBuilder.Services.AddTransient<TransactionPageViewModel>();
		
		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViews(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services.AddSingleton<HomePage>();
		_ = mauiAppBuilder.Services.AddSingleton<SetupPage>();
		_ = mauiAppBuilder.Services.AddSingleton<TransactionsPage>();

		_ = mauiAppBuilder.Services.AddTransient<AddTransactionPage>();
		
		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterModels(this MauiAppBuilder mauiAppBuilder)
	{
		return mauiAppBuilder;
	}
	
	private static MauiAppBuilder RegisterPresentationMappers(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services.AddTransient<IPresentationMapper<Profile, ProfileModel>, ProfileMapper>();
		_ = mauiAppBuilder.Services.AddTransient<IPresentationMapper<Transaction, TransactionModel>, TransactionMapper>();
		
		return mauiAppBuilder;
	} 
}