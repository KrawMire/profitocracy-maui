using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Services;

namespace Profitocracy.BusinessLogic.Services;

public class ProfileService : IProfileService
{
	private readonly IProfileRepository _repository;
	
	public ProfileService(IProfileRepository repository)
	{
		_repository = repository ?? throw new ArgumentNullException(nameof(repository));
	}

	public Task<Profile> Create(Profile profile)
	{
		return _repository.Create(profile);
	}

	public Task<Profile?> GetCurrentProfile()
	{
		return _repository.GetCurrentProfile();
	}
}