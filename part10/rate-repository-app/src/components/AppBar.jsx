import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab title='Repositories' route={'/'} />
        <AppBarTab title='Sign in' route={'/sign-in'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
