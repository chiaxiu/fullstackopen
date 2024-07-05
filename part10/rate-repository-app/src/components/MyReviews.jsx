// src/components/MyReviews.jsx

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import Text from './Text';
import ReviewItem from './ReviewItem';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  separator: {
    height: 5,
    backgroundColor: theme.colors.mainBackground
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          navigateToRepository={(repoId) => navigate(`/repository/${repoId}`)}
          refetch={refetch}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default MyReviews;
