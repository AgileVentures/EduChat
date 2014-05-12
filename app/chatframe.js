/*\ chatframe_toggleBtn.js - edX embedded chat room load script
|*|
|*|  this version features an enable/disable toggle button persisted by cookie storage
|*|  chat is disabled by default
\*/


(function()
{
  /* constants */

  var CHAT_SERVER_URL    = 'https://cs1692x.moocforums.org:9001/' ;
  var CHATLOG_URL_PREFIX = 'https://cs1692x.moocforums.org/chatlog/edxframe/CS169.1x/3T2013/' ;
  var CHATBTN_HTML   = '<a href="javascript:void(0);" id="chat-load-button">Join Chat</a>' ;
  var CHATFRAME_HTML =
  [
    '<a href="javascript:void(0);" id="chat-button">Join Chat</a>',
    '<iframe src="javascript:void(0)" id="chatiframe"></iframe>',
    '<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />',
    '<style>.no-close .ui-dialog-titlebar-close { display: none; }</style>'
  ].join('\n') ;
  var MESSAGE_HTML   =
  [
    '<div class="chapter" id="reviewstarting" style="display:none;">',
    '<h3 aria-label="" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" aria-selected="false" tabindex="-1">',
    '<b>The next <a href="https://courses.edx.org/courses/BerkeleyX/CS.169.2x/3T2013/courseware/5208a178b37d45fba5b592daa35f2c14/7a923a96615542cfbff4a5208abbc33d/" style="color:rgb(29, 157, 217);">Interactive Review session</a> is starting in less than 10 minutes. Please arrive in advance in order to complete the consent form.</b>',
    '</h3>',
    '</div><p><p>'
  ].join('\n') ;
  var CHAT_STATE_DISABLED = 'disabled' ;
  var CHAT_STATE_ENABLED  = 'enabled' ;
  var CHAT_BTN_TEXTS      = {} ;
  CHAT_BTN_TEXTS[CHAT_STATE_DISABLED] = "Join Chat" ;
  CHAT_BTN_TEXTS[CHAT_STATE_ENABLED]  = "Close Chat" ;
  var ALLOW_WORLD = false ;          // useful for offsite development
  var ANONYMOUS_USERNAME = "Anon_" ; // if ALLOW_WORLD


  /* functions */

  function init()
  {
    if (IsChatEnabled) loadChat() ;
    else
    {
      setChatState(CHAT_STATE_DISABLED) ;
      $('#chatframe').html(CHATBTN_HTML) ;
      $('#chat-load-button').on("click" , loadChat) ;
    }
  }

  function loadChat()
  {
    $('#chatframe').html(CHATFRAME_HTML) ;
    $('#chat-load-button').display = 'none' ;
    $('#chat-button').html("Loading ...") ; updateChatUrl() ;
    $('#chatiframe').on('load' , function()
    {
      if (IsChatTab) document.getElementById('chatiframe').height = 600 ;

      if ($('#reviewstarting').length == 0) $(".sequence-nav").after(MESSAGE_HTML) ;
      updateReviewMessage() ;
      window.setInterval(function() { updateReviewMessage(); } , 30000) ;

      window.setTimeout(function()
      {
        setChatState(CHAT_STATE_ENABLED) ;
        $('#chatframe').toggleClass(CHAT_STATE_ENABLED) ;
        $('#chat-button').on("click" , function ()
        {
          $('#chatframe').toggleClass(CHAT_STATE_ENABLED) ;
          var isEnabled = ($('#chatframe').hasClass(CHAT_STATE_ENABLED)) ;
          setChatState((isEnabled)? CHAT_STATE_ENABLED : CHAT_STATE_DISABLED) ;
        }) ;
      } , 5000) ;
    }) ;
  }

  function setChatState(chatState)
  {
    $("#chat-button").html(CHAT_BTN_TEXTS[chatState]) ;
    setStoredState(chatState) ;
  }

  function getStoredState() { return CookieObj.cookie('chat_default') ; }

  function setStoredState(chatState)
  {
    CookieObj.cookie('chat_default' , chatState , { expires: 7 , path: '/' }) ;
  }

  function getCookie($) // TODO: this could be much cleaner if using LocalStorage instead
  {
    var pluses = /\+/g;

    function encode(s) { return config.raw ? s : encodeURIComponent(s) ; }

    function decode(s) { return config.raw ? s : decodeURIComponent(s) ; }

    function stringifyCookieValue(value)
    {
      return encode(config.json ? JSON.stringify(value) : String(value)) ;
    }

    function parseCookieValue(s)
    {
      if (s.indexOf('"') === 0)
        // This is a quoted cookie as according to RFC2068, unescape...
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');

      try
      {
        // Replace server-side written pluses with spaces.
        // If we can't decode the cookie, ignore it, it's unusable.
        // If we can't parse the cookie, ignore it, it's unusable.
        s = decodeURIComponent(s.replace(pluses, ' '));
        return config.json ? JSON.parse(s) : s;
      }
      catch(e) {}
    }

    function read(s, converter)
    {
      var value = config.raw ? s : parseCookieValue(s);
      return $.isFunction(converter) ? converter(value) : value;
    }

    var cookieObj = {} ;
    var config = cookieObj.cookie = function (key, value, options)
    {
      // Write
      if (value !== undefined && !$.isFunction(value))
      {
        options = $.extend({}, config.defaults, options);

        if (typeof options.expires === 'number')
        {
          var days = options.expires, t = options.expires = new Date();
          t.setTime(+t + days * 864e+5);
        }

        return (document.cookie =
        [
          encode(key), '=', stringifyCookieValue(value),
          options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          options.path    ? '; path=' + options.path : '',
          options.domain  ? '; domain=' + options.domain : '',
          options.secure  ? '; secure' : ''
        ].join(''));
      }

      // Read

      var result = key ? undefined : {};

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling $.cookie().
      var cookies = document.cookie ? document.cookie.split('; ') : [];

      for (var i = 0, l = cookies.length; i < l; i++)
      {
        var parts = cookies[i].split('=');
        var name = decode(parts.shift());
        var cookie = parts.join('=');

        if (key && key === name)
        {
          // If second argument (value) is a function it's a converter...
          result = read(cookie, value);
          break;
        }

        // Prevent storing a cookie that we couldn't decode.
        if (!key && (cookie = read(cookie)) !== undefined) result[name] = cookie;
      }

      return result;
    };

    config.defaults = {};

    cookieObj.removeCookie = function (key, options)
    {
      if (cookieObj.cookie(key) === undefined) return false;

      // Must not alter options, thus extending a fresh object...
      cookieObj.cookie(key, '', $.extend({}, options, { expires: -1 }));
      return !cookieObj.cookie(key);
    };

    return cookieObj ;
  }

  function getContentInContainer(matchClass)
  {
    var elems = document.getElementsByTagName('*') , i ;
    for (i in elems)
      if (~(' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' '))
        return elems[i].textContent ;
  }

  function getUsername()
  {
    var anonymousUsername = (ANONYMOUS_USERNAME + (new Date()).getTime()) ;
    var userLink          = getContentInContainer("user-link") ;
    if (!userLink) return (ALLOW_WORLD)? anonymousUsername : '' ;

    var username = userLink.replace("Dashboard for:" , "").replace(/^\s+|\s+$/g , '') ;
    if (!isNaN(n[0])) username = "_" + username ;

    return username ;
  }

  function updateChatUrl()
  {
    var username = getUsername() ;
    if (ALLOW_WORLD || username)
      document.getElementById('chatiframe').src =
        CHAT_SERVER_URL +
        '?channels='    + encodeURIComponent(ChatChannels) +
        '&nick='        + encodeURI(username)              ;
  }

  function updateReviewMessage()
  {
    $.ajax(
    {
      url:           CHATLOG_URL_PREFIX + 'getdate/' ,
      dataType:      'jsonp'                         ,
      type:          'GET'                           ,
      async:         false                           ,
      contentType:   "application/json"              ,
      jsonpCallback: 'jsonCallback'                  ,
      success:       function(json)
      {
        if (json.year   == 2013 &&
            json.month  == 12   &&
            json.day    >= 12   && json.day  <= 15  &&
            (json.day   >  12   || json.hour >= 12) &&
            (json.day   <  15   || json.hour <  12) &&
            json.minute >= 50)
             $("#reviewstarting").show() ;
        else $("#reviewstarting").hide() ;
      }
    }) ;
  }


/* main */

  var CookieObj      = getCookie(jQuery) ; // TODO: use LocalStorage

  var ChatChannels   = "#" + window.location.pathname.split('/')[3] ;
  var IsChatTab      = (~document.title.indexOf("Chat")) ;
  var IsChatEnabled  = getStoredState() === CHAT_STATE_ENABLED ;

  window.onload = init ;

})();
