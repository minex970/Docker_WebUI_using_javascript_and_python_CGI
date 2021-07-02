  // for command...

// React when input block clicked  
function input_col(){
    var r_inp = document.getElementById("cmd_input")
    var new_color = 'rgba(29, 230, 245, 0.8)';
    r_inp.style.backgroundColor = new_color;
    clear()
}

// React when Run botton clicked
function submit(){
    var i = document.getElementById("cmd_input").value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.0.111/cgi-bin/video.py?x=" + i, true)
    xhr.send();

    xhr.onload = function(){
    var output = xhr.responseText;
    document.getElementById("out_para").innerHTML = output;
    }
}

// To clear the input block
function clear() {
    document.getElementById("cmd_input").value = " ";
    document.getElementById("out_para").innerHTML = " ";
}


  // For direct command...

// Function for docker command part..  
function call(x) {
    clear()
    var gg = x
    switch (gg) {
        case 0:
            var i = "docker ps -a"
            main(i)
            break;
        case 1:
            var i = "docker ps"
            main(i)
            break;
        case 2:
            var i = "docker images"
            main(i)
            break;    
        case 3:
            var os = prompt("Name of Container!");
            var image = prompt("Docker Image")
            var i = "docker run -dit --name="+ os + " " + image        
            main(i, os+ " Container Launched!")
            break;
        case 4:
            var os = prompt("Name of the Container!");
            var i = "docker start "+ os
            main(i, os+ " Container started")
            break;
        case 5:
            var os = prompt("Name of the Container!");
            var i = "docker stop "+ os
            main(i, os+ " Container stop")
            break;
        case 6:
            var container = prompt("Docker Container To Remove!")
            var i = "docker rm " + container
            main(i, container+ " Container Removed!")
            break;
        case 7:
            var image = prompt("Docker Image To Remove!")
            var i = "docker rmi " + image
            main(i, image+ " Image Removed!")
            break;      
        case 8:
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET","http://192.168.0.111/cgi-bin/video.py?x=docker ps -a -q" , false );
            xhr1.send(); 
            var res = xhr1.responseText;
            var i = "docker rm -f " + res
            if (res.length === 1) {
          
              outcome("No Container Available!")
            }
            else {
              main(i,"All Containers Deleted!" )
            }
            break;  
        case 9:
            var xhr1 = new XMLHttpRequest();
            xhr1.open("GET","http://192.168.0.111/cgi-bin/video.py?x=docker images -q" , false );
            xhr1.send(); 
            var res = xhr1.responseText;
            var i = "docker rmi -f " + res
            if (res.length === 1) {
              outcome("No Images Available!")
            }
            else {
              main(i,"All Images Deleted!" )
            }
            break;    
    }
}

// React when one of the docker command got clicked.
function main(i, j="") {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://192.168.0.111/cgi-bin/video.py?x=" + i, false );
    xhr.send(); 
    var output = xhr.responseText;
    const nothing= "Command not Found";
    if (output.includes(nothing)) {
        output = output
        outcome(output)
        }
    else {
        output = output + j
        outcome(output)
    }
}

// To display the output in the block.
function outcome(final) {
    document.getElementById("out_para").innerHTML = final;
}
