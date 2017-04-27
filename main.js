var req = new XMLHttpRequest();
var direction = "";
var local = 'localhost:3000';
var notLocal = "linserv2.cims.nyu.edu:20244";

function clearCommentField() {
    document.getElementById("content").value="";
}
function clearAddRoutineField() {
    document.getElementById("workout").value="";
    document.getElementById("length").value="";
}

function addWorkout(){
  req.open('GET', 'http://'+notLocal+'/api/workout', true);
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      console.log(jObj);
      var movList = document.getElementById("workout-list");
      movList.innerHTML = "";
      for(itr in jObj){
          console.log(jObj[itr].user);
        if(jObj[itr].length >= 60){
          movList.innerHTML += "<tr> <td>" + jObj[itr].workout + "</td> <td> " + jObj[itr].length + "</td><td><img id=picture src=http://www.clipartkid.com/images/660/gold-star-clip-art-twdWEg-clipart.jpg width=20 height=20></td></tr>";
        }else{
          movList.innerHTML += "<tr> <td>" + jObj[itr].workout + "</td> <td> " + jObj[itr].length + "</td></tr>";
        }
      }
    }
  }
  req.send();
}

function listComment(){
  req.open('GET', 'http://'+notLocal+'/api/comment', true);
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      var movList = document.getElementById("comment-list");
      movList.innerHTML = "";
      for(itr in jObj){
        movList.innerHTML += "<tr> <td>" + jObj[itr].user + "</td> <td> " + jObj[itr].content + "</td></tr>";
      }
    }
  }
  req.send();
}

function addComment(){
  req.open('POST', 'http://'+notLocal+'/api/comment', true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var content = document.getElementById('content').value;
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      if(jObj.true){
        console.log("Save Successful");
        listComment();
      }
      else{
        console.log('Save Fail');
      }
    }
  }
  clearCommentField();
  req.send("content="+content);
}


function createNew(){
  req.open('POST', 'http://'+notLocal+'/api/workout', true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  var workout = document.getElementById('workout').value;
  var length = document.getElementById('length').value;
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      if(jObj.true){
        console.log("Save Successful");
        addWorkout();
      }
      else{
        console.log('Save Fail');
      }
    }
  }
  clearAddRoutineField();
  req.send("workout="+workout+"&length="+length);
}
