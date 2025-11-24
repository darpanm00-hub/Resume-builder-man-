// Simple, dependency-free JS to wire form <-> preview



// Form inputs -> preview
[nameInput,titleInput,emailInput,phoneInput,addressInput,websiteInput,summaryInput].forEach(el=>{
el.addEventListener('input', renderPreview);
});


function renderPreview(){
p_name.textContent = nameInput.value || 'Your Name';
p_title.textContent = titleInput.value || 'Job Title';
const contactParts = [];
if(emailInput.value) contactParts.push(emailInput.value);
if(phoneInput.value) contactParts.push(phoneInput.value);
if(websiteInput.value) contactParts.push(websiteInput.value);
p_contact.textContent = contactParts.join(' · ');
p_summary.textContent = summaryInput.value || 'Short summary will appear here.';


// experience
p_experience.innerHTML = '';
state.experience.forEach(exp=>{
const div = document.createElement('div');
const title = document.createElement('strong'); title.textContent = exp.role + ' — ' + exp.company;
const dates = document.createElement('div'); dates.className='muted'; dates.textContent = (exp.start || '') + (exp.end ? (' — ' + exp.end) : '');
const details = document.createElement('p'); details.textContent = exp.details || '';
div.appendChild(title); div.appendChild(dates); div.appendChild(details);
p_experience.appendChild(div);
});


// education
p_education.innerHTML = '';
state.education.forEach(ed=>{
const div = document.createElement('div');
const title = document.createElement('strong'); title.textContent = ed.school + (ed.year ? (' — ' + ed.year) : '');
const deg = document.createElement('div'); deg.textContent = ed.degree || '';
div.appendChild(title); div.appendChild(deg);
p_education.appendChild(div);
});


// skills handled in renderSkills
}


// Buttons
addEducationBtn.addEventListener('click', ()=>createEducationForm());
addExperienceBtn.addEventListener('click', ()=>createExperienceForm());


downloadBtn.addEventListener('click', ()=>{
// Use print dialog to allow PDF export
window.print();
});


resetBtn.addEventListener('click', ()=>{
if(confirm('Clear all fields and reset the resume?')){ location.reload(); }
});


// initial
createEducationForm({school:'University of Example', degree:'B.Sc. Computer Science', year:'2020'});
createExperienceForm({company:'Acme Corp', role:'Frontend Developer', start:'2021', end:'2024', details:'Built responsive web apps using vanilla JS and small frameworks.'});
renderSkills();
renderPreview();


// small utility
function escapeHtml(str){ return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }


