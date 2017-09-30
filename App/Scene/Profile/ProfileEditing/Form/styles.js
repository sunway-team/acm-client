import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, primary } = Colors;

const ProfileEditing = StyleSheet.create({
  formContainer: { padding: baseMargin },
  inputContainer: { marginBottom: doubleBaseMargin },
  submitBtn: {
    marginTop: doubleBaseMargin,
    backgroundColor: primary,
    padding: baseMargin,
  },
  submitTitle: {
    textAlign: 'center',
    color: white,
  },
});

export default ProfileEditing;