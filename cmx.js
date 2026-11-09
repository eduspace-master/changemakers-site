var CMX_BASE="https://cdn.jsdelivr.net/gh/eduspace-master/changemakers-site@main/";
document.body.classList.add('cmx-on');
/* cmx shell: imweb member state, store links, form bridge */
(function(){
  var guest = (typeof window.IS_GUEST === 'boolean') ? window.IS_GUEST : true;
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn)}
  ready(function(){
    var acct=document.getElementById('cmxAcct');
    if(acct&&!guest)acct.innerHTML='<a href="/shop_mypage">마이페이지</a><a href="/logout.cm">로그아웃</a>';
    var m=document.querySelector('#cmx [data-acct-m]');
    if(m&&!guest){m.textContent='마이페이지';m.setAttribute('href','/shop_mypage')}
    var buy='';
    if(buy){document.querySelectorAll('#cmx a[href^="/hello?p=surf"]').forEach(function(a){
      if(a.closest('.price-box')){var b=a.cloneNode(false);b.className='btn line';b.style.marginLeft='10px';b.setAttribute('href',buy);b.textContent='바로 결제하기 →';a.parentNode.appendChild(b)}
    })}
  });

  /* Hand the hello answers to the imweb 입력폼 placed below the cmx widget on /hello.
     The imweb form is hidden; its fields are filled in DOM order:
     text#1 이름, tel 연락처(3칸), text#2 이메일, text#3 관심 프로그램, textarea 신청 내용 */
  window.CMX_SUBMIT=function(d,progName){
    return new Promise(function(resolve,reject){
      var form=document.querySelector('form[id^="addForm"]');
      if(!form){reject('신청서를 보낼 수 없어요. 070-8808-6020으로 연락 주세요.');return}
      var texts=[].slice.call(form.querySelectorAll('input[type="text"],input[type="email"]')).filter(function(e){return !/^date/.test(e.name)});
      var tels=form.querySelectorAll('input[type="tel"]');
      var area=form.querySelector('textarea');
      function set(el,v){if(!el)return;el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}
      var ph=(d.phone||'').replace(/[^0-9]/g,'');
      var p=ph.length===11?[ph.slice(0,3),ph.slice(3,7),ph.slice(7)]:ph.length===10?[ph.slice(0,3),ph.slice(3,6),ph.slice(6)]:[ph,'',''];
      set(texts[0],d.name);
      if(tels.length>=3){set(tels[0],p[0]);set(tels[1],p[1]);set(tels[2],p[2])}else if(tels[0])set(tels[0],ph);
      set(texts[1],d.email||'');
      set(texts[2],progName||'');
      var lines=[['지금의 상황',d.status],['학력과 전공',d.edu],['경력',d.career],['요즘의 마음',d.mood],['가장 큰 고민',d.worry],['희망 직무',d.job],['관심 기업과 산업',d.company],['지원한 곳',d.applied],['면접 경험',d.interview],['알아줬으면 하는 경험',d.story],['필요한 도움',(d.help||[]).join(', ')],['상담 방식',d.how],['편한 시간',d.time],['전하고 싶은 이야기',d.note],['소식 수신 동의',d.mkt?'예':'아니오']].filter(function(r){return r[1]}).map(function(r){return '['+r[0]+'] '+r[1]}).join('\n');
      set(area,lines);
      [].slice.call(form.querySelectorAll('input[type="checkbox"]')).forEach(function(c){if(!c.checked){c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))}});
      var btn=form.querySelector('[type="submit"]')||[].slice.call(form.querySelectorAll('a,button')).filter(function(b){return /제출|신청|보내기|작성/.test(b.textContent)})[0];
      if(!btn){reject();return}
      var origAlert=window.alert;var done=false;
      window.alert=function(msg){window.alert=origAlert;done=true;if(/필수|입력|확인/.test(msg||'')&&!/완료|접수/.test(msg||''))reject(msg);else resolve()};
      btn.click();
      setTimeout(function(){if(!done){window.alert=origAlert;resolve()}},2500);
    });
  };
})();

