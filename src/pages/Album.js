import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musics: [{ artistName: '', collectionName: '' }],
      favoritas: [],
    };
  }

  async componentDidMount() {
    const href = window.location.href.split('album/');
    const id = href[href.length - 1];
    const musicas = await getMusics(id);
    const favs = await getFavoriteSongs();
    this.setState({ favoritas: favs, musics: musicas, loading: false });
  }

  render() {
    const { loading, musics, favoritas } = this.state;
    const { artistName, collectionName } = musics[0];
    const alb = (
      <div>
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{collectionName}</h2>
        <ol>
          {musics.map((music, i) => {
            const prop = {
              check: favoritas
                .some((fav) => fav.trackName === music.trackName),
              onClickCheckbox:
                  async () => {
                    this.setState({ loading: true });
                    const favs = await getFavoriteSongs();
                    const fun = favs
                      .some((fav) => fav.trackName === music.trackName)
                      ? removeSong : addSong;
                    await fun(music);
                    await this.componentDidMount();
                  },
              music,
            };
            return (i > 0 && <li key={ i }><MusicCard { ...prop } /></li>);
          })}
        </ol>
      </div>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : alb}
      </div>);
  }
}

export default Album;
