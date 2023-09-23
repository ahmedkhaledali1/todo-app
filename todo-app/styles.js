import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: '6px',
  },

  heading: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  container: {
    padding: 15,
  },
  loginScreen: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 12,
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    marginTop: '20px',
    backgroundColor: '#0D4C92',
    padding: 15,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#CDF0EA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  todoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  subTitle: {
    opacity: 0.6,
    textDecorationLine: 'underline',
  },
  form: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  modalScreen: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    width: '95%',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#0D4C92',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  comment: { marginBottom: 20 },
  message: {
    padding: 15,
    backgroundColor: '#CDF0EA',
    width: '80%',
    borderRadius: 10,
  },
});
