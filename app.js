// ── CONSTANTS ─────────────────────────────────────────────────────────────────

var TGTS={b:10,l:20,r:2000000};
function loadTgts(){try{var r=localStorage.getItem('evp_tg');if(r)TGTS=JSON.parse(r);}catch(e){}}
function saveTgts(){try{localStorage.setItem('evp_tg',JSON.stringify(TGTS));}catch(e){}}
var USERS={yokesh:{pass:'Yokesh123',role:'admin',display:'Yokesh'},bose:{pass:'Bose123',role:'staff',display:'Bose'}};
var PKGS=[{id:'half',l:'Half Day (12hrs)',rent:200000,maint:70000,dep:70000,dur:'12 hours'},{id:'full',l:'Reception + Muhurtham',rent:350000,maint:100000,dep:100000,dur:'24 hours'},{id:'b15',l:'Brahmin 1.5 Days',rent:450000,maint:125000,dep:100000,dur:'1.5 days'},{id:'b20',l:'Brahmin 2 Days',rent:550000,maint:150000,dep:100000,dur:'2 days'},{id:'b25',l:'Brahmin 2.5 Days',rent:750000,maint:250000,dep:100000,dur:'2.5 days'},{id:'cust',l:'Custom Rate',rent:0,maint:0,dep:0,dur:'Custom'}];
var PKG_MAP={'Reception':['half'],'Muhurtham':['half'],'Reception + Muhurtham':['full'],'Engagement':['half'],'Baby Shower':['half'],'Muslim Wedding':['half','full'],'Brahmin Wedding':['b15','b20','b25'],'Birthday':['half','cust'],'Corporate Event':['half','cust'],'Anniversary':['half','cust'],'Other':['half','cust']};
var FN_TYPES=Object.keys(PKG_MAP);
var AGENTS=['Bose','Yokesh','Sales Agent 1','Sales Agent 2'];
var SOURCES=['Walk-in','Google Ads','Instagram','Facebook','Referral','Phone Call','JustDial','Other'];
var STATS=[{k:'new',l:'New Lead',c:'#6878A0'},{k:'contacted',l:'Contacted',c:'#60A0D8'},{k:'quoted',l:'Quoted',c:'#E8B84B'},{k:'negotiating',l:'Negotiating',c:'#9060C8'},{k:'confirmed',l:'Confirmed',c:'#5A9E6F'},{k:'lost',l:'Lost',c:'#C84030'}];
var SVCS=[{k:'photography',l:'Photography',c:'#5880C8'},{k:'catering',l:'Catering',c:'#5A9E6F'},{k:'decoration',l:'Decoration',c:'#9060C8'},{k:'chaircovers',l:'Chair Covers',c:'#D07030'},{k:'ledscreen',l:'LED Screen',c:'#30A090'},{k:'audio',l:'Audio System',c:'#C84030'},{k:'lighting',l:'Extra Lighting',c:'#E8B84B'},{k:'dj',l:'DJ',c:'#9060C8'},{k:'other',l:'Other',c:'#887060'}];
var PMETH=['Cash','UPI / GPay','Bank Transfer','Cheque','Card'];
var PSTAGE=['1st Payment','2nd Payment','3rd Payment','4th Payment','Balance Payment','Deposit','Extra / Add-on','Extras & Damages','Deposit Refund','Fully Paid'];
var MAINT=[{k:'hk',l:'Housekeeping',e:'🧹',cat:'Cleaning'},{k:'cl',l:'Cleaning Services',e:'✨',cat:'Cleaning'},{k:'lr',l:'Leaf Removal',e:'🍃',cat:'Cleaning'},{k:'gb',l:'Garbage Disposal',e:'🗑',cat:'Cleaning'},{k:'ac',l:'Centralized AC',e:'❄',cat:'Utilities'},{k:'wt',l:'Water Supply',e:'💧',cat:'Utilities'},{k:'lt',l:'Basic Lighting',e:'💡',cat:'Utilities'},{k:'gn',l:'Backup Generator',e:'⚡',cat:'Utilities'},{k:'el',l:'Elevation Lights',e:'🌟',cat:'Utilities'},{k:'rm',l:'Rooms Ready',e:'🛏',cat:'Accommodation'},{k:'ut',l:'Utensils',e:'🍽',cat:'Kitchen'},{k:'kt',l:'Kitchen Ready',e:'🍳',cat:'Kitchen'},{k:'vs',l:'Vessels',e:'🫙',cat:'Kitchen'},{k:'vw',l:'Vessel Washing',e:'🚿',cat:'Kitchen'},{k:'pk',l:'Car Parking',e:'🚗',cat:'Security'},{k:'vl',l:'Valet Drivers',e:'🔑',cat:'Security'},{k:'sc',l:'Security',e:'👮',cat:'Security'}];
var MCATS=[];MAINT.forEach(function(m){if(MCATS.indexOf(m.cat)<0)MCATS.push(m.cat);});
var MDATES=['2026-01-08','2026-01-12','2026-01-13','2026-01-15','2026-01-16','2026-01-20','2026-01-21','2026-01-22','2026-02-04','2026-02-05','2026-02-09','2026-02-10','2026-02-11','2026-02-15','2026-02-16','2026-02-17','2026-02-19','2026-02-20','2026-03-02','2026-03-05','2026-03-06','2026-03-10','2026-03-11','2026-03-13','2026-03-17','2026-03-18','2026-03-19','2026-04-17','2026-04-18','2026-04-20','2026-04-22','2026-04-24','2026-04-26','2026-04-27','2026-04-28','2026-05-04','2026-05-05','2026-05-07','2026-05-11','2026-05-12','2026-05-14','2026-05-15','2026-05-18','2026-05-19','2026-05-20','2026-05-25','2026-05-26','2026-06-08','2026-06-09','2026-06-11','2026-06-12','2026-06-13','2026-06-15','2026-06-16','2026-08-27','2026-08-28','2026-09-02','2026-09-03','2026-09-07','2026-09-08','2026-09-09','2026-09-14','2026-10-14','2026-10-15','2026-10-19','2026-10-20','2026-10-21','2026-10-26','2026-10-27','2026-11-13','2026-11-16','2026-11-17','2026-11-19','2026-11-20','2026-11-23','2026-11-24','2026-11-25','2026-11-27','2026-11-28','2026-11-30','2026-12-01','2026-12-02','2026-12-04','2026-12-05','2026-12-07','2026-12-08','2026-12-09','2026-12-14','2026-12-15','2026-12-17','2026-12-18','2026-12-19','2027-01-05','2027-01-06','2027-01-10','2027-01-11','2027-01-12','2027-01-14','2027-01-18','2027-01-19','2027-01-20','2027-01-24','2027-02-03','2027-02-04','2027-02-08','2027-02-09','2027-02-10','2027-02-14','2027-02-15','2027-02-16','2027-02-18','2027-02-19','2027-02-22','2027-03-01','2027-03-04','2027-03-05','2027-03-08','2027-03-09','2027-03-10','2027-03-15','2027-03-17','2027-03-18','2027-04-14','2027-04-15','2027-04-19','2027-04-20','2027-04-21','2027-04-23','2027-04-25','2027-04-26','2027-04-27','2027-05-03','2027-05-04','2027-05-06','2027-05-07','2027-05-10','2027-05-11','2027-05-14','2027-05-15','2027-05-17','2027-05-18','2027-05-19','2027-05-24','2027-05-25','2027-06-07','2027-06-08','2027-06-10','2027-06-11','2027-06-14','2027-06-15','2027-08-26','2027-08-27','2027-09-01','2027-09-02','2027-09-06','2027-09-07','2027-09-08','2027-09-13','2027-10-11','2027-10-12','2027-10-18','2027-10-19','2027-10-20','2027-10-25','2027-10-26','2027-11-12','2027-11-15','2027-11-16','2027-11-18','2027-11-19','2027-11-22','2027-11-23','2027-11-24','2027-11-26','2027-11-27','2027-11-29','2027-12-01','2027-12-03','2027-12-06','2027-12-07','2027-12-13','2027-12-14','2027-12-16','2027-12-17','2027-12-18'];
var MUH={};MDATES.forEach(function(d){MUH[d]=1;});
var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
var TAMIL=['Thai','Maasi','Panguni','Chithirai','Vaikasi','Aani','Aadi','Aavani','Purattasi','Aippasi','Karthigai','Margazhi'];

// ── STATE ─────────────────────────────────────────────────────────────────────
var AUTH=null;
var DATA={leads:[],bookings:[]};
var UI={page:'dashboard',bid:null,sf:'all',q:'',cY:2026,cM:5,cSel:null};
var OV=null,EDIT_ID=null,FORM={};
var DB=null,LOADING=true;

// ── FIREBASE INIT ─────────────────────────────────────────────────────────────
function initFirebase(){
  if(!CONFIG_SET){render();return;}
  try{
    firebase.initializeApp(FIREBASE_CONFIG);
    DB=firebase.database();
    // Real-time listeners - instant sync between all users
    DB.ref('leads').on('value',function(snap){
      DATA.leads=[];
      if(snap.val()){Object.keys(snap.val()).forEach(function(k){DATA.leads.push(Object.assign({},snap.val()[k],{id:k}));});}
      if(!LOADING)render();
    },function(err){console.error('Leads sync error:',err);});
    var _fbto=setTimeout(function(){if(LOADING){LOADING=false;render();}},6000);
    DB.ref('bookings').on('value',function(snap){
      DATA.bookings=[];
      if(snap.val()){Object.keys(snap.val()).forEach(function(k){DATA.bookings.push(Object.assign({},snap.val()[k],{id:k}));});}
      clearTimeout(_fbto);LOADING=false;render();
    },function(err){console.error('Bookings sync error:',err);LOADING=false;render();});
  }catch(e){console.error('Firebase init failed:',e);LOADING=false;render();}
}

