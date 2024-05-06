<?php include('../dbcon.php')?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Qahwah Cafe Online Store" />
    <title>Qahwah Cafe</title>
    <link rel="stylesheet" href="./css/client_styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Prata&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <?php
        echo "<script>alert('Welcome Admin!');</script>";
    ?>
        <header>                                                                      
            <img class="logo" src="./images/Logo 2.png" alt="Qahwah Cafe Logo" />
            <h1>CAFE WEBSITE <br/>CONTROL PANEL</h1>
        </header>
        <main>
            <div class="dashboard">
                <h1>Dashboard</h1>
                <div class="categories">
                    <div class="order">
                        <h2>Order</h2>
                        <span>0</span>
                    </div>
                    <div class="inquiry">
                        <h2>Inquiry</h2>
                        <span>0</span>
                    </div>
                    <div class="report">
                        <h2>Report</h2>
                        <span>0</span>
                    </div>
                </div>
            </div><!--dashboard-->
            <div class="order-container">
                <h1>PENDING ORDERS</h1>
            </div>
            <div class="inquiry-container">
                <h1>PENDING INQUIRIES</h1>
                <div class="container">
                    <table class="table table-hover table-borderd table-striped">
                        <thead>
                            <tr>
                                <th>Inquiry ID</th>
                                <th>Name of Booker</th>
                                <th>Email Address</th>
                                <th>Mobile no.</th>
                                <th>Event Title</th>
                                <th>Invoice</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php

                            $query = "select * from `inquirytable`";

                            $result = mysqli_query($connection, $query);

                            if(!$result){
                                die("query Failed".mysqli_error());
                            }else{
                                while($row = mysqli_fetch_assoc($result)){
                                    ?>
                                        <tr>
                                            <td><?php echo $row['id'];?><td>
                                            <td><?php echo $row['booker_name'];?><td>
                                            <td><?php echo $row['email_address'];?><td>
                                            <td><?php echo $row['mobile_no'];?><td>
                                            <td><?php echo $row['event_title'];?><td>
                                            <td><?php echo $row['invoice'];?><td>
                                            <td><?php echo $row['date'];?><td>
                                            <td><?php echo $row['time'];?><td>
                                        </tr>
                                    <?php
                                }
                            }

                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="product-container">
                <h1>PRODUCTS</h1>
            </div>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>

</html>