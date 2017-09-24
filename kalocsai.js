

////////////////////////////////////////////////////////////
//
//  Palette and flower data
//
////////////////////////////////////////////////////////////


var colors = {
	'white':'url(#white)',//'rgb(250,250,250)',
	'black':'url(#black)',//'rgb(32,32,32)',
	'red':'url(#red)',//'rgb(221,31,33)',
	'darkred':'url(#darkred)',//'rgb(94,10,23)',
	'yellow':'url(#yellow)',//'rgb(254,239,32)',
	'orange':'url(#orange)',//'rgb(244,158,35)',
	'green':'url(#green)',//'rgb(84,154,55)',
	'darkgreen':'url(#darkgreen)',//'rgb(20,88,51)',
	'blue':'url(#blue)',//'rgb(83,176,219)',
	'darkblue':'url(#darkblue)',//'rgb(44,125,190)',
	'purple':'url(#purple)',//'rgb(115,77,154)',
	'darkpurple':'url(#darkpurple)',//'rgb(76,40,130)',
	'pink':'url(#pink)',//'rgb(233,107,154)',
	'darkpink':'url(#darkpink)',//'rgb(231,57,116)',
	'peach':'url(#peach)',//'rgb(233,162,144)'
};

var flowerdata = [
                  {name:'forgetmenot', flwsize:60},
                  {name:'leafs1', flwsize:80},
                  {name:'tulip1', flwsize:60},
                  {name:'tulip2', flwsize:80},
                  {name:'paprika', flwsize:60},
                  {name:'lilyofthewalley1', flwsize:80},
                  {name:'lilyofthewalley2', flwsize:60},
                  {name:'lilyofthewalley3', flwsize:70},
                  {name:'violet1', flwsize:50},
                  {name:'smallflowers1', flwsize:60},
                  {name:'smallflowers2', flwsize:60},
                  {name:'smallflowers3', flwsize:60},
                  {name:'cyclamen1', flwsize:70},
                  {name:'cyclamen2', flwsize:70}
];


////////////////////////////////////////////////////////////
//
//  Main workflow and options
//
////////////////////////////////////////////////////////////


// Program entry point
function onload_init(){ refresh(); }// End of onload_init()

// Refresh: generate and render everything
function app_symmetric(){
	
	// Generate SVG
	var svgstr = createSVGString( generatekalocsai( getoptions_symmetric() ) );
	
	// Render SVG
	document.getElementById('svgcontainer').innerHTML = svgstr;
	
	// Create SaveAs Link
	var date = new Date(Date.now()), filename = 'kalocsai_'+nowstr()+'.svg';
	document.getElementById('savelink').innerHTML = '<a download="'+filename+'" href="data:image/svg+xml;base64,'+ 
		btoa( svgstr ) + // Base64 encoding the SVG string
		'" target="_blank"><h1>'+filename+'</h1><h2>Right-click on this + Save Link As</h2></a>';
	
}// End of refresh()

function app_flowerlist(){
	document.getElementById('flowerlistdiv').innerHTML = createSVGString(listflowers());
}

function app_fromimage(){
	generatefromimage( getoptions_fromimage() );
}

//Check options object
function checkoptions(options){
	if(!options){ options = {}; }
	if(!options.hasOwnProperty('flowernum')){ options.flowernum = 10; }
	if(!options.hasOwnProperty('stemstrokewidth')){ options.stemstrokewidth = 4; }
	if(!options.hasOwnProperty('stemcolor')){ options.stemcolor = 'rgb(20,88,51)'; }// colors['darkgreen'];  // TODO: colors[] doesn't look good
	if(!options.hasOwnProperty('backgroundfill')){ options.backgroundfill = 'rgb(240,240,240)'; } // 'black'; // colors['white']; // TODO: colors[] doesn't look good
	if(!options.hasOwnProperty('symmetry')){ options.symmetry = 4; }
	if(!options.hasOwnProperty('symmetrymirror')){ options.symmetrymirror = (options.symmetry%2===0); }
	if(!options.hasOwnProperty('collisiontolerance')){ options.collisiontolerance = 5; }
	if(!options.hasOwnProperty('svgw')){ options.svgw = 1000; }
	if(!options.hasOwnProperty('svgh')){ options.svgh = 1000; }
	if(!options.hasOwnProperty('imageurl')){ options.imageurl = 'logo.png'; }
	if(!options.hasOwnProperty('imageupscale')){ options.imageupscale = 10; }
	if(!options.hasOwnProperty('vx')){ options.vx = 6; }
	if(!options.hasOwnProperty('vy')){ options.vy = 6; }
	if(!options.hasOwnProperty('rx')){ options.rx = 2; }
	if(!options.hasOwnProperty('ry')){ options.ry = 2; }
	if(!options.hasOwnProperty('vd')){ options.vd = 3; }
	if(!options.hasOwnProperty('imagetres')){ options.imagetres = 384; }
	if(!options.hasOwnProperty('flowergrid')){ options.flowergrid = false; }
	
	options.flowers = [];
	options.delta = 360/options.symmetry;
	return options;
}

// Get options object from HTML inputs
function getoptions_symmetric(){
	var op = {};
		try { op.flowernum = parseInt( document.getElementById('flowernumctr').value ); }catch(e){ console.log('getoptions() flowernumctr parseInt error '+JSON.stringify(e)+' '+e); }
		try { op.symmetry = parseInt( document.getElementById('symmetryctr').value ); }catch(e){ console.log('getoptions() symmetryctr parseInt error '+JSON.stringify(e)+' '+e); }
		var bkg = document.getElementById('backgroundctr').value;
		if(bkg==2){ 
			op.backgroundfill = 'rgb(240,240,240)';
			document.getElementById('backgroundspan').innerHTML = 'light';
		}else if(bkg==3){
			op.backgroundfill = 'rgb(255,255,255)';
			document.getElementById('backgroundspan').innerHTML = 'white';
		}else if(bkg==4){
			op.backgroundfill = 'rgb(10,0,60)';
			document.getElementById('backgroundspan').innerHTML = 'blue';
		}else{
			op.backgroundfill = 'rgb(0,0,0)';
			document.getElementById('backgroundspan').innerHTML = 'black';
		}
		document.getElementById('flowernumspan').innerHTML = op.flowernum;
		document.getElementById('symmetryspan').innerHTML = op.symmetry;
	return checkoptions(op);
}// End of getoptions()

function getoptions_fromimage(){
	var op = {};
	
	op.imageurl = document.getElementById('imageurlinput').value;
	
	op.imageupscale = 10;
	try { op.imageupscale = parseInt( document.getElementById('upscalectr').value ); }catch(e){ console.log('getoptions() upscale parseInt error '+JSON.stringify(e)+' '+e); }
	document.getElementById('upscalespan').innerHTML = op.imageupscale;
	
	var bkg = document.getElementById('backgroundctr').value;
	if(bkg==2){ 
		op.backgroundfill = 'rgb(240,240,240)';
		document.getElementById('backgroundspan').innerHTML = 'light';
	}else if(bkg==3){
		op.backgroundfill = 'rgb(255,255,255)';
		document.getElementById('backgroundspan').innerHTML = 'white';
	}else if(bkg==4){
		op.backgroundfill = 'rgb(10,0,60)';
		document.getElementById('backgroundspan').innerHTML = 'blue';
	}else{
		op.backgroundfill = 'rgb(0,0,0)';
		document.getElementById('backgroundspan').innerHTML = 'black';
	}
	
	return op;
}


