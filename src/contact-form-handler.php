<?php
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

        $email_from = 'test@hotmail.com';

        $email_subject = 'Consultation Form Submission';

        $email_body = "User Name: $name.\n".
                        "User email: $visitor_email.\n". 
                        "User Message: $message.\n";

        
    $to = "brandonlee2543@hotmail.com";

    $headers ="From: $email_from \r\n";

    $headers .= "Reply-To: $visitor_email \r\n";

    mail($to,$email_subject,$email_body, $headers);

    header("Location: index.html");
?>