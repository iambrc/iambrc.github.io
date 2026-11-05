const bibtex = {
  part: `@article{bao2026part,
  title={PART: Learning 3D Part Assembly and Retrieval with Transformers},
  author={Bao, Ruchao and Wu, Wenzheng and Xiang, Chucheng and Liu, Zhongyuan and Liu, Yuan and Dong, Jinxin and Liu, Ligang and Wang, Ziqi},
  journal={arXiv preprint arXiv:2609.19872},
  year={2026}
}`,
  gala: `@inproceedings{xiang2026gala,
  title={GALA: Geometry-Aware Language Model for Controllable Object Arrangement},
  author={Xiang, Chucheng and Wang, Runze and Deng, Zhi and Bao, Ruchao and Zhang, Yuanwei and Xie, Yuxuan and Wang, Hanliu and Fei, Liangzhen and Wu, Wenzheng and Wan, Cheng and Li, Peifeng and Liu, Zhongyuan and Liu, Ligang},
  booktitle={SIGGRAPH Asia 2026 Conference Papers (SA Conference Papers '26)},
  year={2026},
  doi={10.1145/3829340.3842289}
}`,
  colayout: `@article{Xiang2026Co,
  title={Co-Layout: LLM-driven Co-optimization for Interior Layout},
  author={Xiang, Chucheng and Bao, Ruchao and Feng, Biyin and Wu, Wenzheng and Liu, Zhongyuan and Guan, Yirui and Liu, Ligang},
  journal={Proceedings of the AAAI Conference on Artificial Intelligence},
  volume={40},
  number={17},
  pages={14371--14379},
  year={2026},
  doi={10.1609/aaai.v40i17.38452}
}`,
  ids: `@article{wu2026scenelayout,
  title={Scene layout via conceptual design},
  author={Wu, Wenzheng and Xiang, Chucheng and Lin, Zhi and Guan, Yirui and Bao, Ruchao and Liu, Zhongyuan and Wang, Ziqi and Liu, Ligang},
  journal={Computers \\& Graphics},
  volume={136},
  pages={104553},
  year={2026},
  doi={10.1016/j.cag.2026.104553}
}`
};

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 1800);
}

function copyBibtex(key) {
  const text = bibtex[key];
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => toast("BibTeX copied"));
}

function initNav() {
  const links = [...document.querySelectorAll(".nav a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  setTheme(
    saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  initNav();

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });

  document.querySelectorAll("[data-bibtex]").forEach((btn) => {
    btn.addEventListener("click", () => copyBibtex(btn.dataset.bibtex));
  });
});
