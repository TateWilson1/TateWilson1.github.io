const bounds={minX:-4.45,maxX:4.45,minZ:.86,maxZ:4.75};
const obstacles=[
  {x:-.65,z:1.65,r:1.02},
  {x:-2.77,z:1.48,r:.72},
  {x:-4.18,z:3.58,r:.7},
];

const blocked=(x,z)=>x<bounds.minX||x>bounds.maxX||z<bounds.minZ||z>bounds.maxZ||obstacles.some(obstacle=>Math.hypot(x-obstacle.x,z-obstacle.z)<obstacle.r);

export function createRoombaMotion(random=Math.random){
  return {heading:.35,pause:0,turnRemaining:0,turnDirection:1,random};
}

export function stepRoomba(state,position,deltaSeconds){
  const delta=Math.min(Math.max(deltaSeconds,0),.05);
  if(!delta)return 'idle';
  if(state.pause>0){state.pause=Math.max(0,state.pause-delta);return 'bump';}
  if(state.turnRemaining>0){const turn=Math.min(state.turnRemaining,delta*2.8);state.heading+=state.turnDirection*turn;state.turnRemaining-=turn;return 'spin';}
  const distance=.48*delta,x=position.x+Math.sin(state.heading)*distance,z=position.z+Math.cos(state.heading)*distance;
  if(blocked(x,z)){state.pause=.14;state.turnRemaining=1.7+state.random()*1.6;state.turnDirection=state.random()<.5?-1:1;return 'bump';}
  position.x=x;position.z=z;return 'move';
}
