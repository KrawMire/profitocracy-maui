using Profitocracy.Domain.Boundaries.ProfileBoundary.Aggregate;
using Profitocracy.Domain.Boundaries.ProfileBoundary.Repositories;
using Profitocracy.Infrastructure.Common.Abstractions;
using Profitocracy.Infrastructure.Persistence.Sqlite.Configuration;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Profile;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Repositories;

public class ProfileRepository : IProfileRepository
{
	private readonly DbConnection _dbConnection;
	private readonly IInfrastructureMapper<Profile, ProfileModel> _mapper;
	
	public ProfileRepository(
		DbConnection connection,
		IInfrastructureMapper<Profile, ProfileModel> mapper)
	{
		_dbConnection = connection ?? throw new ArgumentNullException(nameof(connection));
		_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
	}
	
	public async Task<Profile> Create(Profile profile)
	{
		await _dbConnection.Init();
		
		var profileToCreate = _mapper.MapToModel(profile);
		_ = await _dbConnection.Database.InsertAsync(profileToCreate);

		var createdProfile = await _dbConnection.Database
			.Table<ProfileModel>()
			.Where(p => p.Id.Equals(profile.Id))
			.FirstAsync();

		return _mapper.MapToDomain(createdProfile);
	}

	public async Task<Profile?> GetCurrentProfile()
	{
		await _dbConnection.Init();
		var profile = await _dbConnection.Database
			.Table<ProfileModel>()
			.Where(p => p.IsCurrent)
			.FirstOrDefaultAsync();

		if (profile is null)
		{
			return null;
		}

		return _mapper.MapToDomain(profile);
	}
}