// ── CLOUD SAVE ────────────────────────────────────────────────────────────────
function cloudSaveLead(lead){
  if(!DB)return;
  DB.ref('leads/'+lead.id).set(lead).catch(function(e){alert('Save failed. Check internet connection.');console.error(e);});
}
function cloudSaveBooking(bkg){
  if(!DB)return;
  DB.ref('bookings/'+bkg.id).set(bkg).catch(function(e){alert('Save failed. Check internet connection.');console.error(e);});
}
function cloudDeleteLead(id){if(!DB)return;DB.ref('leads/'+id).remove().catch(function(e){console.error(e);});}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function saveAuth(){try{sessionStorage.setItem('evp_auth',JSON.stringify(AUTH));}catch(e){}}
function loadAuth(){try{var r=sessionStorage.getItem('evp_auth');if(r)AUTH=JSON.parse(r);}catch(e){}}
function isAdmin(){return AUTH&&AUTH.role==='admin';}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function uid(){return Date.now()+'-'+Math.random().toString(36).slice(2,7);}
function today(){return new Date().toISOString().slice(0,10);}
function fm(n){return n!=null?'₹'+Number(n).toLocaleString('en-IN'):'—';}
function fd(d){return d?new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'—';}
function daysto(d){if(!d)return null;return Math.ceil((new Date(d+'T00:00:00')-new Date().setHours(0,0,0,0))/86400000);}
function ismuh(d){return !!MUH[d];}
function gpkg(id){for(var i=0;i<PKGS.length;i++)if(PKGS[i].id===id)return PKGS[i];return null;}
function gstat(k){for(var i=0;i<STATS.length;i++)if(STATS[i].k===k)return STATS[i];return STATS[0];}
function defmaint(){var o={};MAINT.forEach(function(m){o[m.k]={done:false,note:''};});return o;}
function paidof(b){return(b.payments||[]).reduce(function(s,p){return p.stage!=='Deposit Refund'?s+(Number(p.amount)||0):s;},0);}
function calcp(b){
  var r=Number(b.rentAmount)||0,m=Number(b.maintAmount)||0,d=Number(b.depositAmount)||0;
  var sub=r+m+d,di=Number(b.discountAmount)||0,net=Math.max(0,sub-di);
  var gR=b.gstEnabled?(Number(b.gstRate)||18):0,gst=gR?Math.round(net*gR/100):0;
  var grand=net+gst,pa=paidof(b),bal=Math.max(0,grand-pa);
  return{rent:r,mnt:m,dep:d,sub:sub,disc:di,net:net,gR:gR,gst:gst,grand:grand,paid:pa,bal:bal};
}
function durlbl(s,e){if(!s)return '';if(!e||e===s)return fd(s);var d=Math.ceil((new Date(e+'T00:00:00')-new Date(s+'T00:00:00'))/86400000);return fd(s)+' to '+fd(e)+' ('+(d+1)+'d)';}
function xe(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function pbar(v,mx,c){var p=mx?Math.min(100,Math.round(v/mx*100)):0;return '<div class="pbar"><div class="pbf" style="width:'+p+'%;background:'+c+'"></div></div>';}
function bdg(c,bg,t){return '<span class="bdg" style="background:'+bg+';color:'+c+';border:1px solid '+c+'40">'+t+'</span>';}
function daychip(d){var n=daysto(d);if(n==null)return bdg('#887060','rgba(136,112,96,.15)','No date');if(n<0)return bdg('#887060','rgba(136,112,96,.15)',Math.abs(n)+'d ago');if(n===0)return bdg('#E8B84B','rgba(200,146,42,.12)','TODAY');if(n<=3)return bdg('#C84030','rgba(200,64,48,.14)',n+'d left');if(n<=14)return bdg('#E8B84B','rgba(200,146,42,.12)',n+'d away');return bdg('#5A9E6F','rgba(90,158,111,.14)',n+'d');}
function svbdg(k,note){var sv=null;for(var i=0;i<SVCS.length;i++)if(SVCS[i].k===k){sv=SVCS[i];break;}if(!sv)return '';var lbl=(k==='other'&&note)?'Other: '+note:sv.l;return '<span style="background:'+sv.c+'18;color:'+sv.c+';border:1px solid '+sv.c+'28;border-radius:4px;padding:3px 8px;font-size:10px;font-weight:600;margin-right:4px;display:inline-block">'+xe(lbl)+'</span>';}
function flead(id){for(var i=0;i<DATA.leads.length;i++)if(DATA.leads[i].id===id)return DATA.leads[i];return null;}
function fbkg(id){for(var i=0;i<DATA.bookings.length;i++)if(DATA.bookings[i].id===id)return DATA.bookings[i];return null;}

// ── WHATSAPP ──────────────────────────────────────────────────────────────────
function buildWA(b){
  var p=calcp(b);
  var pays=(b.payments||[]).filter(function(px){return px.stage!=='Deposit Refund';}).sort(function(a,c){return new Date(a.date)-new Date(c.date);});
  var pay1=pays[0]||null,pay2=pays[1]||null;
  var balDate=b.startDate?fdate(new Date(new Date(b.startDate+'T00:00:00').getTime()-30*86400000).toISOString().slice(0,10)):'--';
  var L=['Dear *'+b.name+'*,','','Greetings from EVP Rajeswari Marriage Palace!','',
    'Thank you for confirming your booking. Find your details below:','',
    '*Client Details:*','Client Name: '+b.name];
  if(b.brideName||b.groomName)L.push('Bride & Groom: '+(b.brideName||'--')+' & '+(b.groomName||'--'));
  L.push('Contact: '+b.phone);
  if(b.altPhone)L.push('Alternate: '+b.altPhone);
  L.push('Event Date: '+durlbl(b.startDate,b.endDate),'Event Type: '+(b.fnOther||b.fnType||''),'',
    '*Tariff Details:*','Total Rent: '+fm(p.rent),'Maintenance Charges: '+fm(p.mnt),'Caution Deposit: '+fm(p.dep));
  if(p.disc>0)L.push('Discount: -'+fm(p.disc));
  L.push('*Grand Total: '+fm(p.grand)+'*','','*Payment Details:*');
  if(pay1)L.push('1st Payment: '+fm(pay1.amount)+' on '+fdate(pay1.date)+' via '+pay1.method);
  if(pay2)L.push('2nd Payment: '+fm(pay2.amount)+' on '+fdate(pay2.date)+' via '+pay2.method);
  L.push('Balance Yet to Pay: '+fm(p.bal),'Next Payment Due By: '+balDate,'',
    '*Inclusions:*',
    '- Rooms, Housekeeping, Vessels Usage (Veg Only)','- Vessels Cleaning, Security, Valet Drivers',
    '- Valet Parking, Sewage & Garbage Cleaning','- Leaf Cleaning, Water Usage, Basic Elevation Lights','',
    '*Other Charges:* (Adjusted from Caution Deposit)',
    '- EB Rs.24/unit | Generator Rs.4k-5k/hr','- Extra Lighting, Extra Beds, Extra Hours, Damages','',
    'Amount paid is non-refundable. Please verify details.','',
    'Warm regards,','Dhinakaran Bose | Manager','EVP Rajeswari Marriage Palace | Ph: 9444012856');
  var ph=(b.phone||'').split(';')[0].replace(/[^0-9]/g,'');
  var intl=ph.length>=10&&ph.indexOf('91')===0?ph:'91'+ph;
  return 'https://wa.me/'+intl+'?text='+encodeURIComponent(L.join('\n'));
}

function buildLeadWA(l){
  var L=['Dear *'+l.name+'*,','','Greetings from EVP Rajeswari Marriage Palace!','',
    'Thank you for your enquiry.','',
    'Event Type: '+(l.fnOther||l.fnType||''),'Event Date: '+durlbl(l.startDate,l.endDate),'Guests: '+(l.guests||'TBD'),'',
    'We would love to host your special occasion. Please contact us to confirm.','',
    'Warm regards,','Dhinakaran Bose | Manager','EVP Rajeswari Marriage Palace | Ph: 9444012856'];
  var ph=(l.phone||'').split(';')[0].replace(/[^0-9]/g,'');
  var intl=ph.length>=10&&ph.indexOf('91')===0?ph:'91'+ph;
  return 'https://wa.me/'+intl+'?text='+encodeURIComponent(L.join('\n'));
}

function csvcell(v){var s=String(v==null?'':v);s=s.split('"').join('""');if(s.indexOf(',')>=0||s.indexOf('\n')>=0)s='"'+s+'"';return s;}
function mkcsv(rows,cols){var L=[cols.map(csvcell).join(',')];rows.forEach(function(r){L.push(cols.map(function(c){return csvcell(r[c]);}).join(','));});return L.join('\n');}
function dlcsv(csv,name){try{var b=new Blob([csv],{type:'text/csv;charset=utf-8;'});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(u);},100);}catch(e){alert('Export failed. Try Chrome desktop.');}}
function exportLeads(){var rows=DATA.leads.map(function(l){return{'Name':l.name,'Phone':l.phone,'Email':l.email||'','Start Date':fd(l.startDate),'End Date':fd(l.endDate),'Function':l.fnType,'Guests':l.guests||'','Source':l.source,'Agent':l.agentName||'','Status':gstat(l.status).l,'Notes':l.notes||''};});dlcsv(mkcsv(rows,['Name','Phone','Email','Start Date','End Date','Function','Guests','Source','Agent','Status','Notes']),'EVP_Leads_'+today()+'.csv');}
function exportBookings(){var rows=DATA.bookings.map(function(b){var p=calcp(b);return{'Name':b.name,'Phone':b.phone,'Start Date':fd(b.startDate),'End Date':fd(b.endDate||b.startDate),'Function':b.fnType,'Guests':b.guests||'','Agent':b.agentName||'','Package':(gpkg(b.pkgId)||{}).l||'Custom','Grand Total':p.grand,'Paid':p.paid,'Balance':p.bal};});dlcsv(mkcsv(rows,['Name','Phone','Start Date','End Date','Function','Guests','Agent','Package','Grand Total','Paid','Balance']),'EVP_Bookings_'+today()+'.csv');}
function exportPayments(){var rows=[];DATA.bookings.forEach(function(b){(b.payments||[]).forEach(function(p){rows.push({'Booking':b.name,'Date':fd(p.date),'Amount':p.amount,'Method':p.method,'Stage':p.stage,'Note':p.note||'','Approved By':p.approvedBy||'Pending'});});});dlcsv(mkcsv(rows,['Booking','Date','Amount','Method','Stage','Note','Approved By']),'EVP_Payments_'+today()+'.csv');}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function go(page,bid){UI.page=page;UI.bid=bid||null;UI.sf='all';UI.q='';OV=null;EDIT_ID=null;FORM={};window.scrollTo(0,0);render();}
function openOv(type,editId){OV=type;EDIT_ID=editId||null;FORM={};if(type==='lead'&&editId){var l=flead(editId);if(l){FORM.services=(l.services||[]).slice();FORM.status=l.status||'new';}}if(type==='booking'&&editId){var bk=fbkg(editId);if(bk){FORM.services=(bk.services||[]).slice();FORM.pkgId=bk.pkgId||'half';}}if(type==='booking'&&!editId){FORM.services=[];FORM.pkgId='half';}if(type==='lead'&&!editId){FORM.services=[];FORM.status='new';}render();}
function closeOv(){OV=null;EDIT_ID=null;FORM={};render();}
function repage(){render();}

// ── LOGO ──────────────────────────────────────────────────────────────────────
function logo(h){h=h||28;return '<svg height="'+h+'" viewBox="0 0 320 130" style="display:block;flex-shrink:0"><path d="M160 8 L168 22 L182 15 L178 28 L195 24 L182 36 L138 36 L125 24 L142 28 L138 15 L152 22 Z" fill="#C8922A" opacity=".85"/><circle cx="160" cy="38" r="11" fill="none" stroke="#C8922A" stroke-width="1.5"/><text x="160" y="43" text-anchor="middle" font-size="8" fill="#C8922A" font-family="serif" letter-spacing="1">EVP</text><line x1="18" y1="52" x2="302" y2="52" stroke="#C8922A" stroke-width=".8"/><circle cx="18" cy="52" r="3" fill="#C8922A"/><circle cx="302" cy="52" r="3" fill="#C8922A"/><text x="160" y="78" text-anchor="middle" font-size="19" fill="#3D2010" font-family="Georgia,serif" font-weight="bold" letter-spacing="3">EVP RAJESHWARI</text><line x1="75" y1="88" x2="245" y2="88" stroke="#C8922A" stroke-width=".6"/><text x="160" y="102" text-anchor="middle" font-size="9" fill="#C8922A" font-family="Georgia,serif" letter-spacing="5">MARRIAGE PALACE</text></svg>';}

