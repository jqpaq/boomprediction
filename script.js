// 🏆 قاموس الـ 48 دولة المشاركة في كأس العالم 2026 مع الترجمة ورموز الأعلام
const globalTeams = {
  "USA": { ar: "أمريكا", flag: "us" },
  "Mexico": { ar: "المكسيك", flag: "mx" },
  "Canada": { ar: "كندا", flag: "ca" },
  "Argentina": { ar: "الأرجنتين", flag: "ar" },
  "Brazil": { ar: "البرازيل", flag: "br" },
  "Uruguay": { ar: "أوروغواي", flag: "uy" },
  "Colombia": { ar: "كولومبيا", flag: "co" },
  "Ecuador": { ar: "الإكوادور", flag: "ec" },
  "Paraguay": { ar: "باراغواي", flag: "py" },
  "Peru": { ar: "بيرو", flag: "pe" },
  "Chile": { ar: "تشيلي", flag: "cl" },
  "France": { ar: "فرنسا", flag: "fr" },
  "England": { ar: "إنجلترا", flag: "gb-eng" },
  "Spain": { ar: "إسبانيا", flag: "es" },
  "Germany": { ar: "ألمانيا", flag: "de" },
  "Portugal": { ar: "البرتغال", flag: "pt" },
  "Netherlands": { ar: "هولندا", flag: "nl" },
  "Italy": { ar: "إيطاليا", flag: "it" },
  "Belgium": { ar: "بلجيكا", flag: "be" },
  "Croatia": { ar: "كرواتيا", flag: "hr" },
  "Denmark": { ar: "الدنمارك", flag: "dk" },
  "Switzerland": { ar: "سويسرا", flag: "ch" },
  "Austria": { ar: "النمسا", flag: "at" },
  "Ukraine": { ar: "أوكرانيا", flag: "ua" },
  "Poland": { ar: "بولندا", flag: "pl" },
  "Turkey": { ar: "تركيا", flag: "tr" },
  "Morocco": { ar: "المغرب", flag: "ma" },
  "Senegal": { ar: "السنغال", flag: "sn" },
  "Tunisia": { ar: "تونس", flag: "tn" },
  "Algeria": { ar: "الجزائر", flag: "dz" },
  "Egypt": { ar: "مصر", flag: "eg" },
  "Nigeria": { ar: "نيجيريا", flag: "ng" },
  "Cameroon": { ar: "الكاميرون", flag: "cm" },
  "Ivory Coast": { ar: "ساحل العاج", flag: "ci" },
  "South Africa": { ar: "جنوب أفريقيا", flag: "za" },
  "Ghana": { ar: "غانا", flag: "gh" },
  "Japan": { ar: "اليابان", flag: "jp" },
  "South Korea": { ar: "كوريا الجنوبية", flag: "kr" },
  "Iran": { ar: "إيران", flag: "ir" },
  "Saudi Arabia": { ar: "السعودية", flag: "sa" },
  "Australia": { ar: "أستراليا", flag: "au" },
  "Iraq": { ar: "العراق", flag: "iq" },
  "Qatar": { ar: "قطر", flag: "qa" },
  "UAE": { ar: "الإمارات", flag: "ae" },
  "New Zealand": { ar: "نيوزيلندا", flag: "nz" },
  "Costa Rica": { ar: "كوستاريكا", flag: "cr" },
  "Panama": { ar: "بنما", flag: "pa" },
  "Jamaica": { ar: "جامايكا", flag: "jm" }
};

// 🔴 قاموس النظام للغتين
const uiTranslations = {
  ar: {
    title: "من سيفوز؟",
    btnHold: "اضغط مطولاً لبدء التحليل والتوقع",
    btnCharging: "⚡ شحن الطاقة ⚡",
    btnReset: "إعادة ضبط النظام",
    statusReady: "[النظام جاهز]",
    statusCharging: "[جاري شحن النظام... استمر بالضغط]",
    vs: "ضد",
    phases: [
      '[جاري معالجة التشكيلات التكتيكية...]',
      '[تحليل نقاط الضعف الدفاعية...]',
      '[قراءة السجلات التاريخية للمواجهات...]',
      '[حساب احتمالات الفوز...]'
    ],
    winnerReveal: "بوووم...الفريق المرجح للفوز:<br>[ {winner} ]",
    copyright: "© 2026 جميع الحقوق محفوظة"
  },
  en: {
    title: "?Who's Gonna Win",
    btnHold: "HOLD TO ANALYSE AND PREDICT",
    btnCharging: "⚡ CHARGING ⚡",
    btnReset: "RESET SYSTEM",
    statusReady: "[SYSTEM READY]",
    statusCharging: "[CHARGING SYSTEM... HOLD TO EXECUTE]",
    vs: "VS",
    phases: [
      '[PROCESSING TACTICAL FORMATIONS...]',
      '[EVALUATING DEFENSIVE WEAKNESSES...]',
      '[PARSING HISTORICAL HEAD-TO-HEAD DATA...]',
      '[CALCULATING PROBABILITIES...]'
    ],
    winnerReveal: "BOOM...HERE'S YOUR WINNER:<br>[ {winner} ]",
    copyright: "© 2026 All Rights Reserved"
  }
};

