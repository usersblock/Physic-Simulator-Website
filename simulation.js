const linearsimulation = document.querySelector('.linear');
const linearwidth = linearsimulation.width = 1000;
const linearheight = linearsimulation.height = 700;
const clinear = linearsimulation.getContext('2d');
clinear.fillStyle='rgb(255,20,20)';
clinear.fill();

function RadTodeg(rad) {
	return rad * 180/ Math.PI;
};

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

draw(){
	clinear.beginPath();
	clinear.fillStyle = this.color;
	clinear.arc(this.x, this.y, this.size, degToRad(0), 	degToRad(360), false);
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
	let rad=degToRad(degree);
	let cosmagnitude=Math.cos(rad)*magnitude;
	return cosmagnitude;
}

function calculateyforce(degree,magnitude){
	let rad=degToRad(degree);
	let sinmagnitude=Math.sin(rad)*magnitude;
	return sinmagnitude;
}

function netforceline(x,y,degree,size,magnitude,color){
	let x1=x+calculatexforce(degree,magnitude*5);
	let y1=y+calculateyforce(degree,magnitude*5);
	let canvas = document.getElementById('canvas');
	clinear.strokeStyle=color;
	clinear.lineWidth=size;
	clinear.beginPath();
	clinear.moveTo(x, y);
	clinear.lineTo(x1, y1);
	clinear.stroke();
}

function container(){
	let tempspeedy=document.getElementById("verticalspeed").value;
	let tempspeedx=document.getElementById("horizontalspeed").value;
	let tempacely=document.getElementById("verticalacel").value;
	let tempacelx=document.getElementById("horizontalacel").value;
	let convacelx=parseInt(tempacelx,10);
	let convacely=parseInt(tempacely,10);
	let resetball=new 	Ball(20,500,200,tempspeedx,tempspeedy,convacelx,convacely,'rgb(255,20,20)');
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
	let forceone=document.getElementById("forceone").value;
	let forcetwo=document.getElementById("forcetwo").value;
	let forcethree=document.getElementById("forcethree").value;
	let directionone=document.getElementById("directionone").value;
	let directiontwo=document.getElementById("directiontwo").value;
	let directionthree=document.getElementById("directionthree").value;
	let mass=document.getElementById("mass").value;
	let xtotal=calculatexforce(directionone,forceone)+calculatexforce(directiontwo,forcetwo)+calculatexforce(directionthree,forcethree);
	let ytotal=calculateyforce(directionone,forceone)+calculateyforce(directiontwo,forcetwo)+calculateyforce(directionthree,forcethree);
	try{
		if(mass==0) throw "mass cannot equal 0";
	}
	catch(err){
		message.innerHTML=err;
		alert("Mass cannot equal 0");
	}
	let xacel=xtotal;
	let yacel=ytotal;
	let resetball=new Ball(20,500,350,0,0,0,0,'rgb(255,20,20)');
	ball=resetball;
	clinear.fillStyle='rgb(255,20,20)';
	clinear.fill();
	let totaldegree=Math.atan2(ytotal, xtotal) * 180 / Math.PI;
	let magnitude=Math.sqrt(Math.pow(xtotal,2)+Math.pow(ytotal,2));
	loopnetforce(directionone,forceone,directiontwo,forcetwo,directionthree,forcethree,totaldegree,magnitude,mass);
}

function loopramp(direction){
	clinear.fillStyle = 'rgba(0,0,0,0.25)';
	clinear.fillRect(0,0,linearwidth,linearheight);
	ball.draw();
	ball.update(0,0);
	let otherend=direction+100;
	netforceline(500,350,direction,20,100,"#0099ff");
	netforceline(500,350,direction,20,-100,"#33cc33");
	requestAnimationFrame(function(){loopramp(direction);});
}


function containerramp(){
	let angle=document.getElementById("angle").value;
	let mass=document.getElementById("mass").value;
	let gravity=document.getElementById("gravity").value;
	let friction=document.getElementById("friction").value;
	if(angle>=90&&angle<=270){
		friction=0;
	}
	let weight=mass*gravity;
	let rad=degToRad(angle);
	let normalforce=Math.cos(rad)*mass*gravity;
	let netforce=Math.sin(rad)*mass*gravity;
	let frictionforce=netforce*friction;
	let trueforce=netforce-frictionforce;
	if(trueforce<0){
		trueforce=0;
	}
	let convacelx=calculatexforce(angle,trueforce);
	let convacely=calculateyforce(angle,trueforce);
	if(angle>=90&&angle<=270){
		convacelx=0;
		convacely=calculateyforce(90,weight);
	}
	let resetball=new 	Ball(20,500,350,0,0,convacelx,convacely,'rgb(255,20,20)');
	let changex=Math.cos(rad+1.57)*-30;
	let changey=Math.sin(rad+1.57)*-30;
	resetball.x=resetball.x+changex;
	resetball.y=resetball.y+changey;
	ball=resetball;
	clinear.fillStyle='rgb(255,20,20)';
	clinear.fill();
	loopramp(angle);

}

function loopcircular(magnitude,anglem){
	clinear.fillStyle = 'rgba(0,0,0,0.25)';
	clinear.fillRect(0,0,linearwidth,linearheight);
	let radiuses=document.getElementById("radius").value;
	let velocity=document.getElementById("velocity").value;
	let degreex=Math.cos(anglem);
	let degreey=Math.sin(anglem);
	let rads=Math.atan2(degreey,degreex);
	rads=(rads*180/Math.PI)+180;
	centerball.draw();
		let radius=Math.sqrt(Math.pow(Math.abs(ball.x-500),2)+Math.pow(Math.abs(ball.y-350),2));
	ball.x=500+Math.cos(anglem)*radius;
	ball.y=350+Math.sin(anglem)*radius;
	netforceline(ball.x,ball.y,rads,10,Math.pow(velocity,2)/radiuses/10,"#0099ff");
	netforceline(ball.x,ball.y,rads-90,10,velocity/10,"#00ff99");
	netforceline(200,600,0,20,5,"#0099ff");
	netforceline(200,620,0,20,5,"#33cc33");
	clinear.fillStyle="white";
	clinear.font = "20px Arial";
	clinear.fillText("Acceleration: "+(Math.pow(velocity,2)/radiuses),50,610);
	clinear.fillText("Velocity: "+velocity,50,630);

	ball.draw();
	ball.update(0,0);
	let fps=1/1000;
	let anglechange=fps*magnitude;
	requestAnimationFrame(function(){loopcircular(magnitude,anglem+anglechange);});
}

function containercircularmotion(){
	let radius=document.getElementById("radius").value;
	let mass=document.getElementById("mass").value;
	let velocity=document.getElementById("velocity").value;
	let acceleration=(velocity*velocity)/radius;
	let angle=90
	let rad=degToRad(angle+90);
	let force=(velocity*velocity*mass)/radius;
	let specialw=velocity/radius;
	let resetball=new Ball(mass*10,500-(-1*radius),350,0,0,0,0,'rgb(255,20,20)');
	let center=new Ball(10,500,350,0,0,0,0,'rgb(20,255,20)');
	centerball=center;
	ball=resetball;
	clinear.fillStyle='rgb(255,20,20)';
	clinear.fill();
	loopcircular(specialw,0);

}


