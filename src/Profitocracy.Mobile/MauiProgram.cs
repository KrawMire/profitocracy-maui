using Microsoft.Extensions.Logging;
using Profitocracy.Core;
using Profitocracy.Infrastructure;
using Profitocracy.Mobile.ViewModels.Categories;
using Profitocracy.Mobile.ViewModels.Home;
using Profitocracy.Mobile.ViewModels.Settings;
using Profitocracy.Mobile.ViewModels.Setup;
using Profitocracy.Mobile.ViewModels.Transactions;
using Profitocracy.Mobile.Views.Home;
using Profitocracy.Mobile.Views.Settings.CategoriesSettings;
using Profitocracy.Mobile.Views.Settings.LanguageSettings;
using Profitocracy.Mobile.Views.Settings.ThemeSettings;
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
			.RegisterViews();

		
#if DEBUG
		builder.Logging.AddDebug();
#endif

		var infrastructureConfig = new InfrastructureConfiguration
		{
			AppDirectoryPath = FileSystem.AppDataDirectory 
		};
		
		builder.Services
			.RegisterInfrastructureServices(infrastructureConfig)
			.RegisterCoreServices()
			.AddSingleton<TransactionsPage>();

		return builder.Build();
	}
	
	private static MauiAppBuilder RegisterAppServices(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services
			.AddSingleton<AppShell>()
			.AddSingleton<AppInit>();

		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViewModels(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services
			.AddTransient<HomePageViewModel>()
			.AddTransient<SetupPageViewModel>()
			.AddTransient<EditTransactionPageViewModel>()
			.AddTransient<FilteredTransactionsPageViewModel>()
			.AddTransient<TransactionsPageViewModel>()
			.AddTransient<ExpenseCategoriesSettingsPageViewModel>()
			.AddTransient<AddExpenseCategoryPageViewModel>()
			.AddTransient<LanguageSettingsViewModel>()
			.AddTransient<ThemeSettingsPageViewModel>();
		
		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViews(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services
			.AddSingleton<HomePage>()
			.AddSingleton<SetupPage>()
			.AddSingleton<TransactionsPage>()
			.AddTransient<FilteredTransactionsPage>()
			.AddTransient<EditTransactionPage>()
			.AddTransient<ExpenseCategoriesSettingsPage>()
			.AddTransient<ThemeSettingsPage>()
			.AddTransient<LanguageSettingsPage>()
			.AddTransient<AddExpenseCategoryPage>();
		
		return mauiAppBuilder;
	}
}