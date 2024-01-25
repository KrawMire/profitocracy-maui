using Microsoft.Extensions.DependencyInjection;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;
using Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;
using Profitocracy.Infrastructure.Persistence.Sqlite.Repositories;

namespace Profitocracy.Infrastructure;

public static class InfrastructureRegistry
{
	public static void RegisterInfrastructureServices(this IServiceCollection services, InfrastructureConfiguration configuration)
	{
		RegisterPersistence(services, configuration);
		RegisterMappers(services);
	}
	
	private static void RegisterPersistence(this IServiceCollection services, InfrastructureConfiguration configuration)
	{
		services.AddSingleton(configuration);
		services.AddTransient<DbConnection>();
		
		services.AddTransient<ITransactionRepository, TransactionRepository>();
		services.AddTransient<IProfileRepository, ProfileRepository>();
		services.AddTransient<ICategoryRepository, CategoryRepository>();
	}

	private static void RegisterMappers(this IServiceCollection services)
	{
		services.AddTransient<IInfrastructureMapper<Transaction, TransactionModel>, TransactionMapper>();
	}
}