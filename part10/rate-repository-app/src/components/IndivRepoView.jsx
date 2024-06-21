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
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showGithubButton />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default IndivRepoView;
