# Instructions

To embed the improved chat server to an edX course, copy and paste the following code to an HTML X-Block element (as raw HTML, **not** text):

~~~html
<link rel="stylesheet" href="https://rawgithub.com/yggie/EduChat/stable/app/assets/app.css">
<script src="https://rawgithub.com/yggie/EduChat/stable/jquery.cookie.js"></script>
<script type="text/javascript" src="https://rawgithub.com/yggie/EduChat/stable/app/chatframe_toggleBtn.js"></script>

<div id="chatframe" class="minimized">
  <a href="javascript:void(0);" id="chat-button">Open Chat</a>     
  <iframe src="javascript:void(0)" id="chatiframe"></iframe>
</div>
~~~

**WARNING**: Embedding this element causes conflicts with the editor, and will be difficult to edit/remove once added. It is recommended to keep a backup of the page somewhere when adding this element.
