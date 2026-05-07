import { sharedStyles } from './shared-styles';
import { sharedUi } from './shared-ui';

export const dashboardHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TVBox Source Aggregator</title>
<style>
${sharedStyles}

/* Dashboard-specific */
.header{margin-bottom:48px}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:16px;
  margin-bottom:32px;
}

@media(max-width:560px){
  .stats-grid{grid-template-columns:1fr}
}

.stat-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:24px;
  position:relative;
  overflow:hidden;
  transition:border-color 0.3s, transform 0.2s;
  animation:fadeSlideUp 0.5s ease-out both;
}

.stat-card:nth-child(1){animation-delay:0.1s}
.stat-card:nth-child(2){animation-delay:0.15s}
.stat-card:nth-child(3){animation-delay:0.2s}
.stat-card:nth-child(4){animation-delay:0.25s}

.stat-card:hover{
  border-color:var(--border-glow);
  transform:translateY(-2px);
}

.stat-card::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg, transparent, var(--green-dim), transparent);
}

.stat-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:12px;
  display:flex;
  align-items:center;
  gap:6px;
}

.stat-icon{
  width:14px;height:14px;
  opacity:0.5;
}

.stat-value{
  font-family:var(--mono);
  font-size:2.2rem;
  font-weight:700;
  color:var(--text-bright);
  line-height:1;
  letter-spacing:-0.02em;
}

.stat-value .unit{
  font-size:0.8rem;
  font-weight:400;
  color:var(--text-dim);
  margin-left:4px;
}

.stat-card.highlight .stat-value{
  color:var(--green);
  text-shadow:0 0 20px var(--green-dim);
}

/* Update time section */
.update-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  margin-bottom:32px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  animation:fadeSlideUp 0.5s ease-out 0.3s both;
}

@media(max-width:560px){
  .update-section{flex-direction:column;align-items:flex-start}
}

.update-info{
  display:flex;flex-direction:column;gap:4px;
}

.update-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
}

.update-time{
  font-family:var(--mono);
  font-size:0.95rem;
  color:var(--text-bright);
  font-weight:500;
}

.update-time.stale{color:var(--amber)}
.update-time.never{color:var(--red)}

/* Source Health Section */
.health-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  margin-bottom:32px;
  animation:fadeSlideUp 0.5s ease-out 0.32s both;
}

.health-summary{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  margin-bottom:8px;
}

.health-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
}

.health-counts{
  display:flex;
  gap:16px;
  font-family:var(--mono);
  font-size:0.75rem;
}

.health-count{
  display:flex;
  align-items:center;
  gap:4px;
}

.health-count.ok{color:var(--green)}
.health-count.warn{color:var(--amber)}
.health-count.error{color:var(--red)}

.health-dot{
  width:6px;height:6px;
  border-radius:50%;
  display:inline-block;
}

.health-dot.ok{background:var(--green);box-shadow:0 0 6px var(--green-glow)}
.health-dot.warn{background:var(--amber);box-shadow:0 0 6px var(--amber-dim)}
.health-dot.error{background:var(--red);box-shadow:0 0 6px var(--red-dim)}

.health-table-wrap{
  overflow-x:auto;
  margin-top:12px;
}

.health-table{
  width:100%;
  border-collapse:collapse;
  font-family:var(--mono);
  font-size:0.7rem;
}

.health-table th{
  text-align:left;
  padding:8px 10px;
  font-size:0.6rem;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--text-dim);
  border-bottom:1px solid var(--border);
  white-space:nowrap;
}

.health-table td{
  padding:8px 10px;
  border-bottom:1px solid var(--border);
  color:var(--text);
  white-space:nowrap;
}

.health-table tr:last-child td{border-bottom:none}

.health-table .url-cell{
  max-width:200px;
  overflow:hidden;
  text-overflow:ellipsis;
  color:var(--text-dim);
}

.health-table .status-ok{color:var(--green)}
.health-table .status-warn{color:var(--amber)}
.health-table .status-error{color:var(--red)}

.health-table tr.row-error td{background:var(--red-dim)}
.health-table tr.row-warn td{background:var(--amber-dim)}

@media(max-width:560px){
  .health-summary{flex-direction:column;align-items:flex-start}
  .health-table{font-size:0.6rem}
  .health-table .url-cell{max-width:120px}
}

/* Config URL section */
.config-section{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:8px;
  padding:20px 24px;
  animation:fadeSlideUp 0.5s ease-out 0.35s both;
}

.config-label{
  font-family:var(--mono);
  font-size:0.7rem;
  letter-spacing:0.15em;
  text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:10px;
}

.config-url-row{
  display:flex;
  align-items:center;
  gap:10px;
}

.config-url{
  flex:1;
  font-family:var(--mono);
  font-size:0.8rem;
  color:var(--green);
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:4px;
  padding:10px 14px;
  overflow-x:auto;
  white-space:nowrap;
  user-select:all;
}

