# Instructions

To embed the improved chat server to an edX course, copy and paste the following code to an HTML X-Block element (as raw HTML, **not** text):

~~~html
<link rel="stylesheet" href="https://rawgithub.com/AgileVentures/EduChat/master/app/assets/app.css">
<script type="text/javascript" src="https://rawgithub.com/AgileVentures/EduChat/master/app/chatframe.js"></script>

<div id="chatframe"></div>
~~~

**WARNING**: Embedding this element causes conflicts with the editor, and will be difficult to edit/remove once added. It is recommended to keep a backup of the page somewhere when adding this element.