////////////////////////////////////////////////////////////
//
//  Kalocsai object generation steps
//
////////////////////////////////////////////////////////////


// Generate flowers in a sector and move them close to the center by dynamics
function gen_random_sector(o){
	// Random flower generation
	for(var i=0; i<o.flowernum; i++){
		var flw = rndflower(), 
		alf = Math.floor(Math.random()*o.delta), 
		dis = Math.random()*(o.svgw+o.svgh)/2,
		fx = o.svgw/2+Math.cos(Math.PI*alf/180) * dis,
		fy = o.svgh/2+Math.sin(Math.PI*alf/180) * dis;
		
		o.flowers.push( { x:fx, y:fy, alfa:alf, flwsize:flw.flwsize, flwtype:flw.name, mirror:(Math.random()<0.5?true:false) } );
		
	}// End of flower generation loop
	
	o.flowernum = o.flowers.length;
	
	// Flower positioning: dynamic movement to center
	var minx = o.svgw, miny = o.svgh;
	for(var k=0; k<(o.svgw+o.svgh)*2; k++){
		for(var i=0; i<o.flowernum; i++){
			
			var dc = Math.hypot( o.flowers[i].x - (o.svgw/2) , o.flowers[i].y - (o.svgh/2)  );
			if(dc>0){
				
				// Vectors to center
				var vx = ((o.svgw/2) - o.flowers[i].x)/dc, vy = ((o.svgh/2)-o.flowers[i].y)/dc;
				
				for(var j=0; j<o.flowernum; j++){
					var df = Math.hypot(o.flowers[i].x-o.flowers[j].x,o.flowers[i].y-o.flowers[j].y);
					if((j !== i) && ( df < ((o.flowers[i].flwsize+o.flowers[j].flwsize)/2) ) ){
						vx += 2 * (o.flowers[i].x-o.flowers[j].x)/df;
						vy += 2 * (o.flowers[i].y-o.flowers[j].y)/df;
						// o.flowers[i].alfa = Math.atan2((o.flowers[i].x-o.flowers[j].x)/df, (o.flowers[i].y-o.flowers[j].y)/df) * 180 / Math.PI; // alfa from last collision
					}
				}// End of collision check loop
				
				// Movement
				o.flowers[i].x += vx;
				o.flowers[i].y += vy;
				
				if(o.flowers[i].x<minx){ minx = o.flowers[i].x; }
				if(o.flowers[i].y<miny){ miny = o.flowers[i].y; }
				
			}// End of center check
		}// End of flex round
	}// End of flex loop
	
	// Flowers offsetting, angle filtering
	for(var i=o.flowernum-1; i>=0; i--){
		o.flowers[i].x += (o.svgw/2)-minx;
		o.flowers[i].y += (o.svgh/2)-miny;
		o.flowers[i].alfa = 180-Math.floor( Math.atan2((o.flowers[i].x-o.svgw/2), (o.flowers[i].y-o.svgh/2)) * 180 / Math.PI );// Alfa facing to center
		var ra = o.flowers[i].alfa-90;
		if( ra > o.delta || ra < 0 ){ o.flowers.splice(i, 1); }
	}
	o.flowernum = o.flowers.length;
	
	// Collision filtering
	for(var i=o.flowernum; i>=0; i--){
		for(var j=0; j<o.flowers.length; j++){ 
			if((i!==j) && o.flowers[i] && o.flowers[j]){
				var df = Math.hypot( o.flowers[i].x-o.flowers[j].x, o.flowers[i].y-o.flowers[j].y ), mindist = (o.flowers[i].flwsize+o.flowers[j].flwsize)/2 - o.collisiontolerance;
				if( df < mindist ){ o.flowers.splice(i,1); }
			}
		}
	}// End of flower generation loop
	o.flowernum = o.flowers.length;
	
	return o;
}// End of gen_random_sector()

// Generate flowers randomly for testing
function gen_testrandom(o){
	// Random flower generation
	for(var i=0; i<o.flowernum; i++){
		var flw = rndflower(), 
		alf = Math.floor(Math.random()*360), 
		dis = Math.random()*(o.svgw+o.svgh)/2,
		fx = Math.random()*o.svgw,
		fy = Math.random()*o.svgh;
		
		o.flowers.push( { x:fx, y:fy, alfa:alf, flwsize:flw.flwsize, flwtype:flw.name, mirror:(Math.random()<0.5?true:false) } );
		
	}// End of flower generation loop
	
	o.flowernum = o.flowers.length;
	
	return o;
}// End of gen_testrandom()

// Generate flowers from imagedata
function gen_image(o, imgd){

	o.svgw = imgd.width*o.imageupscale; o.svgh = imgd.height*o.imageupscale;
	
	var fx, fy, idx;

	// Hexagonal scanning the image (with rx ry randomness) and generating flowers for dark pixels
	for(var j=o.vy; j < imgd.height; j += o.vy ){
		for(var i=o.vx + (j%(2*o.vy)===0?o.vd:0) ; i < imgd.width; i += o.vx ){
			
			fx = Math.round( i + Math.random()*o.rx ); fy = Math.round( j + Math.random()*o.ry );
			
			if((fx>=0)&&(fx<imgd.width)&&(fy>=0)&&(fy<imgd.height)){
				
				idx = (fy*imgd.width+fx)*4;
				if( (imgd.data[idx  ]+imgd.data[idx+1]+imgd.data[idx+2]) < o.imagetres ){
					
					var flw = rndflower(); 
					o.flowers.push( { x:fx*o.imageupscale, y:fy*o.imageupscale, alfa:Math.floor(Math.random()*360), 
						flwsize:flw.flwsize, flwtype:flw.name, mirror:(Math.random()<0.5?true:false) } );
					
				}// End of pixel lightness check
				
			}// End of coordinate check
			
		}// End of i (horizontal) loop
	}// End of j (vertical) loop 
	
	
	return o;

}// End of gen_image()

