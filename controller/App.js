import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { MultiTouchView } from 'expo-multi-touch';
import Pad from './components/Pad';
import TouchVisualizer from './components/TouchVisualizer';
import { socket } from "./socket"
const { width } = Dimensions.get('window');
const halfWidth = width / 2;

export default class App extends Component {
  state = {
    touches: {},
    leftTouchId: null,
  };

  componentWillMount() {
    socket.on("hello", msg => {
      console.log(msg)
    })
    this.touchProps = {
      onTouchBegan: event => {
        const { identifier } = event;
        this.setState(previous => ({
          touches: {
            ...previous.touches,
            [identifier]: event,
          },
        }));

        if (this.state.leftTouchId == null && event.pageX < halfWidth) {
          this.setState(
            {
              leftTouchId: identifier,
            },
            () => {
              this.updateWithPad();
            }
          );
        }
      },
      onTouchMoved: event => {
        const { identifier } = event;
        this.setState(
          previous => ({
            touches: {
              ...previous.touches,
              [identifier]: event,
            },
          }),
          () => {
            this.updateWithPad();
          }
        );
      },
      onTouchEnded: this.onTouchEnded,
      onTouchCancelled: this.onTouchEnded,
      onTouchesBegan: () => {
        console.log('onTouchesBegan');
      },
      onTouchesMoved: () => { },
      onTouchesEnded: () => {
        // console.log('onTouchesEnded');
      },
      onTouchesCancelled: () => {
        console.log('onTouchesCancelled');
      },
    };
  }

  onTouchEnded = event => {
    const { identifier } = event;
    this.setState(previous => ({
      touches: {
        ...previous.touches,
        [identifier]: null,
      },
    }));
    console.log('onTouchEnded', identifier, this.state.leftTouchId);

    if (identifier === this.state.leftTouchId) {
      this.setState(
        {
          leftTouchId: null,
        },
        () => {
          this.updateWithPad(false);
        }
      );
    }
  };

  updateWithPad = (touching = true) => {
    if (!this.pad) {
      return;
    }
    let speed = 0;
    let angle = 0;
    if (touching) {
      speed = this.pad.speed;
      angle = this.pad.angle;
    }
    socket.emit("direction", { angle, speed })
    console.log('pad', speed, angle);
  };

  leftTouchPosition = { x: 0, y: 0 };
  leftTouchStart = { x: 0, y: 0 };
  leftTouchForce = 0;
  render() {
    const { touches, leftTouchId } = this.state;

    const leftTouch = touches[leftTouchId];

    if (leftTouch && leftTouch.initialTouch) {
      this.leftTouchStart = {
        x: leftTouch.initialTouch.pageX,
        y: leftTouch.initialTouch.pageY,
      };
      this.leftTouchPosition = {
        x: leftTouch.pageX,
        y: leftTouch.pageY,
      };

      this.leftTouchForce = leftTouch.force || 0;
    }

    return (
      <View style={{ flex: 1 }}>
        <MultiTouchView style={{ flex: 1 }} {...this.touchProps}>
          <View style={styles.container}>
            <TouchVisualizer touches={touches} />

            <Pad
              ref={ref => (this.pad = ref)}
              visible={leftTouchId}
              center={this.leftTouchStart}
              touchPosition={this.leftTouchPosition}
              force={this.leftTouchForce}
            />
          </View>
        </MultiTouchView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});
