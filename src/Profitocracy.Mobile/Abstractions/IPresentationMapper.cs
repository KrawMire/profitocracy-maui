namespace Profitocracy.Mobile.Abstractions;

public interface IPresentationMapper<TDomain, TModel>
{
    public TDomain MapToDomain(TModel model);
    public TModel MapToModel(TDomain entity);
}