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
    const favs = await getFavoriteSongs();
    this.setState({ favoritas: favs, loading: false });
  }

  render() {
    const { favoritas, loading } = this.state;
    const section = (
      <ol>
        {favoritas.map((music, i) => {
          const { trackId, trackName, previewUrl } = music;
          const prop = { music, trackId, trackName, previewUrl };
          return (
            <li key={ i }>
              <MusicCard
                onClickCheckbox={ async () => {
                  this.setState({ loading: true });
                  await removeSong(music);
                  await this.componentDidMount();
                  this.setState({ loading: false });
                } }
                { ...prop }
              />
            </li>);
        })}
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
