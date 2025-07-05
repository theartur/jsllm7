# **jsllm7** - _Make Your JavaScript Think For Free_

> **Plug in instant intelligence on the web.** One file, one function, zero setup. Ask questions, generate text, right from plain JavaScript. Free, fast, and fun.

---

## 🎯 What is jsllm7?

**jsllm7** is a micro universal client that talks directly to the best AI models available today, **FOR FREE**. It encapsulates all the model‑specific JSON behind a single function call so you can drop AI super‑powers anywhere: Node, the browser, you name it.

No API keys. No SDK installs. No vendor lock‑in. **Zero dependencies.**

---

## 🌱 Quick Examples

### 1. Browser

```html
<script src="jsllm7.js"></script>
<script>
  jsllm7('Tell me a quick joke').then(alert);
</script>
```

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>jsllm7 Browser Demo</title>
</head>
<body>
  <h1>jsllm7 – Browser One‑Liner Demo</h1>
  <button id="ask">Tell me a joke</button>
  <pre id="answer"></pre>

  <!-- Load the client -->
  <script src="../jsllm7.js"></script>
  <script>
    document.getElementById('ask').addEventListener('click', async () => {
      const text = await jsllm7('Tell me a quick joke');
      document.getElementById('answer').textContent = text;
    });
  </script>
</body>
</html>


```

### 1. Node (CommonJS)

```js
const jsllm7 = require('jsllm7');

(async () => {
  const pt = await jsllm7('Translate "Open‑source JavaScript is awesome" to Portuguese');
  console.log(pt); // "JavaScript de código aberto é incrível"
})();
```

### 1. Node (ESM)

```js
import jsllm7 from 'jsllm7';

const haiku = await jsllm7('Write a haiku about dawn', "You're a poet", 'ministral-8b-2410');
console.log(haiku);
```

### 1. Benchmark all models

```bash
node examples/benchmark.mjs
```

---

## ⚙️ Installation

### via npm (recommended)

```bash
npm i jsllm7
```

Then import or require it like any other package:

```js
import jsllm7 from 'jsllm7';
// or
const jsllm7 = require('jsllm7');
```

### Or even manual drop‑in

Copy **`jsllm7.js`** into your project, add a `<script>` tag or `import` path, and you’re done.

```
my‑app/
└── jsllm7.js
```

No build step required - the file is 100% standalone.

---

## 📚 API Reference

### `await jsllm7(prompt [, systemPrompt] [, modelID]) → string`

| Param            | Type   | Default                                | Description                              |
| ---------------- | ------ | -------------------------------------- | ---------------------------------------- |
| prompt           | string | required                               | User message sent to the chat model.     |
| systemPrompt     | string | 'You are a helpful assistant'          | (Optional) System role for the model.    |
| modelID          | string | 'gpt‑4.1‑mini‑2025‑04‑14'              | (Optional) Exact model ID to query.      |

Returns the plain‑text reply.

---

## 📚 List All Available Models

### `await jsllm7.listModels() → array`

```js
const models = await jsllm7.listModels();
```

## Benchmark Example:
```js

/* run one prompt through every live LLM7 model to check the fastest  */

import jsllm7 from 'jsllm7';

const prompt = 'Summarise the plot of Matrix in one tweet';
console.log(`Prompt: ${prompt}\n`);
console.time('total');

const models = await jsllm7.listModels();
const results = {};
const tasks = [];

for (const id of models) {
  const t0 = Date.now();
  process.stdout.write(`${id}, `);

  tasks.push(
    jsllm7(prompt, undefined, id)
      .then(txt => {
        const ms = Date.now() - t0;
        results[id] = txt;
        console.log(`✔ ${id}  (${ms} ms) ${txt.slice(0, 33)}`);
      })
      .catch(err => {
        const ms = Date.now() - t0;
        results[id] = `ERROR: ${err.message}`;
        console.log(`✖ ${id}  (${ms} ms)`);
      })
  );
}

console.log(`\n`);

await Promise.allSettled(tasks);
console.timeEnd('total');

```
---

## 🏆 Special Thanks To: [Eugene Evstafev](https://www.linkedin.com/in/eugene-evstafev-716669181/) (LLM7.io)

This project is only possible because the brilliant gentlefolk at **LLM7.io** opened a key‑free playground for everyone to tinker with. jsllm7 simply makes that generosity ridiculously easy to consume for web lovers. They are impressively robust and resilient. They can handle pretty well lots of requests. Please give them some love! ❤️

LLM7.io is offered free of charge thanks to the generosity of donors.

Important: Large language models can and do make mistakes—they may hallucinate, invent facts, or present outdated or incorrect information as if it were true. You must verify any critical output independently before relying on it.

The Service is provided “as is” and “as available,” with no warranties—express or implied—of any kind (including, without limitation, merchantability, fitness for a particular purpose, or non-infringement). We cannot guarantee uptime, availability of any particular model, or the accuracy, reliability, completeness, or usefulness of any content generated. We may modify, replace or withdraw models at any time without notice.

Use at your own risk. You assume full responsibility for all consequences arising from your use of the Service, including any decisions or actions taken in reliance on model outputs. LLM7.io and its contributors shall not be liable for any direct, indirect, incidental, special, consequential or punitive damages, losses or expenses arising from your access to or use of the Service (including but not limited to any damage to or loss of data, business interruption, or personal injury), even if advised of the possibility of such damages.

Anonymous usage data may be collected and analysed to improve future models; no personally identifying information is stored or used by LLM7.io.

CHECK THEIR [TERMS](https://github.com/chigwell/llm7.io/blob/main/TERMS.md)


---

## 🤝 Contributing

Bug reports and PRs are welcome - the codebase is only a few dozen lines, so it’s easy to dive in.

---

## License

MIT - enjoy.