try{history.scrollRestoration="manual"}catch(e){}
if(!location.hash){window.scrollTo({top:0,left:0,behavior:"instant"})}
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function img(k,alt){return '<img src="'+CMX_BASE+'img/'+k+'.jpg" alt="'+esc(alt||'')+'">'}

  /* ---------- data ---------- */
  var finals=['안양저축은행','고용노동부','한국농수산식품유통공사','한국도로교통공단','뱅크샐러드','아정네트웍스(아정당)','우아한형제들(배민)','극동유화','구름','한국정보통신진흥협회','제논','GLG 그룹','경기창조경제혁신센터','큐브엔터테인먼트','한국변호사협회','삼덕회계법인'];
  var docs=['현대엘리베이터','롯데케미칼','CJ대한통운','한화에너지','롯데칠성음료','대한항공','E1','메트라이프생명','삼성카드','현대자동차','팀스파르타','일동후디스','오설록','LG전자','한국알콘','시몬스','메가존클라우드','한국도로교통공단','쿠팡','동원홈푸드','스마트푸드네트웍스','BGF리테일','노루코일코팅','한국투자증권','현대카드'];
  var voices=['취업 컨설팅 비용만 최소 200만 원, 최대 400만 원. 돈 없는 취준생은 한 번 받아 보는 것도 꿈이에요.','수백만 원짜리 8회 컨설팅이면 특별할 줄 알았어요. 끝나고 나니 남는 게 없었습니다.','부족한 부분을 조금만 더 봐 달라고 했더니, 돈을 더 내라고 하더라고요.','현직 인사담당자 한 명 없는 취업 컨설팅이었어요.','횟수가 끝나니 칼같이 끊겼습니다. 끝까지 함께한다는 말은 뭐였을까요.','면접 준비를 열심히 하는데, 무엇이 부족한지 몰라서 너무 답답합니다.','취업 준비 1년 동안 계속 떨어지니까, 자존감이 무너지고 사람이 지쳐 갑니다.'];
  var stories=[
    {g:0,k:'r_pye',n:'박예은',r:'교육 분야 이직',ctx:'배민 근무 경험',h:'계속 떨어졌습니다. 그래서 “이제 도망가야 하나”까지 생각했습니다.',b:'서류는 통과해도 면접에서 계속 떨어졌어요',a:'AI 없이 내 언어로 다시 쓴 자소서',full:['서류는 통과해도 면접에서 계속 떨어지며 자신감이 사라졌고, “아무 데나 가야 하나”라는 생각까지 들던 때에 체인지메이커스를 만났습니다.','AI 없이 다시 써 보라는 말에 한 줄도 제대로 써지지 않는 걸 보며, 그동안 얼마나 AI에 기대 왔는지 깨달았습니다. 내 언어로 자소서를 정리하자 면접에서도 처음으로 나만의 이야기를 말할 수 있었습니다.','1주차 면접에 합격했고, 이 자소서로 지원하자 서류 합격이 눈에 띄게 늘었습니다. 통제할 수 없는 건 두고, 부족한 점을 고쳐 가자는 마음으로 포기하지 않고 나아갔습니다.']},
    {g:0,k:'r_hmc',n:'하민철',r:'AI 사운드 엔지니어',ctx:'400번의 끈질긴 도전',h:'막막하게 혼자 준비하다가, 노력과 전략으로 결국 해냈습니다.',b:'400곳 넘게 지원했지만, 떨어지는 이유를 몰랐어요',a:'처음으로 생긴 취업 준비의 기준',full:['부트캠프를 마치고 400곳 넘게 지원했지만 결과는 늘 비슷했습니다. 왜 떨어지는지 모른다는 것이 가장 힘들었고, 기준 없는 지원만 반복했습니다.','체인지메이커스에서 처음으로 취업 준비의 기준을 갖게 됐습니다. 내 경험을 어떻게 정리하고, 어떤 점을 살려, 어떤 방향으로 지원해야 하는지가 분명해졌습니다.','전략적으로 지원하자 피드백이 실제 결과로 이어졌고, 사운드 엔지니어 경험과 개발 역량을 함께 살린 AI 사운드 엔지니어 자리를 직접 골랐습니다. 문제는 나이나 학력이 아니라, 정리되지 않은 준비였습니다.']},
    {g:1,k:'r_pjc',n:'박재천',r:'웹 개발 취업',ctx:'시작을 못 하던 취준생',h:'시작조차 못 하고 있었습니다. 취업 준비는 늘 ‘언젠가 하겠지’였습니다.',b:'어디서부터 해야 할지 몰라 계속 미뤘어요',a:'완벽하지 않아도 일단 쓰고, 일단 지원하기',full:['자소서와 이력서, 해야 한다는 건 알았지만 어디서부터 해야 할지 몰라 계속 미루기만 했습니다.','체인지메이커스에서 완벽하지 않아도 일단 쓰고 일단 지원한다는 마음을 갖고, 비로소 취업 준비를 시작했습니다.','직접 정리한 내용은 쉽게 지워지지 않았고, 직무검사와 면접까지 경험하며 이게 진짜 취업 준비구나 실감했습니다. 가장 큰 변화는 실력이 아니라 시작이었습니다.']},
    {g:1,k:'r_ohr',n:'오하린',r:'퍼포먼스 마케터',ctx:'준비는 됐지만 결정을 못 하던 취준생',h:'준비는 하고 있었지만, 결정을 내리지 못하고 있었습니다.',b:'“조금만 더 준비하고”라며 지원을 미뤘어요',a:'지금 상태에서 바로 지원하는 방식',full:['스펙은 어느 정도 갖췄다고 생각했지만, 지원할 때마다 이 상태로 될까, 조금만 더 준비하자는 고민에 계속 미뤘습니다. 면접에서도 내 답이 맞는지 스스로 의심했습니다.','체인지메이커스에서 처음으로 지금 기준에서 어떻게 움직여야 하는지를 정리했습니다. 어디까지 준비됐고, 무엇을 보완해, 다음에 무엇을 할지가 분명해졌습니다.','면접 피드백을 두 번 받으며 답을 구성하는 법을 익혔고, 지금 상태에서 바로 지원하는 방식으로 바뀌어 취업했습니다. 문제는 실력이 아니라 결정을 미루던 방식이었습니다.']},
    {g:1,k:'r_sjw',n:'신준우',r:'프론트엔드 개발자',ctx:'매주 대전에서 서울로 올라온 취준생',h:'개발자가 되고 싶었지만, 할 수 있을지 확신이 없었습니다.',b:'내가 정말 일할 수 있을까, 의심이 떠나지 않았어요',a:'탈락을 감정이 아닌 과정과 피드백으로',full:['프론트엔드 개발자를 목표로 공부했지만, 실제로 코드를 짜며 일할 수 있을지 의심이 떠나지 않았고, 자소서도 지원 방향도 막막했습니다.','체인지메이커스에서 처음으로 어떻게 준비해야 하는지 기준을 잡았습니다. 이력서와 자소서를 직접 쓰고 피드백을 반복하며, 경험을 어떤 방향으로 풀어야 하는지 이해했습니다.','기준이 생기자 미루던 상태에서 실행하는 상태로 바뀌었고, 탈락도 과정과 피드백으로 받아들이게 됐습니다. 매주 대전에서 서울까지 올라온 끝에, 지금은 서울에서 프론트엔드 개발자로 일하고 있습니다.']},
    {g:2,k:'r_hyj',n:'하유진',r:'행정 분야 취업',ctx:'진주에서 서울로, 상담 2주 만에 합격',h:'매번 새로 쓰고, 매번 떨어졌습니다. 무엇이 문제인지조차 몰랐습니다.',b:'마스터 자소서 없이 매번 처음부터 다시 썼어요',a:'마스터 자소서를 중심으로 회사별 조정',full:['ROTC 장교로 전역한 뒤 서류는 자주 붙어도 면접에서 계속 떨어졌습니다. 마스터 자소서가 없어 매번 처음부터 새로 썼고, 직무 방향도 막막해 진주에서 서울까지 올라와 상담을 받았습니다.','부족했던 건 스펙이 아니라 방향과 기준이었습니다. 매번 새로 쓰는 대신 마스터 자소서를 중심으로 회사에 맞게 다듬는 방식으로 바꿨습니다.','변화는 빨랐습니다. 상담 이후 2주 만에 취업해 출근을 시작했습니다. 더 쌓기 전에, 어떻게 정리하고 지원할지 아는 것이 훨씬 중요했습니다.']},
    {g:2,k:'r_yjs',n:'윤준수',r:'게임 기획 취업',ctx:'제주에서 서울로, 상담 3주 만에 합격',h:'준비는 되어 있다고 생각했습니다. 그래서 더 헷갈렸습니다.',b:'공모전 수상까지 했지만, 공채 면접에서 계속 떨어졌어요',a:'장황함 대신, 핵심을 분명하게',full:['비전공으로 게임 기획을 시작해 공모전 수상까지 했지만 공채 면접에서 계속 떨어졌습니다. 무엇을 더 할지보다 어떻게 지원할지가 막막해 방향을 점검하러 왔습니다.','가장 크게 바뀐 건 글쓰기였습니다. 자세히 쓰는 게 중요하다고 여겼지만 그것이 장황함이 될 수 있다는 것, 핵심을 분명하게 전하는 것이 더 중요하다는 것을 알게 됐습니다.','내 생각을 먼저 정리하며 방향을 다시 잡았고, 취업해 서울에서 출근하고 있습니다. 왜 안 될까에서, 통과하는 법을 알고 실행하는 상태로 바뀐 것이 가장 큰 변화였습니다.']},
    {g:2,k:'r_lyh',n:'이윤환',r:'다시 도전 중',w:1,ctx:'프론트엔드 취업 준비생',h:'제가 쓴 자소서는, 껍데기처럼 느껴졌습니다.',b:'몇 달째 면접 기회조차 오지 않았어요',a:'커리어 로드맵에 맞춘, 구조와 의도가 있는 자소서',full:['부트캠프 뒤 6, 7개월을 공부하고 팀 프로젝트도 세 번 했지만, 4, 5개월 동안 지원해도 면접 기회조차 오지 않았습니다. 봐 주는 사람이 없으니 취업은 결국 운이 아닐까 생각했습니다.','체인지메이커스에서 내가 쓰던 자소서 방식 자체가 다르다는 걸 알게 됐습니다. 항목을 채우는 것이 아니라, 내 커리어 로드맵에 맞게 구조와 의도를 갖고 써야 한다는 것.','기준이 생기면서 계속 해야 하나에서, 이 방법으로 끝까지 가 보자로 바뀌었습니다. 막연함 대신 시도해 볼 방법과 자신감을 얻은 것, 그것이 가장 큰 변화였습니다.']},
    {g:3,k:'r_hsy',n:'한상연',r:'대기업 면접 결과 대기',w:1,ctx:'전 선박 기관사',h:'4년을 바다 위에서 보냈습니다. 이제는 육지에서의 커리어를 시작합니다.',b:'돈보다, 원하는 삶의 방향을 찾고 싶었어요',a:'혼자가 아니라 함께 준비한다는 감각',full:['해양대를 졸업하고 선박 기관사로 4년을 바다 위에서 보냈습니다. 한 번 배를 타면 아홉 달에서 1년을 지내다 보니, 이게 내가 원하는 삶인가 묻게 됐고, 원하는 방향으로 살고 싶어 육지의 커리어를 준비했습니다.','경험을 나열하는 것이 아니라, 커리어 로드맵을 먼저 세우고 이 회사가 나에게 어떤 의미인지 전략적으로 설명해야 한다는 것을 처음 알았습니다.','연휴에도 자소서를 정리해 피드백을 보내 주는 모습에서, 혼자가 아니라 함께 준비하고 있다는 걸 느꼈습니다. 이제는 내가 원하는 삶을 기준으로 커리어를 설계하고 있습니다.']}
  ];
  var groups=[['다시 힘을 내고 싶다면','지쳐 있던 마음에서 다시 시작한 이야기'],['첫발을 떼고 싶다면','미루던 사람이 일단 해 보는 사람이 된 이야기'],['방향을 잡고 싶다면','기준이 생기자 속도가 붙은 이야기'],['새 길로 가고 싶다면','전혀 다른 자리에서 다시 출발한 이야기']];
  var people=[
    {k:'p_david',n:'David Y',field:'에듀테크 기업 창업가',role:'Founder',short:'1,600명이 함께 일한 에듀테크 기업을 창업해 키웠습니다. 그 길에서 만난 학생들을 다시 세워 함께 가고 싶습니다.',say:'1,600명 이상이 함께 일한 에듀테크 기업을 창업해, 짧은 시간에 빠르게 키우고 이끌었습니다. 그 길에서 수많은 학생을 만났습니다. 이제 그 경험으로, 청년들이 자신의 강점과 방향을 찾고 다음 커리어를 준비하는 과정을 함께하고 싶습니다.',tags:['에듀테크 창업','1,600명 조직','청년의 다음 커리어']},
    {k:'p_sarah',n:'Sarah B',field:'국제학교 창업가',role:'Program Director',short:'명문 국제학교를 세웠습니다. 한 사람을 믿고 그 사람에게 맞는 길을 설계하는 것이 아이비리그를 보내는 비결이었습니다.',say:'국제학교를 세우고 다음 세대의 배움과 진로를 고민해왔습니다. 한 사람의 관심과 강점을 이해하고, 목표에 맞는 준비를 설계하는 경험을 쌓았습니다. 이제 그 경험으로 당신의 다음 선택을 함께 고민합니다.',tags:['국제학교 창업','아이비리그 진학 설계','한 사람을 위한 전략']},
    {k:'p_ridia',n:'Ridia S',field:'국제기구 교육정책 전문가',role:'Global Strategy',short:'국제기구에서 세계의 교육 정책을 도왔습니다. 지금의 청년이 글로벌 역량을 갖추도록 함께합니다.',say:'국제기구에서 일하며 전 세계 개발도상국의 교육 정책을 도왔습니다. 그 시간이 세상을 넓게 보는 눈을 주었습니다. 지금의 청년이 세계화 시대에 맞는 시야와 역량을 갖추도록 함께합니다.',tags:['국제기구','교육 정책','글로벌 역량']},
    {k:'p_esther',n:'Esther L',field:'HR 컨설턴트',role:'HR Consultant',short:'HR 전문가로 기업의 인재를 길러 왔습니다. 학생이 다시 일어서는 순간을 보는 것이 이 일의 기쁨입니다.',say:'HR 전문가로 기업의 인재를 길러 왔고, 학생 한 사람 한 사람에게 꼭 맞는 전략을 설계해 왔습니다. 그 전략을 함께 걸으며 학생이 다시 일어서고 달라지는 순간을 보는 것, 그것이 이 일의 가장 큰 기쁨입니다.',tags:['HR 전문가','30여 개 기업 HRD','교육공학 석사']}
  ];
  var speakers=[
    {n:'Serena C',sub:'F&B 분야 임원',topic:'기업이 원하는 인재',bio:'대기업에서 최연소로 임원이 되었고, 네 번의 턴어라운드를 이끌며 여러 기업과 사업부를 다시 일으켜 세웠습니다. 커리어 도서의 저자로, 지금 기업이 어떤 사람을 원하는지 가장 가까이에서 봅니다.',q:'“스펙이 아니라, 그 사람이 어떤 문제를 어떻게 풀어 왔는지를 봅니다.”'},
    {n:'전직 대기업 HR 임원',sub:'실제 면접관',topic:'사람을 뽑던 눈으로',bio:'대기업 인사팀에서 수천 명의 서류를 읽고, 수백 번의 면접 자리에 앉아 사람을 뽑았습니다. 이제 그 눈으로 당신의 서류와 답변을 봅니다. 채용 과정에서 어떤 질문과 근거를 살피는지, 그 경험을 바탕으로 준비를 돕습니다.',q:'“기업은 탈락 이유를 말해 주지 않습니다. 그래서 제가 대신 말해 드립니다.”'}
  ];
  var faqs=[
    ['아직 목표 회사가 정해지지 않았는데 괜찮을까요?','괜찮습니다. 지금까지의 경험과 관심사를 함께 살피는 것부터 시작해요. 신청서에도 아직 모르겠다고 적어 주세요.'],
    ['그룹 프로그램에서도 제 이야기를 따로 봐 주시나요?','네. 그룹 워크숍과 별도로 개인의 경험과 서류를 살피는 피드백을 진행합니다. 주간 체크인과 개별 첨삭, 실무·임원 모의면접을 통해 자신의 준비 상황을 점검합니다. 세부 구성은 커리어서프클럽 안내에서 확인할 수 있습니다.'],
    ['오프라인은 어디서 모이나요?','서울 강남구 도곡동 샤인스페이스입니다. 화·목 또는 수·금, 저녁 7시부터 10시까지 컨설턴트와 매니저들과 함께 준비합니다.'],
    ['온라인에서는 어떻게 참여하나요?','정해진 시간에 실시간으로 접속하고, 온라인 전담 매니저와 준비를 진행합니다. 첨삭과 모의면접은 화상으로 참여합니다. 오프닝과 피날레는 현장에서 함께하며, IMAGE DAY 방문 일정은 따로 안내합니다.'],
    ['너무 지쳐 있는데 따라갈 수 있을까요?','첫 주에는 경험과 고민을 함께 정리하는 데서 시작합니다. 다만 주 2회, 저녁 3시간의 참여 일정이 있으니 현재 상황에서 무리 없이 참여할 수 있을지 먼저 상담해 주세요.'],
    ['커리어서프클럽과 프라임클럽은 어떻게 다른가요?','커리어서프클럽은 정해진 일정에 동료들과 함께하는 4주 그룹 프로그램입니다. 프라임클럽은 목표와 준비 상황에 따라 코칭의 우선순위를 조정하는 1:1 과정입니다. 기간과 비용, 제공 항목은 각 프로그램 안내에서 확인해 주세요.'],
    ['결제와 환불은 어떻게 하나요?','카드·카카오페이·네이버페이·계좌이체로 결제할 수 있습니다. 개강 전 취소는 전액 환불하며, 시작 이후에는 해당 과정의 환불 기준에 따라 안내합니다. 결제 전에 과정별 시작일과 환불 안내를 확인해 주세요.'],
    ['신청서를 쓰면 바로 결제되나요?','아니요. 당신을 이해하기 위한 첫 기록입니다. 적어 주신 이야기를 읽고 연락드리며, 상담 후에 프로그램을 함께 고릅니다. 프라임클럽 1:1은 프로그램 페이지에서 바로 결제할 수도 있습니다.']
  ];
  var benefits=[
    ['한 사람을 위한 전략','매주 월요일 Strategy Room','전문가와 운영진이 Crew 한 명 한 명의 과제와 지원 현황을 놓고 전략 회의를 엽니다. 피드백은 그 주 첫 모임에서 개인별로 받습니다.'],
    ['마스터 서류와 첨삭','마스터 이력서 · 자기소개서 · 기업별 맞춤본','핵심 스토리를 서류의 언어로 옮기고, 동료 리뷰와 컨설턴트 첨삭을 거쳐 기업마다 맞춤 메시지로 다듬습니다.'],
    ['Target 20 지원 전략','Reach · Match · Safety로 나눈 지원 리스트','산업과 직무, 기업을 분석하고 FIT을 검증해 4주 지원 캘린더를 짭니다. APPLY DAY에는 그 자리에서 실제로 지원합니다.'],
    ['IMAGE DAY','이미지 진단 · 스타일 처방 · 새 프로필 촬영','컬러와 얼굴형, 체형 진단으로 면접 룩과 헤어를 처방받고, 보이스 클리닉까지. 피날레 날 새로운 모습으로 프로필을 촬영합니다.'],
    ['키노트와 면접 특강','평범함이 무기가 되는 순간 · 면접관은 무엇을 보는가','첫 모임 키노트로 시작해, 마지막 날에는 전직 대기업 HR 임원의 면접 준비 특강으로 마무리합니다.'],
    ['WAVE BOOK','4주가 한 권의 실물 바인더로','Career DNA 카드부터 면접 준비 노트까지, 4주 동안 만든 자료 10가지를 묶어 마지막 날 한 사람 한 사람에게 건넵니다.']
  ];

  /* conference gallery */
  document.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('.conf .pics');if(!c)return;var imgs=[].slice.call(c.querySelectorAll('img'));var t=c.closest('.conf').querySelector('h3');var box=document.createElement('div');box.className='cgal';box.innerHTML='<div class="cgal-in"><div class="cgal-top"><b>'+(t?t.textContent:'')+'</b><button type="button" aria-label="닫기">닫기 ✕</button></div><div class="cgal-grid">'+imgs.map(function(i){return '<img src="'+i.src+'" alt="'+(i.alt||'')+'">'}).join('')+'</div></div>';box.addEventListener('click',function(ev){if(ev.target===box||ev.target.closest('button'))box.remove()});(document.getElementById('cmx')||document.body).appendChild(box)});
  /* ---------- render ---------- */
  var el;
  if(el=$('#bubbles')){var pick=[1,5,6],bcls=['','r',''];el.innerHTML=pick.map(function(k,i){return '<div class="bubble '+bcls[i]+'">'+voices[k]+'<small>익명 인터뷰 '+String(k+1).padStart(2,'0')+'</small></div>'}).join('')}
  function storyCard(s){return '<article class="story"><div class="ph">'+img(s.k,s.n+'님')+'</div><div class="body"><div class="who"><b>'+s.n+'</b><span class="res'+(s.w?' wait':'')+'">'+s.r+'</span></div><span class="ctx">'+s.ctx+'</span><h3>'+s.h+'</h3><div class="row"><em>BEFORE</em>'+s.b+'</div><div class="row after"><em>WITH CHANGEMAKERS</em>'+s.a+'</div><div class="full" hidden>'+s.full.map(function(p){return '<p>'+p+'</p>'}).join('')+'</div><button class="more" data-more>전체 이야기 읽기 +</button></div></article>'}
  if(el=$('#homeStories'))el.innerHTML=[0,5,8].map(function(i){return storyCard(stories[i])}).join('');
  if(el=$('#storyGroups')){var gblock=function(gi){return '<div class="sg"><div class="sg-head"><h3>'+groups[gi][0]+'</h3><span>'+groups[gi][1]+'</span></div><div class="stories">'+stories.filter(function(s){return s.g===gi}).map(storyCard).join('')+'</div></div>'};el.innerHTML='<div class="sg-row">'+gblock(0)+gblock(3)+'</div>'+gblock(1)+gblock(2)}
  document.addEventListener('click',function(e){var b=e.target.closest('[data-more]');if(!b)return;var f=b.previousElementSibling;f.hidden=!f.hidden;b.textContent=f.hidden?'전체 이야기 읽기 +':'접기'});
  if(el=$('#marq')){var mq=finals.map(function(c){return '<span>'+c+'</span>'}).join('')+docs.map(function(c){return '<span class="doc">'+c+'</span>'}).join('');el.innerHTML=mq+mq}
  if(el=$('#marqFinal')){var mf=finals.map(function(c){return '<span>'+c+'</span>'}).join('');el.innerHTML=mf+mf}
  if(el=$('#marqDoc')){var md=docs.map(function(c){return '<span>'+c+'</span>'}).join('');el.innerHTML=md+md}
  if(el=$('#strip')){var evs=['cw3','ev5','cw1','ev3','ev7','cw4','ev9','ev4','cw5','ev8','ev6','cw8','ev10'];el.innerHTML=evs.concat(evs).map(function(k){return '<div class="ph">'+img(k,'체인지메이커스 현장')+'</div>'}).join('')}
  if(el=$('#makerRow'))el.innerHTML=people.map(function(p){return '<div class="mk-card"><div class="mf">'+img(p.k,p.n)+'</div><div><div class="role">'+p.role+'</div><h3>'+p.n+'</h3><div class="field">'+p.field+'</div></div><p>'+p.short+'</p></div>'}).join('');
  if(el=$('#aboutMakers'))el.innerHTML=people.map(function(p,i){return '<div class="maker'+(i%2?' flip':'')+'"><div class="mf">'+img(p.k,p.n)+'</div><div class="mt"><div class="role">'+p.role+'</div><h3>'+p.n+'<span>'+p.field+'</span></h3><p class="say">'+p.say+'</p>'+(p.part?'<p class="part">'+p.part+'</p>':'')+'<div class="tags">'+p.tags.map(function(t){return '<span>'+t+'</span>'}).join('')+'</div></div></div>'}).join('');
  if(el=$('#speakers'))el.innerHTML=speakers.map(function(s){return '<div class="spk"><small>KEYNOTE · '+s.topic+'</small><h3>'+s.n+'<span>'+s.sub+'</span></h3><p class="bio">'+s.bio+'</p><p class="q">'+s.q+'</p></div>'}).join('');
  if(el=$('#faq'))el.innerHTML=faqs.map(function(f,i){return '<details'+(i===0?' open':'')+'><summary>'+f[0]+'</summary><p>'+f[1]+'</p></details>'}).join('');
  if(el=$('#benefits'))el.innerHTML=benefits.map(function(b,i){return '<div class="benefit"><b>0'+(i+1)+'</b><h3>'+b[0]+'</h3><p class="n">'+b[1]+'</p><p>'+b[2]+'</p></div>'}).join('');

  /* calendar */
  if($('#cal')){
    var crewDays={mt:[8,10,15,17,22,24,29],tf:[4,9,11,16,18,23,25]};var monDays=[7,14,21,28];
    var wedL={2:'오리엔테이션',30:'Feast'};
    var renderCal=function(c){
      var h=['일','월','화','수','목','금','토'].map(function(d){return '<div class="dh">'+d+'</div>'}).join('');
      var first=new Date(2026,11,1).getDay(),out=h;
      for(var i=0;i<first;i++)out+='<div class="d empty"></div>';
      for(var d=1;d<=31;d++){var cls='d',lab='';
        if(d===2||d===30){cls+=' big';lab=wedL[d]}else if(wedL[d]){cls+=' wed';lab=wedL[d]}else if(monDays.indexOf(d)>=0){cls+=' wed';lab='전략 회의'}else if(crewDays[c].indexOf(d)>=0){if(d===25){cls+=' hol';lab='성탄절 보강'}else{cls+=' crew';lab='Crew Day'}}
        out+='<div class="'+cls+'"><span class="n">'+d+'</span><span class="l">'+lab+'</span></div>'}
      $('#cal').innerHTML=out;
      $('#calNote').textContent=c==='mt'?'화·목 Crew: 12월 8일부터 29일까지 Crew Day 7번, 12월 30일 Feast까지 정규 8회 40시간. 매주 월요일에는 컨설턴트와 매니저가 전략 회의에서 Crew 한 사람 한 사람의 다음 과제를 정합니다.':'수·금 Crew: 12월 4일부터 25일까지 Crew Day 7번, 12월 30일 Feast까지 정규 8회 40시간. 25일 성탄절 회차는 보강 일정을 따로 안내합니다. 매주 월요일에는 컨설턴트와 매니저가 전략 회의에서 Crew 한 사람 한 사람의 다음 과제를 정합니다.';
    };
    renderCal('mt');
    $('#calSeg').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',this).forEach(function(x){x.classList.toggle('on',x===b)});renderCal(b.dataset.c)});
  }

  /* rotating word */
  var rot=$('#rot');if(rot){var words=['쓰고','넣고','기다리고','기뻐하고','도전하고'],wi=0;setInterval(function(){wi=(wi+1)%words.length;rot.innerHTML='<span class="w">'+words[wi]+'</span>'},2200)}

  /* menu + reveal + nav highlight */
  var menuBtn=$('#menuBtn'),mnav=$('#mobileNav');
  if(menuBtn){menuBtn.addEventListener('click',function(){var open=mnav.hidden;mnav.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'닫기':'메뉴'})}
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1}):null;
  $$('.reveal').forEach(function(x){if(io)io.observe(x);else x.classList.add('in')});
  var here=location.pathname.replace(/\/$/,'')||'/';
  $$('.nav a').forEach(function(a){if(a.getAttribute('href')===here)a.classList.add('on')});

  /* ---------- hello ---------- */
  if($('#helloRoot')){
  function hydrate(){}
  var H={step:0,d:{name:'',phone:'',email:'',status:'',edu:'',career:'',mood:'',worry:'',job:'',company:'',applied:'',interview:'',story:'',help:[],prog:'',sched:'',how:'',time:'',note:'',agree:false,mkt:false}};
  var steps=['연락처','지금의 나','바라는 다음','필요한 동행','다시 읽어보기'];
  var root=$('#helloRoot');
  function chips(key,opts,multi){return '<div class="chips">'+opts.map(function(o){var on=multi?H.d[key].indexOf(o)>=0:H.d[key]===o;return '<button type="button" class="chip'+(on?' on':'')+'" data-k="'+key+'" data-v="'+esc(o)+'"'+(multi?' data-m="1"':'')+'>'+o+'</button>'}).join('')+'</div>'}
  function f(label,inner,req){return '<div class="field"><span class="lb">'+label+(req?'<span class="req">필수</span>':'<span class="opt-t">선택</span>')+'</span>'+inner+'</div>'}
  function inp(key,type,ph,ac){return '<input type="'+type+'" data-in="'+key+'" value="'+esc(H.d[key])+'" placeholder="'+esc(ph||'')+'"'+(ac?' autocomplete="'+ac+'"':'')+'>'}
  function ta(key,ph){return '<textarea data-in="'+key+'" placeholder="'+esc(ph||'')+'">'+esc(H.d[key])+'</textarea>'}
  var progs=[
    {g:'커리어서프클럽 · 4주 그룹 · 12월 2일 시작',items:[['surf-mt-off','화·목 오프라인 Crew','19시부터 22시'],['surf-mt-on','화·목 온라인 Crew','19시부터 22시'],['surf-tf-off','수·금 오프라인 Crew','19시부터 22시'],['surf-tf-on','수·금 온라인 Crew','19시부터 22시']]},
    {g:'프라임클럽 · 1:1',items:[['prime-new','신입 취업 프로그램','6주 · 1,800,000원'],['prime-move','경력 이직 프로그램','6주 · 2,400,000원'],['prime-pf','포트폴리오 프로그램','4주 · 990,000원'],['prime-intern','인턴십 프로그램','2,500,000원']]},
    {g:'추가 과정 · 서프클럽 Crew 한정',items:[['interview-2w','심층면접대비 2주 과정','Crew 한정가 290,000원']]},
    {g:'아직 잘 모르겠어요',items:[['unsure','상담하며 함께 정하고 싶어요','지금의 나에게 맞는 방식을 함께 찾아요']]}
  ];
  function progLabel(v){var r='';progs.forEach(function(g){g.items.forEach(function(it){if(it[0]===v)r=it[1]})});return r}
  function renderHello(err){
    var s=H.step,body='';
    if(s===0){body='<div class="qh"><small>01 / 05 · 연락처</small><h3>먼저, 어떻게 불러 드리면 될까요?</h3><p>적어주신 연락처로 상담 일정과 진행 방법을 안내합니다. 신청만으로 결제되지 않습니다.</p></div>'+
      f('편하게 불릴 이름',inp('name','text','예: 김지원','name'),1)+
      '<div class="fields2">'+f('연락처',inp('phone','tel','010 0000 0000','tel'),1)+f('이메일',inp('email','email','you@example.com','email'),0)+'</div>';}
    else if(s===1){body='<div class="qh"><small>02 / 05 · 지금의 나</small><h3>지금은 어떤 시간을 보내고 있나요?</h3></div>'+
      f('지금의 상황',chips('status',['대학 재학 중','졸업 예정','졸업 후 취업 준비','재직 중 이직 준비','쉬었다가 다시 시작']),1)+
      '<div class="fields2">'+f('최종 학력과 전공',inp('edu','text','예: 경영학 학사'),0)+f('경력',chips('career',['없음','1년 미만','1년에서 3년','3년 이상']),0)+'</div>'+
      f('요즘 취업 준비, 솔직히 어떤가요?',chips('mood',['아직 괜찮아요','조금 지쳤어요','많이 지쳤어요','이제 시작하려고 해요']),1)+
      f('요즘 가장 마음에 걸리는 고민',ta('worry','예: 서류는 붙는데 면접에서 계속 떨어져요.'),1);}
    else if(s===2){body='<div class="qh"><small>03 / 05 · 바라는 다음</small><h3>어떤 일, 어떤 회사에 마음이 가나요?</h3><p>아직 모르겠어도 괜찮습니다. 그렇게 적어 주세요.</p></div>'+
      '<div class="fields2">'+f('희망 직무',inp('job','text','예: 서비스 기획, 마케팅'),1)+f('관심 기업이나 산업',inp('company','text','예: 핀테크, 공기업'),0)+'</div>'+
      '<div class="fields2">'+f('지금까지 지원한 곳',chips('applied',['아직 없어요','10곳 미만','10곳에서 50곳','50곳 이상']),0)+f('면접 경험',chips('interview',['아직 없어요','1번에서 3번','4번 이상']),0)+'</div>'+
      f('함께 알아줬으면 하는 경험',ta('story','프로젝트, 아르바이트, 동아리, 이전 직장 등 무엇이든 좋아요.'),0);}
    else if(s===3){body='<div class="qh"><small>04 / 05 · 필요한 동행</small><h3>우리가 곁에서 무엇을 도우면 좋을까요?</h3><p>여러 개를 골라도 괜찮아요.</p></div>'+
      f('필요한 도움',chips('help',['방향 찾기','이력서와 자기소개서','면접 준비','지원 전략과 기업 선정','스타일과 첫인상','포트폴리오','함께할 동료와 리듬'],true),1)+
      '<div class="field"><span class="lb">관심 있는 프로그램과 일정<span class="req">필수</span></span>'+progs.map(function(g){return '<div class="group-t">'+g.g+'</div><div class="pick-grid">'+g.items.map(function(it){return '<button type="button" class="pick'+(H.d.prog===it[0]?' on':'')+'" data-prog-pick="'+it[0]+'"><b>'+it[1]+'</b><span>'+it[2]+'</span></button>'}).join('')+'</div>'}).join('')+'</div>'+
      '<div class="fields2">'+f('편한 상담 방식',chips('how',['전화','화상','방문']),0)+f('연락받기 편한 시간',inp('time','text','예: 평일 저녁 7시 이후'),0)+'</div>'+
      f('꼭 전하고 싶은 이야기',ta('note',''),0);}
    else if(s===4){var d=H.d;var rows=[['이름',d.name],['연락처',d.phone],['이메일',d.email],['지금의 상황',d.status],['학력과 전공',d.edu],['경력',d.career],['요즘의 마음',d.mood],['가장 큰 고민',d.worry],['희망 직무',d.job],['관심 기업과 산업',d.company],['지원한 곳',d.applied],['면접 경험',d.interview],['알아줬으면 하는 경험',d.story],['필요한 도움',d.help.join(', ')],['관심 프로그램',progLabel(d.prog)],['상담 방식',d.how],['편한 시간',d.time],['전하고 싶은 이야기',d.note]].filter(function(r){return r[1]});
      body='<div class="qh"><small>05 / 05 · 다시 읽어보기</small><h3>이렇게 전해 드릴게요.</h3><p>고치고 싶은 부분이 있다면 이전 단계로 돌아가 바꿀 수 있어요.</p></div>'+
      '<div class="review">'+rows.map(function(r){return '<div><span>'+r[0]+'</span>'+esc(r[1])+'</div>'}).join('')+'</div>'+
      '<div class="consent"><label><input type="checkbox" data-chk="agree"'+(d.agree?' checked':'')+'> 개인정보 수집과 이용에 동의합니다 (필수)</label><p>수집 항목: 이름, 연락처, 이메일, 위에 적어 주신 답변. 이용 목적: 상담 안내와 상담 준비, 프로그램 안내. 보유 기간: 상담 목적을 이룬 뒤 지체 없이 파기하며, 법령에 따라 보관이 필요한 경우 그 기간 동안 보관합니다. 동의하지 않을 수 있으며, 이 경우 상담 신청이 어렵습니다. 자세한 내용은 개인정보처리방침을 따릅니다.</p></div>'+
      '<div class="consent" style="margin-top:10px"><label><input type="checkbox" data-chk="mkt"'+(d.mkt?' checked':'')+'> 새 프로그램과 특강 소식을 받겠습니다 (선택)</label></div>';}
    else{
      $('#helloTitle').innerHTML='이제 우리,<br><em>함께예요.</em>';$('#helloLead').textContent='보내 주신 이야기, 잘 받았습니다.';
      root.innerHTML='<div class="welcome"><div class="eyebrow">Welcome Letter</div><p class="big">'+esc(H.d.name||'OO')+'님,<br>여기까지 오느라 고생 많았어요.</p>'+
        '<p class="lp">적어 주신 이야기를 컨설턴트들이 함께 읽겠습니다. 이번 주부터 '+esc(H.d.name||'OO')+'님의 이름이 우리 테이블 위에 놓입니다. 혼자 쓰던 서류, 혼자 기다리던 결과, 이제는 같이 해요. 당신은 혼자가 아닙니다.</p>'+
        '<div class="next3"><div><b>01</b><h4>담당자 연락</h4><p>적어 주신 연락처로 상담 시간을 여쭙습니다.</p></div><div><b>02</b><h4>첫 상담</h4><p>당신의 이야기를 바탕으로 지금 필요한 것을 함께 정합니다.</p></div><div><b>03</b><h4>함께 시작</h4><p>'+(H.d.prog.indexOf('surf')===0?'12월 2일 수요일, 도곡동 샤인스페이스 오리엔테이션에서 만나요.':'나에게 맞는 프로그램으로 첫걸음을 뗍니다.')+'</p></div></div>'+
        
        '<div class="btns" style="margin-top:28px"><a class="btn line" href="/stories">함께 만든 변화 보기 →</a></div></div>';
      return;
    }
    var prog='<div class="q-progress">'+steps.map(function(_,i){return '<i class="'+(i<=s?'on':'')+'"></i>'}).join('')+'</div>';
    var nav='<div class="q-nav">'+(s>0?'<button type="button" class="linkbtn" data-hprev>이전 단계</button>':'<span></span>')+'<button type="button" class="btn primary" data-hnext>'+(s===4?'당신의 이야기 보내기':'다음으로')+' <span class="ar">→</span></button></div>';
    root.innerHTML='<div class="form-grid"><div class="panel">'+prog+body+(err?'<p class="err">'+err+'</p>':'')+nav+'</div>'+
      '<aside class="aside"><div class="ph"><img src="'+CMX_BASE+'img/at_talk.jpg" alt=""></div><div class="in"><small>What Happens Next</small><h3>이 기록이,<br>첫 상담의 출발점이 됩니다.</h3><ol><li><b>작성</b>지금의 나를 당신의 말로 적어 주세요.</li><li><b>사전 확인</b>담당자가 경험과 고민을 읽고 상담을 준비합니다.</li><li><b>상담</b>목표와 준비 상황을 살피고 필요한 도움을 이야기합니다.</li><li><b>참여 결정</b>과정의 범위와 일정, 비용을 확인한 뒤 참여 여부를 결정합니다.</li></ol><blockquote>“연휴에도 자소서를 정리해 피드백을 보내 주는 모습에서, 혼자가 아니라 함께 준비하고 있다는 걸 느꼈습니다.”<br>한상연, 전 선박 기관사</blockquote></div></aside></div>';
  }
  function validate(){var d=H.d,s=H.step;
    if(s===0){if(!d.name.trim())return '이름을 적어 주세요.';if(!/[0-9]{9,}/.test(d.phone.replace(/[^0-9]/g,'')))return '연락받을 전화번호를 적어 주세요.'}
    if(s===1){if(!d.status)return '지금의 상황을 골라 주세요.';if(!d.mood)return '요즘의 마음을 골라 주세요.';if(!d.worry.trim())return '가장 마음에 걸리는 고민을 한 줄이라도 적어 주세요.'}
    if(s===2){if(!d.job.trim())return '희망 직무를 적어 주세요. 아직 모르겠다면 그렇게 적어도 괜찮아요.'}
    if(s===3){if(!d.help.length)return '필요한 도움을 하나 이상 골라 주세요.';if(!d.prog)return '관심 있는 프로그램을 골라 주세요.'}
    if(s===4){if(!d.agree)return '개인정보 수집과 이용에 동의해 주세요.'}
    return '';}
  root.addEventListener('input',function(e){var k=e.target.dataset.in;if(k)H.d[k]=e.target.value});
  root.addEventListener('change',function(e){var k=e.target.dataset.chk;if(k)H.d[k]=e.target.checked});
  root.addEventListener('click',function(e){var t;
    if(t=e.target.closest('.chip')){var k=t.dataset.k,v=t.dataset.v;if(t.dataset.m){var a=H.d[k],i=a.indexOf(v);i>=0?a.splice(i,1):a.push(v);t.classList.toggle('on')}else{H.d[k]=H.d[k]===v?'':v;$$('.chip[data-k="'+k+'"]',root).forEach(function(c){c.classList.toggle('on',c.dataset.v===H.d[k])})}return}
    if(t=e.target.closest('[data-prog-pick]')){H.d.prog=t.dataset.progPick;$$('[data-prog-pick]',root).forEach(function(c){c.classList.toggle('on',c===t)});return}
    if(e.target.closest('[data-hprev]')){H.step--;renderHello();scrollTop();return}
    if(e.target.closest('[data-hnext]')){var er=validate();if(er){renderHello(er);return}if(H.step===4){if(H.sending)return;H.sending=true;window.CMX_SUBMIT(H.d,progLabel(H.d.prog)).then(function(){H.sending=false;H.step++;renderHello();scrollTop()},function(m){H.sending=false;renderHello(m||'전송 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.')});return}H.step++;renderHello();scrollTop()}
  });
  function scrollTop(){var y=root.getBoundingClientRect().top+window.scrollY-110;window.scrollTo({top:Math.max(0,y),behavior:'smooth'})}
  var qp=(location.search.match(/[?&]p=(\w+)/)||[])[1];
  if(qp==='surf')H.d.prog='surf-mt-off';if(qp==='prime')H.d.prog='prime-new';if(qp==='interview')H.d.prog='interview-2w';
  renderHello();

  }
})();

