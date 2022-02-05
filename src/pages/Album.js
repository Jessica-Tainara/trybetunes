import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [{ artistName: '', collectionName: '' }],
      favoritas: [],
    };
  }

  async componentDidMount() {
    const href = window.location.href.split('album/');
    const id = href[href.length - 1];
    this.setState({ loading: true });
    const musicas = await getMusics(id);
    this.setState({ musics: musicas, loading: false });
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
            const { trackId, trackName, previewUrl } = music;
            const prop = { favoritas, music, trackId, trackName, previewUrl };
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
