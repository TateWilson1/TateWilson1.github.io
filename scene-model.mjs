// Original geometry for Tate Wilson's portfolio. No third-party model assets.
// Used by the browser and scripts/export-workstation.mjs (Blender-importable GLB).
export function buildWorkstation(T) {
  const world = new T.Group(); world.name = 'Tate Wilson — forensic workstation';
  const palette = {
    base:0x242b30, tile:0x70797d, room:0x182126, wall:0x45545b, trim:0x28353c, desk:0xc0956f, paper:0xf3eddd,
    metal:0x303a40, dark:0x182127, screen:0x12364a, blue:0x4daed4,
    amber:0xdf7548, copper:0xb65e3c, cream:0xd9ddd3, green:0x507266,
    leaf:0x58bf72, black:0x101c23, key:0xdbe6df, brass:0xe0ad59,
    bookPink:0xa87673, bookCyan:0x6d9a9b, bookViolet:0x817f9a, bookGreen:0x6e8f78,
    rgbRed:0xf05296, rgbGreen:0x4ee2a1, rgbBlue:0x44c8f5, rgbViolet:0xa46ee5,
    neonCyan:0x72f5ff, neonPink:0xff5aa8, fishGold:0xf3a449, fishBlue:0x3ebfe8, fishRed:0xef5968,
    aquariumGlass:0x72bad0, water:0x21667b, gravel:0x675b4d, driftwood:0x65412d,
    fabric:0x64777a, catFur:0xa99688, rubber:0x172024, aluminum:0xa8b4b5, veneer:0xf3e7db, laminate:0xc6b69c,
    steel:0x506067, port:0x0d1519, label:0xe4e0d5, glass:0x14242c,
  };
  const materialFinish = {
    base:[.82,.03],tile:[.86,.02],room:[.94,.01],wall:[.88,.02],trim:[.68,.12],desk:[.58,.04],paper:[.96,0],
    metal:[.34,.62],dark:[.72,.08],screen:[.2,.08],blue:[.7,.03],amber:[.76,.02],copper:[.48,.38],
    cream:[.82,.01],green:[.96,.01],leaf:[.9,.01],black:[.5,.12],key:[.74,.03],brass:[.28,.72],
    bookPink:[.58,.02],bookCyan:[.58,.02],bookViolet:[.58,.02],bookGreen:[.58,.02],
    rgbRed:[.34,.04],rgbGreen:[.34,.04],rgbBlue:[.34,.04],rgbViolet:[.34,.04],
    neonCyan:[.18,.02],neonPink:[.18,.02],fishGold:[.36,.04],fishBlue:[.3,.04],fishRed:[.34,.03],
    aquariumGlass:[.08,.12],water:[.18,.02],gravel:[.9,.01],driftwood:[.84,.02],
    fabric:[.94,0],catFur:[.96,0],rubber:[.88,0],aluminum:[.32,.78],veneer:[.62,0],laminate:[.54,.03],
    steel:[.48,.68],port:[.7,.1],label:[.91,0],glass:[.19,.08],
  };
  const materials = Object.fromEntries(Object.entries(palette).map(([name,color])=>{
    const [roughness,metalness]=materialFinish[name];
    const material=new T.MeshStandardMaterial({color,roughness,metalness});material.name=name;return [name,material];
  }));
  // The shell begins nearly black. Practical fixtures, not self-lit walls, reveal the room.
  materials.room.emissive.setHex(0x091015);materials.room.emissiveIntensity=.035;
  materials.screen.emissive.setHex(0x386079); materials.screen.emissiveIntensity=.9;
  materials.catFur.emissive.setHex(0x3d2f28);materials.catFur.emissiveIntensity=.18;
  for(const [name,color] of [['rgbRed',0xff3d92],['rgbGreen',0x35dda0],['rgbBlue',0x28bfe8],['rgbViolet',0x9d52e6]]){
    materials[name].emissive.setHex(color);materials[name].emissiveIntensity=2.15;
  }
  materials.rgbBlue.emissiveIntensity=2.45;
  for(const [name,color] of [['neonCyan',0x72f5ff],['neonPink',0xff5aa8]]){materials[name].emissive.setHex(color);materials[name].emissiveIntensity=5.2;}
  materials.aquariumGlass.transparent=true;materials.aquariumGlass.opacity=.2;materials.aquariumGlass.depthWrite=false;materials.aquariumGlass.side=T.DoubleSide;
  materials.water.transparent=true;materials.water.opacity=.22;materials.water.depthWrite=false;materials.water.side=T.DoubleSide;materials.water.emissive.setHex(0x153f4d);materials.water.emissiveIntensity=.32;
  // Small procedural surface maps keep the authored furniture coherent and lightweight.
  const grain=new Uint8Array(128*128*4);
  for(let y=0;y<128;y++)for(let x=0;x<128;x++){
    const wave=Math.sin(y*.13+Math.sin(x*.025)*2.4)*3+Math.sin(y*.47+x*.035)*1.5;
    const pore=((x*23+y*41)%17===0)?-7:0;const value=184+wave+pore;const i=(y*128+x)*4;
    grain[i]=value;grain[i+1]=value*.89;grain[i+2]=value*.77;grain[i+3]=255;
  }
  const woodMap=new T.DataTexture(grain,128,128,T.RGBAFormat);woodMap.colorSpace=T.SRGBColorSpace;
  woodMap.wrapS=woodMap.wrapT=T.RepeatWrapping;woodMap.repeat.set(3,2);woodMap.anisotropy=4;woodMap.needsUpdate=true;
  materials.veneer.map=woodMap;materials.veneer.bumpMap=woodMap;materials.veneer.bumpScale=.009;
  const weave=new Uint8Array(32*32*4);
  for(let y=0;y<32;y++)for(let x=0;x<32;x++){
    const strand=(x%4===0||y%4===0)?172:118;const i=(y*32+x)*4;
    weave[i]=strand;weave[i+1]=strand;weave[i+2]=strand;weave[i+3]=255;
  }
  const fabricMap=new T.DataTexture(weave,32,32,T.RGBAFormat);fabricMap.wrapS=fabricMap.wrapT=T.RepeatWrapping;fabricMap.repeat.set(8,7);fabricMap.needsUpdate=true;
  materials.fabric.bumpMap=fabricMap;materials.fabric.bumpScale=.015;
  const tilePixels=new Uint8Array(16*16*4);
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){
    const edge=x===0||y===0;const alternate=(x>7)!==(y>7);const value=edge?58:(alternate?117:111);const i=(y*16+x)*4;
    tilePixels[i]=value;tilePixels[i+1]=edge?34:value+6;tilePixels[i+2]=edge?38:value+9;tilePixels[i+3]=255;
  }
  const tileTexture=new T.DataTexture(tilePixels,16,16,T.RGBAFormat);tileTexture.wrapS=tileTexture.wrapT=T.RepeatWrapping;tileTexture.repeat.set(45,45);tileTexture.magFilter=T.NearestFilter;tileTexture.needsUpdate=true;
  materials.tile.map=tileTexture;
  const group = (name,parent=world,target) => { const g=new T.Group();g.name=name;if(target)g.userData.target=target;parent.add(g);return g; };
  const geometryCache=new Map();
  const cachedGeometry=(key,create)=>{if(!geometryCache.has(key))geometryCache.set(key,create());return geometryCache.get(key);};
  function mesh(geometry,material,x,y,z,parent=world,name='') {
    const m=new T.Mesh(geometry,materials[material]);m.position.set(x,y,z);
    if(!geometry.boundingSphere)geometry.computeBoundingSphere();
    m.castShadow=geometry.boundingSphere.radius>.22&&!['base','room','screen','paper','key'].includes(material);
    m.receiveShadow=['base','room','desk','metal'].includes(material);
    m.name=name||material;parent.add(m);return m;
  }
  const box=(w,h,d,x,y,z,mat,parent=world,name)=>mesh(cachedGeometry(`b:${w}:${h}:${d}`,()=>new T.BoxGeometry(w,h,d)),mat,x,y,z,parent,name);
  const cylinder=(r1,r2,h,x,y,z,mat,parent=world,segments=24)=>mesh(cachedGeometry(`c:${r1}:${r2}:${h}:${segments}`,()=>new T.CylinderGeometry(r1,r2,h,segments)),mat,x,y,z,parent);
  const ball=(r,x,y,z,mat,parent=world)=>mesh(cachedGeometry(`s:${r}`,()=>new T.SphereGeometry(r,12,8)),mat,x,y,z,parent);
  function round(w,h,d,r,x,y,z,mat,parent=world,name) {
    const shape=new T.Shape();const a=w/2-r,b=h/2-r;
    shape.moveTo(-a,-b-r);shape.lineTo(a,-b-r);shape.quadraticCurveTo(a+r,-b-r,a+r,-b);
    shape.lineTo(a+r,b);shape.quadraticCurveTo(a+r,b+r,a,b+r);shape.lineTo(-a,b+r);
    shape.quadraticCurveTo(-a-r,b+r,-a-r,b);shape.lineTo(-a-r,-b);shape.quadraticCurveTo(-a-r,-b-r,-a,-b-r);
    const geo=cachedGeometry(`r:${w}:${h}:${d}:${r}`,()=>{
      const geometry=new T.ExtrudeGeometry(shape,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.35,bevelThickness:r,curveSegments:4});
      geometry.translate(0,0,-(d-2*r)/2);return geometry;
    });
    return mesh(geo,mat,x,y,z,parent,name);
  }
  function rod(from,to,r,mat,parent=world) {
    const a=new T.Vector3(...from),b=new T.Vector3(...to),delta=b.clone().sub(a);
    const m=cylinder(r,r,delta.length(),...(a.clone().add(b).multiplyScalar(.5).toArray()),mat,parent,12);
    m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return m;
  }
  function cable(points,r,mat,parent=world,name='Cable') {
    const path=new T.CatmullRomCurve3(points.map(point=>new T.Vector3(...point)));
    return mesh(new T.TubeGeometry(path,Math.max(12,points.length*6),r,6,false),mat,0,0,0,parent,name);
  }
  function neonTube(points,mat,parent,name='Neon tube',closed=false,radius=.025) {
    const vectors=points.map(([x,y,z=0])=>new T.Vector3(x,y,z));
    const curve=vectors.length===2?new T.LineCurve3(vectors[0],vectors[1]):new T.CatmullRomCurve3(vectors,closed,'catmullrom',.24);
    return mesh(new T.TubeGeometry(curve,Math.max(18,points.length*8),radius,8,closed),mat,0,0,0,parent,name);
  }
  function windowView(w,h,x,y,z,parent) {
    const face=mesh(new T.PlaneGeometry(w,h),'screen',x,y,z,parent,'Night skyline beyond the window');
    if(typeof document!=='undefined') {
      const canvas=document.createElement('canvas');canvas.width=1400;canvas.height=760;const c=canvas.getContext('2d');
      const sky=c.createLinearGradient(0,0,0,760);sky.addColorStop(0,'#030815');sky.addColorStop(.55,'#0a1b2b');sky.addColorStop(1,'#162c36');c.fillStyle=sky;c.fillRect(0,0,1400,760);
      const haze=c.createRadialGradient(970,360,20,970,360,520);haze.addColorStop(0,'rgba(69,126,153,.2)');haze.addColorStop(1,'rgba(4,9,17,0)');c.fillStyle=haze;c.fillRect(0,0,1400,760);
      c.fillStyle='#d8e2e7';c.beginPath();c.arc(1115,145,54,0,Math.PI*2);c.fill();c.fillStyle='#07111e';c.beginPath();c.arc(1092,125,56,0,Math.PI*2);c.fill();
      for(let i=0;i<52;i++){const sx=(i*193)%1380,sy=35+((i*83)%340),r=i%7===0?2.2:1.1;c.fillStyle=i%5===0?'#91dff2':'#c4d6dd';c.beginPath();c.arc(sx,sy,r,0,Math.PI*2);c.fill();}
      const buildings=[[0,420,145,340],[120,500,170,260],[265,390,190,370],[430,470,125,290],[540,330,210,430],[735,455,150,305],[860,365,225,395],[1075,480,120,280],[1180,405,220,355]];
      for(let b=0;b<buildings.length;b++){const [bx,by,bw,bh]=buildings[b];c.fillStyle=b%2?'#0a121b':'#0d1821';c.fillRect(bx,by,bw,bh);c.fillStyle=b%3===0?'#f0b76b':'#69b9ce';for(let wy=by+28;wy<740;wy+=40)for(let wx=bx+18;wx<bx+bw-12;wx+=31)if((wx+wy+b*17)%5>1)c.fillRect(wx,wy,8,13);}
      c.fillStyle='rgba(76,155,179,.16)';c.fillRect(0,705,1400,55);for(let i=0;i<18;i++){c.fillStyle=`rgba(85,185,214,${.03+(i%3)*.025})`;c.fillRect(i*82,712,28,48);}
      const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
      face.material=new T.MeshStandardMaterial({map:texture,emissiveMap:texture,emissive:0x335c70,emissiveIntensity:.78,roughness:.42,metalness:.08});
    }
    return face;
  }
  function aquariumFish({name,color,length=.52,height=.22,phase=0,speed=1,radius=.7,y=.72,parent}) {
    const fish=group(name,parent);fish.userData.ambient='aquarium-fish';fish.userData.phase=phase;fish.userData.speed=speed;fish.userData.radius=radius;fish.userData.swimY=y;
    const profile=[];for(let i=0;i<=12;i++){const t=i/12;profile.push(new T.Vector2(Math.sin(t*Math.PI)*height*.52,(t-.5)*length));}
    const body=mesh(new T.LatheGeometry(profile,22),'fishBlue',0,0,0,fish,`${name} curved body`);body.material=body.material.clone();body.material.color.setHex(color);body.material.emissive.setHex(color);body.material.emissiveIntensity=.22;body.rotation.z=Math.PI/2;body.scale.z=.72;
    const tailShape=new T.Shape();tailShape.moveTo(0,0);tailShape.bezierCurveTo(-.18,.18,-.26,.2,-.32,.24);tailShape.quadraticCurveTo(-.25,0,-.32,-.24);tailShape.bezierCurveTo(-.24,-.2,-.16,-.15,0,0);
    const tail=mesh(new T.ShapeGeometry(tailShape,10),'fishGold',-length*.49,0,0,fish,`${name} tail fin`);tail.material=tail.material.clone();tail.material.color.setHex(color);tail.material.emissive.setHex(color);tail.material.emissiveIntensity=.14;tail.rotation.y=Math.PI/2;tail.userData.ambient='aquarium-tail';
    const finShape=new T.Shape();finShape.moveTo(-.08,0);finShape.quadraticCurveTo(.03,.17,.16,.02);finShape.quadraticCurveTo(.02,.05,-.08,0);
    const dorsal=mesh(new T.ShapeGeometry(finShape,8),'fishGold',-.04,height*.46,0,fish,`${name} dorsal fin`);dorsal.material=dorsal.material.clone();dorsal.material.color.setHex(color);dorsal.rotation.x=Math.PI/2;
    for(const zSide of [-1,1]){const fin=mesh(new T.ShapeGeometry(finShape,8),'fishGold',.03,-.015,zSide*height*.34,fish,`${name} side fin`);fin.material=fin.material.clone();fin.material.color.setHex(color);fin.rotation.y=Math.PI/2;fin.scale.set(.62,.62,.62);}
    for(const zSide of [-1,1]){ball(.025,length*.28,height*.12,zSide*height*.32,'cream',fish);ball(.012,length*.295,height*.12,zSide*height*.342,'black',fish);}
    for(const zSide of [-1,1]){const stripe=round(length*.5,.035,.012,.008,.02,-.03,zSide*height*.34,'fishRed',fish,`${name} flank stripe`);stripe.material=stripe.material.clone();stripe.material.color.setHex(color===0x3ebfe8?0xef5968:0xf4d36a);}
    return fish;
  }
  function screen(w,h,x,y,z,parent,title,rows,name='Display') {
    const face=mesh(cachedGeometry(`screen:${w}:${h}`,()=>new T.PlaneGeometry(w,h)), 'screen',x,y,z,parent,name);
    if(typeof document!=='undefined') {
      const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=640;
      const c=canvas.getContext('2d');c.fillStyle='#0b1920';c.fillRect(0,0,1024,640);
      c.fillStyle='#132d3b';c.fillRect(0,0,1024,78);c.fillStyle='#b6d7e4';c.font='600 29px sans-serif';c.fillText(title,40,50);
      c.fillStyle='#214858';c.fillRect(38,112,240,480);c.fillStyle='#d9ddd3';c.font='500 21px sans-serif';
      ['OVERVIEW','EVIDENCE','NOTES','OUTPUT'].forEach((label,i)=>c.fillText(label,58,155+i*56));
      c.fillStyle='#10242e';c.fillRect(306,112,680,480);c.strokeStyle='#3c6070';c.lineWidth=2;c.strokeRect(306,112,680,480);
      rows.forEach((row,i)=>{const top=153+i*119;c.fillStyle='#203c4a';c.fillRect(330,top,630,90);c.fillStyle='#edb38b';c.fillRect(330,top,5,90);c.fillStyle='#eef1ee';c.font='600 25px sans-serif';c.fillText(row,355,top+39);c.fillStyle='#8eabb5';c.fillRect(355,top+58,390-i*42,8);});
      const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
      face.material=new T.MeshStandardMaterial({map:texture,emissiveMap:texture,emissive:0x7b9fad,emissiveIntensity:.72,roughness:.82,metalness:0});
    }
    return face;
  }
  function certificate(w,h,x,y,z,parent) {
    const face=mesh(cachedGeometry(`certificate:${w}:${h}`,()=>new T.PlaneGeometry(w,h)),'paper',x,y,z,parent,'Security+ certificate document');
    if(typeof document!=='undefined') {
      const canvas=document.createElement('canvas');canvas.width=1296;canvas.height=1000;
      const c=canvas.getContext('2d');c.fillStyle='#fdfdfc';c.fillRect(0,0,canvas.width,canvas.height);

      c.fillStyle='#ca0d2f';c.fillRect(0,0,canvas.width,140);
      c.fillStyle='#ffffff';c.font='700 54px Arial, sans-serif';c.textAlign='right';c.fillText('CompTIA',1248,88);c.textAlign='left';
      c.strokeStyle='#aeb6ba';c.lineWidth=2;
      for(const xLine of [72,82,92]){c.beginPath();c.moveTo(xLine,140);c.lineTo(xLine,780);c.quadraticCurveTo(xLine,850,xLine+70,850);c.lineTo(790,850);c.stroke();}
      c.fillStyle='#050709';c.font='500 64px Arial, sans-serif';c.fillText('Tate Wilson',126,244);

      const accent=c.createLinearGradient(0,0,820,0);accent.addColorStop(0,'#dc4000');accent.addColorStop(.52,'#c60d3f');accent.addColorStop(1,'#701a86');
      c.strokeStyle=accent;c.lineWidth=10;c.beginPath();c.moveTo(0,304);c.lineTo(720,304);c.quadraticCurveTo(786,304,786,370);c.lineTo(786,1000);c.stroke();
      c.fillStyle='#5e676b';c.font='400 31px Arial, sans-serif';c.fillText('has successfully completed the',148,360);c.fillText('requirements to be recognized as',148,399);

      c.strokeStyle='#d01531';c.lineWidth=23;c.beginPath();c.arc(395,596,166,.78*Math.PI,.22*Math.PI);c.stroke();
      c.strokeStyle='#d01531';c.lineWidth=5;c.beginPath();c.arc(395,596,166,.22*Math.PI,.78*Math.PI);c.stroke();
      c.fillStyle='#cc1730';c.font='700 37px Arial, sans-serif';c.textAlign='center';c.fillText('CompTIA',395,529);
      c.fillStyle='#1c252a';c.font='700 55px Arial, sans-serif';c.fillText('Security+',395,609);
      c.strokeStyle='#cf1832';c.lineWidth=4;c.beginPath();c.roundRect(317,641,156,42,20);c.stroke();
      c.fillStyle='#ca1731';c.font='700 25px Arial, sans-serif';c.fillText('CERTIFIED',395,670);
      c.fillStyle='#555f64';c.font='600 28px Arial, sans-serif';c.fillText('Plus Series',395,724);

      c.strokeStyle='#a7afb2';c.lineWidth=4;c.beginPath();c.arc(965,445,91,0,Math.PI*2);c.stroke();c.lineWidth=2;c.beginPath();c.arc(965,445,77,0,Math.PI*2);c.stroke();
      c.fillStyle='#8d979b';c.font='600 16px Arial, sans-serif';c.fillText('COMPTIA OFFICIAL',965,413);c.font='700 24px Arial, sans-serif';c.fillText('CERTIFIED',965,452);c.font='600 14px Arial, sans-serif';c.fillText('SKILL CERTIFICATION',965,481);
      c.textAlign='left';c.fillStyle='#0a0c0d';c.font='500 28px Arial, sans-serif';c.fillText('SECURITY+ CREDENTIAL',858,580);
      c.fillStyle='#cf1230';c.font='600 17px Arial, sans-serif';c.fillText('CERTIFICATION DATE',858,614);c.fillStyle='#16191a';c.font='500 22px Arial, sans-serif';c.fillText('May 18, 2026',858,641);
      c.fillStyle='#cf1230';c.font='600 17px Arial, sans-serif';c.fillText('EXPIRATION DATE',858,681);c.fillStyle='#16191a';c.font='500 22px Arial, sans-serif';c.fillText('May 18, 2029',858,708);
      c.strokeStyle='#111';c.lineWidth=3;c.beginPath();c.moveTo(862,767);c.bezierCurveTo(884,720,895,817,921,760);c.bezierCurveTo(942,718,948,807,985,770);c.bezierCurveTo(1012,746,1038,787,1091,765);c.stroke();
      c.fillStyle='#cf1230';c.font='600 15px Arial, sans-serif';c.fillText('CERTIFICATION OPERATIONS',858,806);
      c.fillStyle='#171a1b';c.font='500 18px Arial, sans-serif';c.fillText('Criteria: SY0-701 · CompTIA Security+ certification',154,910);c.fillText('Credential details verified by CompTIA',154,940);
      const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
      face.material=new T.MeshStandardMaterial({map:texture,emissiveMap:texture,emissive:0x4b4b4b,emissiveIntensity:.14,roughness:.86,metalness:0});
    }
    return face;
  }
  function curvedPanel(width,height,depth,rows,columns,curve,mat,x,y,z,parent,name) {
    const positions=[],uv=[],indices=[];
    for(let row=0;row<=rows;row++)for(let col=0;col<=columns;col++){
      const u=col/columns,v=row/rows,side=u*2-1;
      positions.push(side*width/2,(v-.5)*height,Math.sin(u*Math.PI)*curve+(v-.5)*depth);
      uv.push(u,v);
    }
    for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
      const a=row*(columns+1)+col,b=a+columns+1;indices.push(a,b,a+1,b,b+1,a+1);
    }
    const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();
    const panel=mesh(geometry,mat,x,y,z,parent,name);panel.material.side=T.DoubleSide;return panel;
  }
  const architecture=group('Room / enclosed forensic lab');
  // A deliberately visible shell gives the camera real corners and makes the
  // portfolio read as a room rather than a desk staged on an infinite plane.
  box(16,.24,18,0,-.12,3.1,'tile',architecture,'Tiled lab floor');
  box(14.4,8,.18,0,4,-3.18,'room',architecture,'Back wall');
  box(.18,8,16,-7.12,4,3.8,'room',architecture,'Left wall');
  box(.18,8,16,7.12,4,3.8,'room',architecture,'Right wall');
  box(14.2,.13,.16,0,.08,-3.02,'trim',architecture,'Back baseboard');
  box(.16,.13,15.8,-6.96,.08,3.8,'trim',architecture,'Left baseboard');
  box(.16,.13,15.8,6.96,.08,3.8,'trim',architecture,'Right baseboard');
  for(const x of [-7.0,7.0]){
    box(.26,4.7,.32,x,2.35,6.65,'trim',architecture,'Front architectural pier');
    box(.34,.22,15.6,x,4.72,3.75,'trim',architecture,'Side ceiling rail');
  }
  box(14.2,.25,.34,0,4.72,-3.02,'trim',architecture,'Back ceiling beam');
  for(const x of [-6.94,6.94])box(.3,4.75,.3,x,2.38,-3.0,'trim',architecture,'Visible rear corner post');
  const window=group('Panoramic city window',architecture);const windowX=.62,windowY=3.18,windowZ=-3.045,windowW=4.5,windowH=2.52;
  windowView(windowW-.22,windowH-.22,windowX,windowY,windowZ+.035,window);
  for(const [w,h,x,y] of [[windowW,.12,windowX,windowY-windowH/2],[windowW,.12,windowX,windowY+windowH/2],[.12,windowH,windowX-windowW/2,windowY],[.12,windowH,windowX+windowW/2,windowY]])box(w,h,.13,x,y,windowZ+.07,'steel',window,'Brushed steel window frame');
  box(.085,windowH-.18,.12,windowX,windowY,windowZ+.08,'steel',window,'Window center mullion');
  box(windowW+.32,.12,.42,windowX,windowY-windowH/2-.08,windowZ+.2,'desk',window,'Deep window sill');
  const reflection=mesh(new T.PlaneGeometry(windowW-.3,windowH-.3),'aquariumGlass',windowX,windowY,windowZ+.075,window,'Window glass reflection');reflection.material=reflection.material.clone();reflection.material.opacity=.08;

  const dfirNeon=group('DFIR neon sign',architecture);dfirNeon.position.set(-5.38,3.55,-2.91);dfirNeon.scale.set(.72,.72,.72);dfirNeon.userData.ambient='neon-sign';
  const letterX=[-1.02,-.35,.34,.78];
  neonTube([[letterX[0],-.55],[letterX[0],.55],[letterX[0]+.22,.55],[letterX[0]+.48,.36],[letterX[0]+.48,-.36],[letterX[0]+.22,-.55],[letterX[0],-.55]],'neonCyan',dfirNeon,'Neon D');
  neonTube([[letterX[1],-.55],[letterX[1],.55]],'neonCyan',dfirNeon,'Neon F stem');neonTube([[letterX[1],.55],[letterX[1]+.44,.55]],'neonCyan',dfirNeon,'Neon F top');neonTube([[letterX[1],.06],[letterX[1]+.34,.06]],'neonCyan',dfirNeon,'Neon F arm');
  neonTube([[letterX[2],-.55],[letterX[2],.55]],'neonCyan',dfirNeon,'Neon I');
  neonTube([[letterX[3],-.55],[letterX[3],.55]],'neonCyan',dfirNeon,'Neon R stem');neonTube([[letterX[3],.55],[letterX[3]+.34,.55],[letterX[3]+.5,.35],[letterX[3]+.34,.08],[letterX[3],.08]],'neonCyan',dfirNeon,'Neon R bowl');neonTube([[letterX[3]+.22,.08],[letterX[3]+.56,-.55]],'neonCyan',dfirNeon,'Neon R leg');
  for(const x of [-1.18,1.5])cylinder(.035,.035,.16,x,0,-.08,'steel',dfirNeon,10);

  const shieldNeon=group('Verified shield neon sign',architecture);shieldNeon.position.set(4.42,3.46,-2.91);shieldNeon.userData.ambient='neon-sign';
  neonTube([[0,.67],[.62,.43],[.54,-.25],[0,-.7],[-.54,-.25],[-.62,.43]],'neonPink',shieldNeon,'Neon shield',true,.032);
  neonTube([[-.3,-.02],[-.08,-.25],[.38,.28]],'neonCyan',shieldNeon,'Neon verification check',false,.035);
  for(const x of [-.72,.72])cylinder(.035,.035,.16,x,0,-.08,'steel',shieldNeon,10);
  const desk=group('Desk');
  round(6.4,.14,2.15,.055,0,1.79,-.4,'veneer',desk,'Ash veneer desktop');
  round(6.38,.055,2.12,.018,0,1.71,-.4,'laminate',desk,'Desktop laminate edge');
  round(4.15,.012,1.32,.035,.1,1.868,-.12,'rubber',desk,'Desk mat');
  // Small irregularities make the desk a working place, without invented case data.
  for(let i=0;i<3;i++) {
    const sheet=box(.74,.012,.62,1.1+i*.025,1.884+i*.015,-.92,'paper',desk,'Reference papers');
    sheet.rotation.y=-.12+i*.04;
  }
  cable([[-.45,1.84,-1.2],[-.48,1.59,-1.37],[.12,1.25,-1.46],[1.1,.42,-1.5],[1.95,.3,-1.5]],.014,'rubber',desk,'Monitor power cable');
  for(const x of [-2.94,2.94])for(const z of [-1.21,.42]){
    rod([x,.12,z],[x,1.67,z],.052,'steel',desk);
    cylinder(.073,.073,.025,x,.115,z,'rubber',desk);
  }
  for(const z of [-1.21,.42])round(5.87,.075,.06,.018,0,1.58,z,'steel',desk,'Desk support rail');
  round(1.0,.74,1.5,.045,-2.35,1.25,-.43,'laminate',desk,'Drawer pedestal');
  for(const y of [1.04,1.39]){round(.88,.29,.025,.018,-2.35,y,.335,'veneer',desk,'Drawer front');round(.28,.026,.048,.01,-2.35,y+.02,.36,'aluminum',desk,'Drawer pull');}
  cylinder(.11,.11,.012,2.65,1.87,-1.03,'rubber',desk);cylinder(.072,.072,.013,2.65,1.88,-1.03,'port',desk);
  const rgbStrip=group('RGB desk lighting',desk);
  box(5.96,.025,.035,0,1.675,.65,'rgbBlue',rgbStrip,'Blue desk light strip');
  box(2.6,.022,.028,-4.55,.22,-3.0,'rgbViolet',architecture,'RGB accent strip / left baseboard');
  box(2.6,.022,.028,4.55,.22,-3.0,'rgbGreen',architecture,'RGB accent strip / right baseboard');
  const monitor=group('Monitor / selected projects',world,'projects');
  round(2.38,1.49,.16,.055,-.43,2.87,-.89,'rubber',monitor,'Monitor polymer housing');
  round(2.28,1.34,.016,.028,-.43,2.905,-.799,'glass',monitor,'Inset display glass');
  const mainDisplay=screen(2.19,1.24,-.43,2.91,-.787,monitor,'TATE / SELECTED WORK',['TabletopForge','NIST CFReDS Hacking Case','GRC Risk Assessment'],'Display');
  if(typeof document!=='undefined') {
    mainDisplay.userData.wallpaper={lastFrame:0};
    new T.TextureLoader().load('assets/tabletopforge-home.png',texture=>{
      const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=640;const context=canvas.getContext('2d');
      const wallpaperTexture=new T.CanvasTexture(canvas);wallpaperTexture.colorSpace=T.SRGBColorSpace;wallpaperTexture.anisotropy=4;
      context.drawImage(texture.image,0,0,canvas.width,canvas.height);
      mainDisplay.material.map=wallpaperTexture;mainDisplay.material.emissiveMap=wallpaperTexture;mainDisplay.material.emissive.setHex(0x527681);mainDisplay.material.emissiveIntensity=.38;mainDisplay.material.needsUpdate=true;
      Object.assign(mainDisplay.userData.wallpaper,{canvas,context,texture:wallpaperTexture,image:texture.image});
    });
  }
  round(2.18,.03,.025,.012,-.43,2.24,-.78,'steel',monitor,'Lower aluminum bezel');
  box(.12,.015,.012,-.43,2.25,-.758,'aluminum',monitor,'Monitor maker mark');
  const monitorPower=ball(.027,.61,2.25,-.757,'blue',monitor);monitorPower.name='Monitor mode switch';monitorPower.userData.action='screen-mode';
  round(.47,.47,.09,.025,-.43,2.61,-1.005,'steel',monitor,'Rear VESA mount');
  for(let i=0;i<8;i++)box(.12,.012,.012,-1.12+i*.19,3.5,-.979,'port',monitor,'Rear ventilation slot');
  rod([-.43,2.2,-.97],[-.43,1.89,-.97],.075,'aluminum',monitor);
  round(.92,.035,.52,.018,-.43,1.875,-.87,'steel',monitor,'Weighted monitor foot');
  cable([[-.39,2.16,-1.04],[-.36,2.02,-1.05],[-.41,1.79,-1.16],[-.38,1.71,-1.18]],.014,'rubber',monitor,'Monitor signal cable');
  const keyboard=group('Keyboard and mouse');
  round(1.61,.065,.57,.035,-.42,1.916,.04,'steel',keyboard,'Mechanical keyboard chassis');
  round(1.53,.012,.5,.025,-.42,1.955,.04,'rubber',keyboard,'Recessed key deck');
  for(let row=0;row<4;row++)for(let col=0;col<12;col++){
    const key=round(.095,.024,.075,.007,-1.09+col*.12,1.971,-.16+row*.11,col===0&&row===3?'amber':'key',keyboard,'Individual keycap');
    key.rotation.x=-.025;
  }
  round(.54,.024,.075,.008,-.4,1.971,.21,'key',keyboard,'Space bar');
  round(.27,.125,.4,.055,.77,1.93,.03,'rubber',keyboard,'Contoured mouse');
  box(.012,.007,.11,.77,2.0,-.04,'aluminum',keyboard,'Mouse scroll wheel');
  rod([.76,1.93,-.17],[.78,1.87,-.64],.012,'rubber',keyboard);
  const drive=group('Forensic evidence drive',world,'forensics');drive.position.set(-6.245,1.38,.02);drive.rotation.y=Math.PI/2+.04;
  round(1.02,.035,.72,.022,0,-.035,0,'rubber',drive,'Evidence handling mat');
  round(.81,.12,.53,.038,0,.04,0,'aluminum',drive,'2.5 inch drive body');
  round(.38,.012,.18,.012,.14,.108,-.07,'label',drive,'Evidence drive label');
  for(let i=0;i<3;i++)box(.22-i*.045,.009,.008,.13,.117,-.11+i*.04,'steel',drive,'Drive label line');
  const spindle=mesh(new T.TorusGeometry(.14,.018,8,24),'steel',-.18,.113,.03,drive,'Stamped spindle ring');spindle.rotation.x=Math.PI/2;
  cylinder(.065,.065,.008,-.18,.116,.03,'aluminum',drive,20);
  for(let i=0;i<4;i++)box(.21,.009,.009,-.15,.113,-.19+i*.12,'steel',drive,'Stamped lid rib');
  for(const x of [-.32,.32])for(const z of [-.19,.19])cylinder(.017,.017,.008,x,.108,z,'steel',drive,10);
  box(.22,.025,.032,0,.027,-.275,'port',drive,'SATA connector');
  box(.09,.026,.035,.32,.027,-.275,'port',drive,'Power connector');
  cable([[.4,.025,-.18],[.56,.035,-.24],[.64,.03,-.4],[.58,.03,-.58]],.015,'rubber',drive,'Drive data lead');
  round(.24,.035,.08,.012,.36,.06,.34,'steel',drive,'USB bridge adapter');
  const evidenceScan=box(.045,.018,.78,-.38,.145,0,'neonCyan',drive,'Evidence scanner sweep');evidenceScan.userData.ambient='evidence-scan';evidenceScan.userData.baseX=-.38;evidenceScan.userData.range=.76;
  const laptop=group('Internship laptop',world,'internship');laptop.position.set(1.65,1.93,-.68);laptop.rotation.y=-.08;
  round(1.18,.055,.77,.024,0,0,0,'aluminum',laptop,'Machined laptop base');
  round(1.05,.011,.44,.012,0,.034,-.06,'rubber',laptop,'Laptop keyboard well');
  for(let row=0;row<4;row++)for(let col=0;col<12;col++)round(.062,.008,.044,.004,-.43+col*.078,.047,-.23+row*.07,'port',laptop,'Laptop key');
  round(.32,.004,.19,.012,0,.034,.24,'steel',laptop,'Laptop trackpad');
  const laptopScreen=group('Identity review screen',laptop);laptopScreen.rotation.x=-.18;laptopScreen.position.set(0,.43,-.365);
  round(1.18,.75,.055,.022,0,0,0,'rubber',laptopScreen,'Laptop display housing');
  round(1.09,.66,.008,.015,0,0,.037,'glass',laptopScreen,'Laptop glass');
  const laptopDisplay=screen(1.05,.62,0,0,.045,laptopScreen,'IDENTITY / REVIEW',['Access review','Enterprise apps','Remediation notes'],'Internship display');
  if(typeof document!=='undefined'){
    const canvas=document.createElement('canvas');canvas.width=768;canvas.height=480;const context=canvas.getContext('2d');
    const base=context.createLinearGradient(0,0,canvas.width,canvas.height);base.addColorStop(0,'#071827');base.addColorStop(.5,'#201042');base.addColorStop(1,'#082e35');context.fillStyle=base;context.fillRect(0,0,canvas.width,canvas.height);
    const wallpaperTexture=new T.CanvasTexture(canvas);wallpaperTexture.colorSpace=T.SRGBColorSpace;wallpaperTexture.anisotropy=4;
    laptopDisplay.material=new T.MeshStandardMaterial({map:wallpaperTexture,emissiveMap:wallpaperTexture,emissive:0x8170b8,emissiveIntensity:1.18,roughness:.72,metalness:0});
    laptopDisplay.userData.wallpaper={kind:'aurora',canvas,context,texture:wallpaperTexture,lastFrame:0};
  }
  ball(.012,0,.348,.044,'port',laptopScreen);
  const studyPedestal=group('Education notebook pedestal');studyPedestal.position.set(-4.7,.06,3.58);studyPedestal.rotation.y=-.52;
  round(1.08,.09,.82,.03,0,.78,0,'desk',studyPedestal,'Notebook pedestal top');
  for(const x of [-.43,.43])for(const z of [-.31,.31])rod([x,.05,z],[x,.73,z],.026,'steel',studyPedestal);
  box(.92,.05,.11,0,.39,-.31,'steel',studyPedestal,'Notebook pedestal brace');
  const notebook=group('Notebook / education',world,'education');notebook.position.set(-4.7,.91,3.58);notebook.rotation.y=-.4;
  box(.88,.06,.8,0,0,0,'amber',notebook,'Notebook cover');box(.82,.045,.75,.015,.052,0,'paper',notebook);
  box(.014,.009,.74,0,.079,0,'desk',notebook);
  for(let i=0;i<6;i++)for(const x of [-.23,.21])box(.3,.008,.011,x,.082,-.25+i*.087,'wall',notebook);
  rod([.32,.13,-.33],[.43,.13,.3],.023,'metal',notebook);
  const rack=group('Server rack / CCDC',world,'ccdc');rack.position.set(4.0,.04,-.85);rack.rotation.y=-.08;
  for(const x of [-.47,.47])for(const z of [-.47,.47])round(.075,1.73,.08,.012,x,.87,z,'steel',rack,'Open rack upright');
  for(const y of [.04,1.73])for(const z of [-.47,.47])round(1.02,.07,.09,.012,0,y,z,'steel',rack,'Rack cross member');
  for(const y of [.04,1.73])for(const x of [-.47,.47])round(.08,.07,.94,.012,x,y,0,'steel',rack,'Rack side member');
  for(const x of [-.41,.41]){
    round(.055,1.58,.04,.009,x,.88,.48,'aluminum',rack,'Front rack rail');
    for(let i=0;i<12;i++)box(.015,.018,.006,x,.18+i*.12,.505,'port',rack,'Rack mount hole');
  }
  const unitTypes=['PATCH / 24','SWITCH / LAN','HYPERVISOR','POWER / UPS'];
  for(let i=0;i<4;i++) {
    const y=.33+i*.35;
    round(.82,.285,.83,.022,0,y,-.01,i===2?'steel':'metal',rack,`${unitTypes[i]} chassis`);
    round(.9,.29,.038,.014,0,y,.445,'steel',rack,`${unitTypes[i]} faceplate`);
    round(.72,.205,.012,.008,0,y,.47,'port',rack,`${unitTypes[i]} recessed controls`);
    for(const x of [-.43,.43]){
      round(.045,.22,.025,.008,x,y,.477,'aluminum',rack,'Rack ear');
      cylinder(.012,.012,.012,x,y+.075,.495,'port',rack,10);
      cylinder(.012,.012,.012,x,y-.075,.495,'port',rack,10);
    }
    if(i<2)for(let j=0;j<8;j++){
      const x=-.33+j*.085;
      round(.069,.055,.011,.004,x,y,.482,'aluminum',rack,'RJ45 socket rim');
      box(.052,.037,.012,x,y,.491,'port',rack,'RJ45 port');
      box(.039,.007,.012,x,y-.026,.492,'aluminum',rack,'Port shield');
      const activity=ball(.008,x,y+.044,.495,(i+j)%4===0?'amber':'rgbGreen',rack);
      activity.name='Rack network activity light';activity.material=activity.material.clone();activity.material.emissive.setHex((i+j)%4===0?0xffa34d:0x35dda0);activity.material.emissiveIntensity=3;
      activity.userData.ambient='network-led';activity.userData.phase=i*1.7+j*.83;activity.userData.speed=.0024+((i*8+j)%5)*.00031;
    }
    if(i===2){
      for(let j=0;j<13;j++)box(.018,.13,.014,-.31+j*.039,y,.486,'steel',rack,'Server ventilation slot');
      round(.12,.1,.014,.009,.23,y,.484,'rubber',rack,'Drive bay');
      ball(.014,.33,y,.49,'blue',rack);
      const fan=group('Rack fan',rack);fan.position.set(-.22,y,.477);fan.userData.ambient='fan';
      for(let blade=0;blade<3;blade++){const a=blade*Math.PI*2/3;rod([0,0,0],[Math.cos(a)*.04,Math.sin(a)*.04,0],.007,'aluminum',fan);}
    }
    if(i===3){round(.24,.07,.012,.008,-.19,y,.484,'glass',rack,'UPS display');for(let j=0;j<4;j++)ball(.012,.08+j*.067,y,.49,j===0?'amber':'blue',rack);}
  }
  for(let i=0;i<3;i++){
    const x=-.31+i*.1;
    cable([[x,1.39,.49],[x+.01,1.32,.58],[x+.14,1.21,.57],[x+.25,1.16,.48]],.009,i===1?'amber':'blue',rack,'Short patch lead');
  }
  const desktopPc=group('Glass-sided RGB desktop computer');desktopPc.position.set(2.28,.06,-.38);desktopPc.rotation.y=-.18;
  for(const y of [.04,1.38])round(.82,.07,.76,.025,0,y,0,'black',desktopPc,y<.5?'Desktop computer base':'Desktop computer top');
  for(const x of [-.385,.385])for(const z of [-.345,.345])round(.05,1.31,.05,.014,x,.71,z,'steel',desktopPc,'Desktop computer frame post');
  box(.76,1.25,.045,0,.71,-.36,'dark',desktopPc,'Desktop computer rear panel');
  const pcFront=round(.7,1.22,.018,.018,0,.72,.38,'aquariumGlass',desktopPc,'Tempered glass front panel');pcFront.material=pcFront.material.clone();pcFront.material.opacity=.14;
  const pcSide=round(.018,1.22,.66,.008,-.41,.72,0,'aquariumGlass',desktopPc,'Tempered glass side panel');pcSide.material=pcSide.material.clone();pcSide.material.opacity=.18;
  round(.57,.67,.028,.018,-.05,.86,-.325,'steel',desktopPc,'Desktop computer motherboard');
  for(let i=0;i<4;i++)box(.035,.28,.018,-.24+i*.07,.93,-.303,i%2?'blue':'black',desktopPc,'Memory module');
  round(.56,.16,.28,.025,-.02,.69,-.12,'metal',desktopPc,'Desktop graphics card');box(.48,.025,.022,-.02,.73,.035,'neonPink',desktopPc,'RGB accent strip / graphics card');
  round(.66,.24,.56,.025,0,.22,-.02,'dark',desktopPc,'Desktop power supply shroud');box(.52,.025,.025,0,.34,.27,'rgbViolet',desktopPc,'RGB accent strip / power supply');
  const coolerRing=mesh(new T.TorusGeometry(.16,.022,8,32),'rgbViolet',-.08,1.09,-.285,desktopPc,'PC cooler RGB ring');coolerRing.material=coolerRing.material.clone();coolerRing.material.emissiveIntensity=2.35;coolerRing.userData.ambient='pc-rgb';coolerRing.userData.phase=1.4;
  cable([[-.18,1.07,-.28],[-.3,1.14,-.1],[-.28,.9,.11]],.016,'steel',desktopPc,'Desktop cooling tube');
  cable([[-.02,1.07,-.28],[-.12,1.18,-.08],[-.12,.9,.11]],.016,'steel',desktopPc,'Desktop cooling tube');
  for(let i=0;i<3;i++){
    const y=.43+i*.36,mat=['rgbGreen','rgbBlue','neonPink'][i];
    const ring=mesh(new T.TorusGeometry(.145,.022,8,32),mat,.17,y,.405,desktopPc,'PC intake RGB ring');ring.material=ring.material.clone();ring.material.emissiveIntensity=2.35;ring.userData.ambient='pc-rgb';ring.userData.phase=i*.9;
    const pcFan=group('PC intake fan',desktopPc);pcFan.position.set(.17,y,.407);pcFan.userData.ambient='fan';
    for(let blade=0;blade<5;blade++){const a=blade*Math.PI*2/5;rod([0,0,0],[Math.cos(a)*.115,Math.sin(a)*.115,0],.018,'aluminum',pcFan);}
    ball(.033,.17,y,.42,'black',desktopPc);
  }
  box(.025,1.16,.024,-.335,.72,.405,'rgbBlue',desktopPc,'RGB accent strip / desktop case edge');
  for(const x of [-.28,.28])round(.16,.06,.16,.02,x,-.015,0,'rubber',desktopPc,'Desktop computer foot');
  const pcPower=ball(.025,.27,1.435,.18,'rgbGreen',desktopPc);pcPower.name='Desktop computer power light';pcPower.material=pcPower.material.clone();pcPower.material.emissiveIntensity=2.35;pcPower.userData.ambient='pc-rgb';pcPower.userData.phase=2.8;
  const chair=group('Chair');chair.position.set(-.65,0,1.65);chair.rotation.y=-.42;
  cylinder(.055,.055,.77,0,.54,0,'aluminum',chair);
  cylinder(.11,.11,.13,0,.87,0,'rubber',chair);
  for(let i=0;i<5;i++){
    const a=i*Math.PI*2/5,x=Math.sin(a)*.56,z=Math.cos(a)*.56;
    rod([0,.22,0],[x,.15,z],.041,'steel',chair);
    round(.11,.065,.14,.02,x,.1,z,'rubber',chair,'Caster housing');
    const wheel=cylinder(.055,.055,.027,x,.067,z,'rubber',chair,16);wheel.rotation.z=Math.PI/2;
  }
  round(.98,.10,.84,.07,0,1.015,0,'rubber',chair,'Seat support shell');
  const seat=curvedPanel(.96,.76,.015,8,16,-.045,'fabric',0,1.09,-.015,chair,'Contoured woven seat');seat.rotation.x=-Math.PI/2;
  for(const x of [-.4,.4]){
    rod([x,.97,.16],[x,1.35,.13],.026,'steel',chair);
    round(.18,.045,.38,.02,x,1.37,-.04,'rubber',chair,'Padded armrest');
    rod([x,1.02,.23],[x*.94,1.46,.37],.022,'steel',chair);
  }
  for(const x of [-.44,.44])rod([x,1.33,.38],[x*.93,1.94,.47],.028,'steel',chair);
  const back=curvedPanel(.86,.75,.025,10,18,-.11,'fabric',0,1.66,.45,chair,'Curved mesh chair back');
  round(.8,.09,.055,.02,0,1.31,.48,'rubber',chair,'Lower back frame');
  round(.8,.07,.055,.02,0,2.02,.48,'rubber',chair,'Upper back frame');
  for(let row=0;row<9;row++)for(let col=0;col<8;col++){
    const x=-.35+col*.1,y=1.39+row*.07,z=.456-Math.sin((col+1)/9*Math.PI)*.105;
    ball(.006,x,y,z,'steel',chair);
  }
  const lamp=group('Task lamp');lamp.userData.action='task-lamp';
  cylinder(.25,.29,.045,-2.27,1.91,-1.02,'steel',lamp);
  rod([-2.27,1.94,-1.02],[-2.43,2.72,-1.04],.028,'steel',lamp);
  rod([-2.43,2.72,-1.04],[-1.88,3.19,-.77],.028,'steel',lamp);
  ball(.064,-2.43,2.72,-1.04,'aluminum',lamp);
  const shade=group('Task lamp spun shade',lamp);shade.position.set(-1.82,3.17,-.73);shade.rotation.z=.35;
  const shadeProfile=[[.07,.14],[.1,.12],[.16,.07],[.23,-.06],[.27,-.14],[.27,-.16],[.245,-.16],[.20,-.07],[.12,.08]];
  mesh(new T.LatheGeometry(shadeProfile.map(([r,y])=>new T.Vector2(r,y)),24),'steel',0,0,0,shade,'Hollow spun steel shade');
  const lampBulb=cylinder(.17,.17,.012,0,-.13,0,'cream',shade,24);lampBulb.name='Task lamp bulb';lampBulb.material=lampBulb.material.clone();lampBulb.material.emissive.setHex(0xffb45f);lampBulb.material.emissiveIntensity=2.8;
  cylinder(.035,.035,.07,0,.17,0,'aluminum',shade,16);
  const lampSwitch=ball(.045,-2.08,1.94,-.94,'amber',lamp);lampSwitch.name='Task lamp switch';lampSwitch.userData.action='task-lamp';
  const mug=group('Coffee mug');cylinder(.11,.1,.25,.78,2.00,-.65,'cream',mug);cylinder(.09,.09,.01,.78,2.132,-.65,'dark',mug);
  mesh(new T.TorusGeometry(.09,.028,8,16),'cream',.89,2.02,-.65,mug);
  const pedestalFan=group('Oscillating RGB pedestal fan');pedestalFan.position.set(5.25,.04,-.55);pedestalFan.userData.action='pedestal-fan';
  round(.92,.1,.58,.12,0,.08,0,'dark',pedestalFan,'Pedestal fan oval base');round(.64,.035,.34,.1,-.04,.145,.01,'steel',pedestalFan,'Pedestal fan base inset');
  cylinder(.055,.065,1.28,0,.79,0,'steel',pedestalFan,18);cylinder(.1,.12,.18,0,.73,0,'metal',pedestalFan,18);
  const pedestalHead=group('Pedestal fan oscillating head',pedestalFan);pedestalHead.position.set(0,1.5,0);pedestalHead.rotation.y=-Math.PI*.75;pedestalHead.userData.ambient='pedestal-fan';pedestalHead.userData.baseYaw=-Math.PI*.75;pedestalHead.userData.arc=Math.PI/4;
  cylinder(.1,.12,.22,0,-.48,0,'metal',pedestalHead,18);
  const rearRing=mesh(new T.TorusGeometry(.43,.028,10,48),'steel',0,0,-.07,pedestalHead,'Pedestal fan rear cage');rearRing.material=rearRing.material.clone();rearRing.material.side=T.DoubleSide;
  const rgbCage=mesh(new T.TorusGeometry(.46,.035,10,48),'neonCyan',0,0,.07,pedestalHead,'RGB accent strip / pedestal fan cage');rgbCage.material=rgbCage.material.clone();rgbCage.userData.ambient='fan-rgb';
  mesh(new T.TorusGeometry(.31,.014,8,40),'aluminum',0,0,.085,pedestalHead,'Pedestal fan inner guard');
  for(let i=0;i<20;i++){const a=i*Math.PI/10;rod([Math.cos(a)*.1,Math.sin(a)*.1,.08],[Math.cos(a)*.43,Math.sin(a)*.43,.08],.008,'aluminum',pedestalHead);}
  const rotor=group('Pedestal fan rotor',pedestalHead);rotor.position.z=.045;rotor.userData.ambient='fan';
  const bladeShape=new T.Shape();bladeShape.moveTo(.045,.015);bladeShape.bezierCurveTo(.14,.08,.34,.24,.37,.08);bladeShape.bezierCurveTo(.38,-.03,.2,-.13,.055,-.055);bladeShape.closePath();
  for(let i=0;i<3;i++){const blade=mesh(new T.ShapeGeometry(bladeShape,12),'black',0,0,0,rotor,'Curved pedestal fan blade');blade.material=blade.material.clone();blade.material.side=T.DoubleSide;blade.rotation.z=i*Math.PI*2/3;}
  cylinder(.115,.115,.08,0,0,.09,'metal',pedestalHead,24).rotation.x=Math.PI/2;ball(.065,0,0,.14,'rgbViolet',pedestalHead);
  const fanControl=round(.24,.1,.08,.035,.2,.17,-.02,'metal',pedestalFan,'Pedestal fan controls');fanControl.userData.action='pedestal-fan';
  const controlGlow=ball(.022,.2,.18,.025,'rgbGreen',pedestalFan);controlGlow.name='Pedestal fan status light';controlGlow.userData.ambient='fan-rgb';
  const chargingDock=group('Roomba charging dock');chargingDock.position.set(-2.77,.04,1.48);chargingDock.rotation.y=.12;
  round(.86,.1,.74,.035,0,.08,0,'dark',chargingDock,'Charging dock floor plate');
  round(.72,.72,.16,.045,0,.43,-.27,'metal',chargingDock,'Charging dock tower');
  round(.46,.24,.025,.025,0,.47,-.17,'black',chargingDock,'Charging status inset');
  for(let i=0;i<3;i++){const status=box(.09,.035,.012,-.13+i*.13,.48,-.151,i===2?'amber':'blue',chargingDock,'Charging level light');status.material=status.material.clone();status.userData.ambient='dock-light';status.userData.phase=i*.72;}
  for(const x of [-.18,.18])round(.18,.018,.12,.008,x,.145,.18,'brass',chargingDock,'Charging contact');
  const dockBeacon=ball(.045,0,.73,-.16,'rgbBlue',chargingDock);dockBeacon.name='Roomba dock beacon';dockBeacon.material=dockBeacon.material.clone();dockBeacon.userData.ambient='dock-beacon';
  const shelf=group('Books');box(1.36,.085,.35,-2.45,1.28,-2.48,'desk',shelf);
  for(let i=0;i<6;i++)box(.11,.36+(i%3)*.06,.24,-2.98+i*.18,1.5,-2.43,['cream','amber','blue'][i%3],shelf);
  const network=group('Network equipment',architecture);
  round(1.45,.22,.46,.025,-2.35,.76,-2.34,'metal',network,'Managed network switch');
  for(let i=0;i<8;i++){
    round(.094,.07,.012,.004,-2.73+i*.11,.76,-2.105,'aluminum',network,'Switch port shield');
    box(.073,.05,.014,-2.73+i*.11,.76,-2.096,'port',network,'Switch Ethernet port');
    if(i%3!==1)ball(.012,-2.73+i*.11,.84,-2.095,i%4===0?'amber':'blue',network);
  }
  const backpack=group('Campus backpack');backpack.position.set(-2.64,.52,.6);backpack.rotation.z=-.08;
  round(.7,.88,.36,.1,0,0,0,'green',backpack,'Backpack');round(.52,.36,.39,.08,0,-.12,.03,'trim',backpack,'Front pocket');
  rod([-.24,.37,0],[0,.65,0],.035,'black',backpack);rod([.24,.37,0],[0,.65,0],.035,'black',backpack);
  const headphones=group('Headphones');
  const band=mesh(new T.TorusGeometry(.28,.035,8,24,Math.PI),'black',1.83,1.97,.15,headphones);band.rotation.x=Math.PI/2;
  for(const x of [1.56,2.1])round(.14,.21,.12,.035,x,1.95,.15,'metal',headphones);
  const resume=group('Resume and certifications',world,'resume');resume.position.set(-2.95,3.92,-3.02);resume.rotation.y=.02;
  box(1.9,1.5,.065,0,0,0,'metal',resume,'Security+ certificate frame');
  certificate(1.65,1.28,0,0,.04,resume);
  for(const [w,h,x,y] of [[1.76,.045,0,.68],[1.76,.045,0,-.68],[.045,1.36,-.88,0],[.045,1.36,.88,0]])box(w,h,.035,x,y,.065,'brass',resume,'Certificate inner trim');
  const archive=group('Reel-to-reel source archive',world,'github');archive.position.set(-5.36,1.86,-3.0);
  round(2.05,1.34,.16,.055,0,0,0,'metal',archive,'Source archive wall enclosure');
  round(1.88,1.17,.04,.035,0,.02,.105,'black',archive,'Archive recessed face');
  for(const [x,phase] of [[-.49,0],[.49,Math.PI]]){
    const reel=group('Archive tape reel',archive);reel.position.set(x,.23,.145);reel.userData.ambient='archive-reel';reel.userData.phase=phase;
    mesh(new T.TorusGeometry(.31,.035,10,36),'aluminum',0,0,0,reel,'Archive reel rim');
    cylinder(.075,.075,.035,0,0,.005,'steel',reel,20).rotation.x=Math.PI/2;
    for(let spoke=0;spoke<6;spoke++){const a=spoke*Math.PI/3;rod([0,0,.005],[Math.cos(a)*.25,Math.sin(a)*.25,.005],.018,'steel',reel);}
  }
  cable([[-.49,-.06,.15],[-.28,-.16,.17],[0,-.19,.18],[.28,-.16,.17],[.49,-.06,.15]],.012,'amber',archive,'Visible archive tape path');
  round(1.08,.3,.035,.025,0,-.4,.14,'steel',archive,'Archive meter bank');
  for(const x of [-.34,0,.34]){
    round(.24,.18,.012,.012,x,-.4,.165,'label',archive,'Archive meter face');
    const needle=group('Archive meter needle',archive);needle.position.set(x,-.46,.18);needle.userData.ambient='archive-needle';needle.userData.phase=(x+.34)*3;
    rod([0,0,0],[0,.1,0],.01,'amber',needle);
  }
  for(let i=0;i<3;i++)round(.42,.09,.025,.012,-.55+i*.55,-.62,.14,i===0?'amber':'aluminum',archive,'Project archive cartridge');
  const phone=group('Wall contact intercom',world,'contact');phone.position.set(6.22,3.48,-3.0);
  round(.62,1.02,.11,.055,0,0,0,'metal',phone,'Contact wall cradle');
  round(.46,.82,.08,.05,0,.01,.075,'black',phone,'Contact handset');
  round(.31,.43,.018,.025,0,.05,.125,'screen',phone,'Contact screen');
  for(let i=0;i<3;i++)box(.2-i*.025,.015,.008,0,.11-i*.09,.139,'cream',phone,'Contact destination line');
  for(const y of [-.29,.36])for(const x of [-.1,0,.1])ball(.018,x,y,.139,'port',phone);
  const contactPulse=mesh(new T.TorusGeometry(.245,.018,8,32),'neonCyan',0,.02,.145,phone,'Contact notification ring');contactPulse.userData.ambient='contact-pulse';
  for(const [x,z] of [[-2.95,-1.78],[-2.7,-1.92],[-2.45,-1.78]]){cylinder(.065,.065,.22,x,1.98,z,'cream',world);ball(.052,x,2.105,z,'blue',world);}
  const forensicBench=group('Forensic examination bench');forensicBench.position.set(-6.34,.06,.02);forensicBench.rotation.y=Math.PI/2;
  round(2.45,.12,1.12,.035,0,1.18,0,'laminate',forensicBench,'Forensic side bench');
  box(2.28,.022,.03,0,1.105,.55,'rgbBlue',forensicBench,'RGB accent strip / forensic bench');
  for(const x of [-1.05,1.05])for(const z of [-.42,.42])rod([x,.05,z],[x,1.13,z],.035,'steel',forensicBench);
  box(2.2,.06,.12,0,.62,-.45,'steel',forensicBench,'Forensic bench brace');
  const evidenceLocker=group('Integrated evidence locker',forensicBench);evidenceLocker.position.set(.72,.08,-.36);
  round(.74,.92,.42,.035,0,.48,0,'metal',evidenceLocker,'Evidence locker cabinet');
  for(const y of [.24,.5,.76]){round(.64,.22,.035,.015,0,y,.225,'steel',evidenceLocker,'Evidence locker drawer');round(.18,.018,.025,.008,0,y,.25,'aluminum',evidenceLocker,'Evidence drawer pull');}
  const evidenceRail=group('Wall evidence tool rail');evidenceRail.position.set(-6.94,2.52,.18);evidenceRail.rotation.y=Math.PI/2;
  round(1.88,.82,.06,.025,0,0,0,'trim',evidenceRail,'Evidence rail backing');
  for(let col=0;col<9;col++)for(let row=0;row<4;row++)ball(.011,-.78+col*.195,-.28+row*.18,.042,'aluminum',evidenceRail);
  for(const x of [-.55,0,.55]){round(.34,.42,.035,.02,x,.02,.075,'label',evidenceRail,'Sealed evidence pouch');box(.22,.012,.008,x,.08,.099,'port',evidenceRail,'Evidence pouch label');}
  rod([-.72,-.42,.09],[.72,-.42,.09],.025,'steel',evidenceRail);
  const deskFan=group('Desk fan');deskFan.position.set(2.8,1.98,-.82);
  cylinder(.18,.22,.04,0,0,0,'metal',deskFan);rod([0,.02,0],[0,.42,0],.025,'metal',deskFan);
  const fanHead=group('Desk fan rotor',deskFan);fanHead.position.set(0,.55,0);fanHead.userData.ambient='fan';
  const ring=mesh(new T.TorusGeometry(.25,.025,8,24),'metal',0,0,0,fanHead);ring.rotation.x=Math.PI/2;
  for(let blade=0;blade<4;blade++){const a=blade*Math.PI/2;rod([0,0,.02],[Math.cos(a)*.21,Math.sin(a)*.21,.02],.026,'cream',fanHead);}
  const bottle=group('Water bottle');cylinder(.075,.085,.42,-1.35,2.1,-1.05,'blue',bottle);cylinder(.06,.06,.05,-1.35,2.335,-1.05,'metal',bottle);
  const lounge=group('Student lounge corner');lounge.position.set(-6.25,.08,3.15);lounge.rotation.y=Math.PI/2;lounge.scale.set(1.18,1.08,1.08);
  round(2.05,.24,.92,.08,0,.34,0,'rubber',lounge,'Lounge sofa base');
  for(const x of [-.63,0,.63]){
    round(.6,.16,.71,.06,x,.54,.03,'green',lounge,'Upholstered seat cushion');
    const cushion=round(.6,.58,.19,.07,x,.91,-.32,'green',lounge,'Separate back cushion');cushion.rotation.x=-.08;
    cable([[x-.29,.55,.38],[x,.56,.39],[x+.29,.55,.38]],.007,'fabric',lounge,'Cushion piping');
  }
  for(const x of [-.92,.92]){
    round(.2,.52,.88,.065,x,.62,0,'green',lounge,'Padded sofa arm');
    round(.1,.13,.1,.02,x,.17,-.3,'steel',lounge,'Sofa foot');
    round(.1,.13,.1,.02,x,.17,.3,'steel',lounge,'Sofa foot');
  }
  const sideTable=group('Lounge side table');sideTable.position.set(-6.22,.08,4.78);sideTable.userData.action='lava-lamp';
  round(.74,.08,.65,.03,0,.56,0,'desk',sideTable);for(const x of [-.28,.28])for(const z of [-.23,.23])rod([x,.08,z],[x,.54,z],.025,'metal',sideTable);
  cylinder(.17,.21,.035,0,.63,0,'metal',sideTable);const lava=cylinder(.12,.18,.52,0,.91,0,'amber',sideTable,18);lava.material=lava.material.clone();lava.material.transparent=true;lava.material.opacity=.52;lava.material.depthWrite=false;lava.material.emissive.setHex(0xff6a24);lava.material.emissiveIntensity=2.3;lava.userData.ambient='lava-glass';ball(.065,0,1.2,0,'brass',sideTable);
  const lavaLed=mesh(new T.TorusGeometry(.18,.032,8,28),'neonPink',0,.65,0,sideTable,'Lava lamp LED ring');lavaLed.rotation.x=Math.PI/2;lavaLed.material=lavaLed.material.clone();lavaLed.material.emissiveIntensity=6.4;lavaLed.userData.ambient='lava-led';
  for(let i=0;i<4;i++){const bubble=ball(.026+(i%2)*.012,0,.68+i*.08,0,i%2?'amber':'cream',sideTable);bubble.name='Lava lamp bubble';bubble.material=bubble.material.clone();bubble.material.emissive.setHex(i%2?0xff6a24:0xffc36b);bubble.material.emissiveIntensity=1.8;bubble.userData.ambient='lava-bubble';bubble.userData.phase=i*.86;}
  const library=group('Technical library');library.position.set(5.85,.08,-2.55);library.rotation.y=-.16;library.userData.action='shelf-lights';
  box(2.05,2.75,.25,0,1.38,0,'dark',library,'Library back');
  for(const y of [.16,.72,1.28,1.84,2.4,2.72])box(2.18,.09,.52,0,y,.05,'desk',library,'Library shelf');
  const bookColors=['bookPink','bookCyan','bookViolet','bookGreen','amber','cream'];
  for(let row=0;row<4;row++)for(let i=0;i<9;i++){const h=.31+(i%3)*.055;box(.13,h,.36,-.83+i*.2,.25+row*.56+h/2,.11,bookColors[(i+row*2)%bookColors.length],library,'Forensics and security book');}
  for(const [y,mat] of [[.68,'rgbBlue'],[1.8,'blue'],[2.36,'amber']])box(1.95,.018,.028,0,y,.31,mat,library,'RGB accent strip / library shelf');
  const shelfSwitch=round(.18,.12,.05,.018,.82,.48,.31,'metal',library,'Library light switch');shelfSwitch.userData.action='shelf-lights';
  const aquarium=group('Living planted aquarium');aquarium.position.set(6.48,.04,2.2);aquarium.rotation.y=-Math.PI/2;aquarium.userData.action='aquarium-lights';
  round(2.45,.9,1.02,.045,0,.47,0,'dark',aquarium,'Aquarium cabinet');
  for(const x of [-.58,.58])round(.98,.7,.045,.022,x,.48,.505,'veneer',aquarium,'Aquarium cabinet door');
  for(const x of [-.78,0,.78])round(.24,.035,.035,.012,x,.48,.535,'brass',aquarium,'Cabinet handle');
  round(2.56,.1,1.08,.025,0,.96,0,'steel',aquarium,'Aquarium lower frame');round(2.56,.11,1.08,.025,0,2.48,0,'steel',aquarium,'Aquarium hood');
  const tankW=2.4,tankH=1.46,tankD=.92,tankMid=1.73;
  const tankBackground=box(tankW-.08,tankH-.06,.018,0,tankMid,-.445,'water',aquarium,'Deep blue aquarium background');tankBackground.material=tankBackground.material.clone();tankBackground.material.opacity=.46;tankBackground.material.emissiveIntensity=.42;
  box(tankW,.03,tankD,0,1.07,0,'gravel',aquarium,'Aquarium gravel bed');
  for(let i=0;i<64;i++){const a=i*.83,r=.09+(i%4)*.012,x=-1.05+((i*37)%100)/100*2.1,z=-.38+((i*61)%100)/100*.76;const pebble=mesh(cachedGeometry(`pebble:${i%4}`,()=>new T.DodecahedronGeometry(r,1)),'gravel',x,1.08+(i%3)*.018,z,aquarium,'Rounded aquarium pebble');pebble.scale.set(1.2,.58,.9);pebble.rotation.set(a*.3,a,a*.17);}
  for(const [x,z,s] of [[-.72,-.12,.24],[.64,.16,.3],[.28,-.25,.18]]){const rock=mesh(new T.DodecahedronGeometry(s,2),'steel',x,1.18,z,aquarium,'Aquarium river rock');rock.scale.set(1.25,.72,.9);rock.rotation.set(.2+x,.5+z,.12);}
  cable([[-.72,1.13,.12],[-.42,1.34,.02],[-.08,1.42,-.08],[.25,1.59,-.02],[.52,1.66,.08]],.055,'driftwood',aquarium,'Natural aquarium driftwood');
  cable([[-.1,1.18,-.18],[.02,1.43,-.12],[.2,1.62,-.18]],.035,'driftwood',aquarium,'Driftwood branch');
  for(const [x,z,hue,height] of [[-.95,-.25,'leaf',.68],[-.54,.28,'green',.84],[.83,-.22,'leaf',.72],[.48,.31,'green',.58],[-.12,.3,'leaf',.52]]){
    const plant=group('Living aquarium plant',aquarium);plant.position.set(x,1.08,z);
    for(let stem=0;stem<5;stem++){const lean=(stem-2)*.055;neonTube([[0,0,0],[lean*.6,height*.45,0],[lean,height+(stem%2)*.08,0]],hue,plant,'Curved aquatic stem',false,.012);for(let leafIndex=0;leafIndex<3;leafIndex++){const leaf=mesh(new T.SphereGeometry(.09,10,7),hue,lean*(leafIndex/3),height*(.32+leafIndex*.21),0,plant,'Aquatic leaf');leaf.scale.set(.38,1.2,.18);leaf.rotation.z=lean*6+(leafIndex%2?.45:-.45);}}
  }
  const fishSchool=group('Moving aquarium fish',aquarium);
  const fishOne=aquariumFish({name:'Blue tetra',color:0x3ebfe8,length:.58,height:.23,phase:.2,speed:1.0,radius:.78,y:1.78,parent:fishSchool});fishOne.position.set(-.45,1.72,.12);
  const fishTwo=aquariumFish({name:'Golden barb',color:0xf3a449,length:.66,height:.28,phase:2.4,speed:.76,radius:.62,y:2.04,parent:fishSchool});fishTwo.position.set(.42,1.96,-.16);fishTwo.scale.set(.92,.92,.92);
  const fishThree=aquariumFish({name:'Red rasbora',color:0xef5968,length:.48,height:.2,phase:4.3,speed:1.18,radius:.72,y:1.48,parent:fishSchool});fishThree.position.set(.12,1.46,.2);fishThree.scale.set(.82,.82,.82);
  const bubbles=group('Aquarium bubble column',aquarium);bubbles.position.set(.92,1.12,-.18);
  for(let i=0;i<10;i++){const bubble=ball(.018+(i%3)*.006,(i%2)*.035, i*.13,Math.sin(i)*.025,'aquariumGlass',bubbles);bubble.name='Aquarium bubble';bubble.userData.ambient='aquarium-bubble';bubble.userData.phase=i*.73;}
  const waterSurface=box(tankW-.12,.018,tankD-.12,0,2.38,0,'water',aquarium,'Rippling water surface');waterSurface.material=waterSurface.material.clone();waterSurface.material.opacity=.28;waterSurface.userData.ambient='aquarium-water';waterSurface.userData.baseY=waterSurface.position.y;
  box(tankW-.18,.025,.045,0,2.4,-.38,'neonCyan',aquarium,'RGB accent strip / aquarium hood');
  box(tankW-.18,.025,.045,0,1.04,.47,'neonCyan',aquarium,'RGB accent strip / aquarium lower frame');
  for(const x of [-1.14,1.14])box(.025,tankH-.15,.045,x,tankMid,.47,'neonCyan',aquarium,'RGB accent strip / aquarium vertical edge');
  box(2.18,.025,.045,0,.08,.49,'neonCyan',aquarium,'RGB accent strip / aquarium cabinet wash');
  const aquariumSwitch=round(.2,.12,.045,.015,.91,.72,.53,'metal',aquarium,'Aquarium LED switch');aquariumSwitch.userData.action='aquarium-lights';
  for(const [w,h,d,x,y,z] of [[tankW,tankH,.025,0,tankMid,.46],[tankW,tankH,.025,0,tankMid,-.46],[.025,tankH,tankD,-1.2,tankMid,0],[.025,tankH,tankD,1.2,tankMid,0]])box(w,h,d,x,y,z,'aquariumGlass',aquarium,'Aquarium glass panel');
  for(const x of [-1.18,1.18])for(const y of [1.04,2.42])for(const z of [-.44,.44])ball(.035,x,y,z,'steel',aquarium);
  const ceiling=group('Ceiling task lights');
  for(const [x,z] of [[-5.75,.35],[3.9,.2]]){rod([x,4.55,z],[x,3.8,z],.025,'black',ceiling);const shade=cylinder(.12,.34,.32,x,3.68,z,'cream',ceiling,24);shade.material.emissive.setHex(0x806849);shade.material.emissiveIntensity=.12;}
  const roomba=group('Roomba floor patrol');roomba.position.set(0,.1,3.55);roomba.userData.ambient='roomba';
  cylinder(.34,.36,.15,0,.08,0,'black',roomba,32);cylinder(.31,.31,.035,0,.17,0,'metal',roomba,32);
  const bumper=mesh(new T.TorusGeometry(.34,.025,8,32),'dark',0,.12,0,roomba,'Roomba bumper');bumper.rotation.x=Math.PI/2;
  cylinder(.065,.075,.06,.12,.22,-.08,'dark',roomba,20);ball(.025,-.14,.205,-.24,'rgbBlue',roomba);
  const cat=group('Lab cat');cat.position.set(0,.02,5.25);cat.userData.ambient='lab-cat';
  const catBody=ball(.36,0,.37,0,'catFur',cat);catBody.scale.set(1.35,.8,.72);catBody.name='Cat body';
  const catChest=ball(.24,0,.43,-.36,'catFur',cat);catChest.scale.set(.82,1.05,.9);catChest.name='Cat chest';
  const catHead=ball(.24,0,.62,-.52,'catFur',cat);catHead.scale.set(1,.92,.9);catHead.name='Cat head';
  for(const x of [-.13,.13]){
    const ear=mesh(cachedGeometry('cat-ear',()=>new T.ConeGeometry(.09,.19,4)),'catFur',x,.84,-.53,cat,'Cat ear');ear.rotation.y=Math.PI/4;
  }
  for(const x of [-.2,.2])for(const z of [-.18,.17]){
    const leg=group(`Cat ${z<0?'front':'rear'} ${x<0?'left':'right'} leg`,cat);leg.position.set(x,.3,z);leg.userData.ambient='lab-cat-leg';leg.userData.gaitPhase=(x<0)===(z<0)?0:Math.PI;
    rod([0,0,0],[0,-.21,z<0?-.035:.025],.035,'catFur',leg);const paw=ball(.05,0,-.23,z<0?-.055:.04,'catFur',leg);paw.scale.set(.78,.52,1.2);
  }
  ball(.025,-.08,.64,-.72,'amber',cat);ball(.025,.08,.64,-.72,'amber',cat);
  const catTail=group('Cat tail',cat);catTail.position.set(0,.42,.31);catTail.userData.ambient='lab-cat-tail';
  cable([[0,0,0],[.16,.1,.18],[.32,.25,.23],[.25,.43,.12]],.04,'catFur',catTail,'Curved cat tail');
  return world;
}
