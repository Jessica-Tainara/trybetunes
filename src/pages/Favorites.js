import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favoritas: [],
    };
  }

  async componentDidMount() {
    this.setState({ favoritas: await getFavoriteSongs(), loading: false });
  }

  renderMusic = (music, i) => {
    const prop = {
      music,
      page: 'favoritas',
      index: 1 + i,
      check: true,
      onClickCheckbox:
          async () => {
            // this.setState({ loading: true });
            await removeSong(music);
            this.setState({ favoritas: await getFavoriteSongs(), loading: false });
          },
    };
    return (<MusicCard { ...prop } />);
  }

  render() {
    const { favoritas, loading } = this.state;
    const section = (
      <div className="page favorites">
        <div className="top">
          <p id="number">#</p>
          <p id="title-music">TITULO</p>
          <p
            id="title-album"
            style={ { left: '500px', position: 'absolute', zIndex: '1' } }
          >
            ALBUM

          </p>
        </div>
        <div className="musics fav">
          {favoritas.map((music, i) => this.renderMusic(music, i))}
        </div>
      </div>);
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : section}
      </div>
    );
  }
}

export default Favorites;