.copy-btn{
  font-family:var(--mono);
  font-size:0.7rem;
  font-weight:500;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:10px 16px;
  background:var(--surface-2);
  border:1px solid var(--border);
  color:var(--text-dim);
  border-radius:4px;
  cursor:pointer;
  transition:all 0.2s;
  white-space:nowrap;
}

.copy-btn:hover{
  border-color:var(--text-dim);
  color:var(--text);
}

.copy-btn.copied{
  color:var(--green);
  border-color:var(--green);
}

.warning-banner{
  background:var(--amber-dim);
  border:1px solid var(--amber);
  border-radius:8px;
  padding:12px 16px;
  margin-bottom:20px;
  font-family:var(--mono);
  font-size:0.75rem;
  color:var(--amber);
  line-height:1.6;
}

.footer{margin-top:48px;padding-top:24px}

.collapsible-toggle {
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  cursor: pointer;
  margin-top: 8px;
  display: inline-block;
}
.collapsible-body {
  display: none;
  margin-top: 12px;
}
.collapsible-body.open {
  display: block;
}

/* 登录弹窗样式 */
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.login-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}
.login-box h2 {
  margin: 0 0 12px;
  color: var(--text-bright);
}
.login-box p {
  margin: 0 0 20px;
  color: var(--text-dim);
}
.login-box input {
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-bright);
  font-size: 1rem;
  box-sizing: border-box;
}
.login-box .btn {
  width: 100%;
  padding: 14px;
  background: var(--green);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}
.error-msg {
  color: var(--red);
  margin: 0 0 12px;
  font-size: 0.8rem;
  display: none;
}
</style>
<script>(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})()</script>
</head>
<body>

<!-- Login -->
<div class="login-overlay" id="loginOverlay">
  <div class="login-box">
    <h2 data-i18n="loginTitle">Admin Login</h2>
    <p data-i18n="loginSubtitle">Enter admin token</p>
    <div class="error-msg" id="loginError" data-i18n="invalidToken">Invalid token</div>
    <input type="password" id="tokenInput" placeholder="Admin Token" autofocus>
    <button class="btn" style="width:100%" onclick="auth.doLogin()">Login</button>
  </div>
</div>

<!-- Main content -->
<div class="container" id="mainContent" style="display:none">
  <header class="header">
    <div class="header-top">
      <div class="header-label" data-i18n="headerLabel">System Monitor</div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()">☀️</button>
        <button class="lang-toggle" id="langToggle" onclick="doToggleLang()">中文</button>
      </div>
    </div>
    <h1 class="header-title">TVBox <span>Aggregator</span></h1>
    <div class="status-bar">
      <div class="status-indicator">
        <span class="status-dot" id="statusDot"></span>
        <span id="statusText" data-i18n="connecting">Connecting...</span>
      </div>
    </div>
    <nav class="header-nav">
      <a href="/admin" data-i18n="navAdmin">Admin</a>
      <a href="/admin/config-editor" data-i18n="navConfigEditor">Config Editor</a>
    </nav>
  </header>

  <div id="warningBanner"></div>

  <div class="stats-grid">
    <div class="stat-card highlight">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span data-i18n="sites">Sites</span>
      </div>
      <div class="stat-value" id="statSites"><span class="skeleton">&nbsp;000&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        <span data-i18n="lives">Lives</span>
      </div>
      <div class="stat-value" id="statLives"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <span data-i18n="parses">Parses</span>
      </div>
      <div class="stat-value" id="statParses"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
        <span data-i18n="sources">Sources</span>
      </div>
      <div class="stat-value" id="statSources"><span class="skeleton">&nbsp;00&nbsp;</span></div>
    </div>
  </div>

  <div class="update-section">
    <div class="update-info">
      <div class="update-label" data-i18n="lastAggregation">Last Aggregation</div>
      <div class="update-time" id="updateTime"><span class="skeleton">&nbsp;Loading...&nbsp;</span></div>
    </div>
  </div>

  <div class="health-section">
    <div class="health-summary">
      <div class="health-label" data-i18n="sourceHealth">Source Health</div>
      <div class="health-counts">
        <span class="health-count ok"><span class="health-dot ok"></span> <span id="healthOk">-</span> OK</span>
        <span class="health-count warn"><span class="health-dot warn"></span> <span id="healthWarn">-</span> WARN</span>
        <span class="health-count error"><span class="health-dot error"></span> <span id="healthError">-</span> ERR</span>
      </div>
    </div>
    <div class="collapsible-toggle" id="healthToggle" onclick="toggleCollapsible(this)" data-i18n="healthDetails">Details</div>
    <div class="collapsible-body" id="healthBody">
      <div class="health-table-wrap">
        <table class="health-table">
          <thead>
            <tr>
              <th></th>
              <th data-i18n="healthName">Name</th>
              <th>URL</th>
              <th data-i18n="healthStatus">Status</th>
              <th data-i18n="healthFails">Fails</th>
              <th data-i18n="healthLastOk">Last OK</th>
            </tr>
          </thead>
          <tbody id="healthTableBody">
            <tr><td colspan="6" class="empty">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="health-section" id="searchQuotaSection" style="display:none">
    <div class="health-summary">
      <div class="health-label" data-i18n="searchQuota">Search Quota</div>
      <div class="health-counts">
        <span class="health-count ok"><span class="health-dot ok"></span> <span id="sqActiveCount">-</span> <span data-i18n="sqActive">active</span></span>
        <span class="health-count error"><span class="health-dot error"></span> <span id="sqExcludedCount">-</span> <span data-i18n="sqExcluded">excluded</span></span>
      </div>
    </div>
    <div class="collapsible-toggle" id="sqToggle" onclick="toggleCollapsible(this)" data-i18n="healthDetails">Details</div>
    <div class="collapsible-body" id="sqBody">
      <div class="health-table-wrap">
        <table class="health-table">
          <thead>
            <tr>
              <th>#</th>
              <th data-i18n="sqName">Name</th>
              <th data-i18n="sqSource">Source</th>
              <th data-i18n="sqReason">Reason</th>
            </tr>
          </thead>
          <tbody id="sqTableBody">
            <tr><td colspan="4" class="empty">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="config-section">
    <div class="config-label" data-i18n="configUrlLabel">TVBox Config URL</div>
    <div class="config-url-row">
      <div class="config-url" id="configUrl"></div>
      <button class="copy-btn" id="copyBtn" onclick="copyUrl('configUrl')" data-i18n="copy">Copy</button>
    </div>
    <div style="margin-top:12px">
      <div class="config-label" data-i18n="liveConfigUrlLabel">Live-Only Config URL</div>
      <div class="config-url-row">
        <div class="config-url" id="liveConfigUrl"></div>
        <button class="copy-btn" id="copyLiveBtn" onclick="copyUrl('liveConfigUrl')" data-i18n="copy">Copy</button>
      </div>
    </div>
  </div>

  <div class="footer">
    <span data-i18n="footer">TVBox Source Aggregator &middot; Cron 05:00 UTC Daily</span>
  </div>