/* crew journey motion */
(function(){
  var j=document.getElementById('journey');if(!j)return;
  var steps=[].slice.call(j.querySelectorAll('.jn-step')),fill=j.querySelector('.jn-fill'),dot=j.querySelector('.jn-dot'),n=steps.length,i=-1,t=null;
  function vert(){return window.matchMedia('(max-width:900px)').matches}
  function set(k){
    steps.forEach(function(s,x){s.classList.toggle('on',x<=k);s.classList.toggle('now',x===k)});
    if(vert()){var a=steps[0],b=steps[Math.max(k,0)],h=b.offsetTop+b.offsetHeight/2-(a.offsetTop+a.offsetHeight/2);var base=a.offsetTop+a.offsetHeight/2;fill.parentNode.style.top=base+'px';fill.parentNode.style.bottom='auto';fill.parentNode.style.height=(steps[n-1].offsetTop+steps[n-1].offsetHeight/2-base)+'px';fill.style.height=h+'px';dot.style.top=h+'px'}
    else{fill.parentNode.style.top='';fill.parentNode.style.height='';var p=(Math.max(k,0)/(n-1)*100)+'%';fill.style.width=p;dot.style.left=p}
  }
  function tick(){i++;if(i>=n){clearInterval(t);setTimeout(function(){i=-1;set(0);t=setInterval(tick,1300)},2600);return}set(i)}
  set(0);
  var started=false;
  function go(){if(started)return;started=true;i=-1;t=setInterval(tick,1300)}
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){if(es[0].isIntersecting)go()},{threshold:.3}).observe(j)}else go();
  window.addEventListener('resize',function(){set(Math.max(i,0))});
})();

