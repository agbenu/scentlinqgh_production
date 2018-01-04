<?php
/*   session_start();

   if ($_SERVER['REQUEST_METHOD'] == 'POST'){
      ob_start();

      if(isset(
         $_REQUEST['company-name'],
         $_REQUEST['name'],
         $_REQUEST['email'],
         $_REQUEST['area-code'],
         $_REQUEST['phone'],
         $_REQUEST['state'],
         $_REQUEST['city'],
         $_REQUEST['subject'],
         $_REQUEST['message'],
         $_REQUEST['token'] )){

         if($_SESSION['token'] != $_POST['token']){ $response = "0";
         } else {
            $_SESSION['token'] = "";
            $company = $_REQUEST['company-name'];
            $name = $_REQUEST['name'];
            $email = $_REQUEST['email'];
            $area = $_REQUEST['area-code'];
            $phone = $_REQUEST['phone'];
            $state = $_REQUEST['state'];
            $city = $_REQUEST['city'];
            $subject = $_REQUEST['subject'];
            $message = $_REQUEST['message'];

            switch (true){
            case !filter_var($email, FILTER_VALIDATE_EMAIL):
                  $response = "<p style='color:red'>Invalid Email Address!</p>";
            break;

            default:
            $to = "info@scentlinqgh.com";
            $subject = "$subject";
            $message = "Company Name: $company<br/>
                        Name: $name<br/>
                        Email: $email<br/><br/>
                        Phone Number: $area - $phone<br/>
                        State: $state<br/>
                        Cisty: $city<br/><br/>
                        Message: $message";

            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            $headers .= 'From: '."info@scentlinqgh.com" . "\r\n";
            $headers .= 'Reply-To: '.$email . "\r\n";
            $params = '-f info@scentlinqgh.com';
            $mailed = (mail($to, $subject, $message, $headers,$params));
            if( isset($_REQUEST['ajax'])){ $response = ($mailed) ? "1" : "0";
            } else {
              $response = ($mailed) ? "<h2>Success!</h2>" : "<h2>Error! There was a problem with sending.</h2>";
            }
         break;
         }
         echo $response;
         }
      } else {
      echo "Error";
      }
   ob_flush();
   die();
   }*/
?>
<?php include "assets/includes/doctype.inc"; ?>

   <title>International Inquires | <?php include "assets/includes/website-name.inc"; ?>
   </title>
   <meta name="description" content="">

   <?php include "assets/includes/head.inc"; ?>
</head>

<body>
   <!--Main Header-->
   <header id="header">
      <?php include "assets/includes/header.inc"; ?>
   </header>

   <!--Header For Small Screens Only-->
   <?php include "assets/includes/second-header.inc"; ?>

   <div id="page"><!--Page Container-->

      <div class="topSection">
         <div class="content">
            <h1>International Inquires</h1>
         </div>
      </div>

      <div class="wrapper">
         <div class="content center">

            <?php
/*               $token = md5(uniqid(rand(), TRUE));
               $_SESSION['token'] = $token;*/
            ?>

            <!--Contact Form-->

            <div id="contactForm">

               <div>
                  <h3><strong>SCENT LINQ GHANA LIMITED</strong></h3>
                  <p>P.O.Box 8684<br>
                     Accra</p>
                     <br>
                  <p><strong>Telephone:</strong> <br/>
                     +233 262 691 603 <br/>
                     +233 249 805 706
                  </p>
                  <p><strong>Email:</strong> info@scentlinqgh.com</p>
                     <br>
                  <!--Smart Buttons-->
                  <div class="hide">
                     <a href="tel:233504316250">Tap to call us</a>
                     <a href="sms:233504316250">Tap to send us a SMS</a>
                  </div>
               </div>
               
<!--                <form name="contactForm" action="contact.php" method="post" redirect="thankyou.php">
                  <input name="token" type="hidden" value="<?php echo $token; ?>">
                  <input name="ajax" type="hidden" value="1">

                  <div class="company-name">
                     <p>Company Name</p>
                     <input name="company-name" class="required" autocomplete="off">
                  </div>

                  <div class="name">
                     <p>Full Name</p>
                     <input name="name" class="required" autocomplete="off">
                  </div>

                  <div class="email-address">
                     <p>Email Address</p>
                     <input name="email" class="required email" autocomplete="off">
                  </div>

                  <div class="area-code">
                     <p>Area Code</p>
                     <input name="area-code" autocomplete="off">
                  </div>

                  <div class="phone">
                     <p>Phone Number</p>
                     <input name="phone" class="number" autocomplete="off">
                  </div>

                  <div class="state">
                     <p>State</p>
                     <input name="state" class="required" autocomplete="off">
                  </div>

                  <div class="city">
                     <p>City</p>
                     <input name="city" class="required" autocomplete="off">
                  </div>

                  <div class="subject">
                     <p>Subject</p>
                     <input name="subject" class="required" autocomplete="off" value="International Inquires">
                  </div>

                  <div class="message">
                     <p>Message</p>
                     <textarea name="message" rows="5" class="required min3"></textarea>
                  </div>

                  <div>
                     <p></p>
                     <input name="" class="required number spamcheck">
                  </div>

                  <button id="submit" type="submit">Send</button>
               </form> -->

            </div>

            <!--Contact Details-->
            <div id="contactDetails">

               <!--Social Media Icons-->
               <?php include "assets/includes/social-media-icons.inc"; ?>
            </div>

         </div>
      </div>

      <!--Footer-->
      <?php include "assets/includes/footer.inc"; ?>

   </div><!--/Page-->
   <!--Scripts-->
   <?php include "assets/includes/scripts.inc"; ?>
</body>
</html>