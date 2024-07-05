import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedSort, searchKeyword, variables) => {
  let orderBy, orderDirection;

  switch (selectedSort) {
    case 'highestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    case 'latest':
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
  }

  const { data, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { ...variables, orderBy, orderDirection, searchKeyword },
      fetchPolicy: 'cache-and-network'
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
        orderBy,
        orderDirection,
        searchKeyword
      }
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result
  };
};

export default useRepositories;
