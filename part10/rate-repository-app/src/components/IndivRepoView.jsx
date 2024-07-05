import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.mainBackground
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const IndivRepoView = () => {
  const { id } = useParams();
  const { data, loading, error, refetch, fetchMore } = useQuery(
    GET_REPOSITORY,
    {
      variables: { id, first: 4 },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  const onEndReached = () => {
    if (!repository.reviews.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first: 4,
        after: repository.reviews.pageInfo.endCursor
      }
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default IndivRepoView;
