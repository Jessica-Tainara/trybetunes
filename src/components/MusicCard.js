import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../whiteHeartIcon.svg';
import blackHeartIcon from '../blackHeartIcon.svg';

class MusicCard extends React.Component {
  render() {
    const { music, onClickCheckbox, check, index } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <div className="music">

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
        <p className="number">{index}</p>

        <p className="music-title">{trackName}</p>
        <button type="button" className="favorite-button">
          <input
            type="image"
            alt="button-favorite"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            src={ check ? blackHeartIcon : whiteHeartIcon }
            onClick={ onClickCheckbox }
          />

        </button>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
export default MusicCard;