// ── SETUP SCREEN ──────────────────────────────────────────────────────────────
function renderSetup(){
  return '<div class="lwrap"><div class="lcard" style="max-width:480px"><div style="text-align:center;margin-bottom:20px">'+logo(80)+'</div><h2 style="margin-bottom:6px;text-align:center">One-Time Setup Required</h2><p style="color:var(--mu);font-size:12px;text-align:center;margin-bottom:20px">To enable cloud sync between Yokesh & Bose, connect a free Firebase database (takes 10 minutes)</p><div class="setup-step"><div class="step-num">1</div><div><div style="font-weight:700;margin-bottom:3px">Create Free Firebase Account</div><div style="font-size:12px;color:var(--mu)">Go to <strong style="color:var(--gold)">console.firebase.google.com</strong> → Click "Add Project" → Name it "evp-crm" → Continue</div></div></div><div class="setup-step"><div class="step-num">2</div><div><div style="font-weight:700;margin-bottom:3px">Set Database Rules (Allow Access)</div><div style="font-size:12px;color:var(--mu)">In Firebase Console → Realtime Database → <strong>Rules</strong> tab → Replace the rules with:<br><code style="background:#0F0804;padding:4px 8px;border-radius:4px;display:block;margin-top:6px;color:#E8B84B">{"rules":{".read":true,".write":true}}</code><br>Click <strong>Publish</strong></div></div></div><div class="setup-step"><div class="step-num">3</div><div><div style="font-weight:700;margin-bottom:3px">Get Your Config Keys</div><div style="font-size:12px;color:var(--mu)">Project Settings (⚙ gear icon) → Your Apps → Add Web App → Register → Copy the firebaseConfig object. <strong>Also copy the databaseURL</strong> — it looks like:<br><code style="background:#0F0804;padding:4px 8px;border-radius:4px;display:block;margin-top:4px;color:#E8B84B;font-size:10px">https://evp-crm-default-rtdb.asia-southeast1.firebasedatabase.app</code></div></div></div><div class="setup-step"><div class="step-num">4</div><div><div style="font-weight:700;margin-bottom:3px">Paste Config in HTML File</div><div style="font-size:12px;color:var(--mu)">Open this HTML file in Notepad → Find <strong>PASTE_API_KEY_HERE</strong> → Replace all 7 placeholder values including <strong>PASTE_DATABASE_URL_HERE</strong> with your Firebase config → Save the file</div></div></div><div class="setup-step"><div class="step-num">5</div><div><div style="font-weight:700;margin-bottom:3px">Host on Netlify (Free Permanent Link)</div><div style="font-size:12px;color:var(--mu)">Go to <strong style="color:var(--gold)">netlify.com</strong> → Sign up free → "Deploy manually" → Drag & drop this HTML file → Get your permanent link instantly!</div></div></div><div style="background:var(--goldF);border:1px solid var(--bdr);border-radius:8px;padding:12px;margin-top:10px;font-size:12px;color:var(--c2r)"><strong style="color:var(--gold)">✓ After setup:</strong> Both Yokesh & Bose open the same Netlify link → Log in → All data syncs instantly between phones in real time!</div><a href="https://console.firebase.google.com" target="_blank" class="btn bp bl" style="margin-top:14px;text-decoration:none">Open Firebase Console →</a></div></div>';
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function render(){
  var root=document.getElementById('app');
  if(!CONFIG_SET){root.innerHTML=renderSetup();return;}
  if(LOADING){root.innerHTML='<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px"><div class="spinner"></div><div style="color:var(--gold);font-size:14px">Connecting to cloud...</div></div>';return;}
  if(!AUTH){root.innerHTML=renderLogin();attachEvents();return;}
  var h=renderTopbar()+'<div class="pg">';
  if(UI.page==='dashboard')h+=renderDash();
  else if(UI.page==='leads')h+=renderLeads();
  else if(UI.page==='bookings')h+=renderBkgs();
  else if(UI.page==='booking')h+=renderBkg();
  else if(UI.page==='calendar')h+=renderCal();
  else if(UI.page==='payments')h+=renderPays();
  h+='</div>'+renderBotnav();
  if(OV)h+=renderOv();
  root.innerHTML=h;
  attachEvents();
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function renderLogin(){return '<div class="lwrap"><div class="lcard"><div style="text-align:center;margin-bottom:20px">'+logo(80)+'</div><div style="text-align:center;font-size:18px;font-weight:800;margin-bottom:4px">Welcome Back</div><div style="text-align:center;font-size:11px;color:var(--mu);margin-bottom:6px">EVP Rajeshwari CRM</div><div style="text-align:center;margin-bottom:20px"><span class="sync-dot"></span><span style="font-size:11px;color:var(--gr)">Live sync active — Cloud connected</span></div><div id="lerr" style="display:none;background:var(--rF);border:1px solid rgba(200,64,48,.35);border-radius:7px;padding:9px 13px;color:var(--rd);font-size:12px;text-align:center;margin-bottom:13px">Incorrect username or password</div><div class="fg"><label class="fl">Username</label><input class="inp" id="lu" placeholder="yokesh or bose" autocomplete="username"></div><div class="fg"><label class="fl">Password</label><input class="inp" id="lp" type="password" placeholder="Enter password"></div><button class="btn bp bl lg" data-action="login" style="margin-top:8px">Login</button></div></div>';}
function doLogin(){var u=(document.getElementById('lu')||{}).value||'';var p=(document.getElementById('lp')||{}).value||'';var k=u.toLowerCase().trim();var usr=USERS[k];if(usr&&usr.pass===p){AUTH={key:k,role:usr.role,display:usr.display};saveAuth();UI.page='dashboard';render();}else{var el=document.getElementById('lerr');if(el)el.style.display='block';}}

// ── TOPBAR ────────────────────────────────────────────────────────────────────
function renderTopbar(){
  var h='<div id="topbar">';
  if(UI.page==='booking'){var bk=fbkg(UI.bid);h+='<button class="btn bg sm" data-action="go-bookings">&larr; Back</button><div class="tbt">'+(bk?xe(bk.name):'Booking')+'<span class="tbs">'+(bk?xe(bk.fnType)+' &bull; '+xe(fd(bk.startDate)):'')+'</span></div>';}
  else{h+='<span style="cursor:pointer" data-action="go-dashboard">'+logo(26)+'</span>';h+='<div class="tbt">EVP Rajeshwari CRM<span class="tbs">'+xe(AUTH.display)+' &bull; <span style="padding:1px 6px;border-radius:3px;font-size:9px;font-weight:700;'+(isAdmin()?'background:rgba(200,146,42,.2);color:var(--gold)':'background:rgba(88,128,200,.15);color:var(--bl)')+'">'+(isAdmin()?'ADMIN':'STAFF')+'</span> &nbsp;<span class="sync-dot" title="Cloud synced"></span></span></div>';}
  h+='<button class="btn bgo sm" data-action="show-rate">₹ Rates</button>';
  h+='<button class="btn bg sm" data-action="logout">Logout</button>';
  h+='</div>';return h;
}

// ── BOTNAV ────────────────────────────────────────────────────────────────────
function renderBotnav(){
  var pc=DATA.bookings.reduce(function(s,b){return s+(b.payments||[]).filter(function(p){return !p.approvedBy;}).length;},0);
  var nav=[{p:'dashboard',i:'⊞',l:'Home'},{p:'leads',i:'👥',l:'Leads'},{p:'bookings',i:'📋',l:'Bookings'},{p:'calendar',i:'📅',l:'Calendar'},{p:'payments',i:'₹',l:'Payments'}];
  var h='<div id="botnav">';
  nav.forEach(function(n){
    var on=UI.page===n.p||(UI.page==='booking'&&n.p==='bookings');
    h+='<button class="nb'+(on?' on':'')+'" data-action="go-'+n.p+'">';
    h+='<span class="nbi">'+n.i;
    if(n.p==='payments'&&pc>0)h+='<span class="nbdg">'+pc+'</span>';
    h+='</span><span>'+n.l+'</span></button>';
  });
  h+='</div>';return h;
}

// ── PRICE TABLE ───────────────────────────────────────────────────────────────
function ptable(p){
  var h='<div class="ptbl">';
  h+='<div class="pr"><span style="color:var(--c2r)">Hall Rent</span><span style="color:var(--cr);font-weight:700">'+fm(p.rent)+'</span></div>';
  h+='<div class="pr"><span style="color:var(--c2r)">Maintenance</span><span style="color:var(--cr);font-weight:700">'+fm(p.mnt)+'</span></div>';
  h+='<div class="pr"><span style="color:var(--c2r)">Refundable Deposit</span><span style="color:var(--tl);font-weight:700">'+fm(p.dep)+'</span></div>';
  h+='<div class="pr" style="background:rgba(200,146,42,.07)"><span style="color:var(--cr);font-weight:700">Subtotal</span><span style="color:var(--gL);font-weight:700">'+fm(p.sub)+'</span></div>';
  if(p.disc>0)h+='<div class="pr"><span style="color:var(--or)">Discount (-)</span><span style="color:var(--or);font-weight:700">-'+fm(p.disc)+'</span></div>';
  if(p.disc>0||p.gR>0)h+='<div class="pr"><span style="color:var(--c2r)">Net Amount</span><span style="color:var(--cr);font-weight:600">'+fm(p.net)+'</span></div>';
  if(p.gR>0)h+='<div class="pr"><span style="color:var(--mu)">GST ('+p.gR+'%)</span><span style="color:var(--mu);font-weight:600">'+fm(p.gst)+'</span></div>';
  h+='<div class="ptot"><span style="color:var(--cr);font-size:15px;font-weight:800">GRAND TOTAL</span><span style="color:var(--gold);font-size:20px;font-weight:800">'+fm(p.grand)+'</span></div>';
  if(p.dep>0)h+='<div style="padding:5px 13px 8px;color:var(--tl);font-size:10px">Deposit of '+fm(p.dep)+' is refundable after event</div>';
  if(p.grand>0){h+=pbar(p.paid,p.grand||1,p.bal===0?'var(--gr)':'var(--gold)');h+='<div style="display:flex;justify-content:space-between;padding:4px 13px 8px"><span style="color:var(--gr);font-size:11px">Paid: '+fm(p.paid)+'</span><span style="color:'+(p.bal>0?'var(--rd)':'var(--gr)')+';font-size:11px;font-weight:700">'+(p.bal>0?'Balance: '+fm(p.bal):'✓ Fully Cleared')+'</span></div>';}
  h+='</div>';return h;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function renderDash(){
  var bs={};DATA.bookings.forEach(function(b){if(b.startDate){var s=new Date(b.startDate+'T00:00:00'),e=new Date((b.endDate||b.startDate)+'T00:00:00');while(s<=e){var _y=s.getFullYear(),_m=String(s.getMonth()+1).padStart(2,'0'),_d2=String(s.getDate()).padStart(2,'0');bs[_y+'-'+_m+'-'+_d2]=1;s=new Date(s.getTime()+86400000);}}});
  var rev=DATA.bookings.reduce(function(s,b){return s+paidof(b);},0);
  var pen=DATA.bookings.reduce(function(s,b){return s+calcp(b).bal;},0);
  var act=DATA.leads.filter(function(l){return l.status!=='confirmed'&&l.status!=='lost';}).length;
  var soon=DATA.bookings.filter(function(b){var d=daysto(b.startDate);return d!=null&&d>=0&&d<=30;});
  soon.sort(function(a,b){return daysto(a.startDate)-daysto(b.startDate);});
  var pbal=DATA.bookings.filter(function(b){return calcp(b).bal>0;});pbal.sort(function(a,b){return calcp(b).bal-calcp(a).bal;});
  var nm=MDATES.filter(function(d){return d>=today()&&d<='2027-12-31';}).slice(0,5);
  // All pending payments across all bookings
  var allPending=[];DATA.bookings.forEach(function(b){(b.payments||[]).forEach(function(px){if(!px.approvedBy)allPending.push(Object.assign({},px,{bName:b.name,bId:b.id}));});});
  var h='<div style="text-align:center;padding:14px 0 16px">'+logo(80)+'<div style="color:var(--mu);font-size:11px;margin-top:8px">'+new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+'</div></div>';

  // ══ APPROVAL PANEL — always visible for Yokesh, flashes when pending ══
  if(isAdmin()){
    h+='<div class="card '+(allPending.length?'flash-card':'')+'" style="margin-bottom:14px;padding:14px">';
    // Header
    h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:'+(allPending.length?'12':'0')+'px">';
    h+='<span style="font-size:28px">'+(allPending.length?'🔔':'✅')+'</span>';
    h+='<div style="flex:1"><div style="font-weight:800;font-size:16px;color:'+(allPending.length?'var(--or)':'var(--gr)');
    h+='">'+(allPending.length?allPending.length+' Payment(s) Awaiting Your Approval':'All Payments Approved ✓')+'</div>';
    h+='<div style="font-size:11px;color:var(--mu);margin-top:1px">'+(allPending.length?'Tap the orange button below to approve':'No action needed right now')+'</div></div>';
    if(allPending.length)h+='<span style="background:var(--or);color:#fff;border-radius:20px;padding:4px 12px;font-size:13px;font-weight:800;flex-shrink:0">'+allPending.length+'</span>';
    h+='</div>';
    // Each pending payment
    allPending.forEach(function(px){
      h+='<div style="background:rgba(208,112,48,.1);border:2px solid rgba(208,112,48,.5);border-radius:10px;padding:12px 14px;margin-bottom:8px">';
      h+='<div style="font-weight:800;font-size:15px;margin-bottom:2px">'+xe(px.bName)+'</div>';
      h+='<div style="color:var(--gr);font-size:22px;font-weight:800;margin-bottom:4px">'+fm(px.amount)+'</div>';
      h+='<div style="color:var(--mu);font-size:12px;margin-bottom:10px">'+fd(px.date)+' &bull; '+xe(px.method)+' &bull; '+xe(px.stage)+(px.note?' &bull; '+xe(px.note):'')+'</div>';
      h+='<div style="display:flex;gap:8px">';
      h+='<button class="btn pulse-btn bl" style="flex:2;padding:12px;font-size:14px;border-radius:8px" data-action="appr-pay" data-id="'+px.bId+'" data-pid="'+px.id+'">✓ APPROVE PAYMENT</button>';
      h+='<button class="btn bs sm" style="flex:1;padding:12px" data-action="view-bkg" data-id="'+px.bId+'">View</button>';
      h+='</div></div>';
    });
    h+='</div>';
  }
  if(allPending.length>0&&!isAdmin()){h+='<div class="alt alo">⚠ <strong>'+allPending.length+' payment(s)</strong> pending Yokesh&#39;s approval</div>';}

  h+='<div class="kgrid">';
  h+='<div class="kpi" data-action="go-leads"><div class="kpii">👥</div><div class="kpiv" style="color:var(--bl)">'+act+'</div><div class="kpil">Active Leads</div></div>';
  h+='<div class="kpi" data-action="go-bookings"><div class="kpii">📋</div><div class="kpiv" style="color:#9060C8">'+DATA.bookings.length+'</div><div class="kpil">Bookings</div></div>';
  h+='<div class="kpi" data-action="go-payments"><div class="kpii">💰</div><div class="kpiv" style="color:var(--gr);font-size:'+(fm(rev).length>9?'13':'17')+'px">'+fm(rev)+'</div><div class="kpil">Collected</div></div>';
  h+='<div class="kpi" data-action="go-payments"><div class="kpii">⏳</div><div class="kpiv" style="color:var(--rd);font-size:'+(fm(pen).length>9?'13':'17')+'px">'+fm(pen)+'</div><div class="kpil">Balance Due</div></div>';
  h+='</div>';
  h+='<div class="g2" style="margin-bottom:14px"><button class="btn bp bl" data-action="open-lead-form">+ New Lead</button><button class="btn bs bl" data-action="open-bkg-form">+ New Booking</button></div>';

  // YOKESH QUICK VIEW
  if(isAdmin()){
    loadTgts();
    var todBkgs=DATA.bookings.filter(function(b){var s=b.startDate,e=b.endDate||b.startDate,t=today();return s&&s<=t&&e>=t;});
    var urgPay=DATA.bookings.filter(function(b){var d=daysto(b.startDate);return d!=null&&d>=0&&d<=30&&calcp(b).bal>0;});
    urgPay.sort(function(a,b){return daysto(a.startDate)-daysto(b.startDate);});
    var doneRef=DATA.bookings.filter(function(b){return b.startDate&&daysto(b.endDate||b.startDate)<0&&Number(b.depositAmount||0)>0;});
    var refAmt=doneRef.reduce(function(s,b){return s+(Number(b.depositAmount)||0);},0);
    h+='<div class="card" style="padding:13px;margin-bottom:10px;border-color:var(--bdr)">';
    h+='<div class="stit">&#128274; Quick View — Yokesh</div>';
    if(todBkgs.length){
      h+='<div style="background:var(--gRF);border:1px solid rgba(90,158,111,.35);border-radius:8px;padding:10px;margin-bottom:8px">';
      h+='<div style="color:var(--gr);font-weight:800;margin-bottom:5px">&#127800; TODAY ('+todBkgs.length+' event'+( todBkgs.length>1?'s':'')+')</div>';
      todBkgs.forEach(function(b){var pp=calcp(b);h+='<div style="display:flex;justify-content:space-between;padding:3px 0"><span style="font-weight:700;font-size:13px">'+xe(b.name)+'</span><span style="color:'+(pp.bal>0?'var(--rd)':'var(--gr)')+';font-weight:700">'+(pp.bal>0?'Due: '+fm(pp.bal):'&#10003; Cleared')+'</span></div>';});
      h+='</div>';
    }else{h+='<div style="color:var(--mu);font-size:12px;margin-bottom:8px">No events today</div>';}
    if(urgPay.length){
      var urgTotal=urgPay.reduce(function(s,b){return s+calcp(b).bal;},0);
      h+='<div style="background:var(--rF);border:1px solid rgba(200,64,48,.35);border-radius:8px;padding:10px;margin-bottom:8px">';
      h+='<div style="display:flex;justify-content:space-between;margin-bottom:6px"><div style="color:var(--rd);font-weight:800">&#9203; Payments Due (30d)</div><div style="color:var(--rd);font-weight:800">'+fm(urgTotal)+'</div></div>';
      urgPay.slice(0,3).forEach(function(b){var pp=calcp(b),d=daysto(b.startDate);h+='<div style="display:flex;justify-content:space-between;padding:3px 0;cursor:pointer" data-action="view-bkg" data-id="'+b.id+'"><div><span style="font-size:12px;font-weight:700">'+xe(b.name)+'</span><span style="font-size:10px;color:var(--mu)"> ('+d+'d)</span></div><span style="color:var(--rd);font-weight:700;font-size:13px">'+fm(pp.bal)+'</span></div>';});
      if(urgPay.length>3)h+='<div style="font-size:10px;color:var(--mu);margin-top:4px">+' +(urgPay.length-3)+' more in Payments tab</div>';
      h+='</div>';
    }
    if(refAmt>0){h+='<div style="background:var(--tlF);border:1px solid rgba(48,160,144,.35);border-radius:8px;padding:10px;margin-bottom:8px;display:flex;justify-content:space-between"><div><div style="color:var(--tl);font-weight:800">&#128260; Deposits to Refund</div><div style="font-size:11px;color:var(--mu)">'+doneRef.length+' client(s)</div></div><div style="color:var(--tl);font-weight:800;font-size:15px">'+fm(refAmt)+'</div></div>';}
    // Monthly targets
    var now2=new Date(),cm=now2.getFullYear()+'-'+String(now2.getMonth()+1).padStart(2,'0');
    var mBkgs=DATA.bookings.filter(function(b){return b.createdAt&&b.createdAt.substring(0,7)===cm;}).length;
    var mRev=DATA.bookings.filter(function(b){return b.startDate&&b.startDate.substring(0,7)===cm;}).reduce(function(s,b){return s+calcp(b).grand;},0);
    var bPct=TGTS.b?Math.min(100,Math.round(mBkgs/TGTS.b*100)):0;
    var rPct=TGTS.r?Math.min(100,Math.round(mRev/TGTS.r*100)):0;
    h+='<div style="background:var(--c2);border-radius:8px;padding:10px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-size:12px;font-weight:700;color:var(--gL)">&#127945; Monthly Targets</span><button class="btn bgo sm" data-action="set-tgts" style="padding:3px 9px;font-size:10px">Edit</button></div>';
    h+='<div style="margin-bottom:5px"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px"><span style="color:var(--mu)">Bookings</span><span style="color:var(--gold)">'+mBkgs+'/'+TGTS.b+'</span></div>'+pbar(mBkgs,TGTS.b,bPct>=100?'var(--gr)':'var(--gold)')+'</div>';
    h+='<div><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px"><span style="color:var(--mu)">Revenue</span><span style="color:var(--or)">'+fm(mRev)+'/'+fm(TGTS.r)+'</span></div>'+pbar(mRev,TGTS.r,rPct>=100?'var(--gr)':'var(--or)')+'</div>';
    h+='</div>';
    h+='</div>';
  }

  // BUSINESS OVERVIEW
  var totRev=DATA.bookings.reduce(function(s,b){return s+calcp(b).grand;},0);
  var totColl=DATA.bookings.reduce(function(s,b){return s+paidof(b);},0);
  var totPend=DATA.bookings.reduce(function(s,b){return s+calcp(b).bal;},0);
  var totDep=DATA.bookings.reduce(function(s,b){return s+Number(b.depositAmount||0);},0);
  if(DATA.bookings.length){
    h+='<div class="card" style="padding:13px;margin-bottom:10px"><div class="stit">Business Summary</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px">';
    h+='<div style="background:var(--gRF);border:1px solid rgba(90,158,111,.3);border-radius:7px;padding:9px;text-align:center"><div style="font-size:9px;color:var(--mu)">TOTAL COLLECTED</div><div style="color:var(--gr);font-weight:800;font-size:13px">'+fm(totColl)+'</div></div>';
    h+='<div style="background:var(--rF);border:1px solid rgba(200,64,48,.3);border-radius:7px;padding:9px;text-align:center"><div style="font-size:9px;color:var(--mu)">YET TO RECEIVE</div><div style="color:var(--rd);font-weight:800;font-size:13px">'+fm(totPend)+'</div></div>';
    h+='<div style="background:var(--blF);border:1px solid rgba(88,128,200,.3);border-radius:7px;padding:9px;text-align:center"><div style="font-size:9px;color:var(--mu)">TOTAL REVENUE</div><div style="color:var(--bl);font-weight:800;font-size:13px">'+fm(totRev)+'</div></div>';
    h+='<div style="background:var(--tlF);border:1px solid rgba(48,160,144,.3);border-radius:7px;padding:9px;text-align:center"><div style="font-size:9px;color:var(--mu)">TO REFUND</div><div style="color:var(--tl);font-weight:800;font-size:13px">'+fm(totDep)+'</div></div>';
    h+='</div>';
    var cp2=totRev>0?Math.round(totColl/totRev*100):0;
    h+=pbar(totColl,totRev,cp2>=75?'var(--gr)':cp2>=50?'var(--gold)':'var(--or)');
    h+='<div style="font-size:10px;color:var(--mu);text-align:right;margin-top:2px">'+cp2+'% collected of total revenue</div>';
    h+='</div>';
  }
  var allSoon=DATA.bookings.filter(function(b){var d=daysto(b.startDate);return d!=null&&d>=0&&d<=120;});
  allSoon.sort(function(a,b){return daysto(a.startDate)-daysto(b.startDate);});
  if(allSoon.length){h+='<div class="card"><div class="stit">Upcoming Events ('+allSoon.length+')</div><div style="max-height:260px;overflow-y:auto">';allSoon.forEach(function(b){var pp=calcp(b);h+='<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--b2);cursor:pointer" data-action="view-bkg" data-id="'+b.id+'"><div><div style="font-weight:700">'+xe(b.name)+(ismuh(b.startDate)?' 🌸':'')+'</div><div style="font-size:11px;color:var(--mu)">'+xe(b.fnType)+' &bull; '+xe(fd(b.startDate))+'</div>'+(pp.bal>0?'<div style="font-size:11px;color:var(--rd)">Due: '+fm(pp.bal)+'</div>':'')+'</div>'+daychip(b.startDate)+'</div>';});h+='</div></div>';}  if(pbal.length){h+='<div class="card"><div class="stit">Balance Collection</div>';pbal.slice(0,5).forEach(function(b){var p=calcp(b);h+='<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--b2);cursor:pointer" data-action="view-bkg" data-id="'+b.id+'"><div><div style="font-weight:700">'+xe(b.name)+'</div><div style="font-size:11px;color:var(--mu)">'+xe(fd(b.startDate))+'</div></div><div style="text-align:right"><div style="color:var(--rd);font-weight:800">'+fm(p.bal)+'</div><div style="color:var(--mu);font-size:10px">of '+fm(p.grand)+'</div></div></div>';});h+='</div>';}
  h+='<div class="card"><div class="stit">Next Muhurtham</div>';
  nm.forEach(function(d){var bk=bs[d];h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--b2)"><span style="color:'+(bk?'var(--rd)':'var(--cr)')+'">'+fd(d)+'</span><div style="display:flex;align-items:center;gap:8px"><span style="color:var(--mu);font-size:11px">'+daysto(d)+'d</span>'+(bk?bdg('var(--rd)','var(--rF)','Booked'):bdg('var(--gr)','var(--gRF)','Free'))+'</div></div>';});
  h+='<button class="btn bs sm" data-action="go-calendar" style="margin-top:10px">Full Calendar →</button></div>';
  return h;
}

// ── LEADS ─────────────────────────────────────────────────────────────────────
function renderLeads(){
  var ld=DATA.leads.slice().reverse();
  if(UI.sf!=='all')ld=ld.filter(function(l){return l.status===UI.sf;});
  if(UI.q)ld=ld.filter(function(l){return (l.name+l.phone+(l.agentName||'')).toLowerCase().indexOf(UI.q.toLowerCase())>=0;});
  var cn={};STATS.forEach(function(s){cn[s.k]=DATA.leads.filter(function(l){return l.status===s.k;}).length;});
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h2>Leads <span style="color:var(--mu);font-size:13px;font-weight:400">('+DATA.leads.length+')</span></h2><button class="btn bp sm" data-action="open-lead-form">+ Lead</button></div>';
  h+='<div class="xbar"><button class="btn bex sm" data-action="export-leads">↓ Export Excel</button><button class="btn bs sm" data-action="open-sheets">↗ Google Sheets</button></div>';
  h+='<input class="srch" id="lsrch" placeholder="Search name / phone / agent..." value="'+xe(UI.q)+'">';
  h+='<div class="fbar"><button class="ftb'+(UI.sf==='all'?' on':'')+'" data-filter="all">All ('+DATA.leads.length+')</button>';
  STATS.forEach(function(s){h+='<button class="ftb'+(UI.sf===s.k?' on':'')+'" data-filter="'+s.k+'">'+s.l+' ('+(cn[s.k]||0)+')</button>';});
  h+='</div>';
  if(!ld.length)h+='<div style="text-align:center;padding:40px 0;color:var(--mu)">No leads found</div>';
  ld.forEach(function(l){
    var st=gstat(l.status),im=l.startDate&&ismuh(l.startDate);
    h+='<div class="card" style="padding:13px"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:800;margin-bottom:4px">'+xe(l.name)+(im?' 🌸':'')+'</div><div style="font-size:12px;color:var(--mu)">📞 '+xe(l.phone)+' &bull; '+xe(l.fnType)+'</div>';
    if(l.startDate)h+='<div style="font-size:12px;color:var(--mu)">'+xe(durlbl(l.startDate,l.endDate))+'</div>';
    h+='<div style="font-size:11px;color:var(--mu)">Agent: '+xe(l.agentName||'—')+' &bull; '+xe(l.source)+'</div></div>';
    h+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0">'+bdg(st.c,st.c+'22',st.l);
    if(l.startDate)h+=daychip(l.startDate);
    h+='</div></div>';
    h+='<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;align-items:center">';
    if(isAdmin())h+='<button class="btn bs sm" data-action="edit-lead" data-id="'+l.id+'">Edit</button>';
    h+='<button class="btn bwa sm" data-action="wa-lead" data-id="'+l.id+'">💬 WA</button>';
    h+='<select class="sel" data-action="lead-status" data-id="'+l.id+'" style="width:auto;padding:4px 7px;font-size:11px;background:'+st.c+'22;color:'+st.c+';border-color:'+st.c+'40">';
    STATS.forEach(function(s){h+='<option value="'+s.k+'"'+(l.status===s.k?' selected':'')+'>'+s.l+'</option>';});
    h+='</select>';
    var bex2=DATA.bookings.filter(function(b){return b.leadId===l.id;}).length>0;
    if(l.status==='confirmed'&&!bex2)h+='<button class="btn bsu sm" data-action="lead-to-bkg" data-id="'+l.id+'">&rarr; Book</button>';
    h+='</div></div>';
  });
  return h;
}

// ── BOOKINGS ──────────────────────────────────────────────────────────────────
function renderBkgs(){
  var bk=DATA.bookings.slice().reverse();
  if(UI.q)bk=bk.filter(function(b){return (b.name+b.phone+(b.agentName||'')).toLowerCase().indexOf(UI.q.toLowerCase())>=0;});
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h2>Bookings <span style="color:var(--mu);font-size:13px;font-weight:400">('+DATA.bookings.length+')</span></h2><button class="btn bp sm" data-action="open-bkg-form">+ Booking</button></div>';
  h+='<div class="xbar"><button class="btn bex sm" data-action="export-bookings">↓ Bookings Excel</button><button class="btn bex sm" data-action="export-payments">↓ Payments Excel</button></div>';
  h+='<input class="srch" id="bsrch" placeholder="Search..." value="'+xe(UI.q)+'">';
  if(!bk.length)h+='<div style="text-align:center;padding:40px 0;color:var(--mu)">No bookings yet</div>';
  bk.forEach(function(b){
    var p=calcp(b),mn=b.maint||defmaint(),mD=MAINT.filter(function(m){return mn[m.k]&&mn[m.k].done;}).length;
    var pp=(b.payments||[]).filter(function(x){return !x.approvedBy;}).length,im=b.startDate&&ismuh(b.startDate);
    var pct=p.grand?Math.round(p.paid/p.grand*100):0;
    h+='<div class="card" style="padding:13px;cursor:pointer" data-action="view-bkg" data-id="'+b.id+'">';
    h+='<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div style="flex:1;min-width:0">';
    h+='<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:4px"><span style="font-size:17px;font-weight:800">'+xe(b.name)+'</span>'+daychip(b.startDate);
    if(im)h+=bdg('var(--gr)','var(--gRF)','🌸');
    if(pp>0)h+=bdg('var(--or)','var(--orF)','⚠ '+pp+' approval');
    h+='</div><div style="font-size:12px;color:var(--mu);margin-bottom:2px">'+xe(b.fnType)+' &bull; '+xe(durlbl(b.startDate,b.endDate))+' &bull; '+(b.guests||'?')+' guests</div>';
    h+='<div style="font-size:11px;color:var(--mu)">Agent: <span style="color:var(--gL)">'+xe(b.agentName||'—')+'</span>'+(b.rooms?' &bull; '+b.rooms+' rooms':'')+'</div></div>';
    h+='<div style="text-align:right;flex-shrink:0"><div style="color:var(--gold);font-weight:800;font-size:16px">'+fm(p.grand)+'</div><div style="color:var(--gr);font-size:11px">Paid: '+fm(p.paid)+'</div><div style="color:'+(p.bal>0?'var(--rd)':'var(--gr)')+';font-size:12px;font-weight:700">'+(p.bal>0?'Due: '+fm(p.bal):'✓ Cleared')+'</div></div></div>';
    h+='<div class="g2" style="margin-top:10px;gap:8px"><div><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:9px;color:var(--mu)">Payment</span><span style="font-size:9px;color:var(--mu)">'+pct+'%</span></div>'+pbar(p.paid,p.grand||1,p.bal===0?'var(--gr)':'var(--gold)')+'</div><div><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:9px;color:var(--mu)">Maintenance</span><span style="font-size:9px;color:var(--mu)">'+mD+'/'+MAINT.length+'</span></div>'+pbar(mD,MAINT.length,mD===MAINT.length?'var(--gr)':'var(--pu)')+'</div></div></div>';
  });
  return h;
}

// ── BOOKING DETAIL ────────────────────────────────────────────────────────────
function renderBkg(){
  var b=fbkg(UI.bid);
  if(!b)return '<div style="text-align:center;padding:40px;color:var(--mu)">Booking not found</div>';
  var p=calcp(b),mn=b.maint||defmaint(),dC=MAINT.filter(function(m){return mn[m.k]&&mn[m.k].done;}).length;
  var im=b.startDate&&ismuh(b.startDate),pC=(b.payments||[]).filter(function(x){return !x.approvedBy;}).length;
  var adv=Math.round(p.grand*0.5);
  var bdate=b.startDate?fd(new Date(new Date(b.startDate+'T00:00:00').getTime()-30*86400000).toISOString().slice(0,10)):'—';
  var h='<div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn bwa bl" style="flex:1" data-action="wa-bkg" data-id="'+b.id+'">💬 WhatsApp Quote</button>'+(isAdmin()?'<button class="btn bs sm" data-action="edit-bkg" data-id="'+b.id+'">✏ Edit</button>':'')+'</div>';
  if(pC>0&&isAdmin())h+='<div class="alt alo flash-card" style="font-size:13px;font-weight:700">🔔 '+pC+' payment(s) waiting for your approval — scroll down to approve</div>';
  if(pC>0&&!isAdmin())h+='<div class="alt alo">⚠ '+pC+' payment(s) pending Yokesh&#39;s approval</div>';
  if(im)h+='<div class="alt alg">🌸 Tamil Muhurtham Date — prime booking slot</div>';
  h+='<div class="igrid">';
  h+='<div class="ic"><div class="icl">Phone</div><div class="icv"><a href="tel:'+xe(b.phone)+'">'+xe(b.phone)+'</a></div></div>';
  h+='<div class="ic"><div class="icl">Agent</div><div class="icv" style="color:var(--gL)">'+xe(b.agentName||'—')+'</div></div>';
  h+='<div class="ic"><div class="icl">Event Period</div><div class="icv">'+xe(durlbl(b.startDate,b.endDate))+'</div></div>';
  h+='<div class="ic"><div class="icl">Function</div><div class="icv">'+xe(b.fnType)+'</div></div>';
  h+='<div class="ic"><div class="icl">Package</div><div class="icv">'+xe((gpkg(b.pkgId)||{}).l||'Custom')+'</div></div>';
  h+='<div class="ic"><div class="icl">Guests</div><div class="icv">'+(b.guests||'—')+'</div></div>';
  if(b.rooms)h+='<div class="ic"><div class="icl">Rooms</div><div class="icv">'+b.rooms+(b.extraRooms?' + '+b.extraRooms+' extra':'')+'</div></div>';
  if(b.email)h+='<div class="ic"><div class="icl">Email</div><div class="icv" style="font-size:11px">'+xe(b.email)+'</div></div>';
  h+='</div>';
  if(b.services&&b.services.length){h+='<div class="card" style="padding:11px;margin-bottom:10px"><div class="stit">Services</div><div>';b.services.forEach(function(k){h+=svbdg(k,b.otherNote);});h+='</div></div>';}
  h+='<div class="stit">Rate Breakdown</div>'+ptable(p);
  if(p.grand>0){h+='<div class="c2" style="margin-bottom:12px"><div class="stit">Payment Schedule</div><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="color:var(--c2r)">50% Advance (at booking)</span><span style="color:var(--gr);font-weight:700">'+fm(adv)+'</span></div><div style="display:flex;justify-content:space-between"><span style="color:var(--c2r)">50% Balance (due by '+bdate+')</span><span style="color:var(--gL);font-weight:700">'+fm(p.grand-adv)+'</span></div></div>';}
  // RECORD PAYMENT
  h+='<div class="stit">Record Payment</div>';
  h+='<div class="c2" style="margin-bottom:12px">';
  h+='<div class="g2" style="margin-bottom:10px"><div class="fg" style="margin:0"><label class="fl">Amount (₹) <span class="rq">*</span></label><input class="inp" type="number" id="pamt" placeholder="0" inputmode="numeric"></div><div class="fg" style="margin:0"><label class="fl">Date</label><input class="inp" type="date" id="pdate" value="'+today()+'"></div></div>';
  h+='<div class="g2" style="margin-bottom:10px"><div class="fg" style="margin:0"><label class="fl">Method</label><select class="sel" id="pmeth">';
  PMETH.forEach(function(m){h+='<option>'+m+'</option>';});
  h+='</select></div><div class="fg" style="margin:0"><label class="fl">Stage</label><select class="sel" id="pstage">';
  PSTAGE.forEach(function(s){h+='<option>'+s+'</option>';});
  h+='</select></div></div>';
  h+='<div class="fg"><label class="fl">Reference / Note</label><input class="inp" id="pnote" placeholder="Cheque no., UTR, GPay ref..."></div>';
  h+='<button class="btn bp bl" data-action="rec-pay" data-id="'+b.id+'">+ Record Payment</button>';
  if(!isAdmin())h+='<div style="font-size:11px;color:var(--mu);text-align:center;margin-top:8px">Payments recorded here go to Yokesh for approval</div>';
  h+='</div>';
  // PAYMENT HISTORY
  var pays=(b.payments||[]).slice().reverse();
  h+='<div class="stit">Payment History ('+pays.length+')</div>';
  if(!pays.length)h+='<div style="text-align:center;padding:14px 0;color:var(--mu)">No payments recorded yet</div>';
  pays.forEach(function(px){
    var ap=px.approvedBy;
    h+='<div class="pi '+(ap?'ok':'pn')+'">';
    h+='<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">';
    h+='<div><div style="color:var(--gr);font-size:20px;font-weight:800">'+fm(px.amount)+'</div>';
    h+='<div style="color:var(--mu);font-size:11px;margin-top:2px">'+fd(px.date)+' &bull; '+xe(px.method)+' &bull; '+xe(px.stage)+'</div>';
    if(px.note)h+='<div style="color:var(--mu);font-size:10px">'+xe(px.note)+'</div>';
    h+='</div>'+(ap?bdg('var(--gr)','var(--gRF)','✓ Approved by '+xe(ap)):bdg('var(--or)','var(--orF)','⏳ Pending Approval'))+'</div>';
    h+='<div style="display:flex;gap:8px">';
    if(!ap&&isAdmin())h+='<button class="btn pulse-btn bl" style="padding:10px;font-size:14px;border-radius:8px" data-action="appr-pay" data-id="'+b.id+'" data-pid="'+px.id+'">✓ APPROVE PAYMENT</button>';
    if(!ap&&!isAdmin())h+='<div style="background:var(--orF);border:1px solid rgba(208,112,48,.3);border-radius:6px;padding:8px 12px;font-size:11px;color:var(--or);flex:1;text-align:center">⏳ Waiting for Yokesh to approve</div>';
    if(isAdmin())h+='<button class="btn bda sm" data-action="del-pay" data-id="'+b.id+'" data-pid="'+px.id+'">Delete</button>';
    h+='</div></div>';
  });
  // MAINTENANCE
  h+='<div class="stit" style="margin-top:6px">Maintenance Checklist</div>';
  h+='<div class="card" style="padding:12px;margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-weight:700">'+dC+'/'+MAINT.length+' Ready</span><span style="color:'+(dC===MAINT.length?'var(--gr)':'var(--gold)')+'">'+Math.round(dC/MAINT.length*100)+'%</span></div>'+pbar(dC,MAINT.length,dC===MAINT.length?'var(--gr)':'var(--gold)')+'<div style="display:flex;gap:8px;margin-top:10px"><button class="btn bgo sm" data-action="maint-all" data-id="'+b.id+'" data-val="1">✓ All Done</button><button class="btn bg sm" data-action="maint-all" data-id="'+b.id+'" data-val="0">Reset</button></div></div>';
  MCATS.forEach(function(cat){
    var ci=MAINT.filter(function(m){return m.cat===cat;}),cd=ci.filter(function(m){return mn[m.k]&&mn[m.k].done;}).length;
    h+='<div class="card" style="padding:12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:11px;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:.07em">'+cat+'</span><span style="font-size:10px;color:var(--mu)">'+cd+'/'+ci.length+'</span></div>';
    ci.forEach(function(m){
      var dn=mn[m.k]&&mn[m.k].done,nt=(mn[m.k]&&mn[m.k].note)||'';
      h+='<div class="mi"><div class="mchk'+(dn?' on':'')+'" data-action="tog-maint" data-id="'+b.id+'" data-mk="'+m.k+'">'+(dn?'<span style="color:var(--gr);font-size:13px;font-weight:900">✓</span>':'')+'</div><div style="flex:1"><div style="color:'+(dn?'var(--mu)':'var(--cr)')+';text-decoration:'+(dn?'line-through':'none')+';cursor:pointer" data-action="tog-maint" data-id="'+b.id+'" data-mk="'+m.k+'">'+m.e+' '+m.l+(m.k==='rm'&&b.rooms?' ('+b.rooms+(b.extraRooms?'+'+b.extraRooms:'')+')':'')+'</div><input type="text" class="mnt-note" value="'+xe(nt)+'" placeholder="Add note..." data-id="'+b.id+'" data-mk="'+m.k+'" style="background:transparent;border:none;border-bottom:1px solid var(--b2);color:var(--mu);font-size:10px;padding:2px 0;width:100%;outline:none;font-family:inherit;margin-top:3px"></div></div>';
    });
    h+='</div>';
  });
  if(b.notes)h+='<div class="card" style="padding:11px;margin-bottom:10px"><div class="stit">Notes</div><div style="color:var(--c2r);font-size:13px">'+xe(b.notes)+'</div></div>';
  h+='<button class="btn bwa bl lg" style="margin-top:4px" data-action="wa-bkg" data-id="'+b.id+'">💬 Send WhatsApp Quote</button><div style="height:20px"></div>';
  return h;
}

// ── CALENDAR ──────────────────────────────────────────────────────────────────
function renderCal(){
  var bs={},bm={};DATA.bookings.forEach(function(b){if(b.startDate){var s=new Date(b.startDate+'T00:00:00'),e=new Date((b.endDate||b.startDate)+'T00:00:00');while(s<=e){var _y=s.getFullYear(),_m=String(s.getMonth()+1).padStart(2,'0'),_d=String(s.getDate()).padStart(2,'0');var d=_y+'-'+_m+'-'+_d;bs[d]=1;if(!bm[d])bm[d]=[];bm[d].push(b);s=new Date(s.getTime()+86400000);}}});
  var yr=UI.cY,mo=UI.cM,fd2=new Date(yr,mo,1).getDay(),dim=new Date(yr,mo+1,0).getDate();
  var atS=(yr===2026&&mo===5),atE=(yr===2027&&mo===11);
  var mpx=String(mo+1).padStart(2,'0');
  var mds=MDATES.filter(function(d){return d.substring(0,7)===yr+'-'+mpx;});
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><button class="btn bs sm" data-action="cal-prev" '+(atS?'disabled':'')+'>&lsaquo; Prev</button><div style="text-align:center"><div style="font-size:17px;font-weight:800">'+MONTHS[mo]+' '+yr+'</div><div style="color:var(--gold);font-size:10px;margin-top:2px">'+TAMIL[mo]+' Masam</div></div><button class="btn bs sm" data-action="cal-next" '+(atE?'disabled':'')+'>&rsaquo; Next</button></div>';
  if(mo===6)h+='<div class="alt alo">Aadi Masam — traditionally no auspicious wedding dates this month</div>';
  if(mds.length){h+='<div class="card" style="padding:12px;margin-bottom:12px"><div class="stit">Muhurtham Dates — '+MONTHS[mo]+'</div><div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:7px">';mds.forEach(function(d){var bk=bs[d],day=parseInt(d.substring(8),10);h+='<div style="padding:4px 10px;border-radius:5px;cursor:pointer;background:'+(bk?'var(--rF)':'var(--gRF)')+';border:1px solid '+(bk?'rgba(200,64,48,.3)':'rgba(90,158,111,.3)')+';color:'+(bk?'var(--rd)':'var(--gr)')+';font-weight:700;font-size:13px" data-action="cal-sel" data-d="'+d+'">'+day+(bk?'':' ✓')+'</div>';});var fr=mds.filter(function(d){return !bs[d];}).length;h+='</div><div style="font-size:10px;color:var(--mu)">Green ✓ = Available | Red = Booked</div><div style="color:var(--gr);font-size:12px;font-weight:600;margin-top:5px">'+fr+' date(s) available</div></div>';}
  h+='<div class="card" style="padding:10px;margin-bottom:12px"><div class="cg" style="margin-bottom:4px">';
  ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(function(d){h+='<div style="text-align:center;font-size:9px;font-weight:700;color:var(--mu);padding:3px 0">'+d+'</div>';});
  h+='</div><div class="cg">';
  for(var i=0;i<fd2;i++)h+='<div></div>';
  for(var d=1;d<=dim;d++){var ds=yr+'-'+mpx+'-'+String(d).padStart(2,'0');var isT=ds===today(),isB=bs[ds],isM2=MUH[ds],isSel=UI.cSel===ds;var cls='cd';if(isT)cls+=' tod';else if(isB&&isM2)cls+=' bth';else if(isB)cls+=' bkd';else if(isM2)cls+=' muh';if(isSel)cls+=' sel';var tc=isT?'var(--gold)':isB?'var(--rd)':isM2?'var(--gL)':'var(--c2r)';h+='<div class="'+cls+'" data-action="cal-sel" data-d="'+ds+'"><span style="font-size:13px;color:'+tc+';font-weight:'+(isT||isB||isM2?'800':'400')+'">'+d+'</span><div style="display:flex;gap:2px">';if(isM2)h+='<div style="width:4px;height:4px;border-radius:50%;background:'+(isB?'var(--gr)':'var(--gold)')+'"></div>';if(isB)h+='<div style="width:4px;height:4px;border-radius:50%;background:var(--rd)"></div>';h+='</div></div>';}
  h+='</div></div>';
  if(UI.cSel){var sb=bm[UI.cSel]||[];h+='<div class="card" style="padding:12px;margin-bottom:12px"><div class="stit">'+fd(UI.cSel)+(MUH[UI.cSel]?' 🌸':'')+'</div>';if(!sb.length)h+='<div style="color:var(--mu);font-size:12px">No bookings'+(MUH[UI.cSel]?' — available!':'')+'</div>';sb.forEach(function(bk){var pp=calcp(bk);h+='<div class="c2" style="margin-bottom:6px;cursor:pointer" data-action="view-bkg" data-id="'+bk.id+'"><div style="font-weight:700">'+xe(bk.name)+'</div><div style="color:var(--mu);font-size:11px">'+xe(bk.fnType)+'</div><div style="color:'+(pp.bal>0?'var(--rd)':'var(--gr)')+';font-size:11px">Bal: '+fm(pp.bal)+'</div></div>';});h+='</div>';}
  var nm=MDATES.filter(function(d){return d>=today()&&d<='2027-12-31';}).slice(0,8);
  h+='<div class="card" style="padding:12px"><div class="stit">Upcoming Muhurtham</div>';nm.forEach(function(d){var bk=bs[d];h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--b2)"><span style="color:'+(bk?'var(--rd)':'var(--cr)')+';font-size:12px">'+fd(d)+'</span><div style="display:flex;align-items:center;gap:8px"><span style="color:var(--mu);font-size:11px">'+daysto(d)+'d</span>'+(bk?bdg('var(--rd)','var(--rF)','Booked'):bdg('var(--gr)','var(--gRF)','Free'))+'</div></div>';});h+='<div style="font-size:9px;color:var(--mu);margin-top:8px">Verify with local Panchangam</div></div>';
  return h;
}

// ── PAYMENTS ──────────────────────────────────────────────────────────────────
function renderPays(){
  var all=[];DATA.bookings.forEach(function(b){(b.payments||[]).forEach(function(p){all.push(Object.assign({},p,{bn:b.name,bid:b.id}));});});all.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  var rev=all.filter(function(p){return p.stage!=='Deposit Refund';}).reduce(function(s,p){return s+p.amount;},0);
  var pen=DATA.bookings.reduce(function(s,b){return s+calcp(b).bal;},0);
  var pa=all.filter(function(p){return !p.approvedBy;}).length;
  var h='<h2 style="margin-bottom:12px">Payments Overview</h2>';
  if(pa>0&&isAdmin())h+='<div class="alt alo flash-card" style="font-size:13px">🔔 <strong>'+pa+' payment(s)</strong> need your approval — go to Home screen to approve</div>';
  if(pa>0&&!isAdmin())h+='<div class="alt alo">⚠ <strong>'+pa+' payment(s)</strong> pending Yokesh&#39;s approval</div>';
  h+='<div class="kgrid"><div class="kpi"><div class="kpii">💰</div><div class="kpiv" style="color:var(--gr);font-size:'+(fm(rev).length>9?'13':'17')+'px">'+fm(rev)+'</div><div class="kpil">Collected</div></div><div class="kpi"><div class="kpii">⏳</div><div class="kpiv" style="color:var(--rd);font-size:'+(fm(pen).length>9?'13':'17')+'px">'+fm(pen)+'</div><div class="kpil">Pending</div></div><div class="kpi"><div class="kpii">🧾</div><div class="kpiv">'+all.length+'</div><div class="kpil">Transactions</div></div><div class="kpi"><div class="kpii">🔔</div><div class="kpiv" style="color:var(--or)">'+pa+'</div><div class="kpil">Pending Approval</div></div></div>';
  h+='<div class="stit">Booking Summary</div>';
  DATA.bookings.slice().reverse().forEach(function(b){var p=calcp(b);h+='<div class="card" style="padding:12px;margin-bottom:8px;cursor:pointer" data-action="view-bkg" data-id="'+b.id+'"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div style="font-weight:700;font-size:14px">'+xe(b.name)+'</div><div style="color:var(--mu);font-size:11px">'+fd(b.startDate)+(ismuh(b.startDate)?' 🌸':'')+' &bull; '+xe(b.agentName||'—')+'</div></div><div style="text-align:right"><div style="color:var(--gold);font-weight:800;font-size:15px">'+fm(p.grand)+'</div><div style="color:var(--gr);font-size:11px">Paid: '+fm(p.paid)+'</div><div style="color:'+(p.bal>0?'var(--rd)':'var(--gr)')+';font-size:12px;font-weight:700">'+(p.bal>0?'Due: '+fm(p.bal):'✓ Cleared')+'</div></div></div><div style="margin-top:7px">'+pbar(p.paid,p.grand||1,p.bal===0?'var(--gr)':'var(--gold)')+'</div></div>';});
  if(!DATA.bookings.length)h+='<div style="text-align:center;padding:30px 0;color:var(--mu)">No bookings yet</div>';
  if(all.length){h+='<div class="stit" style="margin-top:4px">Recent Transactions</div>';all.slice(0,20).forEach(function(p){h+='<div class="card" style="padding:10px;margin-bottom:6px;cursor:pointer" data-action="view-bkg" data-id="'+p.bid+'"><div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:700;color:var(--gr);font-size:15px">'+fm(p.amount)+'</div><div style="color:var(--mu);font-size:11px">'+xe(p.bn)+' &bull; '+fd(p.date)+' &bull; '+xe(p.method)+'</div><div style="color:var(--mu);font-size:10px">'+xe(p.stage)+(p.note?' &bull; '+xe(p.note):'')+'</div></div>'+(p.approvedBy?bdg('var(--gr)','var(--gRF)','✓ Approved'):bdg('var(--or)','var(--orF)','⏳ Pending'))+'</div></div>';});}
  return h;
}

// ── OVERLAYS ──────────────────────────────────────────────────────────────────
function renderOv(){
  var h='<div class="ov" id="ovlay"><div class="ovs"><div class="ovh"></div>';
  if(OV==='rate')h+=renderRate();else if(OV==='lead')h+=renderLeadForm();else if(OV==='booking')h+=renderBkgForm();else if(OV==='settgts')h+=renderSetTgts();
  h+='</div></div>';return h;
}
function renderSetTgts(){
  var h='<div class="ovhdr"><h2>&#127945; Monthly Targets</h2><button class="ovcl" data-action="close-ov">&#215;</button></div>';
  h+='<div class="fg"><label class="fl">Bookings Target</label><input class="inp" type="number" id="tg-b" value="'+TGTS.b+'"></div>';
  h+='<div class="fg"><label class="fl">Revenue Target (&#8377;)</label><input class="inp" type="number" id="tg-r" value="'+TGTS.r+'"><div style="font-size:10px;color:var(--mu);margin-top:3px">e.g. ₹20 lakhs = 2000000</div></div>';
  h+='<div class="g2"><button class="btn bg" data-action="close-ov">Cancel</button><button class="btn bp" data-action="save-tgts">Save</button></div>';
  return h;
}
function renderRate(){
  var h='<div class="ovhdr"><h2>Rate Card</h2><button class="ovcl" data-action="close-ov">&#215;</button></div>';
  PKGS.filter(function(p){return p.id!=='cust';}).forEach(function(p){h+='<div style="background:var(--c2);border:1px solid var(--bdr);border-radius:8px;padding:11px 13px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-weight:700;font-size:13px">'+p.l+'</div><div style="font-size:10px;color:var(--mu);margin-top:2px">'+p.dur+'</div></div><div style="text-align:right;flex-shrink:0;margin-left:10px"><div style="font-size:10px;color:var(--mu)">Rent: <b style="color:var(--gL)">'+fm(p.rent)+'</b></div><div style="font-size:10px;color:var(--mu)">Maint: <b style="color:var(--cr)">'+fm(p.maint)+'</b></div><div style="font-size:10px;color:var(--tl)">Dep: '+fm(p.dep)+'</div><div style="font-size:13px;font-weight:800;color:var(--gold);margin-top:3px">Total: '+fm(p.rent+p.maint+p.dep)+'</div></div></div>';});
  h+='<div style="margin-top:12px;background:var(--c2);border:1px solid var(--bdr);border-radius:8px;padding:12px"><div class="stit">Payment Terms</div>';
  ['Cash / UPI (GPay) / Bank Transfer / Cheque','50% advance to confirm & block date','Balance 50% due 30 days before event','Deposit refundable within 7 working days post-event','Advance non-refundable on cancellation'].forEach(function(t){h+='<div style="color:var(--c2r);font-size:12px;padding:4px 0;border-bottom:1px solid var(--b2)">&bull; '+t+'</div>';});
  h+='</div><button class="btn bs bl" data-action="close-ov" style="margin-top:12px">Close</button>';return h;
}

function renderLeadForm(){
  var isEdit=!!EDIT_ID,l=isEdit?flead(EDIT_ID):{};
  var svcs=FORM.services||[],status=FORM.status||l.status||'new';
  var h='<div class="ovhdr"><h2>'+(isEdit?'Edit':'New')+' Lead</h2><button class="ovcl" data-action="close-ov">&#215;</button></div>';
  h+='<div class="g2"><div class="fg"><label class="fl">Name <span class="rq">*</span></label><input class="inp" id="lf-nm" value="'+xe(l.name||'')+'"></div><div class="fg"><label class="fl">Phone <span class="rq">*</span></label><input class="inp" id="lf-ph" type="tel" value="'+xe(l.phone||'')+'"></div></div>';
  h+='<div class="fg"><label class="fl">Email</label><input class="inp" id="lf-em" type="email" value="'+xe(l.email||'')+'"></div>';
  h+='<div class="g2"><div class="fg"><label class="fl">Start Date</label><input class="inp" id="lf-sd" type="date" value="'+xe(l.startDate||'')+'"></div><div class="fg"><label class="fl">End Date</label><input class="inp" id="lf-ed" type="date" value="'+xe(l.endDate||'')+'"></div></div>';
  h+='<div class="g2"><div class="fg"><label class="fl">Function</label><select class="sel" id="lf-fn">';FN_TYPES.forEach(function(f){h+='<option'+(f===(l.fnType||FN_TYPES[0])?' selected':'')+' value="'+xe(f)+'">'+xe(f)+'</option>';});h+='</select></div><div class="fg"><label class="fl">Guests</label><input class="inp" id="lf-gu" type="number" value="'+xe(l.guests||'')+'"></div></div>';
  h+='<div class="g2"><div class="fg"><label class="fl">Source</label><select class="sel" id="lf-src">';SOURCES.forEach(function(s){h+='<option'+(s===(l.source||SOURCES[0])?' selected':'')+' value="'+xe(s)+'">'+xe(s)+'</option>';});h+='</select></div><div class="fg"><label class="fl">Agent</label><select class="sel" id="lf-ag">';AGENTS.forEach(function(a){h+='<option'+(a===(l.agentName||AGENTS[0])?' selected':'')+' value="'+xe(a)+'">'+xe(a)+'</option>';});h+='</select></div></div>';
  h+='<div class="fg"><label class="fl">Services</label><div class="svcg">';SVCS.forEach(function(sv){var on=svcs.indexOf(sv.k)>=0;h+='<div class="svci" data-action="tog-svc" data-sk="'+sv.k+'" style="border-color:'+(on?sv.c:'var(--bdr)')+';background:'+(on?sv.c+'14':'var(--c2)')+'"><div class="svck" style="border-color:'+(on?sv.c:'var(--mu)')+';background:'+(on?sv.c:'transparent')+'">'+(on?'<span style="color:#0F0804;font-size:10px;font-weight:900">✓</span>':'')+'</div><span style="color:'+(on?sv.c:'var(--c2r)')+';font-size:12px;font-weight:'+(on?700:400)+'">'+sv.l+'</span></div>';});h+='</div></div>';
  if(svcs.indexOf('other')>=0)h+='<div class="fg" id="lf-ow"><label class="fl">Specify Other</label><input class="inp" id="lf-ot" value="'+xe(l.otherNote||'')+'"></div>';
  h+='<div class="fg"><label class="fl">Status</label><div class="spills">';STATS.forEach(function(s){var on=status===s.k;h+='<button class="spill" data-action="set-lst" data-sk="'+s.k+'" style="border-color:'+(on?s.c:'var(--bdr)')+';background:'+(on?s.c+'22':'var(--c2)')+';color:'+(on?s.c:'var(--mu)')+'">'+s.l+'</button>';});h+='</div></div>';
  h+='<div class="fg"><label class="fl">Notes</label><textarea class="ta" id="lf-no">'+xe(l.notes||'')+'</textarea></div>';
  h+='<div class="g2" style="margin-top:6px"><button class="btn bg" data-action="close-ov">Cancel</button><button class="btn bp" data-action="save-lead">Save Lead</button></div>';
  return h;
}

function renderBkgForm(){
  var isEdit=!!EDIT_ID,b=isEdit?fbkg(EDIT_ID):(Object.keys(FORM).length>2?FORM:{});
  var defFn=b.fnType||FN_TYPES[0];
  var defPkgId=FORM.pkgId||b.pkgId||(PKG_MAP[defFn]||['half'])[0];
  var defPkg=gpkg(defPkgId)||PKGS[0];
  var svcs=FORM.services||[];
  var rv=b.rentAmount!=null?b.rentAmount:defPkg.rent,mv=b.maintAmount!=null?b.maintAmount:defPkg.maint,dv=b.depositAmount!=null?b.depositAmount:defPkg.dep;
  var discv=b.discountAmount||0,gstEn=b.gstEnabled||false,gstRv=b.gstRate||18;
  var net=Math.max(0,rv+mv+dv-discv),gst2=gstEn?Math.round(net*gstRv/100):0,grand=net+gst2;
  var h='<div class="ovhdr"><h2>'+(isEdit?'Edit':'New')+' Booking</h2><button class="ovcl" data-action="close-ov">&#215;</button></div>';
  h+='<div class="g2"><div class="fg"><label class="fl">Name <span class="rq">*</span></label><input class="inp" id="bf-nm" value="'+xe(b.name||'')+'"></div><div class="fg"><label class="fl">Phone <span class="rq">*</span></label><input class="inp" id="bf-ph" type="tel" value="'+xe(b.phone||'')+'"></div></div>';
  h+='<div class="fg"><label class="fl">Email</label><input class="inp" id="bf-em" value="'+xe(b.email||'')+'"></div>';
  h+='<div class="g2"><div class="fg"><label class="fl">Start Date</label><input class="inp" id="bf-sd" type="date" value="'+xe(b.startDate||'')+'"></div><div class="fg"><label class="fl">End Date</label><input class="inp" id="bf-ed" type="date" value="'+xe(b.endDate||'')+'"></div></div>';
  h+='<div class="fg"><label class="fl">Function Type</label><select class="sel" id="bf-fn" onchange="autoPkg()">'; FN_TYPES.forEach(function(f){h+='<option'+(f===defFn?' selected':'')+' value="'+xe(f)+'">'+xe(f)+'</option>';});h+='</select>';h+='<div id="bf-fn-other" style="display:'+(defFn==="Other"?"block":"none")+';margin-top:6px"><input class="inp" id="bf-fnother" value="'+xe(b.fnOther||'')+'" placeholder="Specify function name..."></div>';h+='</div>';h+='<div class="fg"><label class="fl">Guests</label><input class="inp" id="bf-gu" type="number" value="'+xe(b.guests||'')+'"></div><div class="fg"><label class="fl">Guests</label><input class="inp" id="bf-gu" type="number" value="'+xe(b.guests||'')+'"></div></div>';
  h+='<div class="g3"><div class="fg"><label class="fl">Rooms</label><input class="inp" id="bf-rm" type="number" value="'+xe(b.rooms||'')+'"></div><div class="fg"><label class="fl">Extra Rooms</label><input class="inp" id="bf-xr" type="number" value="'+xe(b.extraRooms||'')+'"></div><div class="fg"><label class="fl">Agent</label><select class="sel" id="bf-ag">';AGENTS.forEach(function(a){h+='<option'+(a===(b.agentName||AGENTS[0])?' selected':'')+' value="'+xe(a)+'">'+xe(a)+'</option>';});h+='</select></div></div>';
  var avail=(PKG_MAP[defFn]||['cust']).map(function(id){return gpkg(id);}).filter(Boolean);
  h+='<div class="fg"><label class="fl">Package</label><div class="pkgg" id="bf-pkggrid">';avail.forEach(function(p){var on=defPkgId===p.id;h+='<div class="pkgi" data-action="sel-pkg" data-pkgid="'+p.id+'" style="border-color:'+(on?'var(--gold)':'var(--bdr)')+';background:'+(on?'var(--gF)':'var(--c2)')+'"><div style="font-weight:700;font-size:11px;color:'+(on?'var(--gL)':'var(--cr)')+'">'+p.l+'</div><div style="font-size:9px;color:var(--mu)">'+p.dur+'</div>'+(p.rent>0?'<div style="font-size:10px;color:'+(on?'var(--gL)':'var(--mu)')+'">'+fm(p.rent+p.maint+p.dep)+'</div>':'<div style="font-size:10px;color:var(--mu)">Custom</div>')+'</div>';});h+='</div></div>';
  h+='<div class="fg"><label class="fl">Services</label><div class="svcg">';SVCS.forEach(function(sv){var on=svcs.indexOf(sv.k)>=0;h+='<div class="svci" data-action="tog-bsvc" data-sk="'+sv.k+'" style="border-color:'+(on?sv.c:'var(--bdr)')+';background:'+(on?sv.c+'14':'var(--c2)')+'"><div class="svck" style="border-color:'+(on?sv.c:'var(--mu)')+';background:'+(on?sv.c:'transparent')+'">'+(on?'<span style="color:#0F0804;font-size:10px;font-weight:900">✓</span>':'')+'</div><span style="color:'+(on?sv.c:'var(--c2r)')+';font-size:12px;font-weight:'+(on?700:400)+'">'+sv.l+'</span></div>';});h+='</div></div>';
  if(svcs.indexOf('other')>=0)h+='<div class="fg" id="bf-ow"><label class="fl">Specify Other</label><input class="inp" id="bf-ot" value="'+xe(b.otherNote||'')+'"></div>';
  h+='<div class="stit">Rate Breakdown</div>';
  h+='<div class="g3" style="margin-bottom:8px"><div class="fg" style="margin:0"><label class="fl">Rent (₹)</label><input class="inp" type="number" id="bf-rv" value="'+rv+'" oninput="updBFtot()"></div><div class="fg" style="margin:0"><label class="fl">Maint (₹)</label><input class="inp" type="number" id="bf-mv" value="'+mv+'" oninput="updBFtot()"></div><div class="fg" style="margin:0"><label class="fl">Deposit (₹)</label><input class="inp" type="number" id="bf-dv" value="'+dv+'" oninput="updBFtot()"></div></div>';
  h+='<div class="g2" style="margin-bottom:8px"><div class="fg" style="margin:0"><label class="fl">Discount (₹)</label><input class="inp" type="number" id="bf-di" value="'+discv+'" oninput="updBFtot()"></div><div class="fg" style="margin:0"><label class="fl">Disc Reason</label><input class="inp" id="bf-dn" value="'+xe(b.discountNote||'')+'"></div></div>';
  h+='<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap"><label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;color:var(--c2r)"><input type="checkbox" id="bf-gst"'+(gstEn?' checked':'')+' onchange="updBFtot()"> Apply GST</label><input type="number" id="bf-gr" value="'+gstRv+'" style="width:52px;background:var(--c2);border:1px solid var(--bdr);border-radius:6px;padding:4px 7px;color:var(--cr);font-family:inherit;font-size:12px;outline:none" oninput="updBFtot()"> %</div>';
  h+='<div style="background:rgba(200,146,42,.08);border:1px solid var(--bdr);border-radius:9px;padding:10px 13px;margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="color:var(--c2r);font-size:12px">Subtotal</span><span id="bf-sub" style="color:var(--gL);font-weight:700">'+fm(rv+mv+dv)+'</span></div><div style="display:flex;justify-content:space-between"><span style="color:var(--cr);font-size:14px;font-weight:800">GRAND TOTAL</span><span id="bf-tot" style="color:var(--gold);font-size:18px;font-weight:800">'+fm(grand)+'</span></div><div style="margin-top:8px"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;color:var(--c2r)">50% Advance</span><span id="bf-adv" style="font-size:11px;color:var(--gr);font-weight:700">'+fm(Math.round(grand*0.5))+'</span></div><div style="display:flex;justify-content:space-between"><span style="font-size:11px;color:var(--c2r)">50% Balance</span><span id="bf-bal" style="font-size:11px;color:var(--gL);font-weight:700">'+fm(grand-Math.round(grand*0.5))+'</span></div></div></div>';
  h+='<div class="fg"><label class="fl">Advance Paid Now (₹)</label><input class="inp" type="number" id="bf-adv0" value="'+xe(b.advanceAmount||'')+'"></div>';
  h+='<div class="fg"><label class="fl">Notes</label><textarea class="ta" id="bf-no">'+xe(b.notes||'')+'</textarea></div>';
  h+='<input type="hidden" id="bf-pkgid" value="'+xe(defPkgId)+'"><input type="hidden" id="bf-lid" value="'+xe(b.leadId||'')+'">';
  h+='<div class="g2" style="margin-top:6px"><button class="btn bg" data-action="close-ov">Cancel</button><button class="btn bp" data-action="save-bkg">Confirm Booking</button></div>';
  return h;
}

function updBFtot(){var r=Number((document.getElementById('bf-rv')||{}).value)||0,m=Number((document.getElementById('bf-mv')||{}).value)||0,d=Number((document.getElementById('bf-dv')||{}).value)||0,di=Number((document.getElementById('bf-di')||{}).value)||0,gEn=(document.getElementById('bf-gst')||{}).checked||false,gR=gEn?(Number((document.getElementById('bf-gr')||{}).value)||18):0,net=Math.max(0,r+m+d-di),gst=gR?Math.round(net*gR/100):0,grand=net+gst;var se=document.getElementById('bf-sub');if(se)se.textContent=fm(r+m+d);var te=document.getElementById('bf-tot');if(te)te.textContent=fm(grand);var ae=document.getElementById('bf-adv');if(ae)ae.textContent=fm(Math.round(grand*0.5));var be=document.getElementById('bf-bal');if(be)be.textContent=fm(grand-Math.round(grand*0.5));}


function autoPkg(){
  var fn=(document.getElementById('bf-fn')||{}).value||FN_TYPES[0];
  var ow=document.getElementById('bf-fn-other');
  if(ow)ow.style.display=fn==='Other'?'block':'none';
  var avail=(PKG_MAP[fn]||['half']).map(function(id){return gpkg(id);}).filter(Boolean);
  if(!avail.length)return;
  var p=avail[0];
  FORM.pkgId=p.id;
  var pi=document.getElementById('bf-pkgid');if(pi)pi.value=p.id;
  if(p.rent>0){
    var ri=document.getElementById('bf-rv');if(ri)ri.value=p.rent;
    var mi=document.getElementById('bf-mv');if(mi)mi.value=p.maint;
    var di=document.getElementById('bf-dv');if(di)di.value=p.dep;
    updBFtot();
  }
  var grid=document.getElementById('bf-pkggrid');
  if(grid){
    var h='';
    avail.forEach(function(pkg){
      var on=FORM.pkgId===pkg.id;
      h+='<div class="pkgi" data-action="sel-pkg" data-pkgid="'+pkg.id+'" style="border-color:'+(on?'var(--gold)':'var(--bdr)')+';background:'+(on?'var(--gF)':'var(--c2)')+'">';
      h+='<div style="font-weight:700;font-size:11px;color:'+(on?'var(--gL)':'var(--cr)')+'">'+pkg.l+'</div>';
      h+='<div style="font-size:9px;color:var(--mu)">'+pkg.dur+'</div>';
      h+=(pkg.rent>0?'<div style="font-size:10px;color:'+(on?'var(--gL)':'var(--mu)')+'">'+fm(pkg.rent+pkg.maint+pkg.dep)+'</div>':'<div style="font-size:10px;color:var(--mu)">Custom</div>');
      h+='</div>';
    });
    grid.innerHTML=h;
  }
}
// ── SAVE FUNCTIONS ────────────────────────────────────────────────────────────
function saveLead(){
  var name=(document.getElementById('lf-nm')||{}).value||'',phone=(document.getElementById('lf-ph')||{}).value||'';
  if(!name.trim()||!phone.trim()){alert('Name and Phone are required.');return;}
  var obj={name:name.trim(),phone:phone.trim(),email:(document.getElementById('lf-em')||{}).value||'',startDate:(document.getElementById('lf-sd')||{}).value||'',endDate:(document.getElementById('lf-ed')||{}).value||'',fnType:(document.getElementById('lf-fn')||{}).value||FN_TYPES[0],guests:(document.getElementById('lf-gu')||{}).value||'',source:(document.getElementById('lf-src')||{}).value||SOURCES[0],agentName:(document.getElementById('lf-ag')||{}).value||AGENTS[0],services:FORM.services||[],otherNote:(document.getElementById('lf-ot')||{}).value||'',status:FORM.status||'new',notes:(document.getElementById('lf-no')||{}).value||''};
  if(EDIT_ID){if(!isAdmin()){alert('Only Yokesh (Admin) can edit leads.');return;}obj.id=EDIT_ID;}
  else{obj.id=uid();obj.createdAt=new Date().toISOString();}
  cloudSaveLead(obj);closeOv();
}
function saveBkg(){
  var name=(document.getElementById('bf-nm')||{}).value||'',phone=(document.getElementById('bf-ph')||{}).value||'';
  if(!name.trim()||!phone.trim()){alert('Name and Phone are required.');return;}
  var rent=Number((document.getElementById('bf-rv')||{}).value)||0,mnt=Number((document.getElementById('bf-mv')||{}).value)||0,dep=Number((document.getElementById('bf-dv')||{}).value)||0,disc=Number((document.getElementById('bf-di')||{}).value)||0,gstEn=(document.getElementById('bf-gst')||{}).checked||false,gstR=Number((document.getElementById('bf-gr')||{}).value)||18,adv=Number((document.getElementById('bf-adv0')||{}).value)||0,pkgId=(document.getElementById('bf-pkgid')||{}).value||'half',leadId=(document.getElementById('bf-lid')||{}).value||'';
  var obj={name:name.trim(),phone:phone.trim(),email:(document.getElementById('bf-em')||{}).value||'',startDate:(document.getElementById('bf-sd')||{}).value||'',endDate:(document.getElementById('bf-ed')||{}).value||'',fnType:(document.getElementById('bf-fn')||{}).value||FN_TYPES[0],guests:(document.getElementById('bf-gu')||{}).value||'',rooms:(document.getElementById('bf-rm')||{}).value||'',extraRooms:(document.getElementById('bf-xr')||{}).value||'',agentName:(document.getElementById('bf-ag')||{}).value||AGENTS[0],pkgId:pkgId,services:FORM.services||[],otherNote:(document.getElementById('bf-ot')||{}).value||'',rentAmount:rent,maintAmount:mnt,depositAmount:dep,discountAmount:disc,discountNote:(document.getElementById('bf-dn')||{}).value||'',gstEnabled:gstEn,gstRate:gstR,fnOther:(document.getElementById('bf-fnother')||{}).value||'',notes:(document.getElementById('bf-no')||{}).value||''};
  if(EDIT_ID){
    if(!isAdmin()){alert('Only Yokesh (Admin) can edit bookings.');return;}
    var ex=fbkg(EDIT_ID);if(ex)obj=Object.assign({},ex,obj);
    obj.id=EDIT_ID;cloudSaveBooking(obj);closeOv();
  }else{
    obj.id=uid();obj.createdAt=new Date().toISOString();obj.payments=[];obj.maint=defmaint();
    if(leadId){obj.leadId=leadId;var lx=flead(leadId);if(lx)cloudSaveLead(Object.assign({},lx,{status:'confirmed'}));}
    if(adv>0)obj.payments.push({id:uid(),amount:adv,date:today(),method:PMETH[0],stage:PSTAGE[0],note:'Initial advance',approvedBy:null});
    cloudSaveBooking(obj);closeOv();
  }
}

// ── ATTACH EVENTS ─────────────────────────────────────────────────────────────
function attachEvents(){
  var ls=document.getElementById('lsrch');if(ls)ls.addEventListener('input',function(){UI.q=this.value;repage();});
  var bs2=document.getElementById('bsrch');if(bs2)bs2.addEventListener('input',function(){UI.q=this.value;repage();});
  var lp2=document.getElementById('lp');if(lp2)lp2.addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
  var lu2=document.getElementById('lu');if(lu2)lu2.addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
  document.querySelectorAll('.mnt-note').forEach(function(inp){inp.addEventListener('change',function(){var bid=this.getAttribute('data-id'),mk=this.getAttribute('data-mk'),val=this.value;var bkg=fbkg(bid);if(!bkg)return;var mn=Object.assign({},bkg.maint||defmaint());mn[mk]=Object.assign({},mn[mk]||{done:false},{note:val});cloudSaveBooking(Object.assign({},bkg,{maint:mn}));});});
}

// ── GLOBAL CLICK HANDLER ──────────────────────────────────────────────────────
document.addEventListener('click',function(e){
  var el=e.target;
  var target=el;
  while(target&&!target.getAttribute('data-action')&&target!==document.body)target=target.parentElement;
  if(!target)return;
  var act=target.getAttribute('data-action');
  var id=target.getAttribute('data-id');
  var pid=target.getAttribute('data-pid');
  var mk=target.getAttribute('data-mk');
  var sk=target.getAttribute('data-sk');
  var filt=target.getAttribute('data-filter');
  var d=target.getAttribute('data-d');
  var val=target.getAttribute('data-val');
  var pkgid=target.getAttribute('data-pkgid');
  if(!act)return;

  if(act==='login'){doLogin();return;}
  if(act==='logout'){AUTH=null;saveAuth();render();return;}
  if(act==='close-ov'){closeOv();return;}
  if(act==='show-rate'){openOv('rate',null);return;}
  if(act==='open-lead-form'){openOv('lead',null);return;}
  if(act==='open-bkg-form'){openOv('booking',null);return;}
  if(act==='edit-lead'){openOv('lead',id);return;}
  if(act==='edit-bkg'){openOv('booking',id);return;}
  if(act==='save-lead'){saveLead();return;}
  if(act==='save-bkg'){saveBkg();return;}
  if(act==='go-dashboard'){go('dashboard');return;}
  if(act==='go-leads'){go('leads');return;}
  if(act==='go-bookings'){go('bookings');return;}
  if(act==='go-calendar'){go('calendar');return;}
  if(act==='go-payments'){go('payments');return;}
  if(act==='view-bkg'){go('booking',id);return;}
  if(act==='go-booking'){go('booking',id);return;}
  if(act==='export-leads'){exportLeads();return;}
  if(act==='export-bookings'){exportBookings();return;}
  if(act==='export-payments'){exportPayments();return;}
  if(act==='open-sheets'){window.open('https://sheets.new','_blank');return;}
  if(act==='cal-prev'){if(UI.cM===0){UI.cM=11;UI.cY--;}else UI.cM--;if(UI.cY<2026||(UI.cY===2026&&UI.cM<5)){UI.cY=2026;UI.cM=5;}repage();return;}
  if(act==='cal-next'){if(UI.cM===11){UI.cM=0;UI.cY++;}else UI.cM++;if(UI.cY>2027||(UI.cY===2027&&UI.cM>11)){UI.cY=2027;UI.cM=11;}repage();return;}
  if(act==='cal-sel'){UI.cSel=(UI.cSel===d)?null:d;repage();return;}
  if(act==='wa-lead'){var l2=flead(id);if(l2){var lph=(l2.phone||'').split(';')[0].replace(/[^0-9]/g,'');if(!lph){alert('No phone number for this lead.');return;}window.open(buildLeadWA(l2),'_blank');}return;}
  if(act==='wa-bkg'){var b2=fbkg(id);if(b2)window.open(buildWA(b2),'_blank');return;}

  if(act==='lead-status'){var sel=target;if(sel.tagName!=='SELECT')return;var lx=flead(id);if(lx)cloudSaveLead(Object.assign({},lx,{status:sel.value}));return;}
  if(act==='lead-to-bkg'){var l3=flead(id);if(!l3)return;var pi=(PKG_MAP[l3.fnType]||['half'])[0],pkg2=gpkg(pi)||PKGS[0];FORM={services:(l3.services||[]).slice(),pkgId:pi,name:l3.name,phone:l3.phone,email:l3.email||'',startDate:l3.startDate||'',endDate:l3.endDate||'',fnType:l3.fnType,guests:l3.guests||'',agentName:l3.agentName||AGENTS[0],otherNote:l3.otherNote||'',rentAmount:pkg2.rent,maintAmount:pkg2.maint,depositAmount:pkg2.dep,leadId:id};EDIT_ID=null;OV='booking';render();return;}

  if(act==='rec-pay'){
    var amt=Number((document.getElementById('pamt')||{}).value)||0;
    if(!amt||amt<=0){alert('Enter a valid amount.');return;}
    var bkg=fbkg(id);if(!bkg)return;
    var px={id:uid(),amount:amt,date:(document.getElementById('pdate')||{}).value||today(),method:(document.getElementById('pmeth')||{}).value||PMETH[0],stage:(document.getElementById('pstage')||{}).value||PSTAGE[0],note:(document.getElementById('pnote')||{}).value||'',approvedBy:null};
    var pays=(bkg.payments||[]).slice();pays.push(px);
    cloudSaveBooking(Object.assign({},bkg,{payments:pays}));
    // Clear the form
    setTimeout(function(){var pa=document.getElementById('pamt');if(pa)pa.value='';var pn=document.getElementById('pnote');if(pn)pn.value='';},100);
    return;
  }
  if(act==='appr-pay'){
    if(!isAdmin()){alert('Only Yokesh (Admin) can approve payments.');return;}
    var bkg2=fbkg(id);if(!bkg2)return;
    var pays2=(bkg2.payments||[]).map(function(p){return p.id===pid?Object.assign({},p,{approvedBy:AUTH.display,approvedAt:new Date().toISOString()}):p;});
    cloudSaveBooking(Object.assign({},bkg2,{payments:pays2}));return;
  }
  if(act==='del-pay'){
    if(!confirm('Delete this payment record?'))return;
    var bkg3=fbkg(id);if(!bkg3)return;
    var pays3=(bkg3.payments||[]).filter(function(p){return p.id!==pid;});
    cloudSaveBooking(Object.assign({},bkg3,{payments:pays3}));return;
  }
  if(act==='tog-maint'){
    var bkg4=fbkg(id);if(!bkg4)return;
    var mn=Object.assign({},bkg4.maint||defmaint());var cur=mn[mk]||{done:false,note:''};mn[mk]=Object.assign({},cur,{done:!cur.done});
    cloudSaveBooking(Object.assign({},bkg4,{maint:mn}));return;
  }
  if(act==='maint-all'){
    var bkg5=fbkg(id);if(!bkg5)return;var v2=val==='1';
    var mn2={};MAINT.forEach(function(m){mn2[m.k]={done:v2,note:((bkg5.maint||{})[m.k]||{}).note||''};});
    cloudSaveBooking(Object.assign({},bkg5,{maint:mn2}));return;
  }

  if(act==='tog-svc'){FORM.services=FORM.services||[];var idx=FORM.services.indexOf(sk);if(idx>=0)FORM.services.splice(idx,1);else FORM.services.push(sk);var item=target;while(item&&!item.classList.contains('svci'))item=item.parentElement;var sv2=null;for(var i2=0;i2<SVCS.length;i2++)if(SVCS[i2].k===sk){sv2=SVCS[i2];break;}if(item&&sv2){var on2=FORM.services.indexOf(sk)>=0;item.style.borderColor=on2?sv2.c:'var(--bdr)';item.style.background=on2?sv2.c+'14':'var(--c2)';var chk=item.querySelector('.svck');if(chk){chk.style.borderColor=on2?sv2.c:'var(--mu)';chk.style.background=on2?sv2.c:'transparent';chk.innerHTML=on2?'<span style="color:#0F0804;font-size:10px;font-weight:900">✓</span>':'';}var lbl=item.querySelector('span');if(lbl){lbl.style.color=on2?sv2.c:'var(--c2r)';lbl.style.fontWeight=on2?'700':'400';}}var ow=document.getElementById('lf-ow');if(ow)ow.style.display=FORM.services.indexOf('other')>=0?'block':'none';return;}
  if(act==='tog-bsvc'){FORM.services=FORM.services||[];var idx2=FORM.services.indexOf(sk);if(idx2>=0)FORM.services.splice(idx2,1);else FORM.services.push(sk);var item2=target;while(item2&&!item2.classList.contains('svci'))item2=item2.parentElement;var sv3=null;for(var i3=0;i3<SVCS.length;i3++)if(SVCS[i3].k===sk){sv3=SVCS[i3];break;}if(item2&&sv3){var on3=FORM.services.indexOf(sk)>=0;item2.style.borderColor=on3?sv3.c:'var(--bdr)';item2.style.background=on3?sv3.c+'14':'var(--c2)';var chk2=item2.querySelector('.svck');if(chk2){chk2.style.borderColor=on3?sv3.c:'var(--mu)';chk2.style.background=on3?sv3.c:'transparent';chk2.innerHTML=on3?'<span style="color:#0F0804;font-size:10px;font-weight:900">✓</span>':'';}var lbl2=item2.querySelector('span');if(lbl2){lbl2.style.color=on3?sv3.c:'var(--c2r)';lbl2.style.fontWeight=on3?'700':'400';}}var ow2=document.getElementById('bf-ow');if(ow2)ow2.style.display=FORM.services.indexOf('other')>=0?'block':'none';return;}
  if(act==='set-lst'){FORM.status=sk;document.querySelectorAll('[data-action="set-lst"]').forEach(function(btn){var s2=null;for(var i4=0;i4<STATS.length;i4++)if(STATS[i4].k===btn.getAttribute('data-sk')){s2=STATS[i4];break;}if(!s2)return;var on4=btn.getAttribute('data-sk')===sk;btn.style.borderColor=on4?s2.c:'var(--bdr)';btn.style.background=on4?s2.c+'22':'var(--c2)';btn.style.color=on4?s2.c:'var(--mu)';});return;}
  if(act==='sel-pkg'){FORM.pkgId=pkgid;var pkg3=gpkg(pkgid);if(pkg3&&pkg3.rent>0){var ri=document.getElementById('bf-rv');if(ri)ri.value=pkg3.rent;var mi=document.getElementById('bf-mv');if(mi)mi.value=pkg3.maint;var di2=document.getElementById('bf-dv');if(di2)di2.value=pkg3.dep;var pi2=document.getElementById('bf-pkgid');if(pi2)pi2.value=pkgid;updBFtot();}document.querySelectorAll('[data-action="sel-pkg"]').forEach(function(btn){var on5=btn.getAttribute('data-pkgid')===pkgid;btn.style.borderColor=on5?'var(--gold)':'var(--bdr)';btn.style.background=on5?'var(--gF)':'var(--c2)';});return;}
  if(filt){UI.sf=filt;document.querySelectorAll('[data-filter]').forEach(function(btn){btn.className=btn.getAttribute('data-filter')===filt?'ftb on':'ftb';});repage();return;}
  if(el.id==='ovlay'){closeOv();return;}
});

document.addEventListener('change',function(e){
  var el=e.target,act=el.getAttribute('data-action'),id=el.getAttribute('data-id');
  if(act==='lead-status'&&el.tagName==='SELECT'){var lx=flead(id);if(lx)cloudSaveLead(Object.assign({},lx,{status:el.value}));}
});

// ── START ─────────────────────────────────────────────────────────────────────
loadTgts();
loadAuth();
initFirebase();