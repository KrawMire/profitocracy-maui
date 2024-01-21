using Microsoft.Extensions.DependencyInjection;
using Profitocracy.BusinessLogic.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;

namespace Profitocracy.BusinessLogic;

public static class BusinessLogicRegistry
{
	public static IServiceCollection RegisterServices(this IServiceCollection services)
	{
		services.AddTransient<ITransactionService, TransactionService>();
		return services;
	}
}