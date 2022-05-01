import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, onClickCheckbox, check } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <div className="music">
        <p className="music-title">{trackName}</p>
        <audio
          data-testid="audio-component"
          className="audio"
          src={ previewUrl }
          controls
        >
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
            onChange={ onClickCheckbox }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};
export default MusicCard;
