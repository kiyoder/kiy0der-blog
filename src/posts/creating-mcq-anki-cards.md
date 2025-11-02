---
title: "Creating Multiple Choice Question Anki Cards"
date: "2025-11-02"
description: "A step-by-step guide to designing a Multiple Choice Question (MCQ) Anki note type and automating question generation from uploaded resources."
tags: ["anki", "mcq", "automation", "learning"]
---

# Creating Multiple Choice Question Anki Cards

Anki is a powerful spaced-repetition system, and building a **Multiple Choice Question (MCQ)** card type can make your learning both dynamic and cognitively engaging. This guide shows you how to design a custom **MCQ note type**, style it for clarity, and implement a script that **randomizes answer choices** each time a card appears — preventing subconscious pattern recognition and enhancing true recall.

You’ll also learn how to use a **prompt-based workflow** to automatically generate MCQs from uploaded study materials, creating a seamless system that combines structured card design, intelligent question generation, and optimized retention.


---

## 1. Creating the Note Type

### Define the Fields

In Anki, go to **Tools → Manage Note Types → Add → Clone: Basic (and reverse card) / [CTRL + SHIFT + N]**.  
Then, rename it to **MCQ**.

Add the following fields:

- **question**
- **image**
- **choice_a**
- **choice_b**
- **choice_c**
- **choice_d**
- **answer**
- **explanation**
- **image**
- **tag**


This setup ensures flexibility for both visual and text-based MCQs.


---


## 2. Configure the Card Templates

Make sure you have selected **MCQ**, then on the right column select **Cards…** and edit the **Front**, **Back**, and **Styles** templates. Copy paste from the templates provided for each.

### Front Template

```html
<!-- QUESTION -->
<div class="question">{{question}}</div>

<!-- IMAGE -->

<div class="image-container">
  {{image}}
</div>


<!-- CHOICES -->
<div id="data" style="display:none;">
  <div id="a">{{choice_a}}</div>
  <div id="b">{{choice_b}}</div>
  <div id="c">{{choice_c}}</div>
  <div id="d">{{choice_d}}</div>
</div>

<!-- CHOICES CONTAINER -->
<div id="choices"></div>

<script>
(function () {
  const a = document.getElementById("a")?.innerText?.trim();
  const b = document.getElementById("b")?.innerText?.trim();
  const c = document.getElementById("c")?.innerText?.trim();
  const d = document.getElementById("d")?.innerText?.trim();

  const choices = [
    { text: a, label: "A" },
    { text: b, label: "B" },
    { text: c, label: "C" },
    { text: d, label: "D" },
  ].filter(c => c.text && c.text !== "");

  // Fisher-Yates shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  const container = document.getElementById("choices");
  choices.forEach((choice, i) => {
    const div = document.createElement("div");
    div.className = "choice";
    div.innerHTML = `<strong>${String.fromCharCode(65 + i)}.</strong> <span>${choice.text}</span>`;
    container.appendChild(div);
  });
})();
</script>

```

---


### Back Template

```html
<div class="question">{{question}}</div>

<div class="image-container">
  {{image}}
</div>

<hr>

<div class="answer"><strong>Answer:</strong> {{answer}}</div>

{{#explanation}}
  <div class="explanation"><strong>Explanation:</strong> {{explanation}}</div>
{{/explanation}}

```

---


### Style (CSS)

