using Profitocracy.Domain.Boundaries.CategoryBoundary.Repositories;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate.Entities;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;

namespace Profitocracy.BusinessLogic.Services;

internal class ProfileService : IProfileService
{
	private readonly IProfileRepository _profileRepository;
	private readonly ITransactionRepository _transactionRepository;
	private readonly ICategoryRepository _categoryRepository;
	
	public ProfileService(
		IProfileRepository profileRepository, 
		ITransactionRepository transactionRepository, 
		ICategoryRepository categoryRepository)
	{
		_profileRepository = profileRepository ?? throw new ArgumentNullException(nameof(profileRepository));
		_transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
		_categoryRepository = categoryRepository ?? throw new ArgumentNullException(nameof(categoryRepository));
	}

	public Task<Profile> Create(Profile profile)
	{
		return _profileRepository.Create(profile);
	}

	public Task<Guid?> GetCurrentProfileId()
	{
		return _profileRepository.GetCurrentProfileId();
	}

	public async Task<Profile?> GetCurrentProfile()
	{
		var profile = await _profileRepository.GetCurrentProfile();

		if (profile is null)
		{
			return null;
		}
		
		var transactions = await _transactionRepository.GetForPeriod(
			profile.Id, 
			profile.BillingPeriod.DateFrom, 
			profile.BillingPeriod.DateTo);
		
		var categories = await _categoryRepository.GetAllByProfileId(profile.Id);

		if (categories.Count > 0)
		{
			foreach (var category in categories)
			{
				profile.CategoriesBalances.Add(new ProfileCategory(category.Id)
				{
					Name = category.Name,
					ActualAmount = 0,
					PlannedAmount = category.PlannedAmount
				});
			}	
		}
		
		profile.HandleTransactions(transactions);

		if (!profile.NeedUpdate)
		{
			return profile;
		}
		
		profile = await _profileRepository.Update(profile);
		profile.HandleTransactions(transactions);

		return profile;
	}
}