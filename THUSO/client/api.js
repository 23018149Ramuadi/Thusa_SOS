"use strict";
const API_BASE = location.hostname.endsWith('github.io') ? 'https://YOUR-RENDER-SERVICE.onrender.com' : '';
const TOKEN_KEY='safeher_token';
async function api(path,options={}){const headers={'Content-Type':'application/json',...(options.headers||{})};const token=localStorage.getItem(TOKEN_KEY);if(token)headers.Authorization=`Bearer ${token}`;let res;try{res=await fetch(`${API_BASE}${path}`,{...options,headers});}catch(e){throw new Error('Cannot reach the SafeHer server. Check your internet connection.');}let data={};try{data=await res.json();}catch(e){}if(res.status===401&&path!='/api/auth/login'){localStorage.removeItem(TOKEN_KEY);if(!location.pathname.endsWith('login.html'))location.href='login.html';}if(!res.ok)throw new Error(data.message||`Request failed (${res.status})`);return data;}
function logout(){localStorage.removeItem(TOKEN_KEY);location.href='login.html';}
async function requireAuth(){if(!localStorage.getItem(TOKEN_KEY)){location.href='login.html';throw new Error('Not authenticated');}return (await api('/api/auth/me')).user;}
