using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using vega_aspnetcore_angular.Core.Models;

namespace vega_aspnetcore_angular.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMapping)
        {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMapping.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.IsSortAscending)
                return query.OrderBy(columnsMapping[queryObj.SortBy]);
            else
            {
                return query.OrderByDescending(columnsMapping[queryObj.SortBy]);
            }
        }
    }
}