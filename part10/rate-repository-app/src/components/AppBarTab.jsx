import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ title, route, onPress }) => {
  return (
    <Link to={route} style={{ marginRight: 10 }} onPress={onPress}>
      <Text color='header' fontSize='subheading' fontWeight='bold'>
        {title}
      </Text>
    </Link>
  );
};

export default AppBarTab;
