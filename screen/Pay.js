import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import Section from '../component/Section';
import {Picker} from 'react-native-woodpicker';
import {useToast} from 'react-native-fast-toast';
import axios from 'axios';

const INITIAL_STATE = {
  selectedRecipient: null,
  amount: null,
  loading: false,
};

export default class PayScreen extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  handlePay = async () => {
    this.setState({loading: true});
    let endpoint = '';
    let kind = this.props.route.params.kind;
    switch (kind) {
      case 'sync':
        endpoint = 'pay';
        break;
      case 'queue':
        endpoint = 'pay/with-queue';
        break;
      case 'event':
        endpoint = 'pay/with-event';
        break;
    }

    let url = `http://localhost:1212/${endpoint}`;
    let data = {
      to: this.state.selectedRecipient.value,
      amount: parseInt(this.state.amount),
    };
    try {
      let res = await axios.post(url, data, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhYmliQGVtYWlsLmNvbSIsImlkIjoiMSJ9.Mz9DDIFw8wz9cVe_7IeB26nDBldTciF76KtUhCDTTps',
        },
      });

      if (res.data.success) {
        this.setState(INITIAL_STATE);
        let message = 'Your request has been submitted';
        if (kind == 'sync') {
          message = 'Money sent succesfully!';
        }
        this.props.toast.show(message, {
          type: 'success',
          placement: 'top',
          duration: 5000,
        });
      }
    } catch (e) {
      let message = '';
      if (e.response) {
        message = e.response.data.error.message;
      } else {
        message = e.message;
      }
      this.props.toast.show(message, {type: 'danger', duration: 5000});
    }
  };

  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            marginTop: 32,
          }}>
          <Text>Hi, Habib</Text>
          <Text>Rp 15.000</Text>
        </View>
        <Section title={'Recipient'}>
          <Picker
            placeholder="Select Recipient"
            items={[
              {label: 'Ani', value: 2},
              {label: 'Budi', value: 3},
            ]}
            item={this.state.selectedRecipient}
            onItemChange={item => {
              this.setState({selectedRecipient: item});
            }}
          />
        </Section>
        <View style={{paddingHorizontal: 24, marginTop: 32}}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>Amount</Text>
        </View>
        <View style={{paddingHorizontal: 24, marginTop: 8, marginBottom: 32}}>
          <TextInput
            style={{
              height: 40,
              width: '100%',
              borderWidth: 1,
              paddingHorizontal: 12,
            }}
            onChangeText={val => this.setState({amount: val})}
            keyboardType={'numeric'}
            value={this.state.amount}
          />
        </View>
        <Button
          title={this.state.loading ? 'Loading...' : 'Pay'}
          disabled={this.state.loading}
          onPress={this.handlePay}
        />
      </View>
    );
  }
}
