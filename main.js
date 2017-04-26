var req = new XMLHttpRequest();
function starter(){
  listComment();
  addWorkout();
}
// //document.addEventListener('DOMContentLoaded', addWorkout);
// document.addEventListener('click', addWorkout);
// document.addEventListener('DOMContentLoaded', listComment);


//document.addEventListener('DOMContentLoaded', listComment);
function clearCommentField() {
    document.getElementById("content").value="";
}
function clearAddRoutineField() {
    document.getElementById("workout").value="";
    document.getElementById("length").value="";
}

function addWorkout(){
  req.open('GET', 'http://linserv2.cims.nyu.edu:20244/api/workout', true);
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      var jObj = JSON.parse(this.responseText);
      console.log(this.responseText + " workout")
      var movList = document.getElementById("workout-list");
      console.log(movList + "hello")
      movList.innerHTML = "";
      for(itr in jObj){
        movList.innerHTML += "<tr> <td>" + jObj[itr].workout + "</td> <td> " + jObj[itr].length + "</td></tr>";
      }
    }
  }
  req.send();
}

function listComment(){
  req.open('GET', 'http://linserv2.cims.nyu.edu:20244/api/comment', true);
  req.onreadystatechange = function(){
    if (req.status >= 200 && req.status < 400){
      console.log(this.responseText);
      var jObj = JSON.parse(this.responseText);
      console.log(this.responseText)
      var movList = document.getElementById("comment-list");
      console.log(movList + "hi");
      movList.innerHTML = "";
      for(itr in jObj){
        movList.innerHTML += "<tr> <td>" + jObj[itr].user + "</td> <td> " + jObj[itr].content + "</td></tr>";
      }
    }
  }
  req.send();
}

function addComment(){
  req.open('POST', 'http://linserv2.cims.nyu.edu:20244/api/comment', true);
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
  req.open('POST', 'http://linserv2.cims.nyu.edu:20244/api/workout', true);
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
