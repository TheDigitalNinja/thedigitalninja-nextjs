---
title: "Escaping the AI Feedback Loop: Tips for Devs"
date: "2024-07-17"
author: "Russell Perkins"
excerpt: "Discover strategies to break free from repetitive AI coding loops and learn when to leverage traditional resources for efficient problem-solving."
cloudinaryImageId: "Claude_AI_edit_message_c1xfbu"
readTime: 5
tags: ["ai", "coding", "troubleshooting", "best-practices", "programming"]
og:
  title: "Escaping the AI Feedback Loop: Tips for Developers"
  description: "Learn how to handle AI tools getting stuck in repetitive coding loops, when to edit your prompts, and why sometimes Google is still your best friend."
  type: "article"
  image: "https://res.cloudinary.com/TheDigitalNinja/image/upload/c_scale,w_1200/Claude_AI_edit_message_c1xfbu"
  url: "https://thedigital.ninja/blog/escaping-ai-feedback-loop"
---

I wanted to write a post about a common theme when coding with AI tools such as Claude, Gemini, or ChatGPT. That is the AI sometimes gets stuck in a repetitive loop where the AI gives you wrong code and when you correct it, it gives you the same code again that you originally gave it. Often this kinda snowballs and poisons your context window. 

## Preventing the Loop

Ideally the best way to stop this is to keep it from happening in the first place. Now I know you might be thinking how can you stop it from doing it in the first place and I'm not talking about prompt engineering. Rather you can go back in time using most AI tools and edit your previous "user message" to better guide the AI to avoiding the mistake. This might be reminding it that the component needs to be a server side react page or vice versa. 

![Editing a message in Claude AI](https://res.cloudinary.com/TheDigitalNinja/image/upload/c_scale,w_750/Claude_AI_edit_message_c1xfbu)

## The Impact of Context

While many AI's models these days have decent context windows, having broken or incorrect code in there just clutters it up, pushes some of your old context out, and from my experience increases the chances of it getting it wrong again as its context is filled with more and more mistakes. 

![Claude AI's response after editing a message](https://res.cloudinary.com/TheDigitalNinja/image/upload/c_scale,w_744/Claude_AI_edit_response_pzsccy)

## Caution with Editing

Do be careful of editing too far back as this will most often delete all the responses since then and if you are using the API's directly to modify the message but not future responses it can cause the models to start hallucinating in wild ways. 

## When to Turn to Google

All that being said I still find the fastest and simplest solution is just to go back to google the moment the ai starts going sideways at all. It can often feel like it would be slower to tab away from the AI tool and go hunting though google, but I find it to be quite the opposite. You may feel like you are too far into a solution but often when your eyes land on that stackoverflow answer you immediately can see the problem you AI missed.

## Conclusion

In conclusion try to steer the AI by editing your messages and adding additional instructions but don't forget your roots, all of this was built by google and stack overflow in the first place.