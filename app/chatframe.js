
/*\ chatframe_toggleBtn.js - edX embedded chat room load script
|*|
|*|  this version features an enable/disable toggle button persisted by cookie storage
|*|  chat is disabled by default
\*/


(function()
{
  /* constants */

  var CHAT_SERVER_URL    = 'https://cs1692x.moocforums.org:9001/' ;
  var STATIC_CHANNELS    = '' ;      // CSV list - must end in ',' comma if non-empty
  var ALLOW_WORLD        = false ;   // useful for offsite development
  var ANONYMOUS_USERNAME = "Anon_" ; // if ALLOW_WORLD
  var DOM_WAIT_IVL       = 1000 ;
  var IFRAME_WAIT_IVL    = 5000 ;

  var CHAT_STATE_DISABLED              = 'disabled' ;
  var CHAT_STATE_ENABLED               = 'enabled' ;
  var CHAT_STATE_MINIMIZED             = 'minimized' ;
  var CHAT_BTN_TEXTS                   = {} ;
  CHATBTN_TEXT_DISABLED                = "Join Chat" ;
  CHATBTN_TEXT_ENABLED                 = "Hide Chat" ;
  CHATBTN_TEXT_MINIMIZED               = "Show Chat" ;
  CHAT_BTN_TEXTS[CHAT_STATE_DISABLED]  = CHATBTN_TEXT_DISABLED ;
  CHAT_BTN_TEXTS[CHAT_STATE_ENABLED]   = CHATBTN_TEXT_ENABLED ;
  CHAT_BTN_TEXTS[CHAT_STATE_MINIMIZED] = CHATBTN_TEXT_MINIMIZED ;
  var CHAT_CONTAINER_DIV_ID = 'chat-div' ;
  var CHAT_IFRAME_ID        = 'chat-iframe' ;
  var CHAT_LOADBTN_ID       = 'chat-load-button' ;
  var CHAT_TOGGLEBTN_ID     = 'chat-toggle-button' ;
  var DASHBOARD_BTN_CLASS   = 'user-link' ;
  var CHAT_TAB_TITLE        = 'Chat' ;
  var COOKIE_NAME           = 'chat_default' ;
  var CHATBTN_HTML   =
    '<a href="javascript:void(0);" id="' + CHAT_LOADBTN_ID + '">' + CHATBTN_TEXT_DISABLED + '</a>' ;
  var CHATFRAME_HTML =
  [
    '<a href="javascript:void(0);" id="' + CHAT_TOGGLEBTN_ID + '"></a>',
    '<iframe src="javascript:void(0)" id="' + CHAT_IFRAME_ID + '"></iframe>',
    '<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />',
    '<style>.no-close .ui-dialog-titlebar-close { display: none; }</style>'
  ].join('\n') ;


  /* functions */

  function init()
  {
    document.getElementById(CHAT_CONTAINER_DIV_ID).style.display = 'block' ;
    if (IsChatEnabled) loadChat() ;
    else
    {
      setChatState(CHAT_STATE_DISABLED) ;
      $('#' + CHAT_CONTAINER_DIV_ID).html(CHATBTN_HTML) ;
      $('#' + CHAT_LOADBTN_ID).on("click" , loadChat) ;
    }
  }

  function loadChat()
  {
    var username = getUsername() ; if (!username && !ALLOW_WORLD) return ;

    $('#' + CHAT_CONTAINER_DIV_ID).html(CHATFRAME_HTML) ;
    $('#' + CHAT_CONTAINER_DIV_ID).display = 'none' ;
    $('#' + CHAT_TOGGLEBTN_ID).html("Loading ...") ;
    document.getElementById(CHAT_IFRAME_ID).src =
      CHAT_SERVER_URL +
      '?channels='    + encodeURIComponent(ChatChannels) +
      '&nick='        + encodeURI(username)              ;

    $('#' + CHAT_IFRAME_ID).on('load' , function()
    {
      if (IsChatTab) document.getElementById(CHAT_IFRAME_ID).height = 600 ;

      // TODO: this should really be an iframe callback
      //       as there is no guarantee that the chat actually loaded
      window.setTimeout(function()
      {
        setChatState(CHAT_STATE_ENABLED) ;
        $('#' + CHAT_CONTAINER_DIV_ID).toggleClass(CHAT_STATE_ENABLED) ;
        $('#' + CHAT_TOGGLEBTN_ID).on("click" , function ()
        {
          $('#' + CHAT_CONTAINER_DIV_ID).toggleClass(CHAT_STATE_ENABLED) ;
          var isEnabled = ($('#' + CHAT_CONTAINER_DIV_ID).hasClass(CHAT_STATE_ENABLED)) ;
          setChatState((isEnabled)? CHAT_STATE_ENABLED : CHAT_STATE_MINIMIZED) ;
        }) ;
      } , IFRAME_WAIT_IVL) ;
    }) ;
  }

  function setChatState(chatState)
  {
    $("#" + CHAT_TOGGLEBTN_ID).html(CHAT_BTN_TEXTS[chatState]) ;
    setStoredState(chatState) ;
  }

  function getStoredState() { return CookieObj.cookie(COOKIE_NAME) ; }

  function setStoredState(chatState)
  {
    var nextState = (chatState == CHAT_STATE_ENABLED)? chatState : CHAT_STATE_DISABLED ;
    CookieObj.cookie(COOKIE_NAME , nextState , { expires: 7 , path: '/' }) ;
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

  function getUsername()
  {
    var anonymousUsername = (ANONYMOUS_USERNAME + (new Date()).getTime()) ;
    var dashboardA        = document.getElementsByClassName(DASHBOARD_BTN_CLASS)[0] ;
    if (!dashboardA) return (ALLOW_WORLD)? anonymousUsername : '' ;

    var username = dashboardA.textContent.replace("Dashboard for:" , "").replace(/^\s+|\s+$/g , '') ;
    if (!isNaN(username[0])) username = "_" + username ;

    return username ;
  }


/* main */

  var CookieObj     = getCookie(jQuery) ; // TODO: use LocalStorage
  var ChatChannels  = STATIC_CHANNELS + "#" + window.location.pathname.split('/')[3] ;
  var IsChatTab     = (~document.title.indexOf(CHAT_TAB_TITLE)) ;
  var IsChatEnabled = (getStoredState() === CHAT_STATE_ENABLED) ;

  DomWaitIvl = window.setInterval(function()
  {
    if (!document.getElementById(CHAT_CONTAINER_DIV_ID)) return ;

    window.clearInterval(DomWaitIvl) ; init() ;
  } , DOM_WAIT_IVL) ;

})();
