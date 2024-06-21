import { format } from 'date-fns/format';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

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
  }
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