let currentLang = 'ar'; 
let todaysMatches = [];
let holdTimer;
let isProcessing = false;

// --- منطق تبديل اللغة ---
const langToggle = document.getElementById('langToggle');
const labelEn = document.getElementById('labelEn');
const labelAr = document.getElementById('labelAr');

langToggle.addEventListener('change', (e) => {
  currentLang = e.target.checked ? 'ar' : 'en';
  
  if(currentLang === 'ar') {
    labelAr.classList.add('active');
    labelEn.classList.remove('active');
    // 🔴 تغيير اتجاه الصفحة للعربية (من اليمين لليسار)
    document.documentElement.setAttribute('dir', 'rtl'); 
  } else {
    labelEn.classList.add('active');
    labelAr.classList.remove('active');
    // 🔴 تغيير اتجاه الصفحة للإنجليزية (من اليسار لليمين)
    document.documentElement.setAttribute('dir', 'ltr'); 
  }
  
  applyTranslations();
});

function applyTranslations() {
  const t = uiTranslations[currentLang];
  
  const titleEl = document.querySelector('.main-title');
  if(titleEl) titleEl.innerText = t.title;
  
  const vsBadge = document.querySelector('.vs-badge');
  if(vsBadge) vsBadge.innerText = t.vs;
  
  const btn = document.getElementById('holdBtn');
  if (!isProcessing && !btn.classList.contains('charging')) {
    btn.innerText = t.btnHold;
  } else if (!isProcessing && btn.classList.contains('charging')) {
    btn.innerText = t.btnCharging;
  }
  
  const status = document.getElementById('statusScreen');
  if(status.innerText.includes("READY") || status.innerText.includes("جاهز")) {
    status.innerText = t.statusReady;
  }
  
  const footerEl = document.getElementById('copyrightFooter');
  if(footerEl) footerEl.innerText = t.copyright;
  
  if(todaysMatches.length > 0) {
    populateMatchSelector();
    const selector = document.getElementById('matchSelector');
    loadMatch(selector.value || 0);
  }
}

// --- دالة التحكم اليومي بالمباريات (تعدلها من هنا بكل سهولة) ---
function fetchLiveMatch() {
  const statusScreen = document.getElementById('statusScreen');
  if (statusScreen) statusScreen.innerText = "[جاري تحميل مباريات كأس العالم...]";

  // 📥 كل صباح قم بتحديث هذه المصفوفة فقط بأسماء الفرق بالإنجليزية تماماً كما هي في القاموس فوق
  todaysMatches = [
    { 
      homeTeam: { name: "Mexico" }, 
      awayTeam: { name: "South Africa" } 
    }
	
  ];
  
  if (todaysMatches.length > 0) {
    populateMatchSelector(); 
    const selector = document.getElementById('matchSelector');
    if (selector) loadMatch(selector.value || 0); 
    
    if (statusScreen) {
      statusScreen.innerText = currentLang === 'ar' ? "[النظام جاهز - تحديث يومي]" : "[SYSTEM READY - LOCAL]";
    }
  } else {
    if (statusScreen) statusScreen.innerText = "[لا توجد مباريات مجدولة]";
  }
}

function populateMatchSelector() {
  const selector = document.getElementById('matchSelector');
  const currentValue = selector.value; 
  selector.innerHTML = ''; 
  
  const vsText = uiTranslations[currentLang].vs;

  todaysMatches.forEach((match, index) => {
    const option = document.createElement('option');
    option.value = index; 
    
    const homeName = getTeamName(match.homeTeam.name);
    const awayName = getTeamName(match.awayTeam.name);
    
    option.innerText = `[${index + 1}] ${homeName} ${vsText} ${awayName}`;
    selector.appendChild(option);
  });
  
  selector.value = currentValue || 0; 
  selector.style.display = 'block'; 
  
  selector.removeAttribute('listener');
  selector.addEventListener('change', (e) => {
    loadMatch(e.target.value);
  });
}

function getTeamName(englishName) {
  if (globalTeams[englishName]) {
    return currentLang === 'ar' ? globalTeams[englishName].ar : englishName;
  }
  return englishName;
}

function loadMatch(index) {
  const match = todaysMatches[index];
  setTeamData(1, match.homeTeam.name);
  setTeamData(2, match.awayTeam.name);
  
  resetSystemVisuals();
  
  const status = document.getElementById('statusScreen');
  status.innerText = uiTranslations[currentLang].statusReady;
  status.style.color = "#888";
}

