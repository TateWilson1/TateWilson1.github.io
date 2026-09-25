// Export the exact authored scene as a GLB that Blender can import.
// Native Node + the already-vendored Three.js; no build dependency or downloads.
import * as T from '../assets/vendor/three.module.min.js';
import { buildWorkstation } from '../scene-model.mjs';
import { writeFile } from 'node:fs/promises';
const scene=buildWorkstation(T);
const gltf={asset:{version:'2.0',generator:'Tate Wilson portfolio / original workstation'},scene:0,scenes:[{nodes:[0]}],nodes:[],meshes:[],materials:[],accessors:[],bufferViews:[],buffers:[]};
const chunks=[];let length=0;const materials=new Map(),geometries=new Map();
function accessor(attribute,type,target) {
  const array=attribute.array;
  const bytes=Buffer.from(array.buffer,array.byteOffset,array.byteLength);
  const bufferView=gltf.bufferViews.length;
  gltf.bufferViews.push({buffer:0,byteOffset:length,byteLength:bytes.length,target});
  chunks.push(bytes);length+=bytes.length;
  const padding=(4-length%4)%4;if(padding){chunks.push(Buffer.alloc(padding));length+=padding;}
  const result={bufferView,componentType:array instanceof Float32Array?5126:array instanceof Uint32Array?5125:5123,count:attribute.count,type};
  if(type==='VEC3') {
    result.min=[Infinity,Infinity,Infinity];result.max=[-Infinity,-Infinity,-Infinity];
    for(let i=0;i<array.length;i++) {const axis=i%3;result.min[axis]=Math.min(result.min[axis],array[i]);result.max[axis]=Math.max(result.max[axis],array[i]);}
  }
  gltf.accessors.push(result);return gltf.accessors.length-1;
}
function material(m) {
  if(materials.has(m.uuid))return materials.get(m.uuid);
  const i=gltf.materials.length;materials.set(m.uuid,i);
  gltf.materials.push({name:m.name||`material-${i}`,pbrMetallicRoughness:{baseColorFactor:[m.color.r,m.color.g,m.color.b,1],metallicFactor:m.metalness,roughnessFactor:m.roughness},emissiveFactor:[m.emissive.r*m.emissiveIntensity,m.emissive.g*m.emissiveIntensity,m.emissive.b*m.emissiveIntensity]});return i;
}
function node(object) {
  const index=gltf.nodes.length;object.updateMatrix();
  const result={name:object.name,matrix:object.matrix.toArray()};gltf.nodes.push(result);
  if(object.isMesh) {
    const key=object.geometry.uuid+object.material.uuid;
    if(!geometries.has(key)) {
      const geometry=object.geometry;
      const primitive={attributes:{POSITION:accessor(geometry.attributes.position,'VEC3',34962),NORMAL:accessor(geometry.attributes.normal,'VEC3',34962)},material:material(object.material)};
      if(geometry.index)primitive.indices=accessor(geometry.index,'SCALAR',34963);
      geometries.set(key,gltf.meshes.length);gltf.meshes.push({name:object.name,primitives:[primitive]});
    }
    result.mesh=geometries.get(key);
  }
  if(object.children.length)result.children=object.children.map(node);
  return index;
}
node(scene);gltf.buffers.push({byteLength:length});
const json=Buffer.from(JSON.stringify(gltf));const jsonPadding=Buffer.alloc((4-json.length%4)%4,0x20);const binary=Buffer.concat(chunks);
const header=Buffer.alloc(12);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+json.length+jsonPadding.length+8+binary.length,8);
const jsonHeader=Buffer.alloc(8);jsonHeader.writeUInt32LE(json.length+jsonPadding.length);jsonHeader.writeUInt32LE(0x4e4f534a,4);
const binHeader=Buffer.alloc(8);binHeader.writeUInt32LE(binary.length);binHeader.writeUInt32LE(0x004e4942,4);
const output=new URL('../assets/tate-workstation.glb',import.meta.url);
await writeFile(output,Buffer.concat([header,jsonHeader,json,jsonPadding,binHeader,binary]));
const meshNodes=gltf.nodes.filter(node=>Number.isInteger(node.mesh)).length;
console.log(`Exported ${meshNodes} mesh nodes using ${gltf.meshes.length} shared definitions, ${gltf.materials.length} materials, ${header.readUInt32LE(8)} bytes to assets/tate-workstation.glb`);
