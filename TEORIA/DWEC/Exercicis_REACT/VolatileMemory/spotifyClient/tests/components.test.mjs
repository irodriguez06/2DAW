import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
let vite;
let Header;
let SongCard;
let App;
let tracks;

before(async () => {
  vite = await createServer({
    root: projectRoot,
    configFile: resolve(projectRoot, 'vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  ({ default: Header } = await vite.ssrLoadModule('/src/Components/Header.tsx'));
  ({ default: SongCard } = await vite.ssrLoadModule('/src/Components/Songs/SongCard.tsx'));
  ({ default: App } = await vite.ssrLoadModule('/src/App.tsx'));
  ({ tracks } = await vite.ssrLoadModule('/src/Data/track.ts'));
});

after(async () => {
  await vite?.close();
});

test('Header mostra el nom d’usuari rebut i la data generada', () => {
  const userName = 'Isaac';
  const markup = renderToStaticMarkup(
    Header({ user: { name: userName } }),
  );
  const renderedUserName = markup.match(/Usuari: ([^<]*)/);

  assert.ok(renderedUserName);
  assert.equal(renderedUserName[1], userName);
  assert.match(markup, /Data: \d{1,2}\/\d{1,2}\/\d{4}/);
});

test('Header permet representar un nom d’usuari buit', () => {
  const userName = '';
  const markup = renderToStaticMarkup(
    Header({ user: { name: userName } }),
  );
  const renderedUserName = markup.match(/Usuari: ([^<]*)/);

  assert.ok(renderedUserName);
  assert.equal(renderedUserName[1], userName);
});

test('SongCard mostra tots els camps de la cançó', () => {
  const trackInfo = {
    title: 'Sunday bloody Sunday',
    artist: 'U2',
    duration: 180,
    reproduccions: 42,
  };
  const markup = renderToStaticMarkup(
    SongCard({ trackInfo }),
  );
  const renderedTitle = markup.match(/<h1>([^<]*)<\/h1>/);
  const renderedFields = [...markup.matchAll(/<p>([^<]*)<\/p>/g)];
  const renderedPlays = markup.match(/Reproduccions: ([^<]*)/);

  assert.ok(renderedTitle);
  assert.equal(renderedTitle[1], trackInfo.title);
  assert.equal(renderedFields[0][1], trackInfo.artist);
  assert.equal(renderedFields[1][1], String(trackInfo.duration));
  assert.ok(renderedPlays);
  assert.equal(renderedPlays[1], String(trackInfo.reproduccions));
});

test('SongCard representa correctament zero reproduccions', () => {
  const reproduccions = 0;
  const markup = renderToStaticMarkup(
    SongCard({
      trackInfo: {
        title: 'Rattle and hum',
        artist: 'U2',
        duration: 90,
        reproduccions,
      },
    }),
  );
  const renderedPlays = markup.match(/Reproduccions: ([^<]*)/);

  assert.ok(renderedPlays);
  assert.equal(renderedPlays[1], String(reproduccions));
});

test('les dades de cançons tenen els camps esperats i durades positives', () => {
  assert.ok(tracks.length > 0);

  for (const track of tracks) {
    assert.equal(typeof track.title, 'string');
    assert.ok(track.title.length > 0);
    assert.equal(typeof track.artist, 'string');
    assert.ok(track.artist.length > 0);
    assert.ok(Number.isFinite(track.duration));
    assert.ok(track.duration > 0);
  }
});

test('App renderitza un usuari i una cançó de les dades disponibles', () => {
  const markup = renderToStaticMarkup(App());
  const renderedUserName = markup.match(/Usuari: ([^<]+)/);
  const renderedTitles = [...markup.matchAll(/<h1>([^<]*)<\/h1>/g)];

  assert.ok(renderedUserName);
  assert.ok(renderedUserName[1].length > 0);
  assert.ok(tracks.some((track) => renderedTitles.some(([, title]) => title === track.title)));

  const plays = markup.match(/Reproduccions: (\d+)/);
  assert.ok(plays);
  assert.ok(Number(plays[1]) >= 0 && Number(plays[1]) < 1_000);
});
