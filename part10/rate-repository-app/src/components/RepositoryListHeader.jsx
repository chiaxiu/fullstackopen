import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import SortingSelector from './SortingSelector';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8
  }
});

const RepositoryListHeader = ({
  selectedSort,
  setSelectedSort,
  searchKeyword,
  setSearchKeyword
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder='Search'
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <SortingSelector
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </View>
  );
};

export default RepositoryListHeader;
