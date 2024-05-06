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
    <?php
        echo "<script>alert('Welcome Admin!');</script>";
    ?>
    </head>
    <body>
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
            </div>
            <div class="product-container">
                <h1>PRODUCTS</h1>
            </div>
        </main>
    </body>
</html>