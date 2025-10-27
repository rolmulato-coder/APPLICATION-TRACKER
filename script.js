// Simple job tracker using localStorage
const emailInput = document.getElementById('emailInput');
const saveEmailBtn = document.getElementById('saveEmailBtn');
const savedEmail = document.getElementById('savedEmail');

const addPortalBtn = document.getElementById('addPortalBtn');
const addPortalForm = document.getElementById('addPortalForm');
const portalName = document.getElementById('portalName');
const portalUrl = document.getElementById('portalUrl');
const savePortalBtn = document.getElementById('savePortalBtn');
const cancelPortalBtn = document.getElementById('cancelPortalBtn');
const portalLinks = document.getElementById('portalLinks');

const jobForm = document.getElementById('jobForm');
const company = document.getElementById('company');
const role = document.getElementById('role');
const dateApplied = document.getElementById('dateApplied');
const status = document.getElementById('status');

const jobsTableBody = document.querySelector('#jobsTable tbody');
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');

let jobs = [];
let portals = [];
let editId = null;

// --- storage helpers
function saveAll(){
  localStorage.setItem('jobs.v1', JSON.stringify(jobs));
  localStorage.setItem('portals.v1', JSON.stringify(portals));
}
function loadAll(){
  const j = localStorage.getItem('jobs.v1');
  const p = localStorage.getItem('portals.v1');
  jobs = j ? JSON.parse(j) : [];
  portals = p ? JSON.parse(p) : [];
  const email = localStorage.getItem('email.v1');
  if(email){ savedEmail.textContent = email; emailInput.value = email; }
}

// --- email
saveEmailBtn.addEventListener('click', ()=>{
  const val = emailInput.value.trim();
  if(!val) return alert('Enter an email');
  localStorage.setItem('email.v1', val);
  savedEmail.textContent = val;
});

// --- portals
addPortalBtn.addEventListener('click', (e)=>{ e.preventDefault(); addPortalForm.classList.toggle('hidden'); });
cancelPortalBtn.addEventListener('click', ()=>{ addPortalForm.classList.add('hidden'); portalName.value = portalUrl.value = '' });
savePortalBtn.addEventListener('click', ()=>{
  const name = portalName.value.trim();
  let url = portalUrl.value.trim();
  if(!name || !url) return alert('Enter name and url');
  if(!/^https?:\/\//i.test(url)) url = 'https://' + url;
  portals.push({id:Date.now(),name, url});
  portalName.value = portalUrl.value = '';
  addPortalForm.classList.add('hidden');
  renderPortals(); saveAll();
});

function renderPortals(){
  portalLinks.querySelectorAll('a').forEach((a)=>{ if(a.id !== 'addPortalBtn') a.remove(); });
  const li1 = document.createElement('a'); li1.href='https://www.linkedin.com/jobs/'; li1.target='_blank'; li1.rel='noopener'; li1.textContent='LinkedIn Jobs';
  const li2 = document.createElement('a'); li2.href='https://www.indeed.com/'; li2.target='_blank'; li2.rel='noopener'; li2.textContent='Indeed';
  portalLinks.insertBefore(li2, document.getElementById('addPortalBtn'));
  portalLinks.insertBefore(li1, document.getElementById('addPortalBtn'));

  portals.forEach(p=>{
    const a = document.createElement('a');
    a.href = p.url; a.target='_blank'; a.rel='noopener'; a.textContent = p.name;
    portalLinks.insertBefore(a, document.getElementById('addPortalBtn'));
  });
}

// --- jobs
jobForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const c = company.value.trim();
  const r = role.value.trim();
  const d = dateApplied.value || '';
  const s = status.value;
  if(!c || !r) return alert('Company and role required');

  if(editId){
    const idx = jobs.findIndex(j=>j.id===editId);
    if(idx>-1){ jobs[idx] = {...jobs[idx],company:c, role:r, dateApplied:d, status:s}; }
    editId = null;
  } else {
    jobs.unshift({id:Date.now(),company:c, role:r, dateApplied:d, status:s});
  }
  jobForm.reset();
  renderJobs(); saveAll();
});

function renderJobs(){
  jobsTableBody.innerHTML='';
  const q = searchInput.value.trim().toLowerCase();
  const f = filterStatus.value;
  const filtered = jobs.filter(j=>{
    if(f && j.status !== f) return false;
    if(q){ return j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q) }
    return true;
  });

  filtered.forEach(j=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(j.company)}</td>
      <td>${escapeHtml(j.role)}</td>
      <td>${j.dateApplied || ''}</td>
      <td>${j.status}</td>
      <td></td>
    `;
    const actionsTd = tr.querySelector('td:last-child');
    const editBtn = document.createElement('button'); editBtn.className='actions-btn btn-edit'; editBtn.textContent='Edit';
    const delBtn = document.createElement('button'); delBtn.className='actions-btn btn-delete'; delBtn.textContent='Delete';
    editBtn.addEventListener('click', ()=>{ startEdit(j.id); });
    delBtn.addEventListener('click', ()=>{ if(confirm('Delete this entry?')){ jobs = jobs.filter(x=>x.id!==j.id); renderJobs(); saveAll(); } });
    actionsTd.appendChild(editBtn); actionsTd.appendChild(delBtn);
    jobsTableBody.appendChild(tr);
  });
}

function startEdit(id){
  const item = jobs.find(j=>j.id===id); if(!item) return;
  company.value = item.company; role.value = item.role; dateApplied.value = item.dateApplied || '';
  status.value = item.status; editId = id;
}

function escapeHtml(str){ return String(str).replace(/[&<>\"']/g, s=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[s])); }

searchInput.addEventListener('input', renderJobs);
filterStatus.addEventListener('change', renderJobs);

// init
loadAll(); renderPortals(); renderJobs();
