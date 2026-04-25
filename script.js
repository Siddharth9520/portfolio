const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-fill");
const miniSkillBars = document.querySelectorAll(".mini-skill-fill");
const skillRings = document.querySelectorAll(".skill-ring");
const themeToggle = document.getElementById("themeToggle");
const contactScrollBtn = document.getElementById("contactScrollBtn");
const projectsScrollBtn = document.getElementById("projectsScrollBtn");
const allImages = document.querySelectorAll("img");
const viewDashboardBtn = document.getElementById("viewDashboardBtn");
const viewCertificateBtn = document.getElementById("viewCertificateBtn");
const trackProgressBtn = document.getElementById("trackProgressBtn");
const dashboardModal = document.getElementById("dashboardModal");
const closeDashboardModal = document.getElementById("closeDashboardModal");
const certificateModal = document.getElementById("certificateModal");
const closeCertificateModal = document.getElementById("closeCertificateModal");
const degreeFill = document.getElementById("degreeFill");
const miniBars = document.querySelectorAll(".mini-bar");
const skillDetailButtons = document.querySelectorAll(".skill-detail-btn");
const skillProjectButtons = document.querySelectorAll(".skill-project-btn");
const projectCards = document.querySelectorAll(".project-card");
const skillDetailModal = document.getElementById("skillDetailModal");
const closeSkillDetailModal = document.getElementById("closeSkillDetailModal");
const skillDetailTitle = document.getElementById("skillDetailTitle");
const skillDetailDescription = document.getElementById("skillDetailDescription");
const skillDetailTools = document.getElementById("skillDetailTools");
const skillDetailExamples = document.getElementById("skillDetailExamples");
const showcaseCards = document.querySelectorAll(".showcase-card");
const showcaseViewButtons = document.querySelectorAll(".item-view-cert");
const showcaseDetailButtons = document.querySelectorAll(".item-view-details");
const uploadCertButtons = document.querySelectorAll(".item-upload-cert");
const showcaseModal = document.getElementById("showcaseModal");
const closeShowcaseModal = document.getElementById("closeShowcaseModal");
const showcaseCloseAction = document.getElementById("showcaseCloseAction");
const showcaseTitle = document.getElementById("showcaseTitle");
const showcaseIssuer = document.getElementById("showcaseIssuer");
const showcaseDescription = document.getElementById("showcaseDescription");
const showcaseImage = document.getElementById("showcaseImage");
const showcaseCounter = document.getElementById("showcaseCounter");
const showcaseViewFull = document.getElementById("showcaseViewFull");
const showcasePrev = document.getElementById("showcasePrev");
const showcaseNext = document.getElementById("showcaseNext");
const directNavLinks = document.querySelectorAll(".external-contact-link, .profile-link");

// Reveal sections with a subtle fade-up transition.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Animate skill bars once they become visible.
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = entry.target;
      const progress = Number(target.dataset.progress || 0);

      if (target.classList.contains("progress-fill") || target.classList.contains("mini-skill-fill")) {
        target.style.width = `${progress}%`;
      }

      if (target.classList.contains("skill-ring")) {
        target.style.setProperty("--p", progress);
      }

      skillObserver.unobserve(target);
    });
  },
  { threshold: 0.35 }
);

progressBars.forEach((bar) => skillObserver.observe(bar));
miniSkillBars.forEach((bar) => skillObserver.observe(bar));
skillRings.forEach((ring) => skillObserver.observe(ring));

