<?php
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>Badger, badger, badger, mushroom, mushroom!</title>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.0.min.js"></script>

        <!-- Intro.js: A step-by-step guide and feature introduction -->
        <script type="text/javascript" src="https://cdn.jsdelivr.net/intro.js/2.2.0/intro.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/intro.js/2.2.0/introjs.min.css">
        <script> // Hack: I can't get introJs().setOptions to store settings permanent !?
            var jsintro = function() {
                introJs().setOptions({"showStepNumbers": false, "skipLabel": "Exit", "showBullets": false}).start(); }
        </script>

        <style type="text/css">
            #container { width: 100%; overflow: hidden; }
            .draggable { cursor: move; }  /* Change mouse cursor */
            .menu { display: inline-block; float: left; padding: 2px; border-radius: 3px; background: rgb(90, 210, 135); }
            .badge { float: left; }
            .closeBtn { float: right; position: relative; right: 25px; top: 25px; }
            .hidden { display: none; }
            @media print { .no-print, .no-print * { display: none !important; } } /* Don't print menu */
        </style>

        <script type="text/javascript" src="lz-string/libs/lz-string.min.js"></script>
        <script type="text/javascript" src="lz-string/libs/base64-string.js"></script>
        <script type="text/javascript" src="app.js"></script>
    </head>
    <body ondragover="event.preventDefault();" ondrop="event.preventDefault(); dropHandler(event)">
<?php if (!isset($_POST['code'])) { ?>
        <div id="container">
            <form action="recover.php" method="post">
                Badge code: &nbsp;
                <input type="text" name="code">
                <button type="button" id="recover1">Genskab 1</button>
                <input type="submit" value="Genskab 2">
            </form>
        </div><!-- /container -->
<?php } else {
	echo base64_decode($_POST['code']);
} ?>
        <script type="text/javascript">
          $( "#recover1" ).on("click", function() {
              var decoded = decodeBadgeCode( $("#code").val() );
              if (decoded.length > 0)
                  $("body").html(decoded);
          });
          $(document).ready(function(){
              if (typeof(localStorage) !== "undefined") {
                  // First time trying app? Lets run the introduction
                  if (!localStorage.hasrun) {
                    jsintro();
                    localStorage.setItem("hasrun", true);
                  }

                  // Prompt to load if a badge previous has been saved (and isn't the default badge)
                  //outputLayout(true);
                  /*if (localStorage.savedBadge && localStorage.savedBadge != $("#outputTextField").val()) {
                      if (confirm("Load previous saved badge?")) {
                          $("#outputTextField").val(localStorage.savedBadge);
                          loadSaved();
                      } //else if (confirm("Delete previous saved badge?")) {
                  }*/

                  // Closing app? Lets save the current layout
                  window.onbeforeunload = function(e) {
                      outputLayout(true); // Make sure "#outputTextField" is updated
                      localStorage.savedBadge = $("#outputTextField").val();
                  }

                  if (localStorage.savedBadge)
                      $("#inputTextField").val(localStorage.savedBadge);
              }

          });
        </script>
    </body>
</html>
