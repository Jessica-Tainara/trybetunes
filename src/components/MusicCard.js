import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {loading && <Loading />}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ async () => {
            this.setState({ loading: true });
            await addSong(music);
            this.setState({ loading: false });
          } }
        />
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.string.isRequired,
};
export default MusicCard;
