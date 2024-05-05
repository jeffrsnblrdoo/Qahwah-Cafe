<?php include('../../dbcon.php');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qahwah Cafe</title>
    <link rel="stylesheet" href="./SignIn.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <header>
        <div class="navbar">                                                                           
            <a href="../../Menu/Menu.html">MENU</a>
            <a href="../../Ordering/orderpage.html">ORDER</a>
            <a href="../../Homepage/index.html">
                <img class="logo" src="../../Homepage/Pictures/Logo 2.png" alt="Qahwah Cafe Logo" />
            </a>
            <a href="../../Inquire/Inquire.html">INQUIRE</a>
            <a href="#">LOCATION</a>
        </div class="navbar">
    </header>
        <div class="box">
            <div class="container">
                <div class="top-header">
                    <span>have an account?</span>
                    <h1>Sign In</h1>
                </div>

                
                <?php
                    if(isset($_POST['useraccounts_check'])){
                        //CHECKS IF THE USERNAME EXISTS IN THE DATABASES
                        $AccountExists = false;
                        $username = $_POST['username'];
                        $password = $_POST['password'];

                        $query = "select * from `useraccounts`";
                        $result = mysqli_query($connection, $query);
                        if(!$result){
                            die("query Failed".mysqli_error());
                        }
                        else{
                            while($row = mysqli_fetch_assoc($result)){
                                //ITERATE EACH ROW AND COMPARE USERNAME
                                if($row['user_name']==$username){
                                    $AccountExists = true;
                                }
                            }
                        }
                        if($AccountExists){

                            header("Location:http://localhost/qahwah-cafe/ClientUI/client_ui.html"); 
                            exit; // <- don't forget this!
                        }
                    }
                ?>

                <form method="post">
                    <div class="input-field">
                        <input type="text" class="input" name="username" placeholder="Username" required>   
                        <i class="bx bx-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="input" name="password" placeholder="Password" required>
                        <i class="bx bx-lock-alt"></i>   
                    </div>
                    <div class="input-field">
                        <input type="submit" class="submit" name="useraccounts_check" value="SignIn">   
                    </div>
                </form>
                <div class="bottom">
                    <div class="left">
                        <input type="checkbox" id="check">
                        <label for="check">Remember Me</label>
                    </div>
                    <div class="right">
                        <label>No account? <a href="../SignUp/SignUp.html"> create one</a>!</label>
                    </div>
                </div>
            </div>
        </div>

    <footer>
        <div class="cafe-info">
            <a href="../../About Us/AboutUs.html">About Us</a>
            <a href="#">Contact Us</a>
        </div>
        <div class="copyright">
          <p>Copyright ©2024 Qahwah Cafe. All rights reserved.</p>
      </div>
    </footer>
</body>
</html>