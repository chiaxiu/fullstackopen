import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  flexContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  infoContainer: {
    marginLeft: 20,
    flex: 1
  },
  langauge: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statItem: {
    alignItems: 'center'
  }
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.flexContainer}>
        <Image style={styles.icon} source={{ uri: `${item.ownerAvatarUrl}` }} />
        <View style={styles.infoContainer}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary'>{item.description}</Text>
          <Text style={styles.langauge}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{formatCount(item.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{formatCount(item.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{formatCount(item.reviewCount)}</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight='bold'>{formatCount(item.ratingAverage)}</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
