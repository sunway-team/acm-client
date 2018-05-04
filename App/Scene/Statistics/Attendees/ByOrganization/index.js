import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LoadingIndicator } from 'Component';
import { compose, gql, graphql } from 'react-apollo';
import styles from '../styles';
import GET_ATTENDEES_STATISTIC_BY_ORGANIZATION from 'Graphql/query/getAttendeesStatisticByOrganization.graphql';
import { ChartComponent } from 'Scene/Statistics/ChartComponent';

class AttendeesStatisticByOrganization extends Component {
  static _renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  render() {
    if (this.props.data.loading) {
      return AttendeesStatisticByOrganization._renderLoading();
    }

    return (
      <ChartComponent
        data={this.props.data.getAttendeesStatisticByOrganization}
        description={'The percentage of attendees based on organizations'}
        unitLabel={'people'}
      />
    );
  }
}

AttendeesStatisticByOrganization.propTypes = {
  data: PropTypes.object,
};

export default compose(graphql(gql(GET_ATTENDEES_STATISTIC_BY_ORGANIZATION)))(
  AttendeesStatisticByOrganization,
);