function setTeamData(id, englishName) {
  const teamNameEl = document.getElementById(`team${id}`);
  const flagImgEl = document.getElementById(`flag${id}`);
  
  teamNameEl.innerText = getTeamName(englishName); 
  
  if (globalTeams[englishName]) {
    flagImgEl.src = `https://flagcdn.com/w160/${globalTeams[englishName].flag}.png`;
  } else {
    flagImgEl.src = `https://flagcdn.com/w160/un.png`; 
  }
  flagImgEl.onload = () => flagImgEl.classList.add('loaded');
}

window.onload = () => {
  applyTranslations(); 
  fetchLiveMatch();
};

// --- منطق التشغيل والتحليل والتأثيرات الصوتية ---
const btn = document.getElementById('holdBtn');
const statusScreen = document.getElementById('statusScreen');
const flag1 = document.getElementById('flag1');
const flag2 = document.getElementById('flag2');
const block1 = document.getElementById('block1');
const block2 = document.getElementById('block2');

const chargeSound = new Audio('charge.mp3'); 
const impactSound = new Audio('impact.mp3'); 
chargeSound.volume = 0.8; 
impactSound.volume = 1.0; 

btn.addEventListener('mousedown', startCharge);
btn.addEventListener('mouseup', stopCharge);
btn.addEventListener('mouseleave', stopCharge);
btn.addEventListener('touchstart', startCharge, {passive: false});
btn.addEventListener('touchend', stopCharge);

function startCharge(e) {
  if (isProcessing) return;
  e.preventDefault();
  
  chargeSound.currentTime = 0;
  chargeSound.play().catch(err => console.log("Sound error:", err));

  document.querySelector('.system-container').classList.add('charging'); 
  statusScreen.innerText = uiTranslations[currentLang].statusCharging;
  statusScreen.style.color = "#d32f2f";
  btn.innerText = uiTranslations[currentLang].btnCharging;
  
  holdTimer = setTimeout(() => { executeAnalysis(); }, 19000); 
}

function stopCharge(e) {
  if (isProcessing) return;
  clearTimeout(holdTimer);
  
  chargeSound.pause();
  chargeSound.currentTime = 0;

  document.querySelector('.system-container').classList.remove('charging');
  btn.innerText = uiTranslations[currentLang].btnHold;
  statusScreen.innerText = uiTranslations[currentLang].statusReady;
  statusScreen.style.color = "#888";
}

function executeAnalysis() {
  isProcessing = true;
  chargeSound.pause();

  const sysContainer = document.querySelector('.system-container');
  sysContainer.classList.remove('charging');
  sysContainer.classList.add('dramatic-shake');
  btn.style.display = 'none';
  document.getElementById('matchSelector').style.display = 'none'; 

  const team1Name = document.getElementById('team1').innerText;
  const team2Name = document.getElementById('team2').innerText;

  const analysisPhases = uiTranslations[currentLang].phases;
  
  let step = 0;
  const fakeAnalysisInterval = setInterval(() => {
    statusScreen.innerText = analysisPhases[step % analysisPhases.length];
    step++;
  }, 400);

  setTimeout(() => {
    clearInterval(fakeAnalysisInterval);
    sysContainer.classList.remove('dramatic-shake');
    
    impactSound.currentTime = 0;
    impactSound.play().catch(err => console.log("Sound error:", err));
    
    const isTeam1Winner = Math.random() > 0.5;
    const winnerName = isTeam1Winner ? team1Name : team2Name;
    
    if(isTeam1Winner) {
      flag1.classList.add('winner-flag');
      block2.style.opacity = '0.3';
    } else {
      flag2.classList.add('winner-flag');
      block1.style.opacity = '0.3';
    }
    
    statusScreen.innerHTML = `<span class="winner-reveal">${uiTranslations[currentLang].winnerReveal.replace('{winner}', winnerName)}</span>`;
    
    setTimeout(() => {
      statusScreen.innerHTML = uiTranslations[currentLang].statusReady;
      statusScreen.style.color = "#888";
      btn.style.display = 'inline-block';
      btn.innerText = uiTranslations[currentLang].btnReset;
      
      if (todaysMatches.length > 0) {
        document.getElementById('matchSelector').style.display = 'block';
      }
      isProcessing = false;
    }, 5000);

  }, 3000);
}

function resetSystemVisuals() {
  flag1.classList.remove('winner-flag');
  flag2.classList.remove('winner-flag');
  block1.style.opacity = '1';
  block2.style.opacity = '1';
  btn.innerText = uiTranslations[currentLang].btnHold;
  btn.style.display = 'inline-block';
}