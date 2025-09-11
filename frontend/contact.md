---
permalink: /contact/
layout: 'layouts/base.njk'
title: Contact Us
captcha: true
---

<section class="px-4 max-w-3xl">
  <h2 class="text-center text-xl md:text-2xl font-semibold text-indigo-200 mb-3">
    Contact Us
  </h2>
  <p class="text-center text-white text-base md:text-lg mb-8">
    Feel free to reach out using the form below, or through one of our other contact methods.
  </p>
  <form method="POST" class="flex flex-col gap-2 form-contact" novalidate>
    <!-- Name -->
    <div class="flex flex-col">
      <label for="name" class="text-gray-200 font-semibold mb-1">Your Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" required autocomplete="name" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Email -->
    <div class="flex flex-col">
      <label for="email" class="text-gray-200 font-semibold mb-1">Your Email <span aria-hidden="true">*</span></label>
      <input type="email" id="email" name="email" required autocomplete="email" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Subject -->
    <div class="flex flex-col">
      <label for="subject" class="text-gray-200 font-semibold mb-1">Subject <span aria-hidden="true">*</span></label>
      <input type="text" id="subject" name="subject" required class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Message -->
    <div class="flex flex-col">
      <label for="message" class="text-gray-200 font-semibold mb-1">Message <span aria-hidden="true">*</span></label>
      <textarea id="message" name="message" rows="5" required class="w-full px-4 py-3 rounded-lg border border-gray-400 bg-white/10 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-vertical min-h-[120px]"></textarea>
    </div>
    <!-- Captcha -->
    <div class="cf-turnstile" data-sitekey="{{ site.cloudflare_turnstile_key }}" data-action="submit"></div>
    <!-- Submit Button -->
    <button type="submit" class="cursor-pointer bg-indigo-900 hover:bg-indigo-500 font-bold py-3 px-6 rounded-full shadow-lg transition">
      Send Message
    </button>
  </form>
  <!-- Other Actions -->
  <div class="flex flex-col gap-3 mt-8">
    <a href="/register" class="w-full text-center py-3 px-6 bg-white text-black font-bold rounded-full shadow-md hover:shadow-lg transition">
      Join Now
    </a>
    <a href="https://discord.com/invite/JWBKhQmzvD" class="w-full text-center py-3 px-6 bg-white text-black font-bold rounded-full shadow-md hover:shadow-lg transition">
      Ask Questions on Discord
    </a>
    <a data-email-href class="w-full cursor-pointer text-center py-3 px-6 bg-white text-black font-bold rounded-full shadow-md hover:shadow-lg transition">
      Ask Questions on E-Mail
    </a>
  </div>
</section>
