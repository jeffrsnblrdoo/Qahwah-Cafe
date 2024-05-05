<?php include('../dbcon.php');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qahwah Cafe</title>
    <link rel="stylesheet" href="./css/inquire_styles.css">
</head>
<body>
    <header>
        <div class="navbar">                                                                           
            <a href="./menu.html">MENU</a>
            <a href="./order.html">ORDER</a>
            <a href="./home.html">
                <img class="logo" src="./images/Logo 2.png" alt="Qahwah Cafe Logo" />
            </a>
            <a href="./inquire.html">INQUIRE</a>
            <a href="./location.html">LOCATION</a>
        </div class="navbar">
    </header>
    <div class="container">
        <h1>Inquire Events</h1>
        <p>Book our coffee cart for your next event and have the best moment with us.</p>
        <div class ="contact-box">
            <div class="contact-left">
                <h3>Answer Required Questions for Booking</h3><br><br>



                <?php
                    if(isset($_POST['submit_inquiry'])){
                        $BookerName = $_POST['booker_name'];
                        $Email = $_POST['Email'];
                        $MobileNumber = $_POST['mobile_number'];
                        $EventTitle = $_POST['event_title'];
                        $InvoiceMsg = $_POST['invoice'];
                        $date = date("Y-m-d");
                        $time = date("h:i:sa");
                        
                        $query = "insert into `inquirytable` (`booker_name`,`email_address`,`mobile_no`,`event_title`,`invoice`,
                        `date`,`time`,`Is_archived`) values ('$BookerName','$Email','$MobileNumber','$EventTitle','$InvoiceMsg','$date','$time', '0')";

                        $result = mysqli_query($connection,$query);

                        if(!$result){
                            die("Query Failed". mysqli_error());
                        }else{
                            header('location:inquire.php');
                        }
                    }
                ?>

                <form method="post">
                    <div class="input-group">
                        <label>Name of Booker</label><br>
                        <input type="text" name="booker_name" placeholder ="Qawah">
                    </div>
                    <div class="input-group">
                        <label>E-mail Address</label><br>
                        <input type="text" name="Email" placeholder ="Qawahcafe@gmail.com">
                    </div>
                    <div class="input-group">
                        <label>Mobile Number</label><br>
                        <input type="text" name="mobile_number" placeholder ="***">
                    </div>
                    <div class="input-group">
                        <label>Name/title of the Event? What is your event called?</label>
                        <input type="text" name="event_title" placeholder ="x & x wedding party ">
                    </div>
                    <label>Messages/Invoice</label><br>
                    <textarea rows ="10" columns ="50" name="invoice" placeholder="Your Message"></textarea>

                    <div class="input-field">
                        <input type="submit" class="submit" name="submit_inquiry" value="Submit">   
                    </div>
                </form>
            </div>
            <div class="contact-right">
                <img src="./images/InquirePic.png" alt="dk"/>
            </div>
        </div>
    </div>

    <footer>
        <div class="cafe-info">
            <a href="./about.html">About Us</a>
            <a href="./contact.html">Contact Us</a>
        </div>
        <div class="copyright">
          <p>Copyright ©2024 Qahwah Cafe. All rights reserved.</p>
      </div>
    </footer>
</body>
</html>
