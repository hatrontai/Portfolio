"use strict";

// Vietnamese HTML is the readable, no-JavaScript version and source translation.
const translations = {
  vi: {},
  en: {
    heroRole: "Exploring & creating with AI",
    viewProfile: "Get to know me",
    portraitCaption: "Curiosity. Experimentation. Sharing.",
    aboutInterest: "AI · Video · Characters · Music",
    projectDetails: "Project details",
    projectMessageTitle: "The HUMAN² message",
    projectMessage:
      "At VNG, AI has become a companion in everyday work. HUMAN² is about people actively collaborating with AI to realize ideas, amplify their potential, and inspire others to begin.",

    skip: "Skip to main content",
    homeLabel: "Hà Trọng Tài — Home",
    navigation: "Main navigation",
    navWork: "Projects",
    navAbout: "About",
    navContact: "Let’s connect",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    location: "Ho Chi Minh City, Vietnam",
    hello: "HELLO, I’M",
    intro:
      "I’m curious about AI and enjoy experimenting with images, video, and new ways to create. This is where I share my projects and what I learn along the way.",
    viewWork: "View projects",
    heroBottom: "Personal profile · Projects · Contact",
    scroll: "Scroll to explore",
    workEyebrow: "PROJECTS I’VE CONTRIBUTED TO",
    workTitle: "Part of my journey.",
    workAside: "Projects I’ve contributed to\nand lessons from making them.",
    playFilm: "Play zAI - Cẩm nang xài Slime cho Tân Thủ",
    posterAlt: "Cover of zAI - Cẩm nang xài Slime cho Tân Thủ",
    watchFilm: "Watch the film",
    characterTag: "CHARACTERS",
    projectDescription:
      "I contributed to part of the video and character generation using GPT and GG Omni. The project involved practicing character consistency, shot generation workflows, sound, and music.",
    youtube: "Watch on YouTube",
    roleLabel: "MY CONTRIBUTION",
    roleValue: "Contributed to part of the video and character generation",
    toolsLabel: "TOOLS USED",
    portraitAlt: "Portrait of Hà Trọng Tài",
    aboutEyebrow: "ABOUT ME",
    aboutTitle: "Curious about AI.\nAlways keen to try.",
    aboutText1:
      "I’m Hà Trọng Tài. I’m interested in the possibilities AI brings and enjoy trying things out to discover how it can help turn ideas into reality.",
    aboutText2:
      "I enjoy exploring image, video, and character creation with AI. Every experiment is a chance to learn, discover a new approach, and share the experience with others.",
    github: "Visit my GitHub",
    contactEyebrow: "GET IN TOUCH",
    contactTitle: "The next idea?\nLet’s make it happen.",
    contactText:
      "Exchange ideas, share workflows,\nor explore a new project together.",
    footer: "Creating with AI. Storytelling with a human perspective.",
    backTop: "Back to top",
    title: "Hà Trọng Tài — Exploring AI",
    description:
      "Hà Trọng Tài — an AI enthusiast exploring image and video creation, experimenting with new ideas, and sharing what I learn.",
    socialDescription:
      "Exploring AI, creative experiments, and projects Hà Trọng Tài has contributed to.",
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
