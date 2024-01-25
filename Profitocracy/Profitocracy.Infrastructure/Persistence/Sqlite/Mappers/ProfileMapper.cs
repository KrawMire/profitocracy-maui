using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Factories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

public class ProfileMapper : IInfrastructureMapper<Profile, ProfileModel>
{
	public Profile MapToDomain(ProfileModel model)
	{
		var modelCurrency = model.Settings.Currency;
		var builder = new ProfileBuilder(model.Id)
			.AddBalance(model.Balance)
			.AddSavedBalance(model.SavedBalance)
			.AddName(model.Name)
			.AddStartDate(model.StartDate.Timestamp, model.StartDate.InitialBalance)
			.AddCurrency(modelCurrency.Code, modelCurrency.Name, modelCurrency.Symbol)
			.AddIsCurrent(model.IsCurrent);

		if (model.Categories is not null)
		{
			foreach (var modelCategory in model.Categories)
			{
				builder.AddCategoryExpense(
					modelCategory.CategoryId, 
					modelCategory.Name, 
					modelCategory.PlannedAmount);
			}	
		}

		return builder.Build();
	}

	public ProfileModel MapToModel(Profile entity)
	{
		var anchorDate = new AnchorDateModel
		{
			Timestamp = entity.StartDate.Timestamp,
			InitialBalance = entity.StartDate.InitialBalance
		};

		var categories = entity.CategoriesBalances
			.Select(c => new ProfileCategoryModel
			{
				CategoryId = c.Id,
				Name = c.Name,
				PlannedAmount = c.PlannedAmount
			})
			.ToList();
		
		return new ProfileModel
		{
			Id = entity.Id,
			Name = entity.Name,
			StartDate = anchorDate,
			Balance = entity.Balance,
			SavedBalance = entity.SavedBalance,
			IsCurrent = entity.IsCurrent,
			Categories = categories,
			Settings = new ProfileSettingsModel
			{
				Currency = new CurrencyModel
				{
					Code = entity.Settings.Currency.Code,
					Name = entity.Settings.Currency.Name,
					Symbol = entity.Settings.Currency.Symbol
				}
			}
		};
	}
}