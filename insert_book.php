<!DOCTYPE html>
<html>
  <head>
    <title>Add/Edit Results</title>
  </head>
  <body>
    <h1>My Book Add/Edit Results</h1>
    <?php
      // create short variable names
      $isbn=trim($_POST['isbn']);
      $title=trim($_POST['title']);
      $author=trim($_POST['author']);
      $class=trim($_POST['class']);
      $rating=$_POST['rating'];
      $orig_pub_date['orig_pub_date'];
      $curr_ed_date['curr_ed_date'];
    
      if (!$isbn) {
         echo "An ISBN is required.<br />"
              ."Please go back and try again.";
         exit;
      }
    
      if (!get_magic_quotes_gpc()) {
        $isbn = addslashes($isbn);
        $title = addslashes($title);
        $author = addslashes($author);
        $class = addslashes($class);
        $rating = intval($rating);
        $orig_pub_date = intval($orig_pub_date);
        $curr_ed_date = intval($curr_ed_date);
      }
    
      @ $db = new mysqli('localhost', 'mybookuser', 'student', 'mybooks');
    
      if (mysqli_connect_errno()) {
         echo "Error: Could not connect to database.  Please try again later.";
         exit;
      }
      
      //code needed for the situation where the author is not already in the database
      
      $name_array = explode($author);
      $last_name = $name_array[0];
      echo "last_name: $last_name<br />";
      
      $query = "select author_id from authors where last_name LIKE $last_name";
      
      $query = "insert into books values(?, ?, ?, ?)";
      $stmt = $db->prepare($query);
      $stmt->bind_param("sssd", $isbn, $author, $title, $price);
      $stmt->execute();
      $result = $stmt->affected_rows;
      //echo "affected rows: $result<br />";
    
      if ($result) {
          echo  $results." book inserted into database.";
      } else {
      	  echo "An error has occurred.  The item was not added.";
      }
    
      $db->close();
    
      // $query = "insert into books values
      //           ('".$isbn."', '".$author."', '".$title."', '".$price."')";
      // $result = $db->query($query);
    
      // if ($result) {
      //     echo  $db->affected_rows." book inserted into database.";
      // } else {
      // 	  echo "An error has occurred.  The item was not added.";
      // }
    
      // $db->close();
    ?>
  </body>
</html>
