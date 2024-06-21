import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username: username, password: password } }
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    navigate('/');

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
