namespace Profitocracy.Infrastructure.Abstractions.Internal;

public interface IInfrastructureMapper<TDomain, TInfrastructure>
{
	public TDomain MapToDomain(TInfrastructure model);
	public TInfrastructure MapToModel(TDomain entity);
}