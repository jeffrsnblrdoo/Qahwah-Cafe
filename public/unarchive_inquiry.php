<?php include('../dbcon.php')?>

<?php

    if(isset($_GET['id'])){
        $id = $_GET['id'];
    }

    $query = "select * from `inquirytable` where id = '$id'";

    $result = mysqli_query($connection, $query);

    if(!$result){
        die("query Failed".mysqli_error());
    }
    else{
        $row = mysqli_fetch_assoc($result);
    }

    $n = 0;
    $query = "update `inquirytable` set `Is_archived` = '$n' where id  = '$id'";
    
    $result = mysqli_query($connection, $query);

    if(!$result){
        die("query Failed".mysqli_error());
    }
    else{
        header('location:clientUI.php');
    }
?>