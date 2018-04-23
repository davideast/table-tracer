import * as express from 'express';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { HomePage } from './app/pages/Home';
import * as fs from 'fs';
import * as path from 'path';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

// Parse Args for debug setup
const args = {} 
process.argv.forEach(arg => args[arg] = arg);
const isDev = args['DEV'];
const port = args['PORT'] || 3000;

const router = express();

const indexHtmlPath = path.resolve(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC1pXdWIiJZRcJUYtoIi-MmrRdnTcUISgk",
  authDomain: "ticket-fire.firebaseapp.com",
  databaseURL: "https://ticket-fire.firebaseio.com",
  projectId: "ticket-fire",
  storageBucket: "ticket-fire.appspot.com",
  messagingSenderId: "1090774042344"
});
const col = firebaseApp.firestore().collection('restaurants');

router.get('/', (req, res) => {
  col.get().then(snap => {
    const restaurants = snap.docs.map(d => ({ id: d.id, data: d.data() }));
    const html = render(<HomePage restaurants={restaurants} />)
    const finalHtml = indexHtml.replace('<!-- ::APP:: -->', html);
    res.send(finalHtml);
  });
});

if(isDev) {
  router.listen(port, () => console.log(`Listening on ${port}...`));
}
