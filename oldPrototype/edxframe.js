var chatChannels = "#cs1691x";
var urlPrefix = 'https://cs1692x.moocforums.org/chatlog/edxframe/CS169.1x/3T2013/';

var onChatTab = false;
if (document.title.indexOf("Chat") != -1) {
  onChatTab = true;
}

chatframeContent =
['<p><span id="loadingchat">Loading chat...</span>',
 '<iframe id="chatiframe"',
 '       style="position: absolute; top: -9999em; visibility: hidden;"',
 '       onload="showDelayed(5,this,\'loadingchat\');"',
 '       src="https://cs1692x.moocforums.org:9001/"',
 '       height="300" width="100%"></iframe></p>',
 '<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />',
 '<style>.no-close .ui-dialog-titlebar-close { display: none; }</style>',
 '<div id="dialog-consent" title="Chat Research Study Invitation">',
 '    <p>University of California, Berkeley is conducting a research study in which some CS169.1x students will have access to a live chatroom supported by course staff.</p>',
 '</div>',
 '<div id="dialog-consent-details" title="Chat Research Study Information">',
 '<h3>CONSENT TO PARTICIPATE IN RESEARCH</h3>',
 '<h3>Integrating Chatroom Software in Online Classes</h3>',
 '<i>(<a href="https://cs1692x.moocforums.org/chatlog/edxframe/CS169.1x/3T2013/consentform/" target="_blank">open this information in a new tab</a>)</i>',
 '',
 '<h3>Introduction</h3>',
 '<p>My name is Derrick Coetzee. I am a graduate student researcher at the University of California, Berkeley, in the Electrical Engineering and Computer Sciences (EECS) department, working with faculty advisor Bj&ouml;rn Hartmann.  I would like to invite you to take part in my research study, which concerns whether and how chatroom software should be integrated in online courses. Chatroom software allows students to interact with each other and/or staff in real time.</p>',
 '<p>We are inviting you to participate in this study because you have enrolled for a participating online course on edX. This study is intended for adults aged eighteen years or older.</p>',
 '<h3>Purpose</h3>',
 '<p>The purpose of this research study is to determine whether the availability of real-time chatroom software is helpful for building effective communities and promoting learning in an online class setting.</p>',
 '<h3>Procedures</h3>',
 '<p>If you agree to be in this study, you will be asked to do the following:</p>',
 '<ul>',
 '<li>Randomization: You will be randomly assigned to one of the study groups described below. This means that the group you are in will be chosen by chance, like the flip of a coin. You will have an equal chance of being placed in any of the groups.',
 '    <ul>',
 '    <li>If you are in Group 1, you will not have access to the chatroom functionality. You will still have the same level of support in the edX forum. This is the same experience that students who decline to participate will receive.</li>',
 '    <li>If you are in Group 2, you will be able to access the chatroom through a tab labeled "Chat" at the top of the edX interface. You will not be obligated to actively participate in the chat.</li>',
 '    <li>If you are in Group 3, you will have access to the chatroom through the "Chat" tab, and additionally, every lecture and assignment page will feature a smaller embedded chat. All these chats will access the same shared chatroom. Again, you will not be obligated to actively participate in the chat.</li>',
 '    </ul>',
 '</li>',
 '<li>You will be asked to complete an anonymous survey about your experience with the chatroom and how it influenced your experience. The survey is completed online and should take about 10 to 15 minutes.</li>',
 '<li>All your interactions with the chatroom, including arrival and departure and chat messages, will be recorded along with your edX username and the exact time.</li>',
 '<li>In cooperation with edX, we will access your edX information, including test scores, submission times, and exact times at which you accessed pages such as video lectures.</li>',
 '</ul>',
 '<p>All study procedures will take place on the edX website and the survey website. No face-to-face meetings or phone or e-mail contact will be required. You may interact with the chatroom as much or as little as you wish during the course.</p>',
 '<h3>Benefits</h3>',
 '<p>There are no direct benefits to subjects. Some subjects may benefit from improved community participation, including rapid help with course assignments, but the primary purpose of the study is to gather information that will help other online courses to make decisions about whether and how to integrate chatroom software, as well as to help researchers understand how chatrooms influence the online learning process.</p>',
 '<h3>Risks/Discomforts</h3>',
 '<ul>',
 '<li>Because any participant in experimental groups 2 and 3 can view and republish chatroom messages and this cannot be prevented, you should assume that your chatroom messages, with timestamps, will be available to the general public. Moreover, researchers will distribute chatroom logs to the research community. We advise you not to include any sensitive private information in your messages. Messages containing sensitive personal data will be deleted from logs upon request, but this will not prevent others who saw your messages from disseminating it.</li>',
 '<li>Some experiences in the chatroom, such as personal conflicts, may make you uncomfortable or upset. You are free at any time to cease participating in the chatroom and use alternate support such as the edX forum. Similarly, in the survey, you are free to decline to answer any questions you don\'t wish to, or to stop filling out the survey and not submit your responses.</li>',
 '<li>Breach of confidentiality: As with all research, there is a chance that confidentiality could be compromised; however, we are taking precautions to minimize this risk.</li>',
 '</ul>',
 '<h3>Confidentiality</h3>',
 '<p>Your confidentiality will be kept to the degree permitted by the technology being used. No guarantees can be made regarding the interception of data sent via the Internet by any third parties. If results of this study are published or presented, individual names, pseudonyms, and other personally identifiable information will not be used. To minimize the risks to confidentiality, we will do the following:</p>',
 '<ul>',
 '<li>Your edX information, such as test scores and time that lectures were viewed, will be associated only with your pseudonym and will not be publicly accessible.</li>',
 '<li>Your research records, including all logged data, will be stored in an encrypted format. The information needed to decrypt and view the data will be stored by researchers on password-protected departmental systems at University of California, Berkeley.</li>',
 '<li>Only the researchers on this project will have access to your study records.  We will keep your study data as confidential as possible.</li>',
 '</ul>',
 '',
 '<p><b>Future use of study data:</b> The research data will be maintained for possible use in future research in this project and others. The data will be retained indefinitely. The same measures described above will be taken to protect confidentiality of this study data.</p>',
 '<h3>Alternatives to Participation</h3>',
 '<p>As an alternative to participating in this study, you may choose to use the standard edX forum, which is operated by edX and unaffiliated with this study. To reach it, click the "I do not wish to participate" button below to dismiss this form, and then click the "Discussion" link at the top of the edX course website. The edX forum will provide the same or better level of support as the chatroom.</p>',
 '<h3>Compensation/Payment and Costs</h3>',
 '<p>You will not be compensated for your participation in this study, and you will not be charged for any of the study activities.</p>',
 '<h3>Rights</h3>',
 '<p><b>Participation in research is completely voluntary.</b></p>',
 '<p>You have the right to decline to participate or to withdraw at any point in this study without penalty or loss of benefits to which you are otherwise entitled.</p>',
 '<h3>Questions</h3>',
 '<p>If you have any questions or concerns about this study, contact researcher Derrick Coetzee at e-mail address <code>dcoetzee@eecs.berkeley.edu</code>. If you need to directly contact the Principal Investigator leading the project, you can do so at e-mail address <code>bjoern@eecs.berkeley.edu</code>. Do not use these emails for questions about the course or assignments; use the edX forum, chatroom, or e-mail course staff for this purpose.</p>',
'<p>If you have any questions or concerns about your rights and treatment as a research subject, you may contact the office of UC Berkeley\'s Committee for the Protection of Human Subjects, at 510-642-7461 or <code>subjects@berkeley.edu</code>.</p>',
 '<h3>Consent</h3>',
 '<p>If you wish to save or print this information, you may <a href="https://cs1692x.moocforums.org/chatlog/edxframe/CS169.1x/3T2013/consentform/" target="_blank">open it in a new tab</a> and then use the Save or Print features of your web browser. Please click one of the buttons below.</p>',
 '</div>'
].join('\n');

