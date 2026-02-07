(function () {
  const content = window.miyokoContent;
  if (!content) return;

  const $ = (id) => document.getElementById(id);
  const html = document.documentElement;

  const el = {
    profileName: $("profileName"),
    profilePronunciation: $("profilePronunciation"),
    aboutIntro: $("aboutIntro"),
    experienceList: $("experienceList"),
    journeyTitle: $("journeyTitle"),
    journeyContent: $("journeyContent"),
    educationList: $("educationList"),
    techPreview: $("techPreview"),
    techExpand: $("techExpand"),
    techGrid: $("techGrid"),
    writingLink: $("writingLink"),
    libraryList: $("libraryList"),
githubGraph: $("githubGraph"),
    thingAboutMe: $("thingAboutMe"),
    contactCopy: $("contactCopy"),
    contactEmail: $("contactEmail"),
    agentText: $("agentText"),
    humanView: $("humanView"),
    agentView: $("agentView"),
    modeToggle: $("modeToggle"),
    liveClock: $("liveClock"),
    themeToggle: $("themeToggle"),
    themeLabel: $("themeLabel"),
    auraTrigger: $("auraTrigger"),
    auraEdge: $("auraEdge"),
    starfield: $("starfield"),
    lofiAudio: $("lofiAudio"),
    lofiToggle: $("lofiToggle"),
    qrTrigger: $("qrTrigger"),
    qrModal: $("qrModal"),
    qrClose: $("qrClose"),
    qrImage: $("qrImage"),
    qrTarget: $("qrTarget"),
    timerDisplay: $("pomodoroTime"),
    timerMode: $("pomodoroMode"),
    timerStartPause: $("timerStartPause"),
    timerReset: $("timerReset"),
    timerWork: $("timerModeWork"),
    timerBreak: $("timerModeBreak"),
    alarmAudio: $("alarmAudio"),
    githubLink: $("githubLink"),
    linkedinLink: $("linkedinLink"),
    mediumLink: $("mediumLink"),
    leetcodeLink: $("leetcodeLink"),
    mailLink: $("mailLink")
  };

  function setLinks() {
    el.githubLink.href = content.socials.github;
    el.linkedinLink.href = content.socials.linkedin;
    el.mediumLink.href = content.socials.medium;
    el.leetcodeLink.href = content.socials.leetcode;
    el.mailLink.href = content.socials.email;
    el.writingLink.href = content.writing.medium;
    el.contactEmail.href = "mailto:" + content.contact.email;
    el.contactEmail.textContent = content.contact.email;
    el.qrTarget.href = content.profile.qrValue;
  }

  function renderParagraphs(target, paragraphs) {
    target.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join("");
  }

  function renderAbout() {
    el.profileName.textContent = content.profile.name;
    el.profilePronunciation.textContent = content.profile.pronunciation;
    renderParagraphs(el.aboutIntro, content.about);
    renderParagraphs(el.thingAboutMe, content.thingAboutMe);
    el.contactCopy.textContent = content.contact.copy;
  }

  function createStackItem(item, index) {
    const article = document.createElement("article");
    article.className = "stack-item";
    if (item.collapsible) article.dataset.collapsibleItem = "true";

    const titleHtml = item.link
      ? `<a class="text-link stack-title-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>`
      : item.title;

    article.innerHTML = `
      <h3>${titleHtml}</h3>
      <div class="stack-role">${item.role || ""}</div>
      <div class="stack-text">${item.paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>
      ${item.collapsible ? `<button class="collapse-toggle" data-expand-item="${index}">View More</button>` : ""}
    `;

    return article;
  }

  function renderExperience() {
    content.experience.forEach((item, idx) => {
      el.experienceList.appendChild(createStackItem(item, idx));
    });

    el.journeyTitle.textContent = content.journey.title;
    renderParagraphs(el.journeyContent, content.journey.paragraphs);

    content.education.forEach((item, idx) => {
      const node = createStackItem(item, idx + 100);
      node.querySelectorAll(".collapse-toggle").forEach((b) => b.remove());
      node.classList.remove("expanded");
      el.educationList.appendChild(node);
    });
  }

  function renderTech() {
    const allSkills = content.techStack.flatMap((cat) => cat.skills);
    const iconUrl = (s) => s.url || "https://cdn.simpleicons.org/" + s.slug;
    const logoItem = (skill) => `
      <div class="tech-logo" title="${skill.name}">
        <img src="${iconUrl(skill)}" alt="${skill.name}" loading="lazy">
      </div>
    `;

    const logos = allSkills.map((skill) => logoItem(skill)).join("");
    el.techPreview.innerHTML = `
      <div class="tech-marquee" aria-label="Tech stack logos">
        <div class="tech-marquee-track">${logos}${logos}</div>
      </div>
    `;

    el.techGrid.innerHTML = content.techStack
      .map(
        (cat) => `
        <article class="tech-card">
          <h3>${cat.name}</h3>
          <div class="tech-list">
            ${cat.skills
              .map(
                (s) => `
                <div class="tech-list-item">
                  <img src="${iconUrl(s)}" alt="${s.name}" loading="lazy">
                  <span>${s.name}</span>
                </div>
              `
              )
              .join("")}
          </div>
        </article>
      `
      )
      .join("");
  }

  function formatAgentContent() {
    const sections = [];
    sections.push(`# ${content.profile.name}`);
    sections.push(`${content.profile.pronunciation} • ${content.profile.title}`);
    sections.push("\n## About\n" + content.about.join("\n\n"));

    const exp = content.experience
      .map((e) => `### ${e.title}\n${e.role}\n${e.paragraphs.join("\n")}`)
      .join("\n\n");
    sections.push("\n## Experience\n" + exp);

    sections.push("\n## Journey\n" + content.journey.paragraphs.join("\n\n"));

    const tech = content.techStack
      .map((cat) => `- ${cat.name}: ${cat.skills.map((s) => s.name).join(", ")}`)
      .join("\n");
    sections.push("\n## Tech Stack\n" + tech);

    sections.push("\n## Contact\n" + content.contact.email);
    return sections.join("\n");
  }

  function renderLibrary() {
    el.libraryList.innerHTML = content.library
      .map(
        (b) => `<div class="library-row"><span class="library-title">${b.title}</span><span class="library-author">${b.author}</span></div>`
      )
      .join("");
  }

  function renderGithubGraph() {
    const username = content.github.username;
    fetch("https://github-contributions-api.jogruber.de/v4/" + username + "?y=last")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var days = data.contributions || [];
        var total = (data.total && data.total.lastYear) || 0;
        var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        // Group days into weeks (columns), each week is Sun–Sat
        var weeks = [];
        var week = [];
        days.forEach(function (d) {
          var dow = new Date(d.date).getDay();
          if (dow === 0 && week.length > 0) {
            weeks.push(week);
            week = [];
          }
          week.push(d);
        });
        if (week.length > 0) weeks.push(week);

        // Build 7 rows (Sun=0 … Sat=6)
        var rows = [[], [], [], [], [], [], []];
        var months = [];
        var lastMonth = -1;
        weeks.forEach(function (w, colIdx) {
          var filled = [null, null, null, null, null, null, null];
          w.forEach(function (d) {
            var dow = new Date(d.date).getDay();
            filled[dow] = d;
            var m = new Date(d.date).getMonth();
            if (m !== lastMonth && dow <= 1) {
              months.push({ name: monthNames[m], col: colIdx });
              lastMonth = m;
            }
          });
          for (var r = 0; r < 7; r++) {
            rows[r].push(filled[r]);
          }
        });

        var levels = ["#161b22","#0e4429","#006d32","#26a641","#39d353"];
        var lightLevels = ["#ebedf0","#9be9a8","#40c463","#30a14e","#216e39"];
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        var palette = isDark ? levels : lightLevels;

        var cellColor = function (level) { return palette[Math.min(level || 0, 4)]; };

        var tableRows = rows.map(function (row) {
          return "<tr>" + row.map(function (d) {
            if (!d) return '<td style="background:transparent;outline:none"></td>';
            return '<td style="background:' + cellColor(d.level) + '" title="' + d.date + ": " + d.count + ' contributions"></td>';
          }).join("") + "</tr>";
        }).join("");

        var colCount = weeks.length;
        var monthHeader = "<tr>" + months.map(function (m, i) {
          var span = (months[i + 1] ? months[i + 1].col : colCount) - m.col;
          return '<td colspan="' + span + '" style="background:none;outline:none;font-size:11px;color:var(--muted);padding-bottom:4px">' + m.name + "</td>";
        }).join("") + "</tr>";

        el.githubGraph.innerHTML =
          "<table>" + monthHeader + tableRows + "</table>" +
          '<div class="gh-footer">' +
            "<span>" + total + " contributions in the last year</span>" +
            '<div class="gh-legend">Less ' +
              palette.map(function (c) { return '<span style="background:' + c + '"></span>'; }).join("") +
            " More</div>" +
          "</div>";
      })
      .catch(function () {
        el.githubGraph.innerHTML = '<p style="color:var(--muted);font-size:0.85rem">Could not load GitHub contributions.</p>';
      });
  }

  function initTheme() {
    const stored = localStorage.getItem("miyoko-theme");
    const initial = stored || "light";
    html.setAttribute("data-theme", initial);
    el.themeLabel.textContent = initial === "dark" ? "Dark" : "Light";

    el.themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("miyoko-theme", next);
      el.themeLabel.textContent = next === "dark" ? "Dark" : "Light";
    });
  }

  function initClock() {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-IN", {
        timeZone: content.profile.timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      el.liveClock.textContent = time;
    };
    update();
    setInterval(update, 1000);
  }

  function initModeSwitch() {
    let mode = "human";

    el.modeToggle.addEventListener("click", () => {
      mode = mode === "human" ? "agent" : "human";
      el.modeToggle.setAttribute("aria-checked", mode === "agent" ? "true" : "false");
      el.humanView.classList.toggle("hidden", mode !== "human");
      el.agentView.classList.toggle("hidden", mode !== "agent");
      el.agentView.setAttribute("aria-hidden", mode === "agent" ? "false" : "true");
    });
  }

  function initAura() {
    if (el.starfield && el.starfield.childElementCount === 0) {
      for (let i = 0; i < 50; i += 1) {
        const star = document.createElement("span");
        star.className = "star";
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.setProperty("--dur", `${2 + Math.random() * 3}s`);
        star.style.setProperty("--delay", `${Math.random() * 5}s`);
        el.starfield.appendChild(star);
      }
    }

    el.auraTrigger.addEventListener("click", () => {
      el.auraTrigger.classList.toggle("aura");
      document.body.classList.toggle("aura-active");
    });
  }

  function initLofi() {
    let playing = false;
    el.lofiAudio.volume = 0.7;

    el.lofiToggle.addEventListener("click", async () => {
      if (!playing) {
        try {
          await el.lofiAudio.play();
          playing = true;
          el.lofiToggle.textContent = "⏸";
          el.lofiToggle.setAttribute("aria-label", "Pause lofi audio");
        } catch (err) {
          playing = false;
        }
      } else {
        el.lofiAudio.pause();
        playing = false;
        el.lofiToggle.textContent = "♪";
        el.lofiToggle.setAttribute("aria-label", "Play lofi audio");
      }
    });
  }

  function initCollapsibles() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-expand-item]");
      if (trigger) {
        const card = trigger.closest(".stack-item");
        const expanded = card.classList.toggle("expanded");
        trigger.textContent = expanded ? "View Less" : "View More";
      }

      if (event.target.matches('.collapse-toggle[data-toggle="journey"]')) {
        const box = event.target.closest(".collapsible");
        const expanded = box.classList.toggle("expanded");
        event.target.textContent = expanded ? "View Less" : "View More";
      }
    });
  }

  function initTechToggle() {
    el.techExpand.addEventListener("click", () => {
      const expanded = el.techExpand.getAttribute("aria-expanded") === "true";
      el.techExpand.setAttribute("aria-expanded", expanded ? "false" : "true");
      document.getElementById("techExpandLabel").textContent = expanded ? "View Full Stack" : "Show Less";
      el.techGrid.classList.toggle("hidden", expanded);
      el.techPreview.classList.toggle("hidden", !expanded);
    });
  }

  function initQrModal() {
    const close = () => el.qrModal.classList.add("hidden");

    const qrUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
      encodeURIComponent(content.profile.qrValue);
    el.qrImage.src = qrUrl;

    el.qrTrigger.addEventListener("click", () => {
      el.qrModal.classList.remove("hidden");
    });

    el.qrClose.addEventListener("click", close);
    el.qrModal.querySelectorAll("[data-close-modal]").forEach((node) => {
      node.addEventListener("click", close);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initPomodoro() {
    const durations = { work: 25 * 60, break: 5 * 60 };
    let mode = "work";
    let timeLeft = durations.work;
    let interval = null;

    const render = () => {
      const mins = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
      const secs = (timeLeft % 60).toString().padStart(2, "0");
      el.timerDisplay.textContent = `${mins}:${secs}`;
      el.timerMode.textContent = mode === "work" ? "Focus Session" : "Short Break";
      el.timerWork.classList.toggle("active", mode === "work");
      el.timerBreak.classList.toggle("active", mode === "break");
    };

    const stop = () => {
      if (interval) clearInterval(interval);
      interval = null;
      el.timerStartPause.textContent = "Start";
    };

    const complete = async () => {
      stop();
      try {
        await el.alarmAudio.play();
      } catch (err) {
        // ignore browser autoplay restrictions
      }
    };

    el.timerStartPause.addEventListener("click", () => {
      if (interval) {
        stop();
        return;
      }

      el.alarmAudio.pause();
      el.alarmAudio.currentTime = 0;
      el.timerStartPause.textContent = "Pause";
      interval = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft <= 0) {
          timeLeft = 0;
          render();
          complete();
          return;
        }
        render();
      }, 1000);
    });

    el.timerReset.addEventListener("click", () => {
      stop();
      el.alarmAudio.pause();
      el.alarmAudio.currentTime = 0;
      timeLeft = mode === "work" ? durations.work : durations.break;
      render();
    });

    el.timerWork.addEventListener("click", () => {
      mode = "work";
      timeLeft = durations.work;
      stop();
      render();
    });

    el.timerBreak.addEventListener("click", () => {
      mode = "break";
      timeLeft = durations.break;
      stop();
      render();
    });

    render();
  }

  function initAgentContent() {
    el.agentText.textContent = formatAgentContent();
  }

  function init() {
    setLinks();
    renderAbout();
    renderExperience();
    renderTech();
    renderLibrary();
    renderGithubGraph();
    initAgentContent();
    initTheme();
    initClock();
    initModeSwitch();
    initAura();
    initLofi();
    initCollapsibles();
    initTechToggle();
    initQrModal();
    initPomodoro();
  }

  init();
})();
