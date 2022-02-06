import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.addOrRemove = this.addOrRemove.bind(this);
    this.state = {
      loading: false,

    };
  }

  async componentDidMount() {
    const { music } = this.props;
    const favs = await getFavoriteSongs();
    this.setState({ check: favs.some((fav) => fav.trackName === music.trackName) });
  }

  addOrRemove = async () => {
    const { check } = this.state;
    const { music } = this.props;
    this.setState({ loading: true, check: !check });
    const favs = await getFavoriteSongs();
    const fun = favs
      .some((fav) => fav.trackName === music.trackName) ? removeSong : addSong;
    fun(music);
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId, onClickCheckbox } = this.props;
    const { loading, check } = this.state;

    return (
      <div>
        {loading && <Loading />}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ check }
            onChange={ !onClickCheckbox ? this.addOrRemove : onClickCheckbox }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.string.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
};
export default MusicCard;
