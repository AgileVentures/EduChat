var pathname = window.location.pathname;
var chatChannels = "#"+pathname.split('/')[3];
//var chatChannels = $("#chatframe").attr('chatroom');//"#cs1691x";
var urlPrefix = 'https://cs1692x.moocforums.org/chatlog/edxframe/CS169.1x/3T2013/';

var onChatTab = false;
if (document.title.indexOf("Chat") != -1) {
  onChatTab = true;
}

chatframeContent =
['<a href="javascript:void(0);" id="chat-button">Open Chat</a>',
 '<iframe src="javascript:void(0)" id="chatiframe"></iframe>',
 '<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />',
 '<style>.no-close .ui-dialog-titlebar-close { display: none; }</style>'
].join('\n');

$("#chatframe").html(chatframeContent);
$("#chatiframe").on('load', function() {
	showDelayed(5, this, 'loadingchat');
});

function getContentInContainer(matchClass) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            return elems[i].textContent;
        }
    }
}

function getUsername() {
  var n = getContentInContainer("user-link").replace("Dashboard for:", "").replace(/^\s+|\s+$/g, '');
  if (!isNaN(n[0])) {
     n = "_" + n;
  }
  return n;
}

function updateChatUrl() {
  username = getUsername();
  document.getElementById('chatiframe').src =
      'https://cs1692x.moocforums.org:9001/' +
      '?channels=' + encodeURIComponent(chatChannels) +
      '&nick=' + encodeURI(username);
}

if (document.getElementById('chatiframe')) {
  init();
} else {
  window.onload = init;
}

function updateReviewMessage() {
  // Based on http://www.jquery4u.com/json/jsonp-examples/
  $.ajax({
      url: urlPrefix + 'getdate/',
      dataType: 'jsonp',
      type: 'GET',
      async: false,
      contentType: "application/json",
      jsonpCallback: 'jsonCallback',
      success: function (json) {
	  if (json.year == 2013 &&
	      json.month == 12 &&
	      json.day >= 12 && json.day <= 15 &&
	      (json.day > 12 || json.hour >= 12) &&
	      (json.day < 15 || json.hour < 12) &&
	      json.minute >= 50)
	  {
	      $("#reviewstarting").show();
	  } else {
	      $("#reviewstarting").hide();
	  }
      }
  });
}

function init() {
  updateChatUrl();

  if (onChatTab) {
      document.getElementById('chatiframe').height = 600;
  }
  $("#chatframe").show();

  username = getUsername();

  messageContent =
  ['<div class="chapter" id="reviewstarting" style="display:none;">',
   '<h3 aria-label="" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" aria-selected="false" tabindex="-1">',
   '<b>The next <a href="https://courses.edx.org/courses/BerkeleyX/CS.169.2x/3T2013/courseware/5208a178b37d45fba5b592daa35f2c14/7a923a96615542cfbff4a5208abbc33d/" style="color:rgb(29, 157, 217);">Interactive Review session</a> is starting in less than 10 minutes. Please arrive in advance in order to complete the consent form.</b>',
   '</h3>',
   '</div><p><p>'
  ].join('\n');

  if ($('#reviewstarting').length == 0) {
    $(".sequence-nav").after(messageContent);
  }

  updateReviewMessage();
  timer = setInterval(function() {
      updateReviewMessage();
  }, 30 * 1000);
}

function showDelayed(delaySeconds, element, elementHide) {
  setTimeout(function(){
    element.style.position='static';
    element.style.visibility='visible';
    //document.getElementById(elementHide).style.display='none';
                $("#chatframe").removeClass('minimized');
                $("#chat-button").html("Hide Chat");
                $.cookie('chat_default', 'open', { expires: 7 });
                $('#chat-button').on("click", function () {
                    $('#chatframe').toggleClass("minimized");
                    if ($('#chatframe').hasClass("minimized")) {
                        $.cookie('chat_default', 'closed', { expires: 7 });
                        $("#chat-button").html("Open Chat");
                    } else {
                        $.cookie('chat_default', 'open', { expires: 7 });
                        $("#chat-button").html("Hide Chat");
                    }
                });
  }, 1000*delaySeconds);
}
