using CommunityToolkit.Maui;
using Microsoft.Extensions.Logging;
using Profitocracy.BusinessLogic;
using Profitocracy.Core.Domain.Model.Categories;
using Profitocracy.Core.Domain.Model.Profiles;
using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Infrastructure;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Mappers;
using Profitocracy.Mobile.Models.Category;
using Profitocracy.Mobile.Models.Profile;
using Profitocracy.Mobile.Models.Transaction;
using Profitocracy.Mobile.ViewModels.Categories;
using Profitocracy.Mobile.ViewModels.Home;
using Profitocracy.Mobile.ViewModels.Setup;
using Profitocracy.Mobile.ViewModels.Transactions;
using Profitocracy.Mobile.Views.Home;
using Profitocracy.Mobile.Views.Settings.CategoriesSettings;
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
			.UseMauiCommunityToolkit()
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
		
		builder.Services
			.RegisterInfrastructureServices(infrastructureConfig)
			.RegisterServices()
			.AddSingleton<TransactionsPage>();

		return builder.Build();
	}
	
	private static MauiAppBuilder RegisterAppServices(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services.AddSingleton<AppShell>();

		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViewModels(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services
			.AddTransient<HomePageViewModel>()
			.AddTransient<SetupPageViewModel>()
			.AddTransient<AddTransactionPageViewModel>()
			.AddTransient<FilteredTransactionsPageViewModel>()
			.AddTransient<TransactionPageViewModel>()
			.AddTransient<ExpenseCategoriesSettingsPageViewModel>()
			.AddTransient<AddExpenseCategoryPageViewModel>();
		
		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterViews(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services
			.AddSingleton<HomePage>()
			.AddSingleton<SetupPage>()
			.AddSingleton<TransactionsPage>()
			.AddTransient<FilteredTransactionsPage>()
			.AddTransient<AddTransactionPage>()
			.AddTransient<ExpenseCategoriesSettingsPage>()
			.AddTransient<AddExpenseCategoryPage>();
		
		return mauiAppBuilder;
	}

	private static MauiAppBuilder RegisterModels(this MauiAppBuilder mauiAppBuilder)
	{
		return mauiAppBuilder;
	}
	
	private static MauiAppBuilder RegisterPresentationMappers(this MauiAppBuilder mauiAppBuilder)
	{
		_ = mauiAppBuilder.Services
			.AddTransient<IPresentationMapper<Profile, ProfileModel>, ProfileMapper>()
			.AddTransient<IPresentationMapper<Transaction, TransactionModel>, TransactionMapper>()
			.AddTransient<IPresentationMapper<Category, CategoryModel>, CategoryMapper>();
		
		return mauiAppBuilder;
	} 
}