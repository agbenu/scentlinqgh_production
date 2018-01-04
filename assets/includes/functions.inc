<?php #add class .active to current page
   $directoryURL = $_SERVER['REQUEST_URI'];
   $path = parse_url($directoryURL, PHP_URL_PATH);
   $components = explode('/', $path);
   $currentPage = preg_replace("/\\.[^.\\s]{3,4}$/", "", end($components));

   if ($currentPage == "") {
      $currentPage = "index";
   }

   function href($url) {
      global $currentPage;
      $path = explode('/', $url);
      $page = preg_replace("/\\.[^.\\s]{3,4}$/", "", end($path));
      echo 'href="' . $url . '" ';

      if ($page == $currentPage) {
         echo 'class="active"';
      }
   }
?>