// Build parent tree
function gen_parent_tree(o){
	// Parent tree building
	var dis = o.svgw+o.svgh, idx = 0;
	for(var i=0; i<o.flowers.length; i++){
		var df = Math.hypot(o.flowers[i].x-o.svgw/2,o.flowers[i].y-o.svgh/2);
		//o.flowers[i].dis = df;
		if(df<dis){ dis = df; idx = i; }
	}	
	o.flowers[idx].parent = [o.svgw/2,o.svgh/2];
	o.flowers[idx].gppoint = [o.svgw/2,o.svgh/2];
	
	var chg = true;
	while(chg){
		chg = false;
		
		// Search for the closest neighbor
		var ix=-1, jx=-1, dx = o.svgw+o.svgh;
		for(var i=0; i<o.flowers.length; i++){
			for(var j=0; j<o.flowers.length; j++){
				
				if( i!==j && o.flowers[i].parent && (!o.flowers[j].parent) ){
					var df = Math.hypot(o.flowers[i].x-o.flowers[j].x,o.flowers[i].y-o.flowers[j].y);
					if(df < dx){
						dx = df;
						ix = i; jx = j;
					}
				}
				
			}
		}
		
		// Register parent, calculate alfa
		if(ix!==-1 && jx!== -1){
			o.flowers[jx].parent = [o.flowers[ix].x,o.flowers[ix].y];
			o.flowers[jx].parentid = ix;
			o.flowers[jx].alfa = 180-Math.floor( Math.atan2((o.flowers[jx].x-o.flowers[ix].x), (o.flowers[jx].y-o.flowers[ix].y)) * 180 / Math.PI );// Alfa facing parent
			chg = true;
		}
		
	}// End of parent tree building
	
	// ppoint: Parent point and gppoint: grandparent point and distance calculation
	for(var i=0; i<o.flowers.length; i++){
		o.flowers[i].ppoint = [ o.flowers[i].x-o.flowers[i].flwsize/2*Math.cos((o.flowers[i].alfa-90)*Math.PI/180), 
		                        o.flowers[i].y-o.flowers[i].flwsize/2*Math.sin((o.flowers[i].alfa-90)*Math.PI/180) ];
	}
	for(var i=0; i<o.flowers.length; i++){
		if(o.flowers[i].parentid){
			o.flowers[i].gppoint = o.flowers[ o.flowers[i].parentid ].ppoint;
		}else{
			o.flowers[i].gppoint = [o.svgw/2,o.svgh/2];
		}
		o.flowers[i].dist = Math.hypot( o.flowers[i].x-o.svgw/2, o.flowers[i].y-o.svgh/2 );
		o.flowers[i].beta = 90-Math.atan2( o.flowers[i].x-o.svgw/2, o.flowers[i].y-o.svgh/2 ) * 180 /Math.PI;
	}
	
	return o;
}// End of gen_parent_tree()

// Generate symmetry
function gen_symmetry(o){
	// Symmetry
	for(var i=1; i<o.symmetry; i++){
		for(var j=0; j<o.flowernum; j++){
			var nx = (o.symmetrymirror && (i%2===1)) ? o.flowers[j].dist * Math.cos( ((i+1)*o.delta-o.flowers[j].beta) * Math.PI/180) : o.flowers[j].dist * Math.cos( (o.flowers[j].beta+i*o.delta) * Math.PI/180);
			var ny = (o.symmetrymirror && (i%2===1)) ? o.flowers[j].dist * Math.sin( ((i+1)*o.delta-o.flowers[j].beta) * Math.PI/180) : o.flowers[j].dist * Math.sin( (o.flowers[j].beta+i*o.delta) * Math.PI/180);
			o.flowers.push( { x:o.svgw/2+nx,
							  y:o.svgh/2+ny,
							  alfa: ( (o.symmetrymirror && (i%2===1)) ? (i+1)*o.delta-o.flowers[j].alfa-180 : o.flowers[j].alfa+i*o.delta ),
							  flwsize:o.flowers[j].flwsize,
							  flwtype:o.flowers[j].flwtype,
							  mirror: ( (o.symmetrymirror && (i%2===1)) ? !o.flowers[j].mirror : o.flowers[j].mirror )
							  } );
		}
	}
	for(var i=1; i<o.symmetry; i++){
		for(var j=0; j<o.flowernum; j++){
			var fidx = i*o.flowernum+j;
			o.flowers[fidx].parent = [o.svgw/2,o.svgh/2];
			if(o.flowers[j].parentid){
				o.flowers[fidx].parentid = i*o.flowernum + o.flowers[j].parentid;
				o.flowers[fidx].parent = [ o.flowers[o.flowers[fidx].parentid].x, o.flowers[o.flowers[fidx].parentid].y ];
			}
			o.flowers[fidx].ppoint = [ o.flowers[fidx].x-o.flowers[fidx].flwsize/2*Math.cos((o.flowers[fidx].alfa-90)*Math.PI/180), 
			          		           o.flowers[fidx].y-o.flowers[fidx].flwsize/2*Math.sin((o.flowers[fidx].alfa-90)*Math.PI/180) ];
		}
	}
	for(var i=1; i<o.symmetry; i++){
		for(var j=0; j<o.flowernum; j++){
			var fidx = i*o.flowernum+j;
			o.flowers[fidx].gppoint = [o.svgw/2,o.svgh/2];
			if(o.flowers[fidx].parentid){
				o.flowers[fidx].gppoint = o.flowers[ o.flowers[fidx].parentid ].ppoint;
			}
		}
	}

	o.flowernum = o.flowers.length;
	
	return o;
	
}// End of gen_symmetry()


////////////////////////////////////////////////////////////
//
//  Kalocsai object generation processes
//
////////////////////////////////////////////////////////////


// Generate kalocsai object with rotational symmetry and mirroring
function generatekalocsai(options){
	var tries = 0, regen = true, o = {};
	while( tries<10 && regen){
		o = gen_random_sector(checkoptions(options));
		regen = (o.flowers.length < 1);
		tries++;
	}
	return gen_symmetry(gen_parent_tree(o));
}

// Generate kalocsai object listing the flower patterns
function listflowers(){
	
	var o = checkoptions( { svgw:100 * flowerdata.length, svgh:100, flowergrid:true } );
	
	for(var i=0; i<flowerdata.length; i++){
		o.flowers.push( { x:i*100+50, y:50, alfa:0, flwsize:100, flwtype:flowerdata[i].name, mirror:false, parent:[i*100+50,100], ppoint:[i*100+50,100], gppoint:[i*100+50,100], parentid:0 } );
	}
	
	return o;
	
}// End of listflowers()

// Generate kalocsai object from an image
function generatefromimage(o){
	
	o = checkoptions(o);
	
	loadImage(o.imageurl,function(canvas){
		
		var imgd = getImgdata(canvas);
		o = gen_parent_tree( gen_image(o, imgd) );
		var svgstr = createSVGString(o);
		
		// SVG render
		document.getElementById('svgcontainer').innerHTML = svgstr;
		
		// Create SaveAs Link
		var date = new Date(Date.now()), filename = 'kalocsai_'+nowstr()+'.svg';
		document.getElementById('savelink').innerHTML = '<a download="'+filename+'" href="data:image/svg+xml;base64,'+ 
			btoa( svgstr ) + // Base64 encoding the SVG string
			'" target="_blank"><h1>'+filename+'</h1><h2>Right-click on this + Save Link As</h2></a>';
		
	});
	
	return o;
	
}// End of generatefromimage()


////////////////////////////////////////////////////////////
//
//  SVG rendering
//
////////////////////////////////////////////////////////////


