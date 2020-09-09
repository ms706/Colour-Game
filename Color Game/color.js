//Global Variables
var squares=document.querySelectorAll(".square");
var picked;
var attempt=4;
var counter;


//Event Handlers
document.querySelector("#new").addEventListener("mouseover",function(){
	document.querySelector("#new").classList.add("selected");
});
document.querySelector("#new").addEventListener("mouseout",function(){
	document.querySelector("#new").classList.remove("selected");
});
document.querySelector("#easy").addEventListener("click",function(){
	document.querySelector("#easy").classList.add("selected");
	document.querySelector("#hard").classList.remove("selected");
	attempt=4;
	main();
});

document.querySelector("#hard").addEventListener("click",function(){
	document.querySelector("#hard").classList.add("selected");
	document.querySelector("#easy").classList.remove("selected");
	attempt=3;
	main();
});


//Function to select 6 random colors
function select_colors(colors){
	for(var i=0;i<6;i++){
		var r=Math.floor(Math.random() * 254) + 1;
		var g=Math.floor(Math.random() * 254) + 1;
		var b=Math.floor(Math.random() * 254) + 1;
		var obj="rgb(" + r + ", " + g + ", " + b +")" ;
		colors.push(obj)
		console.log(colors[i])
	}	
}

//Function to set selected colors
function set_square_colors(colors){
	for(var i=0;i<squares.length;i++){
		squares[i].style.backgroundColor=colors[i];
	}	
}

// function describing click event on squares
function event(){
	if(counter<attempt-1){
		counter++;
		if(picked===this.style.backgroundColor){
			document.querySelector("#display_rbg").style.color=this.style.backgroundColor;
			for(var i=0;i<squares.length;i++){
				squares[i].style.borderRadius="100px 100px 100px 100px";
				squares[i].style.visibility= "visible";
				squares[i].style.backgroundColor=picked;
				document.querySelector("#msg").textContent="You Win";
			}		
		}
		else{
			this.style.visibility= "hidden";
			document.querySelector("#msg").textContent=(attempt-counter)+" Attempts left";
		}
		
	}
	else{
		this.style.visibility= "hidden";
		document.querySelector(".header").style.backgroundColor=picked;
		document.querySelector("#msg").textContent="You Lose";
		for(var i=0;i<squares.length;i++)
			squares[i].removeEventListener("click",event);
	}
}

//Main Function
function main(){
	var colors=[];
	counter=0;
	document.querySelector("#msg").textContent=attempt+" Attempts left";
	document.querySelector("#display_rbg").setAttribute("style","color: #d7dee0");
	document.querySelector(".header").setAttribute("style","background-color: #1c93ba");
	select_colors(colors);
	set_square_colors(colors);
	for(var i=0;i<6;i++)
		squares[i].style.visibility= "visible";
	picked=colors[Math.floor(Math.random() * colors.length+10)-10];
	document.querySelector("#display_rbg").innerHTML=picked.toUpperCase();
	for(var i=0;i<squares.length;i++)
		squares[i].addEventListener("click",event);


}


document.querySelector("#new").addEventListener("click",function(){
	attempt=4;
	main();
});

main();
document.querySelector("#easy").classList.add("selected");