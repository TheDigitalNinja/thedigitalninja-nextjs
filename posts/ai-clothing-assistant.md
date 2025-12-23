---
title: "AI Clothing Assistant" 
date: "2025-05-06"
excerpt: "So I have had an idea bouncing around in my head for a few months now. I moved recently and also rearranged my closet and both times I thought, man I really should catalog all this while I'm touching each one."
sanityImageId: "image-f52de950ec751a7f245fb3c97feb7446c37fef8a-1255x945-jpg"
readTime: 8
tags: ["ai", "prompts", "ChatGPT", "Gemnini"]
# OpenGraph metadata
og:
  description: "Ever wished for a personal stylist? This post details my journey in building an AI clothing assistant, from image-based cataloging with ChatGPT to intelligent wardrobe analysis."
---

![Google Sheet on Laptop](https://res.cloudinary.com/TheDigitalNinja/image/upload/c_scale,w_1200/PXL_20250503_210504645_ct7h8t)

## The Idea
So I have had an idea bouncing around in my head for a few months now. I moved recently and also rearranged my closet and both times I thought, man I really should catalog all this while I'm touching each one. But the time it would take to write all that down for very little reward other than I would have my wardrobe in a spreadsheet because I'm a nerd clearly wasn't worth it. 

I couldn't let go of the idea of having my clothing in a spreadsheet. All the modern AI tools can interface directly with google drive so I would be able to test the various models and see if they could provide any insights or thoughts about my wardrobe. Perhaps even help me plan outfits or offer suggestions if I'm wearing something that clearly clashes. 

ChatGPT 4o has made great improvements, notably for me the reasoning with images. I needed to figure out what all ChatGPT could discern from just an image so I used the ChatGPT android app to take a photo of a shirt I liked laying on my bed and asked it to extract all the information about the clothing it could. I knew that it could get the basics but I was really surprised by how much it added with that little prompt, like buttons and collar type. I knew the new 4o model has a lot of work done on the OCR (text extraction) part of it so I then took a photo of the tag and now I had a pretty exhaustive list of all the descriptors of the shirt. Its size, material, neck shape, pattern, etc. 

Feeling fairly excited because I knew I could make something real here, I then decided to standardize on the table headers. I took a few more photos of a few different clothing items like shorts, pants, and shoes and I came up with the first pass at these headers. Note these are in no way written in stone and you should expand or change them to best fit your needs. These just happened to work for me for now.

```
Name	Brand	Type	Subtype	Size	Color	Pattern	Fabric	Fit	Neckline	Sleeve/Length	Buttons	Layering	Season	Warmth	Vibe	Notes
```

Now that I had the headers defined and knew it could extract the information, I wanted to make it quick and simple to get the item's information extracted. I started off by simply making a new ChatGPT project called “Clothing Inventory Builder” because I’m super creative. And then I gave it the following prompt.


## The Prompt
```
You are a fashion assistant. You look at clothing and extract information about it to be cataloged. 

Headers: `Name	Brand	Type	Subtype	Size	Color	Pattern	Fabric	Fit	Neckline	Sleeve/Length	Buttons	Layering	Season	Warmth	Vibe	Notes`

Steps:
1) The user will give you a picture(s) of a piece of clothing. 
2) You will extract the information matching the header from that photo into a bulleted list. Ask any clarifying questions when unsure about brand, or size, etc. 
3) User will confirm or correct
4) You return the TSV for the item
5) Repeat step 1


Example TSV Outputs:
`Purple UA Tee	Under Armour	Shirt	Athletic Tee	M	Purple	Subtle Pinstripe	Synthetic	Athletic	Crew	Short Sleeve	No	Base	Spring, Summer	Light	Athletic, Casual	Stretchy performance fabric`

`Khaki Shorts	Dockers	Shorts	Chino	30	Khaki	Solid	Cotton	Regular	N/A	Above Knee	Yes	Base	Spring, Summer	Light	Casual, Everyday	Classic look, belt loops present`

`Light Blue Boxers	Jockey	Underwear	Boxer Brief	M	Light Blue	Solid	Synthetic Blend	Fitted	Crew	Short	No	Base	All Seasons	Light	Base Layer	Elastic waistband, moisture-wicking`

`Outdoor Sandals	Ecco	Footwear	Sport Sandals	11.5	Olive	Solid	Synthetic/Leather	Regular	N/A	N/A	No	N/A	Spring, Summer	None	Casual, Outdoor	Velcro straps, rugged sole, well-worn`

```

Now I could use my phone to rapidly take photos of my clothing and get a tab separated and copy pasteable snippets to put right into google docs. For each item I laid it out on my bed and took two photos, one of the whole item and then one of the tag. For some items like pants with fancy back pockets I might take 3. 

Now you might be thinking why not just have it automatically update the google sheet, and that could be an option, but you can't pin google sheets to a project so I would have to select it each time and honestly an even better practice could be to make a dedicated app just for this that saves it out to a database and build it into a full on product. But for me the juice just wasn't worth the squeeze because of how rapidly I could just copy paste the 100 some clothing items vs all that crap that feels like work to me. If you want to take this idea and build something out of it go for it, I’ll be cheering from the sidelines. 

## The Limitations
So I ended up with around 90 items but I ran into a few limitations along the way. Mainly, after about 6 or so items (approx 12 photos) it would start to struggle to output the TSV snippet in proper copy pasteable format (perhaps tweaking the prompt could fix this). I was hoping that since the instructions/prompt were in system memory and the previous responses were spot on that having the first messages fall off wouldn't affect the quality, but I suspect they weren't falling off and instead I was hitting a token limit issue. If you were to make this your own app, you could simply have it execute a new conversation for each item. I could have also just done each item as a new conversation, but I was on a roll and doing them in batches of 5 was fine for me. 

## Yay data... now what
Welp now I had all my Google Sheet, just as boring as I thought it would be. I could sort by the headers such as type and get a better understanding of some of the gaps in my wardrobe. And while I have seen every episode of Queer Eye I am no fashionista.

I wanted to have an AI give me an overview of my wardrobe and help find any areas for improvement. I tried Claude, ChatGPT, and Gemini for this with their google drive integrations. They all did a pretty decent job but Gemini 2.5 Pro stood out the most to me. Perhaps it just has more training on google sheets or perhaps it was that enormous context window of it but it did an absolute bang up job of analyzing my wardrobe in its entirety. 

I took it one step further and used it to design an outfit for a mixer I went to on Monday night. It was able to look up the weather and put together a better outfit than I could and even had me use my black shoes that I never remember to wear. 

## Whats Next

There is a major limitation with Gemini and that's that there are no Projects at all in the app. I tried with ChatGPT by saving the sheet as a CSV file, making a new project & prompt instructing it to use the CSV file in the project but I didn't have stellar results, again possibly could tweak the prompt or maybe upload CSV files by type of clothing. 

Though, this is where making a dedicated app could be pretty straightforward and allow for MCP integrations from a backend server.  But for me, just asking it to look at the weather, describe the event I’m going to, and asking for outfit suggestions or letting it know what shirt I want to wear and having it plan around that seem to be working well enough. 

If we wanted to think about an even more futuristic application this could be integrated with a homebuilt smart mirror and camera. I would suggest building this yourself over ever buying any sort of bathroom AI camera from a for profit company. If you build it yourself then it just means hackers into your home network have to see you naked, so jokes on them. 