// Render the flowers and stems
function render(o){
	var str = '';
		
	// Stems
	for(var i=0; i<o.flowers.length; i++){
		if(! ( (o.flowers[i].gppoint[0]===o.svgw/2) && (o.flowers[i].gppoint[1]===o.svgh/2) )){
		str += '<path fill="transparent" fill-opacity="0" \
			stroke="'+o.stemcolor+'" stroke-width="'+o.stemstrokewidth+'" \
			d="M '+o.flowers[i].gppoint[0]+' '+o.flowers[i].gppoint[1]+' Q '+o.flowers[i].parent[0]+' '+o.flowers[i].parent[1]+' '+o.flowers[i].ppoint[0]+' '+o.flowers[i].ppoint[1]+'" />';
		}
	}// End of Stems loop
	
	// Flowers
	for(var i=0; i<o.flowers.length; i++){
		
		if(o.flowergrid){
			str += '<circle stroke="cyan" stroke-width="1" cx="'+o.flowers[i].x+'" cy="'+o.flowers[i].y+'" r="'+(o.flowers[i].flwsize/2)+'" fill="transparent" fill-opacity:"0" />'; // TODO: remove
		}
		
		str += '<rect fill="url(#'+o.flowers[i].flwtype+')" \
			transform="rotate('+o.flowers[i].alfa+' '+o.flowers[i].x+' '+o.flowers[i].y+') '+
			(o.flowers[i].mirror?' translate('+(2*o.flowers[i].x)+',0) scale(-1,1)':'')+'" \
			x="'+(o.flowers[i].x-o.flowers[i].flwsize/2)+'" y="'+(o.flowers[i].y-o.flowers[i].flwsize/2)+'" \
			width="'+o.flowers[i].flwsize+'" height="'+o.flowers[i].flwsize+'" \
			stroke-width="0" stroke="transparent" />';
		
		if(o.flowergrid){
			str += '<circle stroke="cyan" stroke-width="1" cx="'+o.flowers[i].x+'" cy="'+(o.flowers[i].y+o.flowers[i].flwsize/2)+'" r="5" fill="transparent" fill-opacity:"0" />'; // TODO: remove
		}
		
	}// End of Flowers loop
	
	return str;

}// End of render()