/* home: people marquee (V10) */
(function(){
  var t=document.getElementById('peopleTrack');if(!t)return;
  var P=[['p_david.jpg','David Y','에듀테크 기업 창업가'],['p_sarah.jpg','Sarah B','국제학교 창업가'],['p_ridia.jpg','Ridia S','국제기구 교육정책 전문가'],['p_esther.jpg','Esther L','HR 컨설턴트']];
  var A=[['H**','엔터테인먼트사 현직'],['위****','게임사 대표'],['S**','외식 대기업 최연소 임원'],['삼성전자','전직 개발팀장 · 삼성페이'],['쿠*','현직 개발자'],['VC','현직 벤처캐피털리스트'],['L**','외국계 뷰티 대기업 팀장']];
  var one=P.map(function(p){return '<a class="person-mini" href="/changemakers"><img src="'+CMX_BASE+'img/'+p[0]+'" alt="'+p[1]+'"><div><strong>'+p[1]+'</strong><small>'+p[2]+'</small></div></a>'}).join('')+
    A.map(function(a){return '<a class="person-mini adv" href="/changemakers"><span class="ini">'+a[0]+'</span><div><strong>자문위원</strong><small>'+a[1]+'</small></div></a>'}).join('');
  t.innerHTML='<div class="pt-set">'+one+'</div><div class="pt-set" aria-hidden="true">'+one+'</div>';
  var m=t.parentNode;m.addEventListener('click',function(e){if(e.target.closest('a'))return;m.classList.toggle('paused')});
})();

