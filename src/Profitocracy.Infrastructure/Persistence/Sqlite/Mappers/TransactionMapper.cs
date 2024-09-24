using Profitocracy.Core.Domain.Model.Transactions;
using Profitocracy.Core.Domain.Model.Transactions.Entities;
using Profitocracy.Core.Domain.Model.Transactions.Factories;
using Profitocracy.Core.Domain.Model.Transactions.ValueObjects;
using Profitocracy.Infrastructure.Abstractions.Internal;
using Profitocracy.Infrastructure.Persistence.Sqlite.Models.Transaction;

namespace Profitocracy.Infrastructure.Persistence.Sqlite.Mappers;

internal class TransactionMapper : IInfrastructureMapper<Transaction, TransactionModel>
{
	public Transaction MapToDomain(TransactionModel model)
	{
		TransactionGeoTag? geoTag = null;
		TransactionCategory? category = null;
		
		if (model.GeoTagLongitude is not null && model.GeoTagLatitude is not null)
		{
			geoTag = new TransactionGeoTag
			{
				Latitude = (double)model.GeoTagLatitude,
				Longitude = (double)model.GeoTagLongitude
			};
		}

		if (model.CategoryId is not null && model.CategoryName is not null)
		{
			category = new TransactionCategory((Guid)model.CategoryId)
			{
				Name = model.CategoryName
			};
		}
		
		return TransactionFactory.CreateTransaction(
			model.Id,
			model.Amount,
			model.ProfileId,
			(TransactionType)model.Type,
			model.SpendingType is null ? null : (SpendingType)model.SpendingType,
			model.Timestamp,
			model.Description,
			geoTag,
			category);
	}

	public TransactionModel MapToModel(Transaction entity)
	{
		return new TransactionModel
		{
			Id = entity.Id,
			Amount = entity.Amount,
			ProfileId = entity.ProfileId,
			Type = (short)entity.Type,
			SpendingType = entity.SpendingType is null ? null : (short)entity.SpendingType,
			Timestamp = entity.Timestamp,
			Description = entity.Description,
			GeoTagLatitude = entity.GeoTag?.Latitude,
			GeoTagLongitude = entity.GeoTag?.Longitude,
			CategoryId = entity.Category?.Id,
			CategoryName = entity.Category?.Name
		};
	}
}