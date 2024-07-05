import React from 'react';
import { View, StyleSheet, Pressable, Button, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    flexDirection: 'row'
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  infoContainer: {
    flex: 1
  },
  username: {
    fontWeight: 'bold'
  },
  date: {
    color: theme.colors.textSecondary
  },
  text: {
    marginTop: 5
  },
  repositoryName: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  }
});

const ReviewItem = ({ review, navigateToRepository, refetch }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({ variables: { id: review.id } });
            refetch();
          },
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        {navigateToRepository && (
          <Pressable onPress={() => navigateToRepository(review.repository.id)}>
            <Text style={styles.repositoryName}>
              {review.repository.fullName}
            </Text>
          </Pressable>
        )}
        <Text style={styles.username}>{review.user?.username || 'You'}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title='View Repository'
            onPress={() => navigateToRepository(review.repository.id)}
          />
          <Button
            title='Delete Review'
            onPress={handleDelete}
            color={theme.colors.error}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
