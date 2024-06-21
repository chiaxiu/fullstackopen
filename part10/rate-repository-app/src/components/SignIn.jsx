import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
  },
  input: {
    height: 40,
    borderColor: theme.colors.appBarBackground,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: theme.colors.mainBackground
  },
  errorInput: {
    borderColor: theme.colors.error
  },
  errorText: {
    color: theme.colors.error,
    marginTop: -10,
    marginBottom: 10
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10
  }
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: ''
  };

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const result = await signIn({ username, password });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        onBlur={formik.handleBlur('password')}
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight='bold' color='header'>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