$("#chatframe").hide();
$("#chatframe").html(chatframeContent);

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
  return getContentInContainer("user-link").replace("Dashboard for:", "").replace(/^\s+|\s+$/g, '');
}

function updateChatUrl() {
  username = getUsername();
  document.getElementById('chatiframe').src +=
      '?channels=' + encodeURIComponent(chatChannels) +
      '&nick=' + encodeURI(username);
}

if (document.getElementById('chatiframe')) {
  init();
} else {
  window.onload = init;
}

function sendJsonpCommand(url) {
    $.ajax({
	url: url,
	dataType: 'jsonp',
	type: 'GET',
	contentType: "application/json",
	jsonpCallback: 'jsonCallback',
	success: function (json) { }
    });
}

function showDetailedConsent() {
    jQuery.ajax({async:true, type:'GET', url:'https://code.jquery.com/ui/1.10.3/jquery-ui.js', data:null, dataType:'script', success:function() {
	$("#dialog-consent-details").show();
	$( "#dialog-consent-details" ).dialog({
	    resizable: true, width:Math.round(window.innerWidth*0.9), height:Math.round(window.innerHeight*0.9), modal: true, position: "top",
	    closeOnEscape: false, dialogClass: "no-close",
	    buttons: {
		"I consent to participate in this study": function() {
                    sendJsonpCommand(urlPrefix + 'consent/?username=' + getUsername());
		    $( this ).dialog( "close" );
		    // $("#chatframe").html('Please refresh to see the chatroom.');
                    $("#chatframe").show();
		},
		"I do not wish to participate": function() {
                    sendJsonpCommand(urlPrefix + 'reject/?username=' + getUsername());
                    $( this ).dialog( "close" );
		},
		"Remind me again in 1 day": function() {
                    sendJsonpCommand(urlPrefix + 'setnextpopuptime/?secsfromnow=86400&username=' + getUsername());
                    $( this ).dialog( "close" );
		},
	    }
	});
    }});
    scrollTo(0, jQuery("dialog-consent-details"));
}