// Creating the SVG string
function createSVGString(o){
	var svgstr = '<svg width="'+o.svgw+'px" height="'+o.svgh+'px" version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Kalocsai" style="background-color:black" >';
	
	svgstr += '<defs>\
				\
				<pattern id="white" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(0,0%,95%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.03 0 L 0.04 0.03" />\
					<path stroke="hsl(0,0%,95%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.03 L 0.03 0.04" />\
					<path stroke="hsl(0,0%,100%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0.04" />\
				</pattern>\
				\
				<pattern id="black" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(0,0%,10%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.01 0 L 0 0.01" />\
					<path stroke="hsl(0,0%,10%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0.03 L 0.01 0.04" />\
					<path stroke="hsl(0,0%,20%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0 0.04" />\
				</pattern>\
				\
				<pattern id="red" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(359,86%,39%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.03 0 L 0.04 0.03" />\
					<path stroke="hsl(359,86%,39%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.03 L 0.03 0.04" />\
					<path stroke="hsl(359,86%,49%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0.04" />\
				</pattern>\
				\
				<pattern id="darkred" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(351,89%,14%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0 L 0 0.04" />\
					<path stroke="hsl(351,89%,14%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0.04 0.04" />\
					<path stroke="hsl(351,89%,24%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.02 0 L 0.02 0.04" />\
				</pattern>\
				\
				<pattern id="yellow" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(56,87%,45%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.01 0 L 0 0.01" />\
					<path stroke="hsl(56,87%,45%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0.03 L 0.01 0.04" />\
					<path stroke="hsl(56,87%,55%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0 0.04" />\
				</pattern>\
				\
				<pattern id="orange" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(35,86%,43%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.03 0 L 0.04 0.03" />\
					<path stroke="hsl(35,86%,43%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.03 L 0.03 0.04" />\
					<path stroke="hsl(35,86%,53%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0.04" />\
				</pattern>\
				\
				<pattern id="green" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(102,64%,25%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.01 0 L 0 0.01" />\
					<path stroke="hsl(102,64%,25%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0.03 L 0.01 0.04" />\
					<path stroke="hsl(102,64%,35%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0 0.04" />\
				</pattern>\
				\
				<pattern id="darkgreen" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(147,77%,13%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0 L 0 0.04" />\
					<path stroke="hsl(147,77%,13%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0.04 0.04" />\
					<path stroke="hsl(147,77%,23%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.02 0 L 0.02 0.04" />\
				</pattern>\
				\
				<pattern id="blue" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(199,62%,38%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0" />\
					<path stroke="hsl(199,62%,38%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.04 L 0.04 0.04" />\
					<path stroke="hsl(199,62%,48%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0.02 L 0.04 0.02" />\
				</pattern>\
				\
				<pattern id="darkblue" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(207,77%,33%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0 L 0 0.04" />\
					<path stroke="hsl(207,77%,33%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0.04 0.04" />\
					<path stroke="hsl(207,77%,43%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.02 0 L 0.02 0.04" />\
				</pattern>\
				<pattern id="purple" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(270,50%,25%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.01 0 L 0 0.01" />\
					<path stroke="hsl(270,50%,25%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0.03 L 0.01 0.04" />\
					<path stroke="hsl(270,50%,35%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0 0.04" />\
				</pattern>\
				\
				<pattern id="darkpurple" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(264,69%,21%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0" />\
					<path stroke="hsl(264,69%,21%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.04 L 0.04 0.04" />\
					<path stroke="hsl(264,69%,31%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0.02 L 0.04 0.02" />\
				</pattern>\
				\
				<pattern id="pink" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(338,64%,51%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.01 0 L 0 0.01" />\
					<path stroke="hsl(338,64%,51%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.04 0.03 L 0.01 0.04" />\
					<path stroke="hsl(338,64%,61%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0.04 0 L 0 0.04" />\
				</pattern>\
				\
				<pattern id="darkpink" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(340,75%,40%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0" />\
					<path stroke="hsl(340,75%,40%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.04 L 0.04 0.04" />\
					<path stroke="hsl(340,75%,50%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0.02 L 0.04 0.02" />\
				</pattern>\
				\
				<pattern id="peach" width="0.04" height="0.04" patternUnits="userSpaceOnUse">\
					<path stroke="hsl(12,58%,58%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0.03 0 L 0.04 0.03" />\
					<path stroke="hsl(12,58%,58%)" stroke-width="0.03" fill="transparent" fill-opacity="0" d="M 0 0.03 L 0.03 0.04" />\
					<path stroke="hsl(12,58%,68%)" stroke-width="0.02" fill="transparent" fill-opacity="0" d="M 0 0 L 0.04 0.04" />\
				</pattern>\
				\
				\
				<pattern id="flower1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path fill="rgb(128,128,255)" d="M 0.25 0.5 Q 0 0 0.5 0 Q 1 0 0.75 0.5 Q 0.5 1 0.25 0.5 Z" stroke-width="0" />\
					<ellipse fill="yellow" cx="0.5" cy="0.125" rx="0.25" ry="0.125" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="flower2" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path fill="rgb(255,192,0)" d="M 0.33 0.5 L 0.166 0.33 Q 0.166 0.166 0.33 0.166 L 0.5 0.33 L 0.66 0.166 Q 0.833 0.166 0.833 0.33 L 0.66 0.5 L 0.833 0.66 Q 0.833 0.833 0.66 0.833 L 0.5 0.66 L 0.33 0.833 Q 0.166 0.833 0.166 0.66 L 0.33 0.5 Z" stroke-width="0.05" stroke="rgb(192,128,0)" />\
					<path fill="rgb(255,192,0)" d="M 0.4 0.4 L 0.33 0.166 Q 0.5 0 0.66 0.166 L 0.6 0.4 L 0.833 0.33 Q 1 0.5 0.833 0.66 L 0.6 0.6 L 0.66 0.833 Q 0.5 1 0.33 0.833 L 0.4 0.6 L 0.166 0.66 Q 0 0.5 0.166 0.33 L 0.4 0.4 Z" stroke-width="0.05" stroke="rgb(192,128,0)" />\
					<ellipse fill="red" cx="0.5" cy="0.5" rx="0.166" ry="0.166" stroke-width="0.05" stroke="rgb(255,128,128)" />\
				</pattern>\
				\
				<pattern id="forgetmenot" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0 0.33)" fill="'+colors['blue']+'" stroke="'+colors['darkblue']+'" stroke-width="0.01" d="M 0.25 0.25 L 0.3235 0.3511 Q 0.25 0.5 0.1765 0.3511 L 0.25 0.25 L 0.1765 0.3511 Q 0.0122 0.3273 0.1311 0.2114 L 0.25 0.25 L 0.1411 0.2114 Q 0.1031 0.0477 0.25 0.1250 L 0.25 0.25 L 0.25 0.1250 Q 0.3969 0.0477 0.3689 0.2114 L 0.25 0.25 L 0.3689 0.2114 Q 0.4878 0.3273 0.3235 0.3511 L 0.25 0.25 Z" />\
					<path transform="translate(0 0.33)" fill="'+colors['blue']+'" stroke="'+colors['darkblue']+'" stroke-width="0.01" d="M 0.75 0.25 L 0.8235 0.3511 Q 0.75 0.5 0.6765 0.3511 L 0.75 0.25 L 0.6765 0.3511 Q 0.5122 0.3273 0.6311 0.2114 L 0.75 0.25 L 0.6411 0.2114 Q 0.6031 0.0477 0.75 0.1250 L 0.75 0.25 L 0.75 0.1250 Q 0.8969 0.0477 0.8689 0.2114 L 0.75 0.25 L 0.8689 0.2114 Q 0.9878 0.3273 0.8235 0.3511 L 0.75 0.25 Z" />\
					<path transform="translate(0 0.33)" fill="'+colors['blue']+'" stroke="'+colors['darkblue']+'" stroke-width="0.01" d="M 0.50 0.50 L 0.5735 0.6011 Q 0.50 0.75 0.4265 0.6011 L 0.50 0.50 L 0.4265 0.6011 Q 0.2622 0.5773 0.3811 0.4614 L 0.50 0.50 L 0.3811 0.4614 Q 0.3531 0.2977 0.50 0.3750 L 0.50 0.50 L 0.50 0.3750 Q 0.6469 0.2977 0.6189 0.4614 L 0.50 0.50 L 0.6189 0.4614 Q 0.7378 0.5773 0.5735 0.6011 L 0.50 0.50 Z" />\
					<circle transform="translate(0 0.33)" fill="'+colors['orange']+'" cx="0.25" cy="0.25" r="0.05" stroke="'+colors['darkblue']+'" stroke-width="0.01" />\
					<circle transform="translate(0 0.33)" fill="'+colors['orange']+'" cx="0.75" cy="0.25" r="0.05" stroke="'+colors['darkblue']+'" stroke-width="0.01" />\
					<circle transform="translate(0 0.33)" fill="'+colors['orange']+'" cx="0.50" cy="0.50" r="0.05" stroke="'+colors['darkblue']+'" stroke-width="0.01" />\
				</pattern>\
				\
				<pattern id="leafs1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0 0.3)" fill="'+colors['darkgreen']+'" stroke-width="0" d="M 0.5 0.7 Q 0.5 0.3 0.9 0.45 Q 0.6 0.5 0.5 0.7 Z"/>\
					<path transform="translate(0 0.3)" fill="'+colors['green']+'" stroke-width="0" d="M 0.5 0.7 Q 0.6 0.5 0.9 0.45 Q 0.8 0.7 0.5 0.7 Z"/>\
					<path transform="translate(0 0.3)" fill="'+colors['darkgreen']+'" stroke-width="0" d="M 0.5 0.7 Q 0.45 0.4 0.1 0.48 Q 0.35 0.49 0.5 0.7 Z"/>\
					<path transform="translate(0 0.3)" fill="'+colors['green']+'" stroke-width="0" d="M 0.5 0.7 Q 0.35 0.49 0.1 0.48 Q 0.25 0.65 0.5 0.7 Z"/>\
				</pattern>\
				\
				<pattern id="tulip1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0.05 0.1)" fill="'+colors['orange']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.53 0.35 Q 0.67 0.37 0.70 0.44 Q 0.83 0.44 0.95 0.5 Q 0.91 0.32 0.73 0.30 Q 0.66 0.17 0.51 0.21 Q 0.39 0.14 0.28 0.26 Q 0.12 0.27 0.05 0.44 Q 0.22 0.37 0.36 0.40 Q 0.44 0.33 0.53 0.35 Z" />\
					<path transform="translate(0.05 0.1)" fill="'+colors['orange']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.46 0.90 Q 0.65 0.88 0.68 0.71 Q 0.77 0.56 0.95 0.5 Q 0.72 0.42 0.5 0.65 Q 0.43 0.76 0.46 0.90 Z" />\
					<path transform="translate(0.05 0.1)" fill="'+colors['orange']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.46 0.90 Q 0.30 0.85 0.26 0.72 Q 0.24 0.53 0.05 0.44 Q 0.37 0.42 0.5 0.65 Q 0.43 0.76 0.46 0.90 Z" />\
					<path transform="translate(0.05 0.1)" fill="'+colors['yellow']+'" stroke-width="0.01" stroke="'+colors['orange']+'" d="M 0.5 0.5 Q 0.81 0.36 0.95 0.5 Q 0.78 0.47 0.71 0.54 Q 0.66 0.68 0.52 0.68 Q 0.36 0.65 0.34 0.55 Q 0.3 0.45 0.05 0.44 Q 0.31 0.31 0.5 0.5 Z" />\
					<path transform="translate(0.05 0.1)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.02" d="M 0.5 0.5 Q 0.49 0.42 0.42 0.37 " />\
					<path transform="translate(0.05 0.1)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.02" d="M 0.5 0.5 Q 0.52 0.43 0.52 0.35 " />\
					<path transform="translate(0.05 0.1)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.02" d="M 0.5 0.5 Q 0.54 0.43 0.62 0.40 " />\
					<circle transform="translate(0.05 0.1)" fill="'+colors['darkred']+'" cx="0.42" cy="0.37" r="0.05" stroke-width="0" />\
					<circle transform="translate(0.05 0.1)" fill="'+colors['darkred']+'" cx="0.52" cy="0.35" r="0.05" stroke-width="0" />\
					<circle transform="translate(0.05 0.1)" fill="'+colors['darkred']+'" cx="0.62" cy="0.40" r="0.05" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="tulip2" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0.05 0.1)" fill="'+colors['darkpink']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.53 0.35 Q 0.67 0.37 0.70 0.44 Q 0.83 0.44 0.95 0.5 Q 0.91 0.32 0.73 0.30 Q 0.66 0.17 0.51 0.21 Q 0.39 0.14 0.28 0.26 Q 0.12 0.27 0.05 0.44 Q 0.22 0.37 0.36 0.40 Q 0.44 0.33 0.53 0.35 Z" />\
					<path transform="translate(0.05 0.1)" fill="'+colors['darkpink']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.46 0.90 Q 0.65 0.88 0.68 0.71 Q 0.77 0.56 0.95 0.5 Q 0.72 0.42 0.5 0.65 Q 0.43 0.76 0.46 0.90 Z" />\
					<path transform="translate(0.05 0.1)" fill="'+colors['darkpink']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.46 0.90 Q 0.30 0.85 0.26 0.72 Q 0.24 0.53 0.05 0.44 Q 0.37 0.42 0.5 0.65 Q 0.43 0.76 0.46 0.90 Z" />\
					<path transform="translate(0.05 0.1)" fill="'+colors['pink']+'" stroke-width="0.01" stroke="'+colors['darkpink']+'" d="M 0.5 0.5 Q 0.81 0.36 0.95 0.5 Q 0.78 0.47 0.71 0.54 Q 0.66 0.68 0.52 0.68 Q 0.36 0.65 0.34 0.55 Q 0.3 0.45 0.05 0.44 Q 0.31 0.31 0.5 0.5 Z" />\
					<path transform="translate(0.05 0.1)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.02" d="M 0.5 0.5 Q 0.49 0.42 0.42 0.37 " />\
					<path transform="translate(0.05 0.1)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.02" d="M 0.5 0.5 Q 0.52 0.43 0.52 0.35 " />\
					<path transform="translate(0.05 0.1)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.02" d="M 0.5 0.5 Q 0.54 0.43 0.62 0.40 " />\
					<circle transform="translate(0.05 0.1)" fill="'+colors['orange']+'" cx="0.42" cy="0.37" r="0.05" stroke-width="0" />\
					<circle transform="translate(0.05 0.1)" fill="'+colors['orange']+'" cx="0.52" cy="0.35" r="0.05" stroke-width="0" />\
					<circle transform="translate(0.05 0.1)" fill="'+colors['orange']+'" cx="0.62" cy="0.40" r="0.05" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="paprika" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0 0.12)" fill="'+colors['red']+'" stroke="'+colors['darkred']+'" stroke-width="0.01" d="M 0.5 0.85 Q 0.55 0.85 0.56 0.81 Q 0.65 0.2 0.9 0.1 Q 0.55 0.15 0.44 0.81 Q 0.45 0.85 0.5 0.85 Z" />\
					<ellipse transform="translate(0 0.12)" fill="'+colors['darkgreen']+'" cx="0.5" cy="0.85" rx="0.07" ry="0.03" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="lilyofthewalley1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkgreen']+'" cx="0.53" cy="0.75" r="0.05" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['peach']+'" cx="0.55" cy="0.61" r="0.11" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['peach']+'" cx="0.62" cy="0.43" r="0.09" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['peach']+'" cx="0.71" cy="0.31" r="0.07" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['peach']+'" cx="0.79" cy="0.23" r="0.05" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['peach']+'" cx="0.84" cy="0.19" r="0.04" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="lilyofthewalley2" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkgreen']+'" cx="0.53" cy="0.75" r="0.05" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkpink']+'" cx="0.55" cy="0.61" r="0.11" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkpink']+'" cx="0.62" cy="0.43" r="0.09" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkpink']+'" cx="0.71" cy="0.31" r="0.07" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkpink']+'" cx="0.79" cy="0.23" r="0.05" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkpink']+'" cx="0.84" cy="0.19" r="0.04" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="lilyofthewalley3" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['darkgreen']+'" cx="0.53" cy="0.75" r="0.05" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['blue']+'" cx="0.55" cy="0.61" r="0.11" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['blue']+'" cx="0.62" cy="0.43" r="0.09" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['blue']+'" cx="0.71" cy="0.31" r="0.07" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['blue']+'" cx="0.79" cy="0.23" r="0.05" stroke-width="0" />\
					<circle transform="translate(-0.03 0.2)" fill="'+colors['blue']+'" cx="0.84" cy="0.19" r="0.04" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="violet1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0.01 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.48 0.96 Q 0.59 0.57 0.77 0.47 Q 0.97 0.14 0.53 0.15 Q 0.05 0.11 0.30 0.45 Q 0.47 0.65 0.48 0.96 Z" />\
					<path transform="translate(0.01 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.48 0.96 Q 0.50 0.55 0.72 0.55 Q 0.92 0.54 0.87 0.74 Q 0.80 0.93 0.48 0.96 Z" />\
					<path transform="translate(0.01 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.48 0.96 Q 0.44 0.54 0.26 0.52 Q 0.03 0.58 0.12 0.81 Q 0.21 0.96 0.48 0.96 Z" />\
					<path transform="translate(0.01 0.05)" fill="'+colors['darkpurple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.5 0.57 Q 0.57 0.34 0.66 0.22 Q 0.72 0.03 0.55 0.03 Q 0.38 0.04 0.39 0.24 Q 0.40 0.45 0.5 0.57 Z" />\
					<path transform="translate(0.01 0.05)" fill="'+colors['darkpurple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.48 0.96 Q 0.63 0.74 0.78 0.68 Q 0.90 0.65 0.85 0.80 Q 0.80 0.93 0.48 0.96 Z" />\
					<path transform="translate(0.01 0.05)" fill="'+colors['darkpurple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.48 0.96 Q 0.33 0.74 0.17 0.66 Q 0.02 0.65 0.10 0.80 Q 0.21 0.96 0.48 0.96 Z" />\
					<circle transform="translate(0.01 0.05)" fill="'+colors['orange']+'" stroke-width="0" cx="0.5" cy="0.57" r="0.1" />\
				</pattern>\
				\
				<pattern id="smallflowers1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.68 0.67 Q 0.68 0.95 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.68 0.40 Q 0.66 0.78 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.29 0.48 Q 0.29 0.68 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.25 0.76 Q 0.20 0.95 0.50 0.99" />\
					<path fill="'+colors['red']+'" stroke-width="0" d="M 0.68 0.67 Q 0.73 0.72 0.80 0.72 Q 0.88 0.70 0.88 0.61 Q 0.87 0.48 0.70 0.48 Q 0.50 0.48 0.49 0.61 Q 0.48 0.71 0.57 0.71 Q 0.64 0.70 0.68 0.67 Z" />\
					<path fill="'+colors['red']+'" stroke-width="0" d="M 0.68 0.40 Q 0.70 0.44 0.75 0.44 Q 0.82 0.43 0.82 0.35 Q 0.81 0.22 0.68 0.22 Q 0.52 0.22 0.51 0.32 Q 0.50 0.43 0.60 0.44 Q 0.66 0.43 0.68 0.40 Z" />\
					<path fill="'+colors['red']+'" stroke-width="0" d="M 0.29 0.48 Q 0.32 0.50 0.37 0.50 Q 0.45 0.49 0.46 0.40 Q 0.43 0.26 0.28 0.27 Q 0.11 0.29 0.11 0.39 Q 0.11 0.53 0.20 0.52 Q 0.27 0.52 0.29 0.48 Z" />\
					<path fill="'+colors['red']+'" stroke-width="0" d="M 0.25 0.76 Q 0.27 0.80 0.32 0.81 Q 0.40 0.79 0.41 0.70 Q 0.38 0.57 0.25 0.57 Q 0.10 0.59 0.08 0.70 Q 0.08 0.82 0.16 0.82 Q 0.24 0.81 0.25 0.76 Z" />\
				</pattern>\
				\
				<pattern id="smallflowers2" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.68 0.67 Q 0.67 0.94 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.68 0.40 Q 0.68 0.79 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.29 0.48 Q 0.26 0.69 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.25 0.76 Q 0.20 0.96 0.50 0.99" />\
					<path fill="'+colors['blue']+'" stroke-width="0" d="M 0.68 0.67 Q 0.73 0.72 0.80 0.72 Q 0.88 0.70 0.88 0.61 Q 0.87 0.48 0.70 0.48 Q 0.50 0.48 0.49 0.61 Q 0.48 0.71 0.57 0.71 Q 0.64 0.70 0.68 0.67 Z" />\
					<path fill="'+colors['blue']+'" stroke-width="0" d="M 0.68 0.40 Q 0.70 0.44 0.75 0.44 Q 0.82 0.43 0.82 0.35 Q 0.81 0.22 0.68 0.22 Q 0.52 0.22 0.51 0.32 Q 0.50 0.43 0.60 0.44 Q 0.66 0.43 0.68 0.40 Z" />\
					<path fill="'+colors['blue']+'" stroke-width="0" d="M 0.29 0.48 Q 0.32 0.50 0.37 0.50 Q 0.45 0.49 0.46 0.40 Q 0.43 0.26 0.28 0.27 Q 0.11 0.29 0.11 0.39 Q 0.11 0.53 0.20 0.52 Q 0.27 0.52 0.29 0.48 Z" />\
					<path fill="'+colors['blue']+'" stroke-width="0" d="M 0.25 0.76 Q 0.27 0.80 0.32 0.81 Q 0.40 0.79 0.41 0.70 Q 0.38 0.57 0.25 0.57 Q 0.10 0.59 0.08 0.70 Q 0.08 0.82 0.16 0.82 Q 0.24 0.81 0.25 0.76 Z" />\
				</pattern>\
				\
				<pattern id="smallflowers3" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.68 0.67 Q 0.67 0.94 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.68 0.40 Q 0.68 0.79 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.29 0.48 Q 0.26 0.69 0.50 0.99" />\
					<path fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.25 0.76 Q 0.20 0.96 0.50 0.99" />\
					<path fill="'+colors['peach']+'" stroke-width="0" d="M 0.68 0.67 Q 0.73 0.72 0.80 0.72 Q 0.88 0.70 0.88 0.61 Q 0.87 0.48 0.70 0.48 Q 0.50 0.48 0.49 0.61 Q 0.48 0.71 0.57 0.71 Q 0.64 0.70 0.68 0.67 Z" />\
					<path fill="'+colors['peach']+'" stroke-width="0" d="M 0.68 0.40 Q 0.70 0.44 0.75 0.44 Q 0.82 0.43 0.82 0.35 Q 0.81 0.22 0.68 0.22 Q 0.52 0.22 0.51 0.32 Q 0.50 0.43 0.60 0.44 Q 0.66 0.43 0.68 0.40 Z" />\
					<path fill="'+colors['peach']+'" stroke-width="0" d="M 0.29 0.48 Q 0.32 0.50 0.37 0.50 Q 0.45 0.49 0.46 0.40 Q 0.43 0.26 0.28 0.27 Q 0.11 0.29 0.11 0.39 Q 0.11 0.53 0.20 0.52 Q 0.27 0.52 0.29 0.48 Z" />\
					<path fill="'+colors['peach']+'" stroke-width="0" d="M 0.25 0.76 Q 0.27 0.80 0.32 0.81 Q 0.40 0.79 0.41 0.70 Q 0.38 0.57 0.25 0.57 Q 0.10 0.59 0.08 0.70 Q 0.08 0.82 0.16 0.82 Q 0.24 0.81 0.25 0.76 Z" />\
				</pattern>\
				\
				<pattern id="cyclamen1" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0.04 0.05)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.47 0.55 Q 0.38 0.76 0.48 0.99" />\
					<path transform="translate(0.04 0.05)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.46 0.77 Q 0.40 0.87 0.48 0.99" />\
					<path transform="translate(0.04 0.05)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.28 0.86 Q 0.35 0.93 0.48 0.96" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['pink']+'" stroke="'+colors['darkpink']+'" stroke-width="0.01" d="M 0.47 0.55 Q 0.52 0.60 0.60 0.53 Q 0.67 0.42 0.61 0.32 Q 0.58 0.23 0.61 0.13 Q 0.55 0.18 0.50 0.24 Q 0.52 0.40 0.47 0.55 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['pink']+'" stroke="'+colors['darkpink']+'" stroke-width="0.01" d="M 0.47 0.55 Q 0.40 0.57 0.36 0.52 Q 0.34 0.42 0.39 0.33 Q 0.42 0.25 0.41 0.15 Q 0.46 0.19 0.50 0.24 Q 0.52 0.40 0.47 0.55 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['pink']+'" stroke="'+colors['darkpink']+'" stroke-width="0.01" d="M 0.46 0.77 Q 0.46 0.88 0.55 0.88 Q 0.66 0.87 0.70 0.80 Q 0.74 0.74 0.83 0.75 Q 0.78 0.70 0.71 0.68 Q 0.56 0.71 0.46 0.77 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['pink']+'" stroke="'+colors['darkpink']+'" stroke-width="0.01" d="M 0.46 0.77 Q 0.44 0.73 0.46 0.69 Q 0.51 0.63 0.61 0.59 Q 0.71 0.58 0.77 0.52 Q 0.78 0.60 0.71 0.68 Q 0.56 0.71 0.46 0.77 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['pink']+'" stroke="'+colors['darkpink']+'" stroke-width="0.01" d="M 0.28 0.86 Q 0.38 0.84 0.41 0.74 Q 0.42 0.64 0.37 0.60 Q 0.31 0.52 0.33 0.41 Q 0.29 0.45 0.26 0.52 Q 0.34 0.69 0.28 0.86 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['pink']+'" stroke="'+colors['darkpink']+'" stroke-width="0.01" d="M 0.28 0.86 Q 0.21 0.84 0.17 0.78 Q 0.13 0.69 0.17 0.61 Q 0.21 0.54 0.17 0.46 Q 0.23 0.49 0.26 0.52 Q 0.34 0.69 0.28 0.86 Z" />\
					<circle transform="translate(0.04 0.05)" fill="'+colors['orange']+'" cx="0.5" cy="0.12" r="0.06" stroke-width="0" />\
					<circle transform="translate(0.04 0.05)" fill="'+colors['orange']+'" cx="0.82" cy="0.64" r="0.06" stroke-width="0" />\
					<circle transform="translate(0.04 0.05)" fill="'+colors['orange']+'" cx="0.25" cy="0.41" r="0.06" stroke-width="0" />\
				</pattern>\
				\
				<pattern id="cyclamen2" width="1" height="1" patternContentUnits="objectBoundingBox">\
					<path transform="translate(0.04 0.05)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.47 0.55 Q 0.38 0.76 0.48 0.99" />\
					<path transform="translate(0.04 0.05)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.46 0.77 Q 0.40 0.87 0.48 0.99" />\
					<path transform="translate(0.04 0.05)" fill="transparent" fill-opacity="0" stroke="'+colors['darkgreen']+'" stroke-width="0.04" d="M 0.28 0.86 Q 0.35 0.93 0.48 0.96" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.47 0.55 Q 0.52 0.60 0.60 0.53 Q 0.67 0.42 0.61 0.32 Q 0.58 0.23 0.61 0.13 Q 0.55 0.18 0.50 0.24 Q 0.52 0.40 0.47 0.55 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.47 0.55 Q 0.40 0.57 0.36 0.52 Q 0.34 0.42 0.39 0.33 Q 0.42 0.25 0.41 0.15 Q 0.46 0.19 0.50 0.24 Q 0.52 0.40 0.47 0.55 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.46 0.77 Q 0.46 0.88 0.55 0.88 Q 0.66 0.87 0.70 0.80 Q 0.74 0.74 0.83 0.75 Q 0.78 0.70 0.71 0.68 Q 0.56 0.71 0.46 0.77 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.46 0.77 Q 0.44 0.73 0.46 0.69 Q 0.51 0.63 0.61 0.59 Q 0.71 0.58 0.77 0.52 Q 0.78 0.60 0.71 0.68 Q 0.56 0.71 0.46 0.77 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.28 0.86 Q 0.38 0.84 0.41 0.74 Q 0.42 0.64 0.37 0.60 Q 0.31 0.52 0.33 0.41 Q 0.29 0.45 0.26 0.52 Q 0.34 0.69 0.28 0.86 Z" />\
					<path transform="translate(0.04 0.05)" fill="'+colors['purple']+'" stroke="'+colors['darkpurple']+'" stroke-width="0.01" d="M 0.28 0.86 Q 0.21 0.84 0.17 0.78 Q 0.13 0.69 0.17 0.61 Q 0.21 0.54 0.17 0.46 Q 0.23 0.49 0.26 0.52 Q 0.34 0.69 0.28 0.86 Z" />\
					<circle transform="translate(0.04 0.05)" fill="'+colors['yellow']+'" cx="0.5" cy="0.12" r="0.06" stroke-width="0" />\
					<circle transform="translate(0.04 0.05)" fill="'+colors['yellow']+'" cx="0.82" cy="0.64" r="0.06" stroke-width="0" />\
					<circle transform="translate(0.04 0.05)" fill="'+colors['yellow']+'" cx="0.25" cy="0.41" r="0.06" stroke-width="0" />\
				</pattern>\
				\
			</defs>';
	
	// Background
	svgstr += '<rect x="0" y="0" width="'+o.svgw+'px" height="'+o.svgh+'px" fill="'+o.backgroundfill+'" />';
	
	// Rendering and optional group rotation
	
	if( o.symmetry === 6 ){ svgstr += '<g transform="rotate('+(o.delta/2)+' '+(o.svgw/2)+' '+(o.svgh/2)+')" >'; }// TODO: why doesn't this looks better with other symmetries?
	
	svgstr += render(o);
	
	if( o.symmetry === 6 ){ svgstr += '</g>'; }// TODO: why doesn't this looks better with other symmetries?
	
	svgstr += '</svg>';
	return svgstr;
}// End of createSVGString()

