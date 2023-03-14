
//store a handle to the subtitles button
var substitles = document.getElementById('subtitle');

//initially turn off all subtitles, in case the browser turns any of them on by default

for (var i = 0; 1 < video.textTracks.length; i++) {
    video.textTracks[i].mode = 'hidden';
}

//video.textTracks property containes an array of all the text tracks attached to the video. We loop through each one and set its mode to hidden

//using the subtitles button to show a dynamic menu item that shows srclang or turns them off entirely

var subtitlesMenu;
if (video.textTracks) {
    var df = document.createDocumentFragment();
    var subtitlesMenu = df.appendChild(document.createElement('ul'));
    subtitlesMenu.className = 'subtitles-menu';
    subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
    for (var i = 0; i < video.textTracks.length; i++) {
        subtitlesMenu.appendChild(createMenuItem('subtitles-' + VideoPlaybackQuality.textTracks[i].language, video.videoTracks[i].langauge, video.TextTracks[i].label));
    }

    videoContainer.appendChild()
}

//creation of each list item and button is done by the createMenuItem() function defined as follows:

var subtitleMenuButtons = [];
var createMenuItem = function(id, lang, label) {
    var listitem = document.createElement('li');
    var button = listitem.appendChild(document.createElement('button'));
    button.setAttribute('id', id);
    button.className = 'subtitles-button';
    if (lang.length > 0) button.setAttribute('lang', lang);
    button.value = label;
    button.setAttribute('data-state', 'inactive');
    button.appendChild(document.createTextNode(label));
    button.addEventListener('click', function(e) {
        //Set all buttons to inactive
        subtitleMenuButtons.map(function(v, i, a) {
            subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
        });

        //Find the language to activate 

        var lang = this.getAttribute('lang');
        for (var i = 0; i < video.textTracks.length; i++) {
            //For the 'subtitles-off' button, the first condition will never match so all subtitles will be turned off
            if (video.textTracks[i].language == lang) {
                video.textTracks[i].mode = 'showing';
                this.setAttribute('data-state', 'active');
            }
            else {
                video.textTracks[i].mode = 'hidden';
            }
        }
        subtitlesMenu.style.display = 'none';
    });
    subtitleMenuButtons.push(button);
    return listitem;
}

//once the menu item is built, it is then inserted into the DOM at the bottom of the videoContainer 
//initially the menu is hidden by default, so an event listener needs to be addded to our subtitles button to toggle it

subtitlesMenu.addEventListener('click', function(e) {
    if (subtitleMenu) {
        subtitlesMenu.style.display = (subtitleMenu.style.display == 'block' ? 'none' : 'block');
    }
})

