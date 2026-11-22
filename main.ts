import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,g){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let pc=0,sp=0,cp=0,ip=0,ol=0,s=0,c=0;
 const T=x=>{throw x};
 try{for(;;){
  if(s===1e6)T(10);
  if(pc<0||pc>=n)T(9);
  const b=p[pc];let m=0;
  if(b===1)m=1;else if(b===2)m=4;else if(b>=48&&b<=51)m=2;
  if(pc+m>=n)T(9);
  s++;const x=pc+1+m;pc=x;
  if(b>=16&&b<=34&&b!==23&&b!==27){
   if(sp<2)T(2);
   const a=D[sp-2],d=D[sp-1];let r;
   switch(b){
    case 16:r=a+d|0;break;
    case 17:r=a-d|0;break;
    case 18:r=Math.imul(a,d);break;
    case 19:if(!d)T(4);r=(a/d)|0;break;
    case 20:if(!d)T(4);r=a%d|0;break;
    case 21:if(!d)T(4);r=Math.floor((a>>>0)/(d>>>0))|0;break;
    case 22:if(!d)T(4);r=(a>>>0)%(d>>>0)|0;break;
    case 24:r=a&d;break;
    case 25:r=a|d;break;
    case 26:r=a^d;break;
    case 28:r=a<<(d&31);break;
    case 29:r=a>>(d&31);break;
    case 30:r=a>>>(d&31)|0;break;
    case 32:r=a===d?1:0;break;
    case 33:r=a<d?1:0;break;
    default:r=(a>>>0)<(d>>>0)?1:0;
   }
   sp-=2;D[sp++]=r;continue;
  }
  switch(b){
   case 0:return[o.slice(0,ol),0];
   case 1:if(sp>255)T(3);D[sp++]=(p[x-1]<<24)>>24;break;
   case 2:if(sp>255)T(3);D[sp++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
   case 3:if(sp<1)T(2);sp--;break;
   case 4:if(sp<1)T(2);if(sp>255)T(3);D[sp]=D[sp-1];sp++;break;
   case 5:if(sp<2)T(2);{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t}break;
   case 6:if(sp<2)T(2);if(sp>255)T(3);D[sp]=D[sp-2];sp++;break;
   case 7:if(sp<3)T(2);{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a}break;
   case 23:if(sp<1)T(2);D[sp-1]=-D[sp-1]|0;break;
   case 27:if(sp<1)T(2);D[sp-1]=~D[sp-1];break;
   case 48:pc=x+((p[x-2]|p[x-1]<<8)<<16>>16);break;
   case 49:case 50:
    if(sp<1)T(2);
    if((b===49)===(D[--sp]===0))pc=x+((p[x-2]|p[x-1]<<8)<<16>>16);
    break;
   case 51:if(cp===64)T(7);C[cp++]=x;pc=p[x-2]|p[x-1]<<8;break;
   case 52:if(cp===0)T(8);pc=C[--cp];break;
   case 64:if(sp<1)T(2);{const a=D[sp-1];if(a<0||a>255)T(6);D[sp-1]=M[a]}break;
   case 65:if(sp<2)T(2);{const a=D[sp-1],v=D[sp-2];if(a<0||a>255)T(6);sp-=2;M[a]=v}break;
   case 80:if(sp<1)T(2);{const t=String(D[sp-1]);if(ol+t.length>65536)T(11);sp--;for(let i=0;i<t.length;i++)o[ol++]=t.charCodeAt(i)}break;
   case 81:if(sp<1)T(2);if(ol>65535)T(11);o[ol++]=D[--sp]&255;break;
   case 82:if(sp>255)T(3);D[sp++]=ip<g.length?g[ip++]:-1;break;
   case 83:if(sp<1)T(2);return[o.slice(0,ol),D[--sp]&255];
   default:T(5);
  }
 }}catch(e){c=e}
 return[o.slice(0,ol),c];
}
for(const id of readdirSync(I).sort()){
 const[r,c]=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),r);
 writeFileSync(join(O,id,'exit.txt'),c+'\n');
}
