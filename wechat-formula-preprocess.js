(function () {
  const HOST = "mp.weixin.qq.com";
  const PROCESSED_ATTR = "data-obsidian-wechat-formula-processed";
  const INLINE_CLASS = "mwe-math-element";
  const BLOCK_CLASS = "mwe-math-fallback-image-display";

  if (location.hostname !== HOST) {
    return;
  }

  function isWechatArticlePage() {
    return location.pathname === "/s" || location.pathname.startsWith("/s/");
  }

  function isNestedFormulaNode(node) {
    if (!(node instanceof Element)) {
      return false;
    }
    const parent = node.parentElement;
    return !!(parent && parent.closest("[data-formula]"));
  }

  function shouldUseBlockMath(node, formula) {
    const tag = node.tagName.toLowerCase();
    return tag === "section" || tag === "div" || tag === "p" || formula.includes("\n") || formula.includes("\\\\");
  }

  function injectFallback(node) {
    if (!(node instanceof Element)) {
      return;
    }
    if (node.hasAttribute(PROCESSED_ATTR) || isNestedFormulaNode(node)) {
      return;
    }

    const formula = (node.getAttribute("data-formula") || "").trim();
    if (!formula) {
      return;
    }

    node.setAttribute(PROCESSED_ATTR, "true");
    node.setAttribute("data-latex", formula);
    node.classList.add(INLINE_CLASS);

    if (shouldUseBlockMath(node, formula)) {
      node.classList.add(BLOCK_CLASS);
      node.setAttribute("display", "block");
    }

    node.querySelectorAll("svg").forEach((svg) => {
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
    });
  }

  function processDocument(root) {
    if (!isWechatArticlePage()) {
      return;
    }
    const scope = root instanceof Element || root instanceof Document ? root : document;
    scope.querySelectorAll("[data-formula]").forEach(injectFallback);
  }

  processDocument(document);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) {
          return;
        }
        if (node.matches("[data-formula]")) {
          injectFallback(node);
        }
        processDocument(node);
      });
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
