<?php include ($_SERVER['DOCUMENT_ROOT']. "/assets/includes/doctype.inc"); ?>

   <title>Page Not Found - Error 404</title>
   <meta name="description" content="The requested page could not be found.">

   <?php include ($_SERVER['DOCUMENT_ROOT']. "/assets/includes/head.inc"); ?>
</head>

<body>
   <!--Main Header-->
   <header id="header">
      <?php include ($_SERVER['DOCUMENT_ROOT']. "/assets/includes/header.inc"); ?>
   </header>

   <!--Header For Small Screens Only-->
   <?php include ($_SERVER['DOCUMENT_ROOT']. "/assets/includes/second-header.inc"); ?>

   <div id="page"><!--Page Container-->

      <div class="wrapper">
         <div class="content" id="error404">

            <h1>Sorry, the page you're looking for does not exist.</h1><br>
            <p><strong><a href="">Click here</a></strong> to go to the home page or use the navigation above to find what you are looking for.</p>

         </div>
      </div>

      <!--Footer-->
      <?php include ($_SERVER['DOCUMENT_ROOT']. "/assets/includes/footer.inc"); ?>

   </div><!--/Page-->
   <!--Scripts-->
   <?php include ($_SERVER['DOCUMENT_ROOT']. "/assets/includes/scripts.inc"); ?>
</body>
</html>