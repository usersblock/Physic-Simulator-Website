var linearsimulation = document.querySelector('.linear');
var linearwidth = linearsimulation.width = 1000;
var linearheight = linearsimulation.height = 700;
var clinear = linearsimulation.getContext('2d');
clinear.fillStyle='rgb(255,20,20)';
clinear.fill();
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

class Ball{
	constructor(size,locx,locy,speedyx,speedyy,acelxx,acelyy,color){
	this.size=size;
	this.x=locx;
	this.y=locy;
	this.speedx=speedyx;
	this.speedy=speedyy;
	this.acelx=acelxx;
	this.acely=acelyy;
	this.color=color;
	this.acelcounter=0;
	}

//var ball=new Ball(20,500,200,0,0,0,0,'rgb(255,20,20)');

draw(){
	clinear.beginPath();
	clinear.fillStyle = this.color;
	clinear.arc(this.x, this.y, this.size, degToRad(0), degToRad(360), false);
	clinear.fill();
}
	
update(tempx,tempy){
	if((this.x + this.size) >= linearwidth) {
        this.speedx = 0;
        }

        if((this.x - this.size) <= 0) {
    	this.speedx = 0;
  	}

  	if((this.y + this.size) >= linearheight) {
        this.speedy = 0;
  	}

	if((this.y - this.size) <= 0) {
    	this.speedy = 0;
  	}
		if(this.acelx<0){
		this.speedx=tempx-((Math.abs(this.acelx)/60)*this.acelcounter);
	}
	else{
		this.speedx=tempx+((this.acelx/60)*this.acelcounter);
	}
	if(this.acely<0){
		this.speedy=tempy-((Math.abs(this.acely)/60)*this.acelcounter);
	}
	else{
		this.speedy=tempy+((this.acely/60)*this.acelcounter);
	}
	this.x=this.x+(this.speedx/60);
	this.y=this.y+(this.speedy/60);
	this.acelcounter=this.acelcounter+1;

}
	


}

function loop(tempx,tempy){
	clinear.fillStyle = 'rgba(0,0,0,0.25)';
	clinear.fillRect(0,0,linearwidth,linearheight);
	ball.draw();
	ball.update(tempx,tempy);
 	requestAnimationFrame(function(){loop(tempx,tempy);});
}

function calculatexforce(degree,magnitude){
var rad=degToRad(degree);
var cosmagnitude=Math.cos(rad)*magnitude;
return cosmagnitude;
}

function calculateyforce(degree,magnitude){
var rad=degToRad(degree);
var sinmagnitude=Math.sin(rad)*magnitude;
return sinmagnitude;
}

function netforceline(x,y,degree,size,magnitude,color){

var x1=x+calculatexforce(degree,magnitude*5);


var y1=y+calculateyforce(degree,magnitude*5);



var canvas = document.getElementById('canvas');
clinear.strokeStyle=color;
clinear.lineWidth=size;
	clinear.beginPath();
	clinear.moveTo(x, y);
	clinear.lineTo(x1, y1);
	

	clinear.stroke();
}

function container(){
var linearsimulation = document.querySelector('.linear');
var linearwidth = linearsimulation.width = 1000;
var linearheight = linearsimulation.height = 700;
var clinear = linearsimulation.getContext('2d');
var tempspeedy=document.getElementById("verticalspeed").value;
var tempspeedx=document.getElementById("horizontalspeed").value;
var tempacely=document.getElementById("verticalacel").value;
var tempacelx=document.getElementById("horizontalacel").value;
	var convacelx=parseInt(tempacelx,10);
	var convacely=parseInt(tempacely,10);
var resetball=new Ball(20,500,200,tempspeedx,tempspeedy,convacelx,convacely,'rgb(255,20,20)');
ball=resetball;
ball.speedx=tempspeedx;
ball.speedy=tempspeedy;
clinear.fillStyle='rgb(255,20,20)';
clinear.fill();
loop(tempspeedx,tempspeedy);

}

function loopnetforce(direction,magnitude,direction2,magnitude2,direction3,magnitude3,totaldegree,totalmagnitude,mass){
	
	clinear.fillStyle = 'rgba(0,0,0,0.25)';
	clinear.fillRect(0,0,linearwidth,linearheight);
	ball.draw();
	ball.update(0,0);
	netforceline(500,350,direction,20,magnitude,"#0099ff");
	netforceline(500,350,direction2,20,magnitude2,"#33cc33");
	netforceline(500,350,direction3,20,magnitude3,"#ffff66");
	netforceline(500,350,totaldegree,20,totalmagnitude,"#ffffff");

netforceline(500,350,direction,10,magnitude/mass,"#000000");
	netforceline(500,350,direction2,10,magnitude2/mass,"#000000");
	netforceline(500,350,direction3,10,magnitude3/mass,"#000000");
	netforceline(500,350,totaldegree,10,totalmagnitude/mass,"#000000");

netforceline(200,600,0,20,5,"#0099ff");
	netforceline(200,620,0,20,5,"#33cc33");
	netforceline(200,640,0,20,5,"#ffff66");
netforceline(200,660,0,20,5,"#ffffff");
clinear.fillStyle="white";
clinear.font = "20px Arial";
clinear.fillText("Force One",100,610);

clinear.fillText("Force three",100,650);
clinear.fillText("Force two",100,630);

clinear.fillText("Total Force",100,670);

 	requestAnimationFrame(function(){loopnetforce(direction,magnitude,direction2,magnitude2,direction3,magnitude3,totaldegree,totalmagnitude,mass);});
}

function containernetforce(){

var linearsimulation = document.querySelector('.linear');
var linearwidth = linearsimulation.width = 1000;
var linearheight = linearsimulation.height = 700;
var clinear = linearsimulation.getContext('2d');

var forceone=document.getElementById("forceone").value;
var forcetwo=document.getElementById("forcetwo").value;
var forcethree=document.getElementById("forcethree").value;
var directionone=document.getElementById("directionone").value;

var directiontwo=document.getElementById("directiontwo").value;
var directionthree=document.getElementById("directionthree").value;
var mass=document.getElementById("mass").value;

var xtotal=calculatexforce(directionone,forceone)+calculatexforce(directiontwo,forcetwo)+calculatexforce(directionthree,forcethree);
var ytotal=calculateyforce(directionone,forceone)+calculateyforce(directiontwo,forcetwo)+calculateyforce(directionthree,forcethree);
try{
if(mass==0) throw "mass cannot equal 0";
}
catch(err){
message.innerHTML=err;
alert("Mass cannot equal 0");
}
var xacel=xtotal;
var yacel=ytotal;
var resetball=new Ball(20,500,350,0,0,0,0,'rgb(255,20,20)');
ball=resetball;
clinear.fillStyle='rgb(255,20,20)';
clinear.fill();
var totaldegree=Math.atan2(ytotal, xtotal) * 180 / Math.PI;
var magnitude=Math.sqrt(Math.pow(xtotal,2)+Math.pow(ytotal,2));
loopnetforce(directionone,forceone,directiontwo,forcetwo,directionthree,forcethree,totaldegree,magnitude,mass);

}
