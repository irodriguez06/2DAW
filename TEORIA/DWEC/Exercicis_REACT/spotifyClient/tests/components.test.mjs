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

test('Header mostra el títol, el nom d’usuari i la data', () => {
  const markup = renderToStaticMarkup(
    Header({ user: { name: 'Isaac' } }),
  );

  assert.match(markup, /<h1>Spotify Client<\/h1>/);
  assert.match(markup, /Usuari: Isaac/);
  assert.match(markup, /Data: \d{1,2}\/\d{1,2}\/\d{4}/);
});

test('Header permet representar un nom d’usuari buit', () => {
  const markup = renderToStaticMarkup(
    Header({ user: { name: '' } }),
  );

  assert.match(markup, /Usuari: /);
});

test('SongCard mostra tots els camps de la cançó', () => {
  const markup = renderToStaticMarkup(
    SongCard({
      trackInfo: {
        title: 'Sunday bloody Sunday',
        artist: 'U2',
        duration: 180,
        reproduccions: 42,
      },
    }),
  );

  assert.match(markup, /<h1>Sunday bloody Sunday<\/h1>/);
  assert.match(markup, /<p>U2<\/p>/);
  assert.match(markup, /<p>180<\/p>/);
  assert.match(markup, /Reproduccions: 42/);
});

test('SongCard representa correctament zero reproduccions', () => {
  const markup = renderToStaticMarkup(
    SongCard({
      trackInfo: {
        title: 'Rattle and hum',
        artist: 'U2',
        duration: 90,
        reproduccions: 0,
      },
    }),
  );

  assert.match(markup, /Reproduccions: 0/);
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
  const userNames = ['Isaac', 'Bernardinho', 'Ayoub i força al canut', 'Pedro Sanchez'];

  assert.match(markup, /<h1>Spotify Client<\/h1>/);
  assert.ok(userNames.some((name) => markup.includes(`Usuari: ${name}`)));
  assert.ok(tracks.some((track) => markup.includes(`<h1>${track.title}</h1>`)));

  const plays = markup.match(/Reproduccions: (\d+)/);
  assert.ok(plays);
  assert.ok(Number(plays[1]) >= 0 && Number(plays[1]) < 1_000);
});
