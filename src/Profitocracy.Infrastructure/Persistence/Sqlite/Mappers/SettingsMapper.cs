using Profitocracy.Core.Domain.Model.Settings;
using Profitocracy.Core.Domain.Model.Settings.ValueObjects;
using Profitocracy.Infrastructure.Abstractions.Internal;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Settings;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

internal class SettingsMapper : IInfrastructureMapper<Settings, SettingsModel>
{
    public Settings MapToDomain(SettingsModel model)
    {
        return new Settings(
            model.Id,
            (Theme)model.Theme,
            model.Language);
    }

    public SettingsModel MapToModel(Settings entity)
    {
        return new SettingsModel
        {
            Id = entity.Id,
            Theme = (short)entity.Theme,
            Language = entity.Language
        };
    }
}