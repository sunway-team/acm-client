import { Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';

const { width, height } = Dimensions.get('window');
const { statusBarHeight } = Constants;

// Used via Metrics.baseMargin
const metrics = {
  baseMargin: 8,
  doubleBaseMargin: 16,
  smallMargin: 4,
  largeMargin: 64,
  section: 25,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: (width < height ? height : width) - statusBarHeight,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  circleRadius: 500,
  icons: {
    tiny: 16,
    small: 24,
    medium: 32,
    large: 48,
    xl: 64,
  },
  images: {
    small: 24,
    medium: 48,
    large: 64,
    logo: 256,
  },
};

export default metrics;
