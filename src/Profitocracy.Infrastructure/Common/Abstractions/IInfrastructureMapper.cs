namespace Profitocracy.Infrastructure.Common.Abstractions;

public interface IInfrastructureMapper<TDomain, TInfrastructure>
{
	public TDomain MapToDomain(TInfrastructure model);
	public TInfrastructure MapToModel(TDomain entity);
}