import identity from '../assets/identity-reference.jpg';
import samurai from '../assets/samurai.jpg';
import samuraiWide from '../assets/samurai-wide.jpg';
import landscape from '../assets/landscape.png';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getCollection,type CollectionEntry } from 'astro:content';
export const site={name:'KEENANSEC',author:'Keenan Morrison',description:'Notes on cybersecurity, reverse engineering, and the process of learning.',socials:[] as {label:string;url:string}[]};
export const categories=[{name:'Cybersecurity',description:'Detection, defense, and understanding how systems fail.'},{name:'Reverse Engineering',description:'Following the details beneath the surface of software.'},{name:'Projects',description:'Experiments, lab ideas, and things to build along the way.'},{name:'Personal',description:'Reflections on technology, identity, and learning.'}] as const;
export const slug=(name:string)=>name.toLowerCase().replaceAll(' ','-');
export const url=(path='')=>`${import.meta.env.BASE_URL.replace(/\/$/,'')}/${path.replace(/^\//,'')}`;
export const posts=async()=> (await getCollection('articles')).sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());
export const reading=(p:CollectionEntry<'articles'>)=>Math.max(1,Math.ceil((p.body??'').split(/\s+/).length/200));
export const date=(d:Date)=>d.toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric',timeZone:'UTC'});

const bundledAssets: Record<string, string> = {
  'assets/identity.png': identity.src,
  'assets/samurai.jpg': samurai.src,
  'assets/samurai-wide.jpg': samuraiWide.src,
  'assets/landscape.png': landscape.src,
};
export const assetAvailable=(path?:string)=>!!path&&(path in bundledAssets||existsSync(resolve(process.cwd(),'public',path)));
export const assetUrl=(path:string)=>bundledAssets[path]??url(path);
