var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
  ;

  var $row = $(template);

  var clickHandler = function() {
    // need to cast this value to an integer "number"
    var songNumber = parseInt($(this).attr('data-song-number'));

    if(currentlyPlayingSongNumber !== null) {
      // revert to song number for currently planying song because user started playing a new song
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }

    if (currentlyPlayingSongNumber !== songNumber) {
      // switch from play to pause button to indicate a new song is playing
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSongNumber = songNumber;
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      updatePlayBarSong();
    }

    else if (currentlyPlayingSongNumber === songNumber) {
      // song has been paused!
      // switch to play button
      $(this).html(playButtonTemplate);
      // switch to play button
      $('.main-controls .play-pause').html(playerBarPlayButton);
      // reset when pausing
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
    }
  }
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    // need to cast this value to an integer "number"
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    // need to cast this value to an integer "number"
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
  };

  // #1
  $row.find('.song-item-number').click(clickHandler);
  // #2
  $row.hover(onHover, offHover);
  // #3
  return $row;
};

var setCurrentAlbum = function(album) {
  // #0 assigning current album to the argument "album" passed into our setCurrentAlbum function
  currentAlbum = album;
  // #1
  // creating variables for all the DOM we need to manipulate
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  // #2
  // injecting content
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  // #3
  // removing all content in albumSongList - starting fresh
  $albumSongList.empty();

  // #4
  // adding song rows with conetnet from songs object in this album to albumSongList - adding album songs to DOM
  for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
  }
};

// function to match the currently playing song's object with its corresponding index in the songs array
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
}

var nextSong = function() {
  // variable to hold the playing song's index in its album array of songs
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;
  // set aside the current song number as the last song number
  var lastSongNumber = currentlyPlayingSongNumber;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  // setting the new current song
  currentlyPlayingSongNumber = currentSongIndex + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

  // update the player bar information
  updatePlayBarSong();

  // update currently playing song cell with pause button/reset now last song to be its song number
  var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]')

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function() {
  // variable to hold the playing song's index in its album array of songs
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex--;
  // set aside the current song number as the last song number
  var lastSongNumber = currentlyPlayingSongNumber;

  if (currentSongIndex < 0) {
    currentSongIndex = 0;
  }

  // setting the new current song
  currentlyPlayingSongNumber = currentSongIndex + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

  // update the player bar information
  updatePlayBarSong();

  // update currently playing song cell with pause button/reset now last song to be its song number
  var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]')

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
}

// play button for song rows
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
// pause button for song rows
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// play button for player bar
var playerBarPlayButton = '<span class="ion-play"></span>';
// pause button for player bar
var playerBarPauseButton = '<span class="ion-pause"></span>';

// function to update the player bar to reflect currently playing song info
var updatePlayBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
}

// Start Fresh - resetting vars
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});