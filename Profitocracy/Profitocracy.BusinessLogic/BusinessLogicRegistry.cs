using Microsoft.Extensions.DependencyInjection;
using Profitocracy.BusinessLogic.Services;
using Profitocracy.Domain.Boundaries.CategoryBoundary.Services;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Services;

namespace Profitocracy.BusinessLogic;

public static class BusinessLogicRegistry
{
	public static IServiceCollection RegisterServices(this IServiceCollection services)
	{
		services.AddTransient<ITransactionService, TransactionService>();
		services.AddTransient<ICategoryService, CategoryService>();
		services.AddTransient<IProfileService, ProfileService>();
		
		return services;
	}
}