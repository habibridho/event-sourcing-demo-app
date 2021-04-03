import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Section from '../component/Section';

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Section title="Synchronous">
          <Button
            title={'Go to Sample'}
            onPress={() => this.props.navigation.navigate('pay', { kind: 'sync' })}
          />
        </Section>
        <Section title="With Queue">
          <Button
            title={'Go to Sample'}
            onPress={() => this.props.navigation.navigate('pay', { kind: 'queue' })}
          />
        </Section>
        <Section title="With Event">
          <Button
            title={'Go to Sample'}
            onPress={() => this.props.navigation.navigate('pay', { kind: 'event' })}
          />
        </Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
