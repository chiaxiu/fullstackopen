import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ title, route }) => {
  return (
    <Link to={route} style={{ marginRight: 10 }}>
      <Text color='header' fontSize='subheading' fontWeight='bold'>
        {title}
      </Text>
    </Link>
  );
};

export default AppBarTab;
