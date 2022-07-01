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
          // this.setState({ loading: true });
          const fun = favoritas
            .some((fav) => fav.trackName === music.trackName)
            ? removeSong : addSong;
          await fun(music);
          this.setState({
            favoritas: await getFavoriteSongs(),
            // loading: false,
          });
        },
  };
  return (i > 0 && <MusicCard { ...prop } />);
}

render() {
  const { loading, musics } = this.state;
  const { artistName, collectionName, artworkUrl100 } = musics[0];

  const urlImage = String(artworkUrl100).split('/');
  urlImage.splice(urlImage.length - 1, 1, '300x300bb.jpg');

  const alb = (
    <div
      className="page album"
      style={ { backgroundImage: `url(${artworkUrl100})`,
        backgroundSize: '1000000px',
        backgroundPosition: 'top rigth' } }
    >
      <div className="album-description">
        <img
          src={ urlImage.join('/') }
          alt={ musics[0].collectionName }
        />
        <div>
          <span>Albúm</span>
          <h1 id="album-name">{collectionName}</h1>
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
