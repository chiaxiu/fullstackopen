import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab title='Repositories' route={'/'} />
        {data?.me ? (
          <AppBarTab title='Sign out' route={'/'} onPress={signOut} />
        ) : (
          <AppBarTab title='Sign in' route={'/sign-in'} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
