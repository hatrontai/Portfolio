"use strict";

// Vietnamese HTML is the readable, no-JavaScript version and source translation.
const translations = {
  vi: {},
  en: {
    skip: "Skip to main content",
    homeLabel: "Hà Trọng Tài — Home",
    navigation: "Main navigation",
    navWork: "Selected work",
    navApproach: "My approach",
    navAbout: "About",
    navContact: "Let’s connect",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    location: "Ho Chi Minh City, Vietnam",
    hello: "Hello, I’m Hà Trọng Tài",
    heroLine1: "From an idea.",
    heroLine2: "To a frame.",
    heroLine3: "With AI.",
    intro:
      "I bring technical thinking and visual creativity together to turn ideas into characters, motion, and stories with feeling.",
    viewWork: "Explore my work",
    connect: "Let’s connect",
    exploreWork: "Explore the zAI project",
    selectedWork: "SELECTED WORK",
    filmAlt: "Animated characters and Slime creatures in the zAI video",
    filmCategory: "CHARACTERS. MOTION. STORIES.",
    heroCredit: "Contributing to video & character generation",
    heroBottom: "A creative perspective. New possibilities.",
    scroll: "Scroll to explore",
    workEyebrow: "FEATURED PROJECT",
    workTitle: "An idea, brought to life.",
    workAside: "Where experiments with AI\nbecome a story worth sharing.",
    playFilm: "Play zAI - Cẩm nang xài Slime cho Tân Thủ",
    posterAlt: "Cover of zAI - Cẩm nang xài Slime cho Tân Thủ",
    watchFilm: "Watch the film",
    characterTag: "CHARACTERS",
    projectDescription:
      "A project carrying the HUMAN² message: when people actively collaborate with AI, unfinished ideas can become tangible value.",
    youtube: "Watch on YouTube",
    roleLabel: "MY CONTRIBUTION",
    roleValue: "Contributed to part of the video and character generation",
    toolsLabel: "TOOLS USED",
    focusLabel: "FOCUS",
    focusValue:
      "Character consistency · Shot generation workflow · Sound & music",
    humanEyebrow: "THE MESSAGE BEHIND THE PROJECT",
    humanTitle: "AI amplifies\nhuman potential.",
    humanDescription:
      "At VNG, AI has become a companion in everyday work. HUMAN² starts when people go beyond deadlines: working with AI to bring unfinished, even seemingly impossible, ideas to life.",
    humanStatement:
      "One person dares to begin.\nOthers find the inspiration to follow.",
    approachEyebrow: "EXPERIENCE & APPROACH",
    approachTitle: "Create with intention.",
    approachAside:
      "From characters to individual shots,\nand the emotion carried by sound.",
    skill1Title: "Consistent characters",
    skill1Text:
      "Maintaining character identity across frames, so each shot belongs to the same world and the same story.",
    skill2Title: "Shot generation workflow",
    skill2Text:
      "Building a shot generation workflow to organize video creation, experiment, and connect ideas into moving images.",
    skill3Title: "Sound & music",
    skill3Text:
      "Bringing visuals, sound, and music together to find a rhythm and emotional tone that serve the story.",
    toolStrip: "TOOLS IN MY CREATIVE PROCESS",
    portraitAlt: "Portrait of Hà Trọng Tài",
    aboutEyebrow: "BEHIND THE FRAMES",
    aboutTitle: "Technical thinking.\nCreative spirit.",
    aboutText1:
      "I’m Hà Trọng Tài, with a background in Computer Science at the University of Information Technology (UIT). I’m interested in how AI can expand creative possibilities and turn ideas into reality.",
    aboutText2:
      "Through AI video and filmmaking, I explore the intersection of technology, characters, and storytelling. Each project is a chance to experiment, learn, and share my process with the community.",
    education: "Computer Science · 2021–2025",
    github: "Explore my technical side on GitHub",
    contactEyebrow: "LET’S START A STORY",
    contactTitle: "The next idea?\nLet’s make it happen.",
    contactText:
      "Exchange ideas, share workflows,\nor explore a new project together.",
    footer: "Creating with AI. Storytelling with a human perspective.",
    backTop: "Back to top",
    title: "Hà Trọng Tài — AI Video & Film Creator",
    description:
      "Hà Trọng Tài — creating video and film with AI. Explore my work, characters, and shot generation workflow.",
    socialDescription:
      "Human imagination. AI possibilities. Stories we create together.",
  },
};

const attributes = [
  ["data-i18n", null],
  ["data-i18n-aria", "aria-label"],
  ["data-i18n-alt", "alt"],
];
for (const [dataAttribute, attribute] of attributes) {
  document.querySelectorAll(`[${dataAttribute}]`).forEach((element) => {
    const key = element.getAttribute(dataAttribute);
    translations.vi[key] = attribute
      ? element.getAttribute(attribute)
      : Array.from(element.childNodes, (node) =>
          node.nodeName === "BR" ? "\u0000" : node.textContent,
        )
          .join("")
          .split("\u0000")
          .map((line) => line.replace(/\s+/g, " ").trim())
          .join("\n");
  });
}
Object.assign(translations.vi, {
  closeMenu: "Đóng menu",
  title: document.title,
  description: document.querySelector('meta[name="description"]').content,
  socialDescription: document.querySelector('meta[property="og:description"]')
    .content,
});

let currentLanguage = "vi";
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    translations[currentLanguage][open ? "closeMenu" : "openMenu"],
  );
  navigation.classList.toggle("open", open);
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "vi";
  const copy = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  for (const [dataAttribute, attribute] of attributes) {
    document.querySelectorAll(`[${dataAttribute}]`).forEach((element) => {
      const value = copy[element.getAttribute(dataAttribute)];
      if (value === undefined) return;
      if (attribute) element.setAttribute(attribute, value);
      else {
        const lines = value.split("\n");
        element.replaceChildren();
        lines.forEach((line, index) => {
          if (index) element.append(document.createElement("br"));
          element.append(document.createTextNode(line));
        });
      }
    });
  }
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelector('meta[property="og:title"]').content = copy.title;
  document.querySelector('meta[property="og:description"]').content =
    copy.socialDescription;
  document
    .querySelectorAll("[data-lang]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.lang === currentLanguage),
      ),
    );
  const player = document.querySelector("#film-player iframe");
  if (player) player.title = copy.playFilm;
  setMenu(menuButton.getAttribute("aria-expanded") === "true");
  try {
    localStorage.setItem("portfolio-language", currentLanguage);
  } catch {
    /* Storage is optional. */
  }
}

let savedLanguage = "vi";
try {
  savedLanguage = localStorage.getItem("portfolio-language") || "vi";
} catch {
  /* Use Vietnamese if storage is unavailable. */
}
setLanguage(savedLanguage);
document.body.classList.add("js-enabled");
document.querySelector("#year").textContent = new Date().getFullYear();
document
  .querySelectorAll("[data-lang]")
  .forEach((button) =>
    button.addEventListener("click", () => setLanguage(button.dataset.lang)),
  );
menuButton.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) setMenu(false);
});
window
  .matchMedia("(min-width: 761px)")
  .addEventListener("change", () => setMenu(false));

document.querySelector("#play-film").addEventListener("click", () => {
  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.youtube-nocookie.com/embed/CTHHXYTjiJw?autoplay=1&rel=0";
  iframe.title = translations[currentLanguage].playFilm;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  document.querySelector("#film-player").replaceChildren(iframe);
  iframe.focus();
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pending");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("pending");
      revealObserver.observe(element);
    });
  }
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          navigation.querySelectorAll("a").forEach((link) => {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      });
    },
    { rootMargin: "-15% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => sectionObserver.observe(section));
}
