
history.scrollRestoration = 'manual';

document.addEventListener('DOMContentLoaded', () => {
  // main_box 用（タイトルを表示）
  const title = document.querySelector('.event_title');
  const mainBox = document.querySelector('.main_box');
  if (mainBox && title) {
    const mainObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      setTimeout(() => title.classList.add('is-visible'), 600);
      mainObserver.disconnect();
    }, { threshold: 0.3 });
    mainObserver.observe(mainBox);
  }


  // deco 用（セクションごとに deco_1 → deco_5 の順に表示）
  const DECO_ORDER = ['deco_1', 'deco_2', 'deco_3', 'deco_4', 'deco_5', 'deco_6', 'deco_7'];
  const DECO_INTERVAL = 300; // 次を出すまでの間隔（ミリ秒）

  document.querySelectorAll('section').forEach(section => {
    const items = DECO_ORDER.flatMap(cls => [...section.querySelectorAll('.' + cls)]);
    if (!items.length) return;

    const inView = new Set();
    let index = 0;
    let timer = null;

    const showNext = () => {
      if (timer) return;
      const el = items[index];
      if (!el || !inView.has(el)) return;
      el.classList.add('is-visible');
      index++;
      timer = setTimeout(() => {
        timer = null;
        showNext();
      }, DECO_INTERVAL);
    };

    const targetMap = new Map(); // 監視する親要素 → deco画像

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        inView.add(targetMap.get(entry.target));
        observer.unobserve(entry.target);
        showNext();
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -20% 0px'
    });

    items.forEach(el => {
      // 画像ではなく、包んでいる .fade_deco を監視（はみ出し切り取り防止）
      const target = el.closest('.fade_deco') || el;
      targetMap.set(target, el);
      observer.observe(target);
    });
  });
  // ★ここまで

  const fadeElements = document.querySelectorAll('.fadein');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  const swingElements = document.querySelectorAll('.swing-on-enter');
  const swingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        swingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  swingElements.forEach(el => swingObserver.observe(el));
	
	// ワークショップ画像：上から順に左右から回転して登場
  const ROLL_INTERVAL = 250; // 同時に画面に入ったときの間隔（ミリ秒）
  const rollQueue = [];
  let rollTimer = null;

  const runRollQueue = () => {
    if (rollTimer || !rollQueue.length) return;
    rollQueue.shift().classList.add('is-visible');
    rollTimer = setTimeout(() => {
      rollTimer = null;
      runRollQueue();
    }, ROLL_INTERVAL);
  };

  const rollObserver = new IntersectionObserver((entries) => {
    entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top) // 上にある順
      .forEach(entry => {
        rollQueue.push(entry.target);
        rollObserver.unobserve(entry.target);
      });
    runRollQueue();
  }, {
    threshold: 0,
    rootMargin: '0px 0px -15% 0px' // 画面の下15%まで来たら開始
  });

  document.querySelectorAll('.roll_L, .roll_R').forEach(el => rollObserver.observe(el));
});
