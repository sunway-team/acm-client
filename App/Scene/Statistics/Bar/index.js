import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, LoadingIndicator } from 'Component';
import { compose } from 'react-apollo';
import styles from './styles';
import { Metrics, Colors } from 'Theme';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

class BarChartScene extends Component {
  constructor(props) {
    super(props);
  }

  _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    return (
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={50}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    );
  }
}

BarChartScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

BarChartScene.footer = {
  activeColor: Colors.primary,
  show: true,
};

BarChartScene.propTypes = {
  data: PropTypes.object,
};

export default BarChartScene;
