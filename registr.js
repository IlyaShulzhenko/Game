<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>регистрация</title>
<link rel="stylesheet" rev="stylesheet" type="text/css" href="styles.css"  />
</head>
<body>
<div id="container">
<form class="mainform" >
     <p class="name">
     <input type="text" name="name" value="Имя игрока" />
           <label for="name">Имя</label>
     </p>
    <p class="send" >
    <input type="submit" value="Отправить"  />
    </p>
</form>
</div>
</body>
</html>


<input type="text" name="name" value="Имя игрока" onblur="if(this.value.length == 0) this.value = 'Имя игрока'" onfocus="if(this.value == 'Имя автора') this.value = '' "/>
.....



onfocus="if(this.value == 'какой-то текст') this.value = '' " 
onblur="if(this.value.length == 0) this.value = 'какой-то текст'" 




container {
    margin: 0 auto;
    border: 3px solid #EEEEEE;
    width: 800px;
    -webkit-birder-radius: 6px;
    -moz-border-radius: 6px;
     border-radius: 6px; }

     input, textarea {
        border: solid 1px #CCCCCC;
        margin-left: 10px;
        padding: 4px;
        outline: 0;
        font: Verdana, Geneva, sans-serif;
        width: 200px;
        background: #F9F9F9;
        -webkit-birder-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
       }
       


       CSS
       textarea {
        width: 400px;
        height: 150px;
        line-height: 150%;
       }
       .send input {
        width: auto;
        margin-bottom: 10px;
        border: 2px solid #E0E0F3;
        font: Verdana, Geneva, sans-serif;
        background-color: #E5E5F8;
       }


       p label {
        margin-left: 10px;
        font-style: italic;
        color: #c0c0c0;
       }
       
       .name input {
        margin-top: 10px;
       }

       input:hover, textarea:hover, input:focus, textarea:focus {
        border-color: #A0A0A0;
       }
       
       .send input:hover {
        border: 2px solid #C0C0E3;
       }
