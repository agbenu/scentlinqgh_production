//Form validation script - version.24.2.2014
$(document).ready(function () { if ($('form').length > 0) {

   //Error messages
   var errorMessage = {
       required:     "*This field can not be empty",
       email:        "*Please enter a valid email address",
       number:       "*This field can only contain numbers",
       min:          "*This field should be minimum ",
       max:          "*This field should be maximum ",
       datecheck:    "*Invalid date. Please use dd/mm/yyyy format",
       mindatemsg:   "*Date should not be less than ",
       maxdatemsg:   "*Date should not be greater than ",
       spamcheckmsg: "*Your answer is incorrect",
   };

   //Validation settings
   $(".calendar").datepicker({
      dateFormat: 'dd/mm/yy',
   });
   $(".calendar").focus(function(){$(this).blur()})

   //Initialise spam checks
   $(".spamcheck").each(function(){
     var random_minimum = 1;
     var random_maximum = 5;

     var random_number1 = Math.floor(Math.random() * (random_maximum - random_minimum + 1)) + random_minimum;
     var random_number2 = Math.floor(Math.random() * (random_maximum - random_minimum + 1)) + random_minimum;

     $(this).prev().text("How much is "+ random_number1 + " + " + random_number2 + " = ?");
     $(this).attr("random_number1", random_number1);
     $(this).attr("random_number2", random_number2);
   });

   //Regular expressions
   var emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   var minRegEx   = /^min[0-9]+/;
   var maxRegEx   = /^max[0-9]+/;
   var numRegEx   = /^\d+$/;

   var $form      = $("form");
   var $inputs    = $("input, textarea, select");
   var $labels    = $("label");
   var event;

   //Real-time validation
   $inputs.on('blur keyup change', function(e){
      var $element = $(this);
      event = e;
      if (!$element.hasClass("required")) {
         resetErrorMessage($element);
      }
      checkForClasses($element);
   });

   //Validate on submit
   function validate() {
      $inputs.each(function () {
         var $element = $(this);
         resetErrorMessage($element);
         checkForClasses($element);
      });

      if (!$('.validationError').length) {
         return true;
      } else {
         return false;
      }
   }

   //Form submit event handler
   $form.submit(function (e) {
      event = e;
      e.preventDefault();

     var $element = $(this);
      $submit = $element.find('button[id="submit"]');
      if (validate()) {
       if($("#ajax").length && $("#ajax").val() == 0){   //let the form POST what it was supposed to if ajax indicator is set to 0
         /* $.post($element.attr('action'), $form.serialize(), function (data) {});
         location.replace($element.attr('action')); */
         $.post($element.attr('action'), $form.serialize(), function (data) {})
            .done(function(){
               //location.replace($element.attr('action'));
            })
            .fail(function() {
               alert( "Failed to send the email" );
            })
            .always(function() {
            });
         return true;
       }

         $.post($element.attr('action'), $form.serialize(),
         function (data) {
            if (data) {
               $submit.text('Sent. Thank You!');
               $submit.add($inputs).add($labels).addClass('disabled').prop('disabled', true);
            }
         })
         .done(function(){
            location.replace($element.attr('redirect'));
         })
         .fail(function() {
            alert( "Failed to send the email" );
         })
         .always(function() {
         });
      } else {
        $submit.text('Try Again');
      }
   });

   //Check for validation rules in inputs
   function checkForClasses(element) {

      var $element = $(element);
      var classes = $element.attr('class');

      if(classes){
         var classList = classes.split(/\s+/);
         $.each(classList, function(index, className){
            switch (true){
               case className == "required":
               case className == "email":
               case className == "number":
               case className == "date":
               case className == "calendar":
                  return masterChecks($element, className);
                  break;

               case minRegEx.test(className):
               case maxRegEx.test(className):
                  var controlVal = className.match(/(\d+)/)[1];
                  return masterChecks($element, className, controlVal);
                  break;

               case className.substring(0,7) == "mindate":
               case className.substring(0,7) == "maxdate":
                  return masterChecks($element, className.substring(0,7), className.substring(7));
                  break;

               case className == "spamcheck":
                  r1 = $element.attr("random_number1");
                  r2 = $element.attr("random_number2");

              controlVal = Number(r1) + Number(r2);

              return masterChecks($element, className, controlVal);
                  break;

            default:
                  break;
            }
         });
      }
   }

   //The core validation engine for various input types
   function masterChecks(element, className, controlVal){

      var $element = $(element);
      var valid = true;

      if(className == "required"){
         var attribute_type = $element.attr("type");
         if((attribute_type == "checkbox") || (attribute_type == "radio")){
            name = $element.attr("name");
            if($("input:"+attribute_type+"[name="+name+"]:checked").length == 0){
                  valid = false;
            }
         }
         if (!valid || $.trim($element.val()) == "") {
            manageErrorMessage($element, errorMessage.required);
               valid = false;
         }
      }
      else{
         if($element.val() == "" && !$element.hasClass("required")){
            return valid;
         }
         switch (true){
            case className == "required":
               break;

            //Email validation rule
            case className == "email":
               var emailIn = $.trim($element.val());
               if(event.type != "blur" && event.type != "change" && emailIn != "")
                  break;

               if (!emailRegEx.test(emailIn)){
                  manageErrorMessage($element, errorMessage.email);
                  valid = false;
               }
               break;

            //Number validation rule
            case className == "number":
               var numIn = $.trim($element.val());
               if (!numRegEx.test(numIn)) {
                  manageErrorMessage($element, errorMessage.number);
                  valid = false;
               }
               break;

            //Minimum validation rule
            case minRegEx.test(className):
               if (Number($.trim($element.val().length)) < Number(controlVal)) {
                  manageErrorMessage($element, errorMessage.min, controlVal);
                  valid = false;
               }
               break;

            //Maximum validation rule
            case maxRegEx.test(className):
               if (Number($.trim($element.val().length)) > Number(controlVal)) {
                  manageErrorMessage($element, errorMessage.max, controlVal);
                  valid = false;
               }
               break;

            //Calendar & date validation rules
            case className == "date":
            case className == "calendar":
               if(!validateDate($element.val())){
                  manageErrorMessage($element, errorMessage.datecheck);
                  valid = false;
               }
               break;

            //Min-date and Max-date validation rules
            case className.substring(0,7) == "mindate":
            case className.substring(0,7) == "maxdate":
               if(!validateDate($element.val())){
                  manageErrorMessage($element, errorMessage.datecheck);
                  valid = false;
                  break;
               }
               var target_date = "";
               try {
                  if(Number(controlVal) >= 0 || Number(controlVal) <= 0){
                     target_date = new Date();
                     target_date.setDate(target_date.getDate() + Number(controlVal));
                  }
                  else{
                     dateParts = controlVal.split("/");
                     target_date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
                  }
               }
               catch(err){/*alert("something blew off");*/}

               var dateParts           =  $element.val().split("/");
               var inputDate           =  new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
               var target_date_disp    =  String("00"    + target_date.getDate()).slice(-2) + "/" +
                                          String("00"    + (Number(target_date.getMonth())+1)).slice(-2) + "/" +
                                          String("0000"  + target_date.getFullYear()).slice(-4);

               if(className.substring(0,7) == "mindate"){
                  if(inputDate < target_date){
                     manageErrorMessage($element, errorMessage.mindatemsg, target_date_disp);
                     valid = false;
                  }
               }
               else{
                  if(inputDate > target_date){
                     manageErrorMessage($element, errorMessage.maxdatemsg, target_date_disp);
                     valid = false;
                  }
               }
               break;

         //Spamcheck
         case className == "spamcheck":
            if(Number($element.val()) != controlVal){
                manageErrorMessage($element, errorMessage.spamcheckmsg);
                valid = false;
            }
            break;

         default:
               break;
         }
      }
      if(valid){
         resetErrorMessage($element);
      }
      return valid;
   }

   //Single function to validate date
   function validateDate(dateString){
      var dateParts = dateString.split("/");
      var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
      if ((dateString.length != 10)
            ||
         !(date.getDate() == dateParts[0] && date.getMonth() == (dateParts[1] - 1) && date.getFullYear() == dateParts[2])
         ){
         return false;
      }
      return true;
   }

   //Error Messages
   function manageErrorMessage(element, errorMessageIn, value) {
      var $element = $(element);
      var attribute_type = $element.attr("type");
      if((attribute_type == "checkbox") || (attribute_type == "radio")){
         name = $element.attr("name");
         $element = $("input:"+attribute_type+"[name="+name+"]:last").closest("label");
      }

      if(!$element.hasClass('validationError'))
          $element.addClass('validationError');

      if (!$element.next().is("span")) {
           $element.after('<span class="validationError"></span>');
      }

      switch (true){
         case errorMessageIn == errorMessage.mindatemsg:
         case errorMessageIn == errorMessage.maxdatemsg:
            $element.next().html(errorMessageIn + value);
            break;

         case value > "":
            $element.next().html(errorMessageIn + value + " charaters long.");
            break;

         default:
            $element.next().html(errorMessageIn);
            break;
      }
   }

   //Reset/clear error messages previously shown
   function resetErrorMessage(element) {
      var $element = $(element);
      var attribute_type = $element.attr("type");
      if((attribute_type == "checkbox") || (attribute_type == "radio")){
         name = $element.attr("name");
         $element = $("input:"+attribute_type+"[name="+name+"]:last").closest("label");
      }

      $element.removeClass("validationError");

      if ($element.next().is("span")) {
         $element.next().remove();
      }
   }
}});