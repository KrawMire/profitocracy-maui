using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;
using Profitocracy.Domain.Boundaries.TransactionBoundary.Repositories;

namespace Profitocracy.BusinessLogic.Services;

public class ProfileService : IProfileService
{
	private readonly IProfileRepository _profileRepository;
	private readonly ITransactionRepository _transactionRepository;
	
	public ProfileService(IProfileRepository profileRepository, ITransactionRepository transactionRepository)
	{
		_profileRepository = profileRepository ?? throw new ArgumentNullException(nameof(profileRepository));
		_transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
	}

	public Task<Profile> Create(Profile profile)
	{
		return _profileRepository.Create(profile);
	}

	public async Task<Profile?> GetCurrentProfile()
	{
		var profile = await _profileRepository.GetCurrentProfile();

		if (profile is null)
		{
			return null;
		}

		var transactions = await _transactionRepository.GetAllByProfileId(profile.Id);

		foreach (var transaction in transactions)
		{
			profile.HandleTransaction(transaction);
		}

		return profile;
	}
}