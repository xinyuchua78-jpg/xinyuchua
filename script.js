const courses=[
{title:'AI 时代通识课',cat:'beginner',type:'零基础入门',desc:'理解生成式 AI、模型能力边界与高效协作方法。',icon:'AI',tag:'最受欢迎',bg:'#e4e8ff',glow:'#a9b4ff',color:'#4758d6',meta:'6 小时 · 18 节课'},
{title:'提示词工程实战',cat:'business',type:'商业与效率',desc:'用结构化提示词完成研究、分析、写作与自动化。',icon:'{ }',tag:'编辑推荐',bg:'#e2f4ed',glow:'#91dcc0',color:'#258066',meta:'8 小时 · 24 节课'},
{title:'生成式 AI 视觉创作',cat:'creator',type:'内容与设计',desc:'从创意构思到稳定出图，建立完整的视觉工作流。',icon:'✦',tag:'热门',bg:'#f2e5f7',glow:'#d4a3e3',color:'#8e4daa',meta:'12 小时 · 32 节课'},
{title:'Python 与机器学习',cat:'developer',type:'开发与工程',desc:'用 Python 掌握数据处理、模型训练与评估基础。',icon:'Py',tag:'完整路径',bg:'#e2edf9',glow:'#99bfe7',color:'#356fa7',meta:'28 小时 · 56 节课'},
{title:'构建你的 AI 智能体',cat:'developer',type:'开发与工程',desc:'从工具调用、记忆到工作流，独立开发实用 Agent。',icon:'⌘',tag:'2026 新课',bg:'#e5e8fb',glow:'#929ee9',color:'#4350a8',meta:'16 小时 · 38 节课'},
{title:'AI 产品与商业创新',cat:'business',type:'商业与效率',desc:'识别高价值场景，设计并验证 AI 原生产品。',icon:'↗',tag:'管理者精选',bg:'#f6eadb',glow:'#e4bd87',color:'#a66b25',meta:'10 小时 · 26 节课'}];
let filter='all',query='';const $=s=>document.querySelector(s);
function render(){const list=courses.filter(c=>(filter==='all'||c.cat===filter)&&`${c.title}${c.type}${c.desc}`.toLowerCase().includes(query.toLowerCase()));$('#courseGrid').innerHTML=list.map(c=>`<article class="course-card"><div class="course-art" style="--bg:${c.bg};--glow:${c.glow};--color:${c.color}"><small>${c.tag}</small><strong>${c.icon}</strong></div><div class="course-info"><small>${c.type}</small><h3>${c.title}</h3><p>${c.desc}</p><div class="course-meta"><span>◷ ${c.meta}</span><button data-title="${c.title}" aria-label="收藏 ${c.title}">→</button></div></div></article>`).join('');$('#empty').hidden=!!list.length}
function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2200)}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});
$('#courseGrid').onclick=e=>{const b=e.target.closest('[data-title]');if(b)toast(`已收藏「${b.dataset.title}」`)};
$('#searchOpen').onclick=()=>{$('#search').classList.add('open');$('#searchInput').focus()};$('#searchClose').onclick=()=>$('#search').classList.remove('open');$('#searchInput').oninput=e=>{query=e.target.value;render();$('#courses').scrollIntoView()};
$('#loginOpen').onclick=()=>$('#modal').classList.add('open');$('#modalClose').onclick=()=>$('#modal').classList.remove('open');$('#modal').onclick=e=>{if(e.target===$('#modal'))$('#modal').classList.remove('open')};
$('#loginForm').onsubmit=e=>{e.preventDefault();$('#modal').classList.remove('open');toast(`欢迎回来，${$('#name').value}！`)};
$('#menu').onclick=()=>$('#nav').classList.toggle('open');document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
$('#video').onclick=()=>toast('介绍视频即将上线');$('#tryLab').onclick=()=>toast('AI 实验室演示已为你开启');
$('#signupForm').onsubmit=e=>{e.preventDefault();toast('注册成功，欢迎开启 AI 学习之旅！');e.target.reset()};render();
