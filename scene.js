const canvas = document.querySelector('#three-scene');
if (canvas && !matchMedia('(max-width:760px), (pointer:coarse) and (max-width:1024px)').matches) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const content = {
    projects:{index:'01',label:'FORENSIC WORKSTATION',title:'Projects built for real practice.',summary:'The main display opens Tate’s selected security and incident-response work.',target:[-.43,2.7,-.82],position:[2.9,3.35,5.0],body:`<figure class="panel-proof"><img src="assets/tabletopforge-generator.png" width="1440" height="900" loading="lazy" decoding="async" alt="TabletopForge exercise generator showing organization, industry, scenario, and scope inputs"><figcaption>TabletopForge generator · captured from the working local project</figcaption></figure><h3>Selected work</h3><a class="panel-link" href="case-tabletopforge.html"><span><strong>TabletopForge</strong><br>Incident tabletop exercise builder</span><span>Open ↗</span></a><div class="panel-link"><span><strong>NIST CFReDS Hacking Case</strong><br>Disk, registry, and network forensics</span><span>In progress</span></div><a class="panel-link" href="case-grc-risk-assessment.html"><span><strong>GRC Risk Assessment</strong><br>Finding, ownership, and remediation</span><span>Open ↗</span></a><a class="panel-link" href="https://github.com/TateWilson1/Security-Toolkit"><span><strong>Security Toolkit</strong><br>Hardening notes, scripts, and templates</span><span>GitHub ↗</span></a>`},
    forensics:{index:'02',label:'FORENSIC CASE 01',title:'Evidence before conclusions.',summary:'The wall-side evidence bench represents the forensic workflow: preserve, verify, examine, correlate, and document.',target:[-6.24,1.4,.02],position:[-3.35,2.65,2.7],body:`<h3>NIST CFReDS Hacking Case</h3><p>Tate investigated a forensic disk image, verified evidence integrity, reconstructed Windows and network activity, and documented findings with supporting evidence.</p><div class="fact"><span>TOOLS</span><strong>FTK Imager · Autopsy · Registry Explorer · Wireshark</strong></div><div class="fact"><span>WORKFLOW</span><strong>Acquire → verify → examine → correlate → report</strong></div><div class="fact"><span>STATUS</span><strong>Case-study page in progress</strong></div><h3>Related field notes</h3><a class="panel-link" href="writeup-grc-risk-lessons.html"><span>Risk, context, and useful evidence</span><span>Read ↗</span></a>`},
    ccdc:{index:'03',label:'CCDC LAB',title:'First in Kentucky. Built in weekly practice.',summary:'The rack holds Tate’s competition infrastructure, Proxmox lab work, and team leadership.',target:[4.0,1.0,-.85],position:[2.25,2.55,3.65],body:`<div class="fact"><span>ROLE</span><strong>President &amp; team captain</strong></div><div class="fact"><span>RESULT</span><strong>1st place · Kentucky</strong></div><div class="fact"><span>PRACTICE</span><strong>15+ members · weekly sessions</strong></div><h3>Inside the rack</h3><ul><li>Windows and Linux service ownership</li><li>Active Directory and Proxmox lab infrastructure</li><li>Firewall defense and persistence detection</li><li>Incident response under competition pressure</li></ul><a class="panel-link" href="writeup-ccdc-lessons.html"><span>What CCDC taught me</span><span>Read ↗</span></a>`},
    internship:{index:'04',label:'PELYCON // INTERNSHIP',title:'From findings to practical guidance.',summary:'The laptop opens Tate’s cybersecurity internship work inside a managed service provider environment.',target:[1.66,2.35,-.68],position:[4.0,3.05,4.25],body:`<div class="fact"><span>COMPANY</span><strong>Pelycon Technologies</strong></div><div class="fact"><span>ROLE</span><strong>Cybersecurity intern</strong></div><div class="fact"><span>DATES</span><strong>May–August 2026</strong></div><h3>Selected work</h3><ul><li>Reviewed Microsoft 365 access, enterprise apps, and tenant configuration for identity risks.</li><li>Supported endpoint security, client tickets, RMM workflows, and daily security operations.</li><li>Turned security gaps into scored cyber-maturity findings and remediation guidance.</li></ul><a class="panel-link" href="writeup-m365-entra-review.html"><span>M365 / Entra review notes</span><span>Read ↗</span></a>`},
    education:{index:'05',label:'FIELD NOTEBOOK',title:'Learning how systems leave evidence.',summary:'The notebook connects formal study with the habits behind Tate’s technical work.',target:[-4.7,.96,3.58],position:[-2.1,2.35,5.75],body:`<div class="fact"><span>DEGREE</span><strong>B.S. Digital Forensics &amp; Cybersecurity</strong></div><div class="fact"><span>SCHOOL</span><strong>Eastern Kentucky University</strong></div><div class="fact"><span>MINOR</span><strong>Cybersecurity &amp; Intelligence</strong></div><div class="fact"><span>EXPECTED</span><strong>December 2026</strong></div><div class="fact"><span>GPA</span><strong>3.60</strong></div><h3>Credentials</h3><p>CompTIA Security+ · ISC2 Certified in Cybersecurity</p>`},
    resume:{index:'06',label:'SECURITY+ CREDENTIAL',title:'Security+ and résumé.',summary:'The framed Security+ certificate anchors Tate’s credential wall and opens the fastest professional overview.',target:[-2.35,3.92,-3.02],position:[-.25,4.35,2.75],body:`<h3>Credential file</h3><div class="fact"><span>CERTIFICATION</span><strong>CompTIA Security+</strong></div><div class="fact"><span>FOCUS</span><strong>Digital forensics · cybersecurity</strong></div><div class="fact"><span>EDUCATION</span><strong>Eastern Kentucky University</strong></div><div class="fact"><span>EXPERIENCE</span><strong>Pelycon Technologies · CCDC leadership</strong></div><a class="panel-link" href="assets/Tate_Wilson_Resume.pdf"><span>Open résumé PDF</span><span>Open ↗</span></a><a class="panel-link" href="assets/Tate_Wilson_Resume.docx"><span>Download Word résumé</span><span>Download ↗</span></a>`},
    github:{index:'07',label:'SOURCE ARCHIVE',title:'Public work and working notes.',summary:'The reel-to-reel archive beneath the DFIR sign opens Tate’s repositories, tools, and source history.',target:[-5.36,1.86,-2.88],position:[-3.45,2.65,.1],body:`<h3>Repositories</h3><a class="panel-link" href="https://github.com/TateWilson1/TabletopForge"><span>TabletopForge</span><span>GitHub ↗</span></a><a class="panel-link" href="https://github.com/TateWilson1/Security-Toolkit"><span>Security Toolkit</span><span>GitHub ↗</span></a><a class="panel-link" href="https://github.com/TateWilson1/testing_password_strength_with_GUI"><span>Password Strength GUI</span><span>GitHub ↗</span></a><a class="panel-link" href="https://github.com/TateWilson1"><span>Complete GitHub profile</span><span>Visit ↗</span></a>`},
    contact:{index:'08',label:'SECURE CONTACT',title:'Start a conversation.',summary:'The wall intercom keeps contact simple: direct destinations, no simulated messaging interface.',target:[6.22,3.48,-2.88],position:[6.12,3.55,.35],body:`<h3>Contact</h3><a class="panel-link" href="mailto:tate.wilson2022@gmail.com"><span>Email Tate</span><span>Send ↗</span></a><a class="panel-link" href="https://www.linkedin.com/in/tate-wilson-649004320/"><span>LinkedIn</span><span>Visit ↗</span></a><a class="panel-link" href="https://github.com/TateWilson1"><span>GitHub</span><span>Visit ↗</span></a><p>For a conventional overview with every destination in document order, use the classic portfolio.</p><a class="panel-link" href="classic.html"><span>Classic portfolio</span><span>Open →</span></a>`},
  };

  const loading = document.querySelector('[data-loading]');
  const panel = document.querySelector('[data-content-overlay]');
  const hoverLabel = document.querySelector('[data-hover-label]');
  const cameraStatus = document.querySelector('[data-camera-status]');
  const panelObject = document.querySelector('[data-panel-object]');
  const bootStarted=performance.now();
  const loadingFailsafe=setTimeout(()=>{
    loading?.classList.add('is-done');
    document.body.classList.add('scene-fallback-active');
  },4000);
  let renderer;
  try {
    const [T,{buildWorkstation}] = await Promise.all([import('./assets/vendor/three.module.min.js?v=20260923.2'),import('./scene-model.mjs?v=20260923.5')]);
    const forcedQuality=new URLSearchParams(location.search).get('quality');
    const lowPower=forcedQuality==='low'||forcedQuality!=='high'&&((navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4));
    document.body.dataset.renderProfile=lowPower?'reduced':'full';
    renderer = new T.WebGLRenderer({canvas,antialias:!lowPower,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,lowPower?1:1.25));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.shadowMap.autoUpdate=false;let shadowWarmup=4;
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.07;
    const scene=new T.Scene();scene.background=new T.Color(0x020305);scene.fog=new T.Fog(0x020305,13,29);
    const camera=new T.PerspectiveCamera(47,innerWidth/innerHeight,.1,80);
    const overviewTarget=new T.Vector3(0,1.72,-.28);
    const introPosition=new T.Vector3(-.43,2.88,.76);
    const introTarget=new T.Vector3(-.43,2.88,-.78);
    const orbit={theta:.03,phi:1.32,radius:14};
    const orbitPosition=()=>new T.Vector3(
      overviewTarget.x+orbit.radius*Math.sin(orbit.phi)*Math.sin(orbit.theta),
      overviewTarget.y+orbit.radius*Math.cos(orbit.phi),
      overviewTarget.z+orbit.radius*Math.sin(orbit.phi)*Math.cos(orbit.theta)
    );
    let currentPosition=(reducedMotion.matches?orbitPosition():introPosition.clone()),currentTarget=(reducedMotion.matches?overviewTarget.clone():introTarget.clone());
    let move={fromPos:currentPosition.clone(),fromTarget:currentTarget.clone(),toPos:currentPosition.clone(),toTarget:currentTarget.clone(),start:0,duration:1};
    camera.position.copy(currentPosition);camera.lookAt(currentTarget);
    const model=buildWorkstation(T);scene.add(model);
    const ambient=new T.AmbientLight(0x202b40,.095);scene.add(ambient);
    const moon=new T.DirectionalLight(0x88a9e8,.16);moon.position.set(3,8,2);moon.castShadow=true;moon.shadow.mapSize.set(lowPower?512:1024,lowPower?512:1024);moon.shadow.normalBias=.025;moon.shadow.camera.left=-8;moon.shadow.camera.right=8;moon.shadow.camera.top=8;moon.shadow.camera.bottom=-8;scene.add(moon);
    const taskLight=new T.SpotLight(0xffb86f,48,6.2,.62,.62,1.55);taskLight.position.set(-1.82,3.12,-.7);taskLight.target.position.set(-.75,1.78,.12);taskLight.castShadow=true;taskLight.shadow.mapSize.set(lowPower?512:1024,lowPower?512:1024);model.add(taskLight,taskLight.target);
    const screenLight=new T.PointLight(0x57d7ff,7.2,4.8,2.15);screenLight.position.set(-.4,2.95,.2);model.add(screenLight);
    const evidenceLight=new T.SpotLight(0xffa85f,26,5.8,.58,.76,1.65);evidenceLight.position.set(-5.7,4.05,1.45);evidenceLight.target.position.set(-6.15,1.1,.1);evidenceLight.castShadow=true;evidenceLight.shadow.mapSize.set(512,512);scene.add(evidenceLight,evidenceLight.target);
    const loungeLight=new T.PointLight(0xffa052,10.2,5.1,2.15);loungeLight.position.set(-6.45,1.55,3.55);scene.add(loungeLight);
    const rackLight=new T.SpotLight(0x94d8ed,14.8,5.8,.56,.76,1.7);rackLight.position.set(5.6,4.1,.3);rackLight.target.position.set(5.0,.9,-1.35);scene.add(rackLight,rackLight.target);
    const credentialLight=new T.SpotLight(0xffc779,10.5,5.2,.38,.86,1.9);credentialLight.position.set(-2.2,4.6,1.0);credentialLight.target.position.set(-2.9,3.5,-3);scene.add(credentialLight,credentialLight.target);
    const contactLight=new T.PointLight(0x51d5ff,4.2,3.1,2.2);contactLight.position.set(6.22,3.48,-2.35);scene.add(contactLight);
    const leftWallFill=new T.PointLight(0x5b7690,.24,4.8,2.25);leftWallFill.position.set(-5.9,2.6,3.9);scene.add(leftWallFill);
    const rightWallFill=new T.PointLight(0x587188,.22,4.8,2.25);rightWallFill.position.set(5.9,2.7,3.7);scene.add(rightWallFill);
    const rgbLeft=new T.PointLight(0x22baff,1.5,3.25,2.25);rgbLeft.position.set(-2.05,1.3,.58);scene.add(rgbLeft);
    const rgbRight=new T.PointLight(0x22baff,1.5,3.25,2.25);rgbRight.position.set(2.05,1.3,.58);scene.add(rgbRight);
    const shelfLights=[.68,1.8,2.36].map((y,index)=>{const light=new T.PointLight([0x35cfff,0x4daed4,0xedb38b][index],1.8,2.3,2.2);light.position.set(5.55,y+.35,-2.1);scene.add(light);return light;});
    const dfirNeonLight=new T.PointLight(0x55eaff,7.2,4.6,2.05);dfirNeonLight.position.set(-5.35,3.55,-2.18);scene.add(dfirNeonLight);
    const shieldNeonLight=new T.PointLight(0xff4f9d,8.2,5,2.05);shieldNeonLight.position.set(4.42,3.48,-2.05);scene.add(shieldNeonLight);
    const aquariumLight=new T.PointLight(0x65d9ee,9.6,4.4,2.0);aquariumLight.position.set(6.02,2.5,3.62);scene.add(aquariumLight);
    let workLights=false;

    // A small, local bloom chain keeps emissive practicals luminous without washing the
    // black room shell. It runs at one-third resolution and composites only bright pixels.
    const postScene=new T.Scene(),postCamera=new T.OrthographicCamera(-1,1,1,-1,0,1);
    const postQuad=new T.Mesh(new T.PlaneGeometry(2,2));postScene.add(postQuad);
    const makeBloomTarget=()=>new T.WebGLRenderTarget(1,1,{minFilter:T.LinearFilter,magFilter:T.LinearFilter,format:T.RGBAFormat,depthBuffer:false,stencilBuffer:false});
    const bloomSource=makeBloomTarget(),bloomA=makeBloomTarget(),bloomB=makeBloomTarget();
    const vertexShader='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}';
    const brightMaterial=new T.ShaderMaterial({toneMapped:false,depthTest:false,depthWrite:false,uniforms:{inputTexture:{value:null},threshold:{value:.56}},vertexShader,fragmentShader:'varying vec2 vUv;uniform sampler2D inputTexture;uniform float threshold;void main(){vec3 c=texture2D(inputTexture,vUv).rgb;float l=max(max(c.r,c.g),c.b);float contribution=smoothstep(threshold,threshold+.24,l);gl_FragColor=vec4(c*contribution,1.0);}'});
    const blurMaterial=new T.ShaderMaterial({toneMapped:false,depthTest:false,depthWrite:false,uniforms:{inputTexture:{value:null},direction:{value:new T.Vector2(1,0)},texel:{value:new T.Vector2(1,1)}},vertexShader,fragmentShader:'varying vec2 vUv;uniform sampler2D inputTexture;uniform vec2 direction;uniform vec2 texel;void main(){vec2 d=direction*texel;vec3 c=texture2D(inputTexture,vUv).rgb*.227027;c+=texture2D(inputTexture,vUv+d*1.384615).rgb*.316216;c+=texture2D(inputTexture,vUv-d*1.384615).rgb*.316216;c+=texture2D(inputTexture,vUv+d*3.230769).rgb*.070270;c+=texture2D(inputTexture,vUv-d*3.230769).rgb*.070270;gl_FragColor=vec4(c,1.0);}'});
    const compositeMaterial=new T.ShaderMaterial({toneMapped:false,depthTest:false,depthWrite:false,transparent:true,blending:T.AdditiveBlending,uniforms:{inputTexture:{value:bloomA.texture},intensity:{value:.58}},vertexShader,fragmentShader:'varying vec2 vUv;uniform sampler2D inputTexture;uniform float intensity;void main(){vec3 bloom=texture2D(inputTexture,vUv).rgb*intensity;gl_FragColor=vec4(bloom,1.0);}'});
    const resizeBloom=()=>{const scale=Math.min(devicePixelRatio||1,lowPower?1:1.25)*(lowPower?.26:.34),w=Math.max(1,Math.floor(innerWidth*scale)),h=Math.max(1,Math.floor(innerHeight*scale));for(const target of [bloomSource,bloomA,bloomB])target.setSize(w,h);blurMaterial.uniforms.texel.value.set(1/w,1/h);};
    const renderFrame=()=>{
      renderer.setRenderTarget(bloomSource);renderer.clear();renderer.render(scene,camera);
      postQuad.material=brightMaterial;brightMaterial.uniforms.inputTexture.value=bloomSource.texture;renderer.setRenderTarget(bloomA);renderer.clear();renderer.render(postScene,postCamera);
      postQuad.material=blurMaterial;blurMaterial.uniforms.inputTexture.value=bloomA.texture;blurMaterial.uniforms.direction.value.set(1,0);renderer.setRenderTarget(bloomB);renderer.clear();renderer.render(postScene,postCamera);
      blurMaterial.uniforms.inputTexture.value=bloomB.texture;blurMaterial.uniforms.direction.value.set(0,1);renderer.setRenderTarget(bloomA);renderer.clear();renderer.render(postScene,postCamera);
      renderer.setRenderTarget(null);renderer.clear();renderer.render(scene,camera);renderer.autoClear=false;postQuad.material=compositeMaterial;renderer.render(postScene,postCamera);renderer.autoClear=true;
    };

    const targets=new Map(),ambientMeshes=[],activityLines=[],fans=[],ceilingFans=[],archiveReels=[],archiveNeedles=[],plantLeaves=[],lavaBubbles=[],aquariumWaters=[],dockLights=[],rgbMeshes=[],shelfRgbMeshes=[],aquariumRgbMeshes=[],monitorMeshes=[],lampBulbs=[],aquariumFish=[],fishTails=[],aquariumBubbles=[],catLegs=[],evidenceScanners=[],contactPulses=[],markers=[],materialCopies=new Map();let roomba=null,labCat=null,catTail=null;
    const targetForObject=object=>{let current=object;while(current){if(current.userData.target)return current;current=current.parent;}return null;};
    const interactionForObject=object=>{let current=object;while(current){if(current.userData.action||current.userData.target)return current;current=current.parent;}return null;};
    const hasAncestor=(object,name)=>{let current=object;while(current){if(current.name===name)return true;current=current.parent;}return false;};
    model.traverse(object=>{
      if(object.userData.target)targets.set(object.userData.target,object);
      if(object.userData.ambient==='fan')fans.push(object);
      if(object.userData.ambient==='roomba')roomba=object;
      if(object.userData.ambient==='lab-cat')labCat=object;
      if(object.userData.ambient==='lab-cat-tail')catTail=object;
      if(object.userData.ambient==='lab-cat-leg')catLegs.push(object);
      if(object.userData.ambient==='aquarium-fish')aquariumFish.push(object);
      if(object.userData.ambient==='aquarium-tail')fishTails.push(object);
      if(object.userData.ambient==='aquarium-bubble')aquariumBubbles.push(object);
      if(object.userData.ambient==='evidence-scan')evidenceScanners.push(object);
      if(object.userData.ambient==='contact-pulse')contactPulses.push(object);
      if(object.userData.ambient==='ceiling-fan')ceilingFans.push(object);
      if(object.userData.ambient==='archive-reel')archiveReels.push(object);
      if(object.userData.ambient==='archive-needle')archiveNeedles.push(object);
      if(object.userData.ambient==='plant-leaf')plantLeaves.push(object);
      if(object.userData.ambient==='lava-bubble')lavaBubbles.push(object);
      if(object.userData.ambient==='aquarium-water')aquariumWaters.push(object);
      if(object.userData.ambient==='dock-light')dockLights.push(object);
      if(!object.isMesh)return;
      const targetRoot=targetForObject(object);
      const isAmbient=['Contact screen','blue','amber'].includes(object.name),isRgbStrip=object.name.includes('RGB accent strip')||object.name==='Blue desk light strip';
      if(targetRoot||isAmbient||isRgbStrip){
        const cloneKey=isRgbStrip?`rgb:${object.id}`:isAmbient?`ambient:${object.id}`:`target:${targetRoot.userData.target}:${object.material.uuid}`;
        if(!materialCopies.has(cloneKey))materialCopies.set(cloneKey,object.material.clone());
        object.material=materialCopies.get(cloneKey);
      }
      object.userData.baseEmissive=object.material.emissive?.getHex?.()||0;
      object.userData.baseIntensity=object.material.emissiveIntensity||0;
      if(isAmbient)ambientMeshes.push(object);
      if(isRgbStrip){rgbMeshes.push(object);if(hasAncestor(object,'Technical library'))shelfRgbMeshes.push(object);if(hasAncestor(object,'Living planted aquarium'))aquariumRgbMeshes.push(object);}
      if(targetRoot?.userData.target==='projects'&&object.name==='Display')monitorMeshes.push(object);
      if(object.name==='Task lamp bulb')lampBulbs.push(object);
      if(object.name.endsWith('log line'))activityLines.push(object);
    });
    const markerCanvas=document.createElement('canvas');markerCanvas.width=markerCanvas.height=96;
    const markerContext=markerCanvas.getContext('2d');markerContext.clearRect(0,0,96,96);markerContext.shadowColor='#62e6dc';markerContext.shadowBlur=13;
    markerContext.strokeStyle='#55cfc7aa';markerContext.lineWidth=4;markerContext.beginPath();markerContext.arc(48,48,30,0,Math.PI*2);markerContext.stroke();
    markerContext.shadowBlur=9;markerContext.fillStyle='#62ded5';markerContext.beginPath();markerContext.arc(48,48,11,0,Math.PI*2);markerContext.fill();
    markerContext.shadowBlur=0;markerContext.fillStyle='#d7fffb';markerContext.beginPath();markerContext.arc(45,45,3,0,Math.PI*2);markerContext.fill();
    const markerTexture=new T.CanvasTexture(markerCanvas);markerTexture.colorSpace=T.SRGBColorSpace;
    const markerPositions={projects:[-.43,3.72,-.62],forensics:[-6.0,1.9,.02],ccdc:[4.0,1.92,-.42],internship:[1.66,2.82,-.61],education:[-4.7,1.55,3.58],resume:[-2.95,4.72,-2.88],github:[-5.36,2.72,-2.75],contact:[6.22,4.16,-2.74]};
    const markerVectors=new Map(Object.entries(markerPositions).map(([key,position])=>[key,new T.Vector3(...position)]));
    const navButtons=new Map([...document.querySelectorAll('[data-focus]')].map(button=>[button.dataset.focus,button]));
    for(const [key,position] of Object.entries(markerPositions)){
      const material=new T.SpriteMaterial({map:markerTexture,transparent:true,opacity:.82,depthTest:false,depthWrite:false});
      const marker=new T.Sprite(material);marker.name=`${content[key].label} marker`;marker.position.set(...position);marker.scale.set(.32,.32,.32);marker.renderOrder=20;marker.userData.target=key;model.add(marker);markers.push(marker);
    }
    const raycaster=new T.Raycaster(),pointer=new T.Vector2(),projectedPin=new T.Vector3();
    const workspace={name:'ENTRY',entered:false,selected:null,hovered:null};
    const actionState={'task-lamp':true,'shelf-lights':true,'aquarium-lights':true,'screen-mode':true,'ceiling-fan':true};
    const routeToken=performance.timeOrigin;
    let drag=null,visible=true,lastFrame=0,panelTimer=0;
    const setWorkspaceState=(name,selected=null)=>{
      workspace.name=name;workspace.selected=selected;
      document.body.dataset.workspaceState=name;
    };
    const setMove=(position,target,duration=900)=>{
      move={fromPos:currentPosition.clone(),fromTarget:currentTarget.clone(),toPos:position.clone(),toTarget:target.clone(),start:performance.now(),duration:reducedMotion.matches?1:duration};
    };
    const syncOrbit=()=>{const position=orbitPosition();currentPosition.copy(position);currentTarget.copy(overviewTarget);move={fromPos:position.clone(),fromTarget:overviewTarget.clone(),toPos:position.clone(),toTarget:overviewTarget.clone(),start:performance.now()-1,duration:1};};
    const ease=t=>1-Math.pow(1-t,3);
    const groupForMesh=interactionForObject;
    const hitAt=event=>{
      const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
      raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObject(model,true)[0];return hit?groupForMesh(hit.object):null;
    };
    const illuminate=(key,level)=>{const group=targets.get(key);group?.traverse(object=>{if(!object.isMesh||!object.material.emissive)return;object.material.emissive.setHex(level?0x4e7785:object.userData.baseEmissive);object.material.emissiveIntensity=level?level:object.userData.baseIntensity;});};
    const actionLabels={'task-lamp':'TASK LAMP · CLICK TO TOGGLE','shelf-lights':'LIBRARY LIGHTS · CLICK TO TOGGLE','aquarium-lights':'AQUARIUM LEDS · CLICK TO TOGGLE','screen-mode':'MONITOR GLOW · CLICK TO TOGGLE','ceiling-fan':'CEILING FAN · CLICK TO TOGGLE'};
    const setHover=(hit,event)=>{
      const targetKey=hit?.userData.target||null,actionKey=hit?.userData.action||null,key=targetKey?`target:${targetKey}`:actionKey?`action:${actionKey}`:null;
      if(workspace.hovered!==key){const prior=workspace.hovered?.startsWith('target:')?workspace.hovered.slice(7):null;if(prior&&prior!==workspace.selected)illuminate(prior,0);workspace.hovered=key;if(targetKey&&targetKey!==workspace.selected)illuminate(targetKey,.18);}
      canvas.classList.toggle('is-interactive',Boolean(key));
      if(!key){hoverLabel.hidden=true;return;}
      hoverLabel.hidden=false;hoverLabel.style.left=`${event.clientX}px`;hoverLabel.style.top=`${event.clientY}px`;
      hoverLabel.querySelector('span').textContent=targetKey?content[targetKey].index:'SWITCH';hoverLabel.querySelector('strong').textContent=targetKey?content[targetKey].label:actionLabels[actionKey];
    };
    const updateActionControls=action=>document.querySelectorAll(`[data-scene-action="${action}"]`).forEach(button=>{button.setAttribute('aria-pressed',String(actionState[action]));const state=button.querySelector('span');if(state)state.textContent=actionState[action]?'On':'Off';});
    const toggleSceneAction=action=>{
      actionState[action]=!actionState[action];updateActionControls(action);shadowWarmup=4;
      if(action==='task-lamp'){lampBulbs.forEach(mesh=>mesh.material.emissiveIntensity=actionState[action]?2.8:0);}
      if(action==='shelf-lights'){shelfRgbMeshes.forEach(mesh=>mesh.material.emissiveIntensity=actionState[action]?2.15:0);}
      if(action==='aquarium-lights'){aquariumRgbMeshes.forEach(mesh=>mesh.material.emissiveIntensity=actionState[action]?5.2:0);aquariumLight.intensity=actionState[action]?10.5:0;}
      if(action==='screen-mode'){monitorMeshes.forEach(mesh=>mesh.material.emissiveIntensity=actionState[action]?.9:.025);}
    };
    const updateNavPins=()=>{
      for(const [key,button] of navButtons){
        projectedPin.copy(markerVectors.get(key)).project(camera);
        const visible=projectedPin.z>-1&&projectedPin.z<1&&Math.abs(projectedPin.x)<1.08&&Math.abs(projectedPin.y)<1.08;
        button.classList.toggle('is-visible',visible);
        if(!visible)continue;
        button.style.left=`${(projectedPin.x*.5+.5)*innerWidth}px`;
        button.style.top=`${(-projectedPin.y*.5+.5)*innerHeight}px`;
      }
    };
    const populatePanel=key=>{const item=content[key];document.querySelector('#panel-kicker').textContent=item.label;document.querySelector('#panel-index').textContent=`${item.index} / 08`;document.querySelector('#panel-title').textContent=item.title;document.querySelector('#panel-summary').textContent=item.summary;document.querySelector('#panel-body').innerHTML=item.body;panelObject.textContent=item.label;};
    const syncUrl=key=>{
      if(location.hash===`#${key}`)return;
      history.pushState({workspace:key,routeToken},'',`${location.pathname}${location.search}#${key}`);
    };
    const focusObject=(key,{updateHistory=true}={})=>{
      const item=content[key];if(!item)return;
      if(!workspace.entered)enterWorkspace({animate:false});
      clearTimeout(panelTimer);if(workspace.selected&&workspace.selected!==key)illuminate(workspace.selected,0);setWorkspaceState(key.toUpperCase(),key);hoverLabel.hidden=true;illuminate(key,.34);
      document.querySelectorAll('[data-focus]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.focus===key)));
      cameraStatus.textContent=item.label;populatePanel(key);
      const target=new T.Vector3(...item.target),position=new T.Vector3(...item.position);setMove(position,target,950);
      document.body.classList.add('panel-active');
      if(updateHistory)syncUrl(key);
      panelTimer=setTimeout(()=>{panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');requestAnimationFrame(()=>{document.querySelector('[data-close-panel]').focus({preventScroll:true});document.querySelector('.skip-link').setAttribute('inert','');document.querySelector('.lab-hud').setAttribute('inert','');document.querySelector('#scene-nav').setAttribute('inert','');canvas.tabIndex=-1;});},reducedMotion.matches?0:430);
    };
    const closePanel=({updateHistory=true,restoreFocus=true}={})=>{
      const closingKey=workspace.selected;
      clearTimeout(panelTimer);panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');
      if(workspace.selected)illuminate(workspace.selected,0);setWorkspaceState('HOME');cameraStatus.textContent='OVERVIEW';panelObject.textContent='NO OBJECT SELECTED';
      document.body.classList.remove('panel-active');
      document.querySelectorAll('[data-focus]').forEach(button=>button.setAttribute('aria-pressed','false'));document.querySelector('.skip-link').removeAttribute('inert');document.querySelector('.lab-hud').removeAttribute('inert');document.querySelector('#scene-nav').removeAttribute('inert');canvas.tabIndex=0;setMove(orbitPosition(),overviewTarget,950);
      if(updateHistory&&content[location.hash.slice(1)]){
        if(history.state?.workspace===closingKey&&history.state?.routeToken===routeToken)history.back();
        else history.replaceState(null,'',`${location.pathname}${location.search}`);
      }
      if(restoreFocus)canvas.focus({preventScroll:true});
    };
    const enterWorkspace=({animate=true}={})=>{
      workspace.entered=true;setWorkspaceState('HOME');document.body.classList.add('lab-entered');
      setMove(orbitPosition(),overviewTarget,animate?2200:1);
      canvas.focus({preventScroll:true});
    };
    const syncRoute=()=>{
      const key=location.hash.slice(1);
      if(content[key])focusObject(key,{updateHistory:false});
      else if(workspace.selected)closePanel({updateHistory:false,restoreFocus:false});
    };

    canvas.tabIndex=0;
    canvas.addEventListener('pointerdown',event=>{if(event.button!==0||workspace.selected)return;drag={x:event.clientX,y:event.clientY,theta:orbit.theta,phi:orbit.phi,moved:false};canvas.setPointerCapture(event.pointerId);canvas.classList.add('is-dragging');});
    canvas.addEventListener('pointermove',event=>{
      if(workspace.selected)return;
      if(!drag){setHover(hitAt(event),event);return;}
      const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>5)drag.moved=true;
      orbit.theta=T.MathUtils.clamp(drag.theta+dx*.004,-.36,.36);orbit.phi=T.MathUtils.clamp(drag.phi-dy*.0032,1.02,1.49);syncOrbit();
    });
    canvas.addEventListener('pointerup',event=>{if(!drag)return;const moved=drag.moved;drag=null;canvas.classList.remove('is-dragging');if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);if(!moved){const hit=hitAt(event);if(hit?.userData.target)focusObject(hit.userData.target);else if(hit?.userData.action)toggleSceneAction(hit.userData.action);}});
    canvas.addEventListener('pointerleave',()=>{if(!drag)setHover(null,{clientX:0,clientY:0});});
    canvas.addEventListener('pointercancel',()=>{drag=null;canvas.classList.remove('is-dragging');});
    canvas.addEventListener('wheel',event=>{event.preventDefault();if(workspace.selected)return;orbit.radius=T.MathUtils.clamp(orbit.radius+event.deltaY*.008,8.6,16.5);setMove(orbitPosition(),overviewTarget,140);},{passive:false});
    document.querySelectorAll('[data-focus]').forEach(button=>button.addEventListener('click',()=>focusObject(button.dataset.focus)));
    document.querySelectorAll('[data-scene-action]').forEach(button=>button.addEventListener('click',()=>toggleSceneAction(button.dataset.sceneAction)));
    document.querySelector('[data-close-panel]').addEventListener('click',closePanel);
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'){if(panel.classList.contains('is-open')||workspace.selected)closePanel();const help=document.querySelector('#help-panel');help.hidden=true;document.querySelector('[data-help]').setAttribute('aria-expanded','false');}
      if(event.key==='Tab'&&panel.classList.contains('is-open')){
        const focusable=[...panel.querySelectorAll('button,a[href]')];
        const edge=event.shiftKey?focusable[0]:focusable.at(-1);
        if(document.activeElement===edge){event.preventDefault();(event.shiftKey?focusable.at(-1):focusable[0]).focus();}
      }
    });
    document.querySelector('[data-help]').addEventListener('click',event=>{const help=document.querySelector('#help-panel');help.hidden=!help.hidden;event.currentTarget.setAttribute('aria-expanded',String(!help.hidden));});
    document.querySelector('[data-light-mode]').addEventListener('click',event=>{workLights=!workLights;renderer.toneMappingExposure=workLights?1.16:1.07;ambient.intensity=workLights?.17:.095;event.currentTarget.setAttribute('aria-pressed',String(workLights));event.currentTarget.textContent=workLights?'Dim room':'Work lights';});
    document.querySelector('[data-enter]').addEventListener('click',()=>enterWorkspace());
    addEventListener('popstate',syncRoute);addEventListener('hashchange',syncRoute);addEventListener('pageshow',syncRoute);
    if(reducedMotion.matches)enterWorkspace({animate:false});
    const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);resizeBloom();};resize();addEventListener('resize',resize);
    new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;}).observe(canvas);document.addEventListener('visibilitychange',()=>{visible=!document.hidden;});
    const animate=time=>{
      requestAnimationFrame(animate);if(!visible||document.hidden)return;
      const t=Math.min(1,(time-move.start)/move.duration),e=ease(Math.max(0,t));currentPosition.lerpVectors(move.fromPos,move.toPos,e);currentTarget.lerpVectors(move.fromTarget,move.toTarget,e);camera.position.copy(currentPosition);camera.lookAt(currentTarget);
      if(workspace.entered&&!reducedMotion.matches){
        ambientMeshes.forEach((object,index)=>{if(!object.material.emissive)return;const flicker=.055+(Math.sin(time*(.0017+index*.00003)+index*2.1)+1)*.035;object.material.emissive.setHex(index%4===0?0x9c6243:0x456f7c);object.material.emissiveIntensity=(workspace.selected&&targets.get(workspace.selected)?.getObjectById(object.id))?Math.max(.28,flicker):flicker;});
        activityLines.forEach((line,index)=>{line.scale.x=.68+(Math.sin(time*(.0013+index*.00002)+index)+1)*.16;});
        evidenceScanners.forEach((scanner,index)=>{scanner.position.x=scanner.userData.baseX+(Math.sin(time*.00125+index)*.5+.5)*scanner.userData.range;scanner.material.emissiveIntensity=3.5+Math.sin(time*.003+index)*.7;});
        contactPulses.forEach((pulse,index)=>{const signal=.84+(Math.sin(time*.0024+index)+1)*.1;pulse.scale.setScalar(signal);pulse.material.emissiveIntensity=3.6+(Math.sin(time*.0024+index)+1)*1.1;});
        fans.forEach((fan,index)=>{fan.rotation.z=time*(.0012+index*.00008);});
        if(actionState['ceiling-fan'])ceilingFans.forEach((fan,index)=>{fan.rotation.y=time*(.00105+index*.00005);});
        archiveReels.forEach((reel,index)=>{reel.rotation.z=time*.00072*(index%2?-1:1)+reel.userData.phase;});
        archiveNeedles.forEach((needle,index)=>{needle.rotation.z=-.45+(Math.sin(time*.0021+needle.userData.phase)+1)*.45;});
        plantLeaves.forEach(leaf=>{leaf.rotation.z=leaf.userData.baseRotation+Math.sin(time*.00075+leaf.userData.phase)*.055;});
        lavaBubbles.forEach(bubble=>{bubble.position.y=.68+((time*.00011+bubble.userData.phase)%1)*.34;bubble.position.x=Math.sin(time*.0012+bubble.userData.phase)*.035;});
        aquariumWaters.forEach(surface=>{surface.position.y=surface.userData.baseY+Math.sin(time*.0012)*.006;surface.rotation.z=Math.sin(time*.0008)*.004;});
        dockLights.forEach(light=>{light.material.emissiveIntensity=.25+(Math.sin(time*.0025+light.userData.phase)+1)*.7;});
        markers.forEach((marker,index)=>{const pulse=1+Math.sin(time*.003+index*.7)*.09;marker.scale.setScalar(.32*pulse);marker.material.opacity=(workspace.hovered===`target:${marker.userData.target}` ? .95 : .72)+Math.sin(time*.003+index)*.08;});
        rgbMeshes.forEach(strip=>{const shelf=hasAncestor(strip,'Technical library'),aquarium=hasAncestor(strip,'Living planted aquarium');strip.material.emissiveIntensity=(shelf&&!actionState['shelf-lights'])||(aquarium&&!actionState['aquarium-lights'])?0:(aquarium?4.7:2.0)+(Math.sin(time*.0015)+1)*(aquarium ? .36 : .28);});
        if(roomba){const phase=time*.00018;roomba.position.x=Math.sin(phase)*2.15;roomba.position.z=3.55+Math.sin(phase*.67)*.55;roomba.rotation.y=Math.atan2(Math.cos(phase)*2.15,Math.cos(phase*.67)*.37);}
        if(labCat){const phase=time*.000105,gait=phase*8,x=Math.sin(phase)*3.9;labCat.position.x=x;labCat.position.y=.02+Math.abs(Math.sin(gait))*.018;labCat.position.z=5.25+Math.sin(phase*.72)*.16;labCat.rotation.y=Math.cos(phase)>=0?-Math.PI/2:Math.PI/2;catLegs.forEach(leg=>{leg.rotation.x=Math.sin(gait+leg.userData.gaitPhase)*.42;});if(catTail)catTail.rotation.z=Math.sin(phase*5)*.18;}
        aquariumFish.forEach((fish,index)=>{const phase=time*.00042*fish.userData.speed+fish.userData.phase,x=Math.sin(phase)*fish.userData.radius,z=Math.cos(phase*.83+index)*.24;fish.position.set(x,fish.userData.swimY+Math.sin(phase*1.7)*.075,z);fish.rotation.y=Math.cos(phase)>=0?0:Math.PI;fish.rotation.z=Math.sin(phase*1.35)*.035;});
        fishTails.forEach((tail,index)=>{tail.rotation.y=Math.PI/2+Math.sin(time*.008+index*1.8)*.42;});
        aquariumBubbles.forEach(bubble=>{bubble.position.y=((time*.00016+bubble.userData.phase)%1)*1.22;bubble.position.x=Math.sin(time*.0012+bubble.userData.phase)*.035;});
        dfirNeonLight.intensity=(workLights?8.7:7.2)+Math.sin(time*.0017)*.16;shieldNeonLight.intensity=(workLights?9.8:8.2)+Math.sin(time*.0019+1.3)*.18;aquariumLight.intensity=actionState['aquarium-lights']?((workLights?12:10.5)+Math.sin(time*.0011)*.22):0;
        taskLight.intensity=actionState['task-lamp']?((workLights?56:48)+Math.sin(time*.00045)*.7):0;screenLight.intensity=actionState['screen-mode']?((workLights?8.5:7.2)+Math.sin(time*.0011)*.2):0;
        evidenceLight.intensity=(workLights?31:26)+Math.sin(time*.00037)*.35;loungeLight.intensity=(workLights?13.2:10.2)+Math.sin(time*.00037)*.24;
        rackLight.intensity=(workLights?18.4:14.8)+Math.sin(time*.00051)*.25;credentialLight.intensity=(workLights?13:10.5)+Math.sin(time*.0004)*.2;
        contactLight.intensity=(workLights?5.2:4.2)+Math.sin(time*.0008)*.15;rgbLeft.intensity=(workLights?2:1.5)+Math.sin(time*.0011)*.12;rgbRight.intensity=(workLights?2:1.5)+Math.sin(time*.0011+1.8)*.12;
        shelfLights.forEach((light,index)=>{light.intensity=actionState['shelf-lights']?((workLights?2.4:1.8)+Math.sin(time*.001+index)*.12):0;});
      }
      const cameraActive=Boolean(drag)||time-move.start<move.duration;document.body.classList.toggle('camera-moving',cameraActive);if(time-lastFrame>(cameraActive?(lowPower?25:16):(lowPower?42:33))){if(shadowWarmup>0){renderer.shadowMap.needsUpdate=true;shadowWarmup--;}updateNavPins();renderFrame();lastFrame=time;}
    };requestAnimationFrame(animate);
    clearTimeout(loadingFailsafe);document.body.classList.remove('scene-fallback-active');document.body.classList.add('scene-ready');
    document.body.dataset.sceneBootMs=String(Math.round(performance.now()-bootStarted));
    loading.classList.add('is-done');loading.querySelector('p').textContent='Workspace ready';
    syncRoute();
  } catch(error) {
    clearTimeout(loadingFailsafe);console.error('The 3D workspace could not start.',error);loading.classList.add('is-done');document.body.classList.add('scene-fallback-active');
  }
}