function showConsent() {
    jQuery.ajax({async:true, type:'GET', url:'https://code.jquery.com/ui/1.10.3/jquery-ui.js', data:null, dataType:'script', success:function() {
	$("#dialog-consent").show();
	$( "#dialog-consent" ).dialog({
	    resizable: false, width:400, height:420, modal: true,
	    closeOnEscape: false, dialogClass: "no-close",
	    buttons: {
		"More details": function() {
		    $( this ).dialog( "close" );
		    showDetailedConsent();
		},
		"I do not wish to participate": function() {
                    sendJsonpCommand(urlPrefix + 'reject/?username=' + getUsername());
                    $( this ).dialog( "close" );
		},
		"Remind me again in 1 day": function() {
                    sendJsonpCommand(urlPrefix + 'setnextpopuptime/?secsfromnow=86400&username=' + getUsername());
                    $( this ).dialog( "close" );
		},
	    }
	});
    }});
}

function init() {
  updateChatUrl();

  // Based on http://www.jquery4u.com/json/jsonp-examples/
  $.ajax({
      url: urlPrefix + 'checkconsent/?username=' + getUsername(),
      dataType: 'jsonp',
      type: 'GET',
      async: false,
      contentType: "application/json",
      jsonpCallback: 'jsonCallback',
      success: function (json) {
          if (json.consented) {
              if (json.group == 3 ||
		  (onChatTab && json.group == 2) ||
		  json.isadmin)
	      {
                  if (onChatTab) {
                      document.getElementById('chatiframe').height = 600;
                  }
		  $("#chatframe").show();
		  $("#dialog-consent").hide();
		  $("#dialog-consent-details").hide();
              } else if (onChatTab && json.group == 1) {
		  $("#chatframe").html('You are ineligible to participate in the chat because you were randomly assigned to Group 1. Group 1 has no access to chat functionality.');
		  $("#chatframe").show();
	      }
          } else {
              $('#chatiframe').attr('src', 'about:blank');
              // if (window.frames["chatiframe"].location) {
                  // window.frames["chatiframe"].location.reload();
              // }
              if (!json.rejected && json.shownextpopup) {
                  showConsent();
              }
	      if (onChatTab && json.rejected) {
		  $("#chatframe").html('You are ineligible to participate in the chat because you have declined participation in the chat experiment.');
		  $("#chatframe").show();
	      }
	      if (onChatTab && !json.shownextpopup) {
		  $("#chatframe").html('You are ineligible to participate in the chat because you have not yet agreed to participate in the chat experiment.');
		  $("#chatframe").show();
	      }
          }
      }
  });
}

function showDelayed(delaySeconds, element, elementHide) {
  setTimeout(function(){
    element.style.position='static';
    element.style.visibility='visible';
    document.getElementById(elementHide).style.display='none';
  }, 1000*delaySeconds);
}
