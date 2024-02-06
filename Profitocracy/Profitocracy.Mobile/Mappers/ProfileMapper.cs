using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Factories;
using Profitocracy.Mobile.Abstractions;
using Profitocracy.Mobile.Models.Profile;

namespace Profitocracy.Mobile.Mappers;

public class ProfileMapper : IPresentationMapper<Profile, ProfileModel>
{
    public Profile MapToDomain(ProfileModel model)
    {
        var builder = new ProfileBuilder(model.Id)
            .AddName(model.Name)
            .AddStartDate(model.StartDate, model.InitialBalance)
            .AddBalance(model.Balance)
            .AddSavedBalance(model.SavedBalance)
            .AddCurrency(model.Currency.Code, model.Currency.Name, model.Currency.Symbol)
            .AddIsCurrent(model.IsCurrent);
        
        foreach (var category in model.CategoriesBalances)
        {
            builder.AddCategoryExpense(category.CategoryId, category.Name, category.PlannedAmount);
        }
        
        return builder.Build();
    }

    public ProfileModel MapToModel(Profile entity)
    {
        var categories = new List<CategoryExpenseModel>();

        foreach (var category in entity.CategoriesBalances)
        {
            var newCategoryModel = new CategoryExpenseModel
            {
                CategoryId = category.Id,
                Name = category.Name,
                ActualAmount = category.ActualAmount,
                PlannedAmount = category.PlannedAmount
            };
            categories.Add(newCategoryModel);
        }
        
        var profileModel = new ProfileModel
        {
            Id = entity.Id,
            Name = entity.Name,
            StartDate = entity.StartDate.Timestamp,
            InitialBalance = entity.StartDate.InitialBalance,
            Balance = entity.Balance,
            SavedBalance = entity.SavedBalance,
            
            CategoriesBalances = categories,
            Currency = new CurrencyModel
            {
                Code = entity.Settings.Currency.Code,
                Name = entity.Settings.Currency.Name,
                Symbol = entity.Settings.Currency.Symbol,
            },
            IsCurrent = entity.IsCurrent
        };

        return profileModel;
    }
}