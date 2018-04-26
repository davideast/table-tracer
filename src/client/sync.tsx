import { firebase, FireWorkerApp } from './worker';
import 'noop-webpack-plugin';

export function syncRestaurants(config: any, cb) {
  const app = firebase.initializeApp(config);
  const firestore = app.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  app.firestore().collection('restaurants').onSnapshot(snap => {
    const restaurants = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(restaurants)
  });
}
