import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { View } from 'react-native';
import styles from './styles';
import { Colors } from '~/Theme';
import { News, LoadingIndicator } from '~/Component';
import NewsFeedPosting from './NewsFeedPosting';

import ALL_NEWS_QUERY from '~/Graphql/query/getAllNews.graphql';
import INSERT_NEWS_MUTATION from '~/Graphql/mutation/insertNews.graphql';
import ME_QUERY from '~/Graphql/query/me.graphql';

// const isDuplicateNews = (newNews, existingNews) => {
//   if (existingNews !== undefined) {
//     return (
//       newNews.id !== null &&
//       existingNews.some(oldNews => newNews.id === oldNews.id)
//     );
//   }
// };

const PAGE_SIZE = 10;

class NewsFeedScene extends Component {
  constructor(props) {
    super(props);

    this._onRefresh = this._onRefresh.bind(this);
    this._onEndReached = this._onEndReached.bind(this);
    this.post = this.post.bind(this);
  }

  _onRefresh() {
    this.props.refetch();
  }

  _onEndReached(allNews) {
    this.props.fetchMore({
      variables: { pageNumber: Math.floor(allNews.length / PAGE_SIZE + 1) },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.getAllNews.length === 0) {
          return previousResult;
        }

        return {
          getAllNews: previousResult.getAllNews.concat(
            fetchMoreResult.getAllNews,
          ),
        };
      },
    });
  }

  post(contentNews) {
    this.props
      .insertNews({
        userId: this.props.me.id,
        conferenceId: 1,
        contentNews,
      })
      .then(this._onRefresh);
  }

  _renderNewsFeedPosting(me, username) {
    return (
      <NewsFeedPosting userId={me.id} username={username} post={this.post} />
    );
  }

  _renderNewsFeedList(allNews, networkStatus, me) {
    return (
      <FlatList
        data={allNews}
        refreshing={networkStatus === 4}
        renderItem={({ item, index }) => (
          <News
            item={item}
            key={index}
            userId={me.id}
            onRefresh={this._onRefresh}
          />
        )}
        keyExtractor={(item, index) => index}
        onRefresh={this._onRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached(allNews)}
      />
    );
  }

  render() {
    const { allNews, networkStatus, me } = this.props;
    const username = `${me.firstname} ${me.lastname}`;

    if (networkStatus === 1) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this._renderNewsFeedPosting(me, username)}
        {this._renderNewsFeedList(allNews, networkStatus, me)}
      </View>
    );
  }
}

NewsFeedScene.propTypes = {
  allNews: PropTypes.array,
  me: PropTypes.object,
  networkStatus: PropTypes.number,
  refetch: PropTypes.func,
  fetchMore: PropTypes.func,
  home: PropTypes.func,
  insertNews: PropTypes.func,
  setTitle: PropTypes.func,
  toggleHeader: PropTypes.func,
  toggleFooter: PropTypes.func,
};

NewsFeedScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
};

NewsFeedScene.footer = {
  show: true,
  activeColor: Colors.primary,
};

const MeQuery = graphql(gql(ME_QUERY), {
  props: ({ data: { loading, me } }) => ({
    loading,
    me,
  }),
});

const AllNewsQuery = graphql(gql(ALL_NEWS_QUERY), {
  props: ({ data: { getAllNews, refetch, networkStatus, fetchMore } }) => ({
    allNews: getAllNews,
    refetch,
    networkStatus,
    fetchMore,
  }),
  options: {
    notifyOnNetworkStatusChange: true,
    variables: { pageNumber: 0, pageSize: PAGE_SIZE },
  },
});

const NewsFeedPostingMutation = graphql(gql(INSERT_NEWS_MUTATION), {
  props: ({ mutate }) => ({
    insertNews: ({ userId, conferenceId, contentNews }) =>
      mutate({
        variables: { userId, conferenceId, contentNews },
        // update: (store, { data: { insertNews } }) => {
        //   const data = store.readQuery({
        //     query: gql(ALL_NEWS_QUERY),
        //     variables: {
        //       id: insertNews.id,
        //     },
        //   });

        //   if (isDuplicateNews(insertNews, data.getAllNews)) {
        //     return data;
        //   }

        //   store.writeQuery({
        //     query: gql(ALL_NEWS_QUERY),
        //     variables: {
        //       id: insertNews.id,
        //     },
        //     data,
        //   });
        // },
      }),
  }),
});

export default compose(AllNewsQuery, MeQuery, NewsFeedPostingMutation)(
  NewsFeedScene,
);