/* surf: chapter tabs */
(function(){
  var t=document.getElementById('chTabs');if(!t)return;
  t.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    [].forEach.call(t.children,function(x){x.classList.toggle('on',x===b)});
    [].forEach.call(document.querySelectorAll('#chPanels .ch-panel'),function(p){p.hidden=p.getAttribute('data-p')!==b.getAttribute('data-ch')});
  });
})();
/* surf: december calendar (Mon start) */
(function(){
  var el=document.getElementById('dcal');if(!el)return;
  var ev={30:[['mon','전략 회의']],2:[['wf','1 OPENING']],3:[['tt','1 OPENING']],4:[['wf','2회차']],6:[['note','과제 제출']],
    7:[['mon','전략 회의']],8:[['tt','2회차']],9:[['wf','3회차']],10:[['tt','3회차']],11:[['wf','4회차']],13:[['note','과제 제출']],
    14:[['mon','전략 회의']],15:[['tt','4회차']],16:[['wf','5회차']],17:[['tt','5회차']],18:[['wf','6회차']],20:[['note','과제 제출']],
    21:[['mon','전략 회의']],22:[['tt','6회차']],23:[['wf','7 IMAGE']],24:[['tt','7 IMAGE']],25:[['note','성탄절 휴강']],27:[],
    28:[['mon','최종 점검']],29:[['tt','8 FINALE']],31:[]};
  ev['w30']=[['wf','8 FINALE']];
  var weeks=[[['11. 30',30,'p'],[1],[2],[3],[4],[5],[6]],[[7],[8],[9],[10],[11],[12],[13]],[[14],[15],[16],[17],[18],[19],[20]],[[21],[22],[23],[24],[25],[26],[27]],[[28],[29],['30','w30'],[31],[],[],[]]];
  var h='<div class="dc-h"></div>'+['MON','TUE','WED','THU','FRI','SAT','SUN'].map(function(d){return '<div class="dc-h">'+d+'</div>'}).join('');
  weeks.forEach(function(w,i){h+='<div class="dc-w en">W'+(i+1)+'</div>';w.forEach(function(c){if(!c.length){h+='<div class="dc-d empty"></div>';return}
    var lab=c[0],key=c[1]!==undefined?c[1]:c[0];var es=ev[key]||[];
    h+='<div class="dc-d"><span class="n">'+lab+'</span>'+es.map(function(x){return '<span class="ev '+x[0]+'">'+x[1]+'</span>'}).join('')+'</div>'})});
  el.innerHTML=h;
})();
