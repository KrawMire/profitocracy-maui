using Microsoft.Extensions.DependencyInjection;
using Profitocracy.Core.Domain.Abstractions.Services;
using Profitocracy.Core.Domain.Services;

namespace Profitocracy.Core;

public static class CoreRegistry
{
    public static IServiceCollection RegisterCoreServices(this IServiceCollection services)
    {
        return services
            .AddTransient<ICalculationService, CalculationService>()
            .AddTransient<ICategoryService, CategoryService>();
    } 
}