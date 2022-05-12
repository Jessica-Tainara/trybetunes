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
    this.setState({
      favoritas: await getFavoriteSongs(), musics: await getMusics(id), loading: false });
  }

renderMusic = (music, i) => {
  const { favoritas } = this.state;
  const prop = {
    music,
    index: i,
    check: favoritas
      .some((fav) => fav.trackName === music.trackName),
    onClickCheckbox:
        async () => {
          this.setState({ loading: true });
          const fun = favoritas
            .some((fav) => fav.trackName === music.trackName)
            ? removeSong : addSong;
          await fun(music);
          this.setState({
            favoritas: await getFavoriteSongs(),
            loading: false,
          });
        },
  };
  return (i > 0 && <MusicCard { ...prop } />);
}

render() {
  const { loading, musics } = this.state;
  const { artistName, collectionName } = musics[0];
  const alb = (
    <div className="page album">
      <div className="album-description">
        <img
          src={ musics[0].artworkUrl100 }
          alt={ musics[0].collectionName }
        />
        <div>
          <span>Albúm</span>
          <h1 data-testid="album-name">{collectionName}</h1>
          <h2 data-testid="artist-name">{artistName}</h2>
        </div>
      </div>
      <div className="musics">
        {musics.map((music, i) => this.renderMusic(music, i))}
      </div>
    </div>
  );
  return (
    <div data-testid="page-album" className="pages">
      <Header />
      {loading ? <Loading /> : alb}
    </div>);
}
}

export default Album;