////////////////////////////////////////////////////////////
//
//  Helper functions
//
////////////////////////////////////////////////////////////

function rndflower(){ return flowerdata[Math.floor(Math.random()*flowerdata.length)]; }
function rnd1(){ return Math.random()<0.5?-1:1; }
function nowstr(){return ((new Date().toISOString()).replace(/\:/g,'-'));}

// Appending an SVG string to a container
function appendSVGString(svgstr,parentid){
	var div;
	if(parentid){
		div = document.getElementById(parentid);
		if(!div){ div = document.createElement('div'); div.id = parentid; document.body.appendChild(div); }
	}else{ div = document.createElement('div'); document.body.appendChild(div); }
	div.innerHTML += svgstr;
}// End of appendSVGString()

//Helper function: loading an image from a URL, then executing callback with canvas as argument
function loadImage(url,callback){
	var img = new Image();
	img.src = url;
	img.onload = function(){
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var context = canvas.getContext('2d');
		context.drawImage(img,0,0);
		callback(canvas);
	};
}

// Helper function: getting ImageData from a canvas
function getImgdata(canvas){
	var context = canvas.getContext('2d');
	return context.getImageData(0,0,canvas.width,canvas.height);
}

function isPointInTriangle(p,a,b,c){
	var v0 = [c.x-a.x,c.y-a.y];
	var v1 = [b.x-a.x,b.y-a.y];
	var v2 = [p.x-a.x,p.y-a.y];
	var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
	var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
	var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
	var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
	var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);
	var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	return ((u >= 0) && (v >= 0) && (u + v < 1));
}// End of isPointInTriangle()

function dist2(v, w) { return (v.x - w.x)*(v.x - w.x) + (v.y - w.y)*(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
	var l2 = dist2(v, w);
	if(l2 == 0){ return dist2(p, v); }
	var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
	t = Math.max(0, Math.min(1, t));
	return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt( distToSegmentSquared(p, v, w) ); }

function intri(p,r,a,b,c){
	return isPointInTriangle(p,a,b,c) && (distToSegment(p,a,b) < r) && (distToSegment(p,a,c) < r) && (distToSegment(p,b,c) < r);
}