function setActiveNavLink() {
  const scrollPoint = window.scrollY + 170;
  let matchedSectionId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPoint >= top && scrollPoint < top + height) {
      matchedSectionId = id;
    }
  });

  if (!matchedSectionId && window.scrollY < 120) {
    matchedSectionId = "home";
  }

  if (!matchedSectionId) {
    return;
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${matchedSectionId}`);
  });
}

window.addEventListener("scroll", setActiveNavLink);
setActiveNavLink();

function smoothJump(targetId) {
  const target = document.querySelector(targetId);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

directNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    event.preventDefault();
    window.location.href = href;
  });
});

if (contactScrollBtn) {
  contactScrollBtn.addEventListener("click", (event) => {
    event.preventDefault();
    smoothJump("#contact");
  });
}

if (projectsScrollBtn) {
  projectsScrollBtn.addEventListener("click", (event) => {
    event.preventDefault();
    smoothJump("#projects");
  });
}

// Theme toggle with persistence.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  });
}

function openModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.add("open");
  modalElement.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.remove("open");
  modalElement.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function animateDashboardWidgets() {
  if (degreeFill) {
    degreeFill.style.width = "25%";
  }

  miniBars.forEach((bar, index) => {
    const height = Number(bar.dataset.height || 0);
    bar.style.transitionDelay = `${index * 0.08}s`;
    bar.style.height = `${height}%`;
  });
}

function resetDashboardWidgets() {
  if (degreeFill) {
    degreeFill.style.width = "0%";
  }

  miniBars.forEach((bar) => {
    bar.style.height = "0%";
    bar.style.transitionDelay = "0s";
  });
}

if (viewDashboardBtn) {
  viewDashboardBtn.addEventListener("click", () => {
    openModal(dashboardModal);
    resetDashboardWidgets();
    setTimeout(animateDashboardWidgets, 90);
  });
}

if (closeDashboardModal) {
  closeDashboardModal.addEventListener("click", () => {
    closeModal(dashboardModal);
  });
}

if (viewCertificateBtn) {
  viewCertificateBtn.addEventListener("click", () => {
    openModal(certificateModal);
  });
}

if (closeCertificateModal) {
  closeCertificateModal.addEventListener("click", () => {
    closeModal(certificateModal);
  });
}

if (trackProgressBtn) {
  trackProgressBtn.addEventListener("click", () => {
    smoothJump("#skills");
  });
}

const skillMeta = {
  Python: {
    description: "Used for automation scripts, data pipelines, and model prototyping.",
    tools: "Pandas, NumPy, Matplotlib, Jupyter",
    examples: "Neural Sentiment Engine, Data preprocessing and automation workflows",
  },
  "Power BI": {
    description: "Creates data storytelling dashboards with actionable business insights.",
    tools: "Power BI Desktop, DAX, Excel connectors",
    examples: "Power BI Insight Hub, KPI reporting dashboards",
  },
  "Machine Learning": {
    description: "Builds predictive and classification models for real-world datasets.",
    tools: "scikit-learn, Python ML ecosystem",
    examples: "Sentiment classification and model evaluation pipelines",
  },
  Manim: {
    description: "Designs technical animations to explain complex concepts with clarity.",
    tools: "Python, Manim, animation scene composition",
    examples: "Manim Animation Suite for educational visual explanations",
  },
};

const showcaseData = {
  "google-cloud": {
    title: "Google Cloud",
    issuer: "Google Cloud",
    description: "Cloud fundamentals certificate validating security, platform navigation, and deployment awareness.",
    images: ["assets/certs/google-cloud"],
  },
  "anthropic-fluency": {
    title: "Anthropic AI Fluency Courses",
    issuer: "Anthropic",
    description: "Practical AI fluency certification focused on safe, useful, and reliable AI usage.",
    images: [
      "assets/certs/anthropic-ai-1",
      "assets/certs/anthropic-ai-2",
      "assets/certs/anthropic-ai-3",
      "assets/certs/anthropic-ai-4",
    ],
  },
  "ibm-essentials": {
    title: "IBM Career Essentials",
    issuer: "IBM",
    description: "Career readiness credential covering professional communication and execution discipline.",
    images: ["assets/certs/ibm-essentials"],
  },
  "cisco-python-essentials": {
    title: "Cisco Python Essentials",
    issuer: "Cisco",
    description: "Dual certification path for Python Essentials 1 and Python Essentials 2.",
    images: ["assets/certs/cisco-python-1", "assets/certs/cisco-python-2"],
  },
  "codeacademy-javascript": {
    title: "Code Academy JavaScript",
    issuer: "Code Academy",
    description: "JavaScript fundamentals certification demonstrating scripting and interactive UI logic.",
    images: ["assets/certs/codeacademy-js"],
  },
  "techsprint-2026": {
    title: "TechSprint 2026",
    issuer: "Hackathon",
    description: "Hackathon participation with a fast AI-first prototype and collaborative execution.",
    images: ["assets/hackathons/techsprint-2026"],
  },
  "datathon-2026": {
    title: "Datathon 2026",
    issuer: "Hackathon",
    description: "Built data-driven insights and analytical models under competitive constraints.",
    images: ["assets/hackathons/datathon-2026"],
  },
  "national-math-day-2025": {
    title: "National Mathematics Day 2025",
    issuer: "MIT Academy of Engineering",
    description:
      "Team AlgoAnimators secured 1st Prize in the Mathematics & Technology (Theme-wise) category during National Mathematics Day 2025 at MIT Academy of Engineering.",
    images: ["assets/hackathons/nmd-2025-award"],
  },
  "gta-megajam": {
    title: "GTA MegaJam",
    issuer: "Unstop | NIT Rourkela",
    description:
      "This certificate confirms participation in GTA MegaJam of GTA Megajam organised by National Institute of Technology (NIT), Rourkela.",
    images: ["assets/hackathons/gta-megajam-certificate"],
  },
};

let currentShowcaseEntry = null;
let currentShowcaseIndex = 0;
let currentShowcaseResolvedImages = [];
let activeUploadEntryId = "";

function getMaxUploads(entryId) {
  if (entryId === "cisco-python-essentials") {
    return 2;
  }

  if (entryId === "anthropic-fluency") {
    return 4;
  }

  return 1;
}

const certificateUploadInput = document.createElement("input");
certificateUploadInput.type = "file";
certificateUploadInput.accept = "image/*";
certificateUploadInput.multiple = true;
certificateUploadInput.style.display = "none";
document.body.appendChild(certificateUploadInput);

function storageKeyForEntry(entryId) {
  return `portfolio-cert-images-${entryId}`;
}

function getStoredShowcaseImages(entryId) {
  try {
    const raw = localStorage.getItem(storageKeyForEntry(entryId));
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value) => typeof value === "string" && value.startsWith("data:image/"));
  } catch (error) {
    return [];
  }
}

function setStoredShowcaseImages(entryId, images) {
  try {
    localStorage.setItem(storageKeyForEntry(entryId), JSON.stringify(images));
  } catch (error) {
    // Ignore storage errors silently to keep UI responsive.
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read certificate image"));
    reader.readAsDataURL(file);
  });
}

function expandImageCandidates(path) {
  if (/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(path)) {
    return [path];
  }

  return [`${path}.jpg`, `${path}.jpeg`, `${path}.png`, `${path}.webp`];
}

function resolveImagePath(path) {
  const candidates = expandImageCandidates(path);

  return new Promise((resolve) => {
    let index = 0;

    const tryNext = () => {
      if (index >= candidates.length) {
        resolve(candidates[0]);
        return;
      }

      const candidate = candidates[index];
      const image = new Image();
      image.onload = () => resolve(candidate);
      image.onerror = () => {
        index += 1;
        tryNext();
      };
      image.src = candidate;
    };

    tryNext();
  });
}

function openSkillDetail(skill) {
  const info = skillMeta[skill];
  if (!info || !skillDetailModal) {
    return;
  }

  if (skillDetailTitle) {
    skillDetailTitle.textContent = `${skill} Details`;
  }

  if (skillDetailDescription) {
    skillDetailDescription.textContent = info.description;
  }

  if (skillDetailTools) {
    skillDetailTools.textContent = info.tools;
  }

  if (skillDetailExamples) {
    skillDetailExamples.textContent = info.examples;
  }

  openModal(skillDetailModal);
}

skillDetailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const skill = button.dataset.skill;
    if (skill) {
      openSkillDetail(skill);
    }
  });
});

function focusRelatedProjects(skill) {
  smoothJump("#projects");
  const normalizedSkill = skill.toLowerCase();

  projectCards.forEach((card) => {
    const mappedSkills = (card.dataset.projectSkills || "").toLowerCase();
    const isRelated = mappedSkills.includes(normalizedSkill);
    card.classList.toggle("project-focus", isRelated);
  });

  setTimeout(() => {
    projectCards.forEach((card) => card.classList.remove("project-focus"));
  }, 2600);
}

skillProjectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const skill = button.dataset.skill;
    if (skill) {
      focusRelatedProjects(skill);
    }
  });
});

if (closeSkillDetailModal) {
  closeSkillDetailModal.addEventListener("click", () => {
    closeModal(skillDetailModal);
  });
}

function updateShowcaseContent() {
  if (!currentShowcaseEntry) {
    return;
  }

  const entry = showcaseData[currentShowcaseEntry];
  if (!entry) {
    return;
  }

  const images = currentShowcaseResolvedImages.length ? currentShowcaseResolvedImages : entry.images;
  const total = images.length;
  const imagePath = images[currentShowcaseIndex];

  if (showcaseTitle) {
    showcaseTitle.textContent = entry.title;
  }

  if (showcaseIssuer) {
    showcaseIssuer.textContent = `Issuer: ${entry.issuer}`;
  }

  if (showcaseDescription) {
    showcaseDescription.textContent = entry.description;
  }

  if (showcaseImage) {
    showcaseImage.src = imagePath;
    showcaseImage.alt = entry.title;
  }

  if (showcaseCounter) {
    showcaseCounter.textContent = `${currentShowcaseIndex + 1} / ${total}`;
  }

  if (showcaseViewFull) {
    showcaseViewFull.href = imagePath;
  }

  if (showcasePrev) {
    showcasePrev.disabled = total <= 1;
  }

  if (showcaseNext) {
    showcaseNext.disabled = total <= 1;
  }
}

function openShowcase(entryId) {
  if (!showcaseData[entryId]) {
    return;
  }

  const entry = showcaseData[entryId];
  const storedImages = getStoredShowcaseImages(entryId);
  currentShowcaseEntry = entryId;
  currentShowcaseIndex = 0;
  currentShowcaseResolvedImages = storedImages;
  updateShowcaseContent();
  openModal(showcaseModal);

  if (storedImages.length > 0) {
    return;
  }

  Promise.all(entry.images.map((path) => resolveImagePath(path))).then((resolvedPaths) => {
    if (currentShowcaseEntry !== entryId) {
      return;
    }

    currentShowcaseResolvedImages = resolvedPaths;
    updateShowcaseContent();
  });
}

if (showcasePrev) {
  showcasePrev.addEventListener("click", () => {
    const entry = showcaseData[currentShowcaseEntry];
    if (!entry || entry.images.length <= 1) {
      return;
    }

    currentShowcaseIndex =
      (currentShowcaseIndex - 1 + entry.images.length) % entry.images.length;
    updateShowcaseContent();
  });
}

if (showcaseNext) {
  showcaseNext.addEventListener("click", () => {
    const entry = showcaseData[currentShowcaseEntry];
    if (!entry || entry.images.length <= 1) {
      return;
    }

    currentShowcaseIndex = (currentShowcaseIndex + 1) % entry.images.length;
    updateShowcaseContent();
  });
}

showcaseCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest(".item-view-details")) {
      return;
    }

    const entryId = card.dataset.entryId;
    if (entryId) {
      openShowcase(entryId);
    }
  });
});

showcaseViewButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const entryId = button.dataset.entryId;
    if (entryId) {
      openShowcase(entryId);
    }
  });
});

showcaseDetailButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = button.closest(".showcase-card");
    if (!card) {
      return;
    }

    const detail = card.querySelector(".item-description");
    if (!(detail instanceof HTMLElement)) {
      return;
    }

    detail.classList.toggle("open");
  });
});

uploadCertButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const entryId = button.dataset.entryId;
    if (!entryId) {
      return;
    }

    activeUploadEntryId = entryId;
    certificateUploadInput.multiple = getMaxUploads(entryId) > 1;
    certificateUploadInput.value = "";
    certificateUploadInput.click();
  });
});

certificateUploadInput.addEventListener("change", () => {
  if (!activeUploadEntryId) {
    return;
  }

  const files = Array.from(certificateUploadInput.files || []);
  if (files.length === 0) {
    return;
  }

  const limitedFiles = files.slice(0, getMaxUploads(activeUploadEntryId));

  Promise.all(limitedFiles.map((file) => fileToDataUrl(file))).then((images) => {
    setStoredShowcaseImages(activeUploadEntryId, images);

    if (currentShowcaseEntry === activeUploadEntryId) {
      currentShowcaseResolvedImages = images;
      currentShowcaseIndex = 0;
      updateShowcaseContent();
    }

    openShowcase(activeUploadEntryId);
  });
});

if (closeShowcaseModal) {
  closeShowcaseModal.addEventListener("click", () => {
    closeModal(showcaseModal);
  });
}

if (showcaseCloseAction) {
  showcaseCloseAction.addEventListener("click", () => {
    closeModal(showcaseModal);
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.dataset.closeDashboard === "true") {
    closeModal(dashboardModal);
  }

  if (target.dataset.closeCertificate === "true") {
    closeModal(certificateModal);
  }

  if (target.dataset.closeSkillDetail === "true") {
    closeModal(skillDetailModal);
  }

  if (target.dataset.closeShowcase === "true") {
    closeModal(showcaseModal);
  }
});

document.addEventListener("keydown", (event) => {
  const isShowcaseOpen = showcaseModal && showcaseModal.classList.contains("open");

  if (isShowcaseOpen && event.key === "ArrowLeft") {
    showcasePrev?.click();
    return;
  }

  if (isShowcaseOpen && event.key === "ArrowRight") {
    showcaseNext?.click();
    return;
  }

  if (event.key !== "Escape") {
    return;
  }

  if (dashboardModal && dashboardModal.classList.contains("open")) {
    closeModal(dashboardModal);
  }

  if (certificateModal && certificateModal.classList.contains("open")) {
    closeModal(certificateModal);
  }

  if (skillDetailModal && skillDetailModal.classList.contains("open")) {
    closeModal(skillDetailModal);
  }

  if (isShowcaseOpen) {
    closeModal(showcaseModal);
  }
});

function placeholderSVG(fileName) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0a1734"/>
          <stop offset="100%" stop-color="#1b3772"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <rect x="40" y="40" width="1120" height="720" rx="24" fill="none" stroke="#76a6ff" stroke-width="3" stroke-opacity="0.6"/>
      <text x="50%" y="47%" text-anchor="middle" fill="#dbe9ff" font-size="52" font-family="Segoe UI, Arial, sans-serif">${fileName}</text>
      <text x="50%" y="57%" text-anchor="middle" fill="#9db5e8" font-size="24" font-family="Segoe UI, Arial, sans-serif">Add this file in /assets folder</text>
    </svg>
  `)}`;
}

allImages.forEach((img) => {
  img.addEventListener("error", () => {
    const source = img.getAttribute("src") || "assets/image.jpg";
    img.src = placeholderSVG(source);
  });
});
