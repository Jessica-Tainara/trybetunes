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
      check: true,
      onClickCheckbox:
          async () => {
            this.setState({ loading: true });
            await removeSong(music);
            this.setState({ favoritas: await getFavoriteSongs(), loading: false });
          },
    };
    return (<li key={ i }><MusicCard { ...prop } /></li>);
  }

  render() {
    const { favoritas, loading } = this.state;
    const section = (
      <ol>
        {favoritas.map((music, i) => this.renderMusic(music, i))}
      </ol>);
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : section}
      </div>
    );
  }
}

export default Favorites;
