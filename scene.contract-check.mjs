import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as T from './assets/vendor/three.module.min.js';
import { buildWorkstation } from './scene-model.mjs';
const model=buildWorkstation(T);
model.updateMatrixWorld(true);
const byName=name=>model.getObjectByName(name);
for(const [a,b] of [['Server rack / CCDC','Technical library'],['Server rack / CCDC','Wall contact intercom'],['Forensic examination bench','Education notebook pedestal'],['Forensic examination bench','Wall-mounted repository console'],['Student lounge corner','Lounge side table']]){
  assert.ok(!new T.Box3().setFromObject(byName(a)).intersectsBox(new T.Box3().setFromObject(byName(b))),`${a} and ${b} must not overlap`);
}
assert.ok(byName('Lab cat'),'The room includes a separate roaming ambient detail');
assert.ok(byName('DFIR neon sign')&&byName('Verified shield neon sign'),'The wall uses two authored neon fixtures');
assert.ok(byName('Panoramic city window'),'The monitor wall includes the panoramic exterior view');
assert.ok(byName('Living planted aquarium'),'The room includes the planted aquarium');
assert.ok(!byName('Ethernet cable'),'The loose floor cable was removed');
assert.ok(!byName('Forensic hardware cart'),'The rolling forensic cart was removed');
assert.ok(!byName('Repository console stand'),'The repository terminal no longer uses a floor stand');
assert.ok(!byName('Right wall contact shelf'),'The contact phone no longer occupies a table in front of the rack');
assert.ok(!new T.Box3().setFromObject(byName('Living planted aquarium')).intersectsBox(new T.Box3().setFromObject(byName('Wall contact intercom'))),'Aquarium stays clear of the wall intercom');
assert.ok(!new T.Box3().setFromObject(byName('Living planted aquarium')).intersectsBox(new T.Box3().setFromObject(byName('Server rack / CCDC'))),'Aquarium stays clear of the rack');
assert.ok(!new T.Box3().setFromObject(byName('Panoramic city window')).intersectsBox(new T.Box3().setFromObject(byName('Resume and certifications'))),'Window and credential frame stay physically separate');
assert.ok(byName('Living planted aquarium').rotation.y<-.9,'Aquarium faces inward from the right wall');
assert.ok(Math.abs(byName('Student lounge corner').rotation.y-Math.PI/2)<.01,'Sofa faces inward from the left wall');
assert.ok(Math.abs(byName('Forensic examination bench').rotation.y-Math.PI/2)<.01,'Forensic bench faces inward from the left wall');
assert.ok(new T.Box3().setFromObject(byName('Forensic examination bench')).min.x< -6.88,'Forensic bench sits flush to the left wall');
assert.ok(Math.abs(byName('Wall-mounted repository console').rotation.y-Math.PI/2)<.01,'Repository console faces inward from the left wall');
assert.ok(new T.Box3().setFromObject(byName('Wall-mounted repository console')).min.x< -6.9,'Repository console is mounted to the left wall');
assert.ok(Math.abs(byName('Wall contact intercom').rotation.y+Math.PI/2)<.01,'Contact intercom faces inward from the right wall');
assert.ok(new T.Box3().setFromObject(byName('Wall contact intercom')).max.x>6.9,'Contact intercom is mounted to the right wall');
const benchBox=new T.Box3().setFromObject(byName('Forensic examination bench')),driveBox=new T.Box3().setFromObject(byName('Forensic evidence drive'));
assert.ok(driveBox.min.x>benchBox.min.x&&driveBox.max.x<benchBox.max.x&&driveBox.min.z>benchBox.min.z&&driveBox.max.z<benchBox.max.z,'Evidence drive stays safely inside the bench edges');
assert.ok(byName('DFIR neon sign').scale.x<.8,'DFIR neon sign stays subordinate to the credential wall');
for(const ambient of ['evidence-scan','contact-pulse']){let found=false;model.traverse(object=>{if(object.userData.ambient===ambient)found=true;});assert.ok(found,`${ambient} motion detail exists`);}
let aquariumFish=0;model.traverse(object=>{if(object.userData.ambient==='aquarium-fish')aquariumFish++;});assert.equal(aquariumFish,3,'Aquarium contains three animated fish');
let catLegs=0;model.traverse(object=>{if(object.userData.ambient==='lab-cat-leg')catLegs++;});assert.equal(catLegs,4,'Lab cat has four independently animated legs');
let aquariumLeds=0;byName('Living planted aquarium').traverse(object=>{if(object.name.includes('RGB accent strip / aquarium'))aquariumLeds++;});assert.equal(aquariumLeds,5,'Aquarium has a complete five-part LED treatment');
let meshes=0;const targets=new Set();
model.traverse(object=>{
  if(object.userData.target)targets.add(object.userData.target);
  if(!object.isMesh)return;
  meshes++;
  for(const key of ['position','normal']) {
    const a=object.geometry.attributes[key];
    assert.ok(a?.count>0,`${object.name} has ${key}`);
    assert.ok([...a.array].every(Number.isFinite),`${object.name} contains finite ${key}`);
  }
});
assert.equal(targets.size,8);
const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
for(const target of targets)assert.ok(html.includes(`data-focus="${target}"`),`Scene exposes an accessible ${target} control`);
const bytes=await readFile(new URL('./assets/tate-workstation.glb',import.meta.url));
assert.equal(bytes.readUInt32LE(0),0x46546c67);assert.equal(bytes.readUInt32LE(4),2);assert.equal(bytes.readUInt32LE(8),bytes.length);
const jsonLength=bytes.readUInt32LE(12);
const gltf=JSON.parse(bytes.subarray(20,20+jsonLength).toString());
assert.equal(gltf.nodes.filter(node=>Number.isInteger(node.mesh)).length,meshes);
assert.ok(gltf.meshes.length<=meshes,'Shared geometry reduces exported mesh definitions');
const binaryLength=bytes.readUInt32LE(20+jsonLength);
for(const view of gltf.bufferViews)assert.ok(view.byteOffset+view.byteLength<=binaryLength,'Accessor buffer stays in exported binary');
for(const node of gltf.nodes)for(const child of node.children||[])assert.ok(child<gltf.nodes.length,'Node reference resolves');
const runtime=await readFile(new URL('./scene.js',import.meta.url),'utf8');
assert.ok(runtime.includes("if (canvas &&"),'Scene runtime guards pages without a canvas');
assert.ok(runtime.includes("data.workspaceState")||runtime.includes("dataset.workspaceState"),'Runtime exposes a named workspace state');
assert.ok(runtime.includes("history.pushState")&&runtime.includes("addEventListener('popstate'"),'Spatial states are addressable and browser-history aware');
console.log(`PASS: ${meshes} valid meshes, eight real destinations, GLB structure/buffers, non-home guard`);