</div>

<script>
${sharedUi}

// 全局获取元素函数
function $(id) { return document.getElementById(id); }

// 登录逻辑（默认密码：123456）
const auth = {
  validToken: "123456", // 你可以改成自己的密码
  doLogin: function() {
    const val = $("tokenInput").value.trim();
    if(val === this.validToken){
      $("loginOverlay").style.display = "none";
      $("mainContent").style.display = "block";
    } else {
      $("loginError").style.display = "block";
    }
  }
};

const translations = {
  en: {
    headerLabel:'System Monitor', connecting:'Connecting...', sites:'Sites', lives:'Lives',
    parses:'Parses', sources:'Sources', lastAggregation:'Last Aggregation',
    configUrlLabel:'TVBox Config URL', liveConfigUrlLabel:'Live-Only Config URL',
    copy:'Copy', copied:'Copied!', copyFailed:'Failed',
    sourceHealth:'Source Health', healthDetails:'Details', healthName:'Name',
    healthStatus:'Status', healthFails:'Fails', healthLastOk:'Last OK',
    navAdmin:'Admin', navConfigEditor:'Config Editor',
  },
  zh: {
    headerLabel:'系统监控', connecting:'连接中...', sites:'站点', lives:'直播',
    parses:'解析', sources:'源', lastAggregation:'上次聚合',
    configUrlLabel:'TVBox 配置地址', liveConfigUrlLabel:'直播配置地址',
    copy:'复制', copied:'已复制!', copyFailed:'失败',
    sourceHealth:'源健康状态', healthDetails:'详情', healthName:'名称',
    healthStatus:'状态', healthFails:'失败', healthLastOk:'最后成功',
    navAdmin:'管理', navConfigEditor:'配置编辑',
  }
};

function t(key){const l=getLang?.()||'zh';return translations[l]?.[key]||translations.en[key]||key;}
function doToggleLang(){
  const l=getLang?.()||'zh';const next=l==='zh'?'en':'zh';
  localStorage.setItem('lang',next);if(applyLang)applyLang(translations,next);
}

const configUrl=location.origin+'/';
$('configUrl').textContent=configUrl;
$('liveConfigUrl').textContent=location.origin+'/live-config';

async function loadStatus(){try{const r=await fetch('/status-data');const d=await r.json();
$('statSites').textContent=d.sites??'—';$('statLives').textContent=d.lives??'—';
$('statParses').textContent=d.parses??'—';$('statSources').textContent=d.sourceCount??'—';}catch(e){}}

function copyUrl(id){const t=$(id).textContent;navigator.clipboard.writeText(t);}
const STATUS_LABELS={ok:'OK',http_error:'ERR'};
async function loadSourceHealth(){try{const r=await fetch('/source-status');const d=await r.json();}catch(e){}}
async function loadSearchQuotaSummary(){}
function esc(s){return s||'';}
function toggleCollapsible(e){e.nextElementSibling.classList.toggle('open');}

if(applyTheme)applyTheme(getTheme?.()||'dark');
if(applyLang)applyLang(translations,getLang?.()||'zh');

loadStatus();
loadSourceHealth();
setInterval(loadStatus,60000);
</script>
</body>
</html>`;
