/* eslint-env node, browser */
/* jsllm7.js – Make Your JavaScript Think For Free - Universal zero-dependency client for the LLM7.io (browser, Node CJS/ESM) */

(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
    module.exports.default = module.exports; // ESM‑friendly default
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);                      // AMD
  } else {
    root.jsllm7 = factory();                  // Browser global
  }
}(typeof self !== 'undefined' ? self : this, function () {
  const BASE = 'https://api.llm7.io/v1';
  const headers = { 'Content-Type': 'application/json' };
  const DEFAULT_MODEL = 'gpt-4.1-mini-2025-04-14';

  async function chat(model, userPrompt, systemPrompt) {
    const body = {
      model,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        { role: 'user', content: userPrompt }
      ]
    };

    const r = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error(`${model}: ${r.status} ${r.statusText}`);
    const d = await r.json();
    return d.choices?.[0]?.message?.content ?? '';
  }

  async function listModels() {
    const r = await fetch(`${BASE}/models`, { headers });
    if (!r.ok) throw new Error(`/models ${r.status}`);
    const j = await r.json();
    const flat = Array.isArray(j) ? j                               // ["id", …]
               : Array.isArray(j.data) ? j.data                      // {data:[…]}
               : Array.isArray(j.models) ? j.models                  // {models:[…]}
               : [];

    const ids = [];
    for (const it of flat) ids.push(typeof it === 'string' ? it : it.id);
    return ids;
  }

  function jsllm7(prompt, systemPrompt = 'You are a helpful assistant', model = DEFAULT_MODEL) {
    return chat(model, prompt, systemPrompt);
  }

  jsllm7.DEFAULT_MODEL = DEFAULT_MODEL;
  jsllm7.listModels = listModels;

  return jsllm7;
}));
