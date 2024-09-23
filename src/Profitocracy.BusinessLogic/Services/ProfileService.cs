using Profitocracy.Core.Domain.Model.Profiles;
using Profitocracy.Core.Domain.Model.Profiles.Entities;
using Profitocracy.Core.Domain.Services;
using Profitocracy.Core.Persistence;

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
		_profileRepository = profileRepository;
		_transactionRepository = transactionRepository;
		_categoryRepository = categoryRepository;
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
			var profileCategories = categories.Select(c => new ProfileCategory(c.Id)
			{
				Name = c.Name,
				ActualAmount = 0,
				PlannedAmount = c.PlannedAmount
			});
			
			profile.AddCategories(profileCategories);
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