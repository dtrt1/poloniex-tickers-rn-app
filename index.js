/**
 * @format
 */
import { AppRegistry } from 'react-native';

import { RootModel } from '@models/root-model';

import App from './App';
import { name as appName } from './app.json';
import { Main } from './src/main';

Main.instance.bootstrap({ model: RootModel });

AppRegistry.registerComponent(appName, () => App);
