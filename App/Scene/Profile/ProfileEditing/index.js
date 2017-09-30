import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql, compose } from 'react-apollo';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import { required } from '~/Lib/validate';
import { Text, FormInput, TouchableView } from '~/Component';
import mutation from '~/Graphql/mutation/updateMe.graphql';

const inputForms = {
  firstname: {
    title: 'Firstname',
    field: {
      name: 'firstname',
      validate: [required],
      props: {
        placeholder: 'Firstname',
      },
    },
  },
  lastname: {
    title: 'Lastname',
    field: {
      name: 'lastname',
      validate: [required],
      props: {
        placeholder: 'Lastname',
      },
    },
  },
  dob: {
    title: 'Birthday',
    field: {
      name: 'dob',
      props: {
        placeholder: 'day of birth',
      },
    },
  },
  gender: {
    title: 'Gender',
    field: {
      name: 'gender',
      props: {
        placeholder: 'gender',
      },
    },
  },
  bio: {
    title: 'Biographical',
    field: {
      name: 'bio',
      props: {
        placeholder: 'bio',
      },
    },
  },
  language: {
    title: 'Language',
    field: {
      name: 'language',
      props: {
        placeholder: 'language',
      },
    },
  },
  linkedin_id: {
    title: 'Linkedin',
    field: {
      name: 'linkedin_id',
      props: {
        placeholder: 'linkedin',
      },
    },
  },
  facebook_id: {
    title: 'Facebook',
    field: {
      name: 'facebook_id',
      props: {
        placeholder: 'facebook',
      },
    },
  },
  twitter_id: {
    title: 'Twitter',
    field: {
      name: 'twitter_id',
      props: {
        placeholder: 'twitter',
      },
    },
  },
};

class ProfileEditing extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    update: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._renderInputForms = this._renderInputForms.bind(this);
    this._renderSubmitButton = this._renderSubmitButton.bind(this);
  }

  _renderInputForms(form, key) {
    return (
      <View key={key} style={{ marginBottom: 16 }}>
        <Field
          component={FormInput}
          underlineColorAndroid="transparent"
          keyboardType="default"
          {...form.field}
          {...form.field.props}
        />
      </View>
    );
  }

  _submit() {
    const { update, handleSubmit } = this.props;
    handleSubmit(info => {
      const now = new Date('18 November 1996 UTC');
      info.dob = now.toISOString();
      update(info);
      console.log(info);
    });
  }

  _renderSubmitButton() {
    return (
      <TouchableView
        rippleColor="green"
        style={{ backgroundColor: 'pink' }}
        onPress={this._submit}
      >
        <Text>Update</Text>
      </TouchableView>
    );
  }

  render() {
    return (
      <ScrollView
        style={{
          margin: 8,
          backgroundColor: 'white',
        }}
      >
        <View style={{ padding: 8 }}>
          {Object.keys(inputForms).map(key =>
            this._renderInputForms(inputForms[key], key),
          )}
          {this._renderSubmitButton()}
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  reduxForm({
    form: 'userProfile',
  }),
  graphql(gql(mutation), {
    props: ({ mutate }) => ({
      update: ({ firstname, lastname, dob, gender }) =>
        mutate({ variables: { firstname, lastname, dob, gender } }),
    }),
  }),
)(ProfileEditing);
