using Microsoft.Extensions.DependencyInjection;
using Profitocracy.Core.Domain.Services;

namespace Profitocracy.BusinessLogic;

public static class BusinessLogicRegistry
{
	public static IServiceCollection RegisterServices(this IServiceCollection services)
	{
		return services.AddTransient<IProfileService, ProfileService>();
	}
}