```css
.card {
  all: unset;
  display: block;
  background-color: var(--bg);
  color: var(--text);
  font-family: "Inter", "Segoe UI", sans-serif;
  font-size: 18px;
  line-height: 1.5;
  text-align: left;
  padding: 18px;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;
}



/* ================================
   LIGHT MODE COLORS
================================== */
:root {
  --bg: #ffffff;
  --text: #111111;
  --choice-border: #d0d0d0;
  --answer: #1a7f37;
  --explanation: #333333;
}

/* ================================
   DARK MODE COLORS
================================== */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #121212;
    --text: #ffffff;
    --choice-border: #333333;
    --answer: #7bed9f;
    --explanation: #dddddd;
  }
}

/* Fallback for Anki's dark/night modes */
body.night, body.is-night, .card.night {
  background-color: var(--bg);
  color: var(--text);
}

/* ================================
   QUESTION
================================== */
.question {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
}

/* ================================
   IMAGE CONTAINER
================================== */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 16px 0;
}

.image-container img {
  max-width: 100%;
  height: auto;
  max-height: 25vh; /* limit to 1/4 of viewport height */
  border-radius: 8px;
  object-fit: contain;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

/* ================================
   CHOICES
================================== */
.choice {
  border: 1px solid var(--choice-border);
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
  transition: background-color 0.2s, border-color 0.2s;
}

.choice strong {
  min-width: 24px;
  font-weight: bold;
}

.choice:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

/* ================================
   BACK SIDE ELEMENTS
================================== */
.answer {
  color: var(--answer);
  font-weight: bold;
}


```

✅ **Tested:** **Windows** and **Android**, unsure with iOS and MacOS.

---

## 3. The Prompt to Generate MCQs from a Resource

Once your **note type** is set, you can automate question creation. Use the following **prompt** to generate well-balanced MCQs from any uploaded notes, PDFs, or text files.

### Prompt

```text
Role:
You are an expert educational assessment designer trained in creating exam-quality multiple-choice questions (MCQs) that measure conceptual understanding, application, and analysis.
Your goal is to produce a complete and balanced question set from the provided notes, ensuring every key concept is represented by at least one question.

Instructions:
1. Topic Identification & Coverage:
- First, identify and list all distinct key topics or subtopics from the provided notes.
- Generate at least one question per topic (more if the concept is important, complex, or multi-layered).
- Ensure no important concept is left out.

2. Question Variety (Exam Authenticity):
- Create a mix of question types, depending on the content:
- Standard factual/definition: “What is…”, “Which of the following best describes…”
- Negative form: “Which of the following is NOT true about…” (use sparingly)
- Sequence/order-based: “Which of the following lists the correct order of…”
- Scenario/application-based: “A user encounters X, which principle applies…”
- Cause-effect/relationship: “What would most likely happen if…”
- Comparison/exception: “Which statement best differentiates X and Y…”
- True principle or best practice: “Which of the following is the most appropriate…”
- These should simulate real exam question diversity.

3. Question Construction Standards:
- Keep stems clear, complete, and under 30 words.
- Avoid ambiguity and trick questions.
- Include all relevant information in the stem, not in options.
- Ensure only one correct answer. 
- Generate one correct answer and three distractors (incorrect choices) that are conceptually related to the same idea.
- Each distractor must be plausible, grammatically consistent with the question stem, and factually incorrect for the specific context.
- Avoid obvious or irrelevant distractors — all choices should appear potentially correct to someone who only partially understands the topic.
- Whenever possible, make distractors reflect common student errors, misconceptions, or confusions found in the topic.
- Ensure no “giveaway” clues exist (like longer phrasing, specific wording, or repetition from the question).

4. Cognitive Range (Bloom’s Taxonomy):
Include a balanced mix of:
- Remembering: factual recall
- Understanding: explain/identify
- Applying: use concepts in context
- Analyzing: distinguish, infer, interpret

5. Output Format:
Produce results in CSV-compatible format (for Anki import):

question,choice_a,choice_b,choice_c,choice_d,answer,explanation,image,tag

- question: the complete question stem
- choice_a–choice_d: answer options
- answer: the correct answer (exact text)
- explanation: short reasoning (why correct, or why others are wrong)
- image: leave blank unless explicitly required
- tag: subtopic or keyword (e.g., “Photosynthesis”, “OSI Layer 3”)

6. Quality Assurance:
- Every topic from the notes must appear at least once.
- Avoid duplicates or redundant stems.
- Ensure difficulty variety (easy, moderate, hard).
- Write in professional, exam-appropriate tone.
```

Use this generated output to fill your **Anki fields** automatically or via AnkiConnect.

---

## Conclusion

With this setup, you’ve built a **complete MCQ generation workflow** — from creating a custom Anki note type to crafting a structured AI prompt for resource-based question generation. It’s been tested and optimized for both **Windows** and **Android**, ensuring consistent performance across devices.

---
