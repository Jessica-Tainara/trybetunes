import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../whiteHeartIcon.svg';
import blackHeartIcon from '../blackHeartIcon.svg';

class MusicCard extends React.Component {
  render() {
    const { music, onClickCheckbox, check, index, page } = this.props;
    const { trackName, previewUrl, trackId, artworkUrl100, collectionName } = music;
    const urlImage = String(artworkUrl100).split('/');
    urlImage.splice(urlImage.length - 1, 1, '50x50bb.jpg');

    return (
      <div className={ page ? 'music full' : 'music' }>
        {page && <img
          src={ urlImage.join('/') }
          alt={ music.collectionName }
          style={ { left: '85px', position: 'absolute', zIndex: '1' } }
        />}
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
        <span className="number">{index}</span>

        <p className="music-title">{trackName}</p>
        {page
        && (
          <span
            style={ {
              left: '500px',
              position: 'absolute',
              zIndex: '1',
              fontSize: '13px' } }
          >
            {collectionName}
          </span>)}
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
  page: PropTypes.string.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
export default MusicCard;
