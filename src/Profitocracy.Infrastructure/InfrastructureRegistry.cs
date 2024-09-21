using Microsoft.Extensions.DependencyInjection;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;
using Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Category;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;
using Profitocracy.Infrastructure.Persistence.Sqlite.Repositories;

namespace Profitocracy.Infrastructure;

public static class InfrastructureRegistry
{
	public static IServiceCollection RegisterInfrastructureServices(this IServiceCollection services, InfrastructureConfiguration configuration)
	{
		return services
			.RegisterPersistence(configuration)
			.RegisterMappers()
			.RegisterRepositories();
	}
	
	private static IServiceCollection RegisterPersistence(this IServiceCollection services, InfrastructureConfiguration configuration)
	{
		return services
			.AddSingleton(configuration)
			.AddTransient<DbConnection>();
	}

	private static IServiceCollection RegisterMappers(this IServiceCollection services)
	{
		return services
			.AddTransient<IInfrastructureMapper<Transaction, TransactionModel>, TransactionMapper>()
			.AddTransient<IInfrastructureMapper<Profile, ProfileModel>, ProfileMapper>()
			.AddTransient<IInfrastructureMapper<Category, CategoryModel>, CategoryMapper>();
	}

	private static IServiceCollection RegisterRepositories(this IServiceCollection services)
	{
		return services
			.AddTransient<ITransactionRepository, TransactionRepository>()
			.AddTransient<IProfileRepository, ProfileRepository>()
			.AddTransient<ICategoryRepository, CategoryRepository>();
	}
}