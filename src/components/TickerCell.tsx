import React, { useEffect, useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Animated, {
  interpolateColor,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { observer } from 'mobx-react';

import { Logger } from '@services/logger';

interface Props {
  item: {
    symbol: string;
    [key: string]: any;
  };
  type: 'price' | 'bestBidPrice' | 'bestAskPrice' | 'bestAskSize';
  containerStyle?: StyleProp<ViewStyle>;
}

const ARROW_UP = '▲';
const ARROW_DOWN = '▼';

const ARROW_ANIMATION_DURATION = 2500;
const ARROW_ANIMATION_START_DELAY = 500;
const ARROW_ANIMATION_FINISH_DELAY = 1500;
const ARROW_ANIMATION_DURATION_WITH_DELAY =
  ARROW_ANIMATION_DURATION -
  ARROW_ANIMATION_START_DELAY -
  ARROW_ANIMATION_FINISH_DELAY;
const BG_ANIMATION_DELAY = 200;
const BG_ANIMATION_DURATION = ARROW_ANIMATION_DURATION / 2;

export const TickerCell = observer(({ item, type, containerStyle }: Props) => {
  Logger.message(`TickerCell ${item.symbol} ${type}`);
  const currentValue = item[type];
  const newVal = Number(currentValue);

  const prevValue = useRef(newVal);

  const highlight = useSharedValue(0);
  const backgroundColorValue = useSharedValue('#FFFFFF');
  const arrowOpacity = useSharedValue(0);
  const arrowColor = useSharedValue('green');

  const diff = newVal - prevValue.current;
  const isUp = diff > 0;

  prevValue.current = newVal;

  useEffect(() => {
    if (diff === 0) return;

    if (isUp) {
      arrowColor.value = 'green';
      backgroundColorValue.value = '#C8E6C9';
    } else {
      arrowColor.value = 'red';
      backgroundColorValue.value = '#FFCDD2';
    }

    runOnUI(() => {
      arrowOpacity.value = withSequence(
        withTiming(1, { duration: ARROW_ANIMATION_START_DELAY }),
        withDelay(
          ARROW_ANIMATION_DURATION_WITH_DELAY,
          withTiming(0, { duration: ARROW_ANIMATION_FINISH_DELAY }),
        ),
      );

      highlight.value = withSequence(
        withTiming(1, { duration: BG_ANIMATION_DELAY }),
        withTiming(0, { duration: BG_ANIMATION_DURATION }),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, diff, isUp]);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      highlight.value,
      [0, 1],
      ['#FFFFFF', backgroundColorValue.value],
    ),
  }));

  const animatedArrowStyle = useAnimatedStyle(() => ({
    color: arrowColor.value,
    opacity: arrowOpacity.value,
  }));

  return (
    <Animated.View
      style={[styles.container, containerStyle, animatedBackgroundStyle]}
    >
      <View style={styles.valueContainer}>
        <Animated.Text style={styles.valueText}>{currentValue}</Animated.Text>
        <Animated.Text style={[styles.arrowText, animatedArrowStyle]}>
          {isUp ? ARROW_UP : ARROW_DOWN}
        </Animated.Text>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 12,
    marginRight: 4,
  },
  arrowText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
