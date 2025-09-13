---
permalink: /register/
layout: 'layouts/base.njk'
title: Register for Membership
captcha: true
---

<section class="px-4 max-w-3xl">
  <h2 class="text-center text-xl md:text-2xl font-semibold text-indigo-200 mb-3">
    Register
  </h2>
  <p class="text-center text-white text-base md:text-lg mb-8">
    Please fill in the form below to join Brisbane Social Chess.
  </p>
  <form method="POST" class="flex flex-col gap-5 form-registration" novalidate>
    <!-- First Name -->
    <div class="flex flex-col">
      <label for="firstName" class="text-gray-200 font-semibold mb-1">
        First Name <span aria-hidden="true">*</span>
      </label>
      <input type="text" id="firstName" name="fname" required autocomplete="given-name" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Last Name -->
    <div class="flex flex-col">
      <label for="lastName" class="text-gray-200 font-semibold mb-1">
        Last Name <span aria-hidden="true">*</span>
      </label>
      <input type="text" id="lastName" name="lname" required autocomplete="family-name" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Birth Year -->
    <div class="flex flex-col">
      <label for="birthYear" class="text-gray-200 font-semibold mb-1">
        Birth Year <span aria-hidden="true">*</span>
      </label>
      <input type="number" id="birthYear" name="birthyear" min="1900" max="2025" oninput="if(this.value.length>4) this.value=this.value.slice(-4)" required placeholder="e.g. 1990" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white placeholder-gray-400 italic focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Gender -->
    <fieldset class="flex flex-col border border-gray-400 rounded-md p-4 bg-white/5">
      <legend class="text-gray-200 font-semibold mb-2">Gender <span aria-hidden="true">*</span></legend>
      <div class="flex flex-col gap-2">
        <label class="inline-flex items-center gap-2 text-gray-200 cursor-pointer">
          <input type="radio" name="gender" value="male" required class="accent-indigo-900 w-4 h-4 cursor-pointer" />
          Male
        </label>
        <label class="inline-flex items-center gap-2 text-gray-200 cursor-pointer">
          <input type="radio" name="gender" value="female" class="accent-indigo-900 w-4 h-4 cursor-pointer" />
          Female
        </label>
        <label class="inline-flex items-center gap-2 text-gray-200 cursor-pointer">
          <input type="radio" name="gender" value="other" class="accent-indigo-900 w-4 h-4 cursor-pointer" />
          Other
        </label>
      </div>
    </fieldset>
    <!-- Discord Username -->
    <div class="flex flex-col">
      <label for="discordUsername" class="text-gray-200 font-semibold mb-1">
        Discord Username (optional)
      </label>
      <input type="text" id="discordUsername" name="discordusername" placeholder="e.g. User#1234" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white placeholder-gray-400 italic focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Email -->
    <div class="flex flex-col">
      <label for="email" class="text-gray-200 font-semibold mb-1">
        Email <span aria-hidden="true">*</span>
      </label>
      <input type="email" id="email" name="email" required autocomplete="email" class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white placeholder-gray-400 italic focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition" />
    </div>
    <!-- Captcha -->
    <div class="cf-turnstile" data-sitekey="{{ site.cloudflare_turnstile_key }}" data-action="submit"></div>
    <!-- Submit Button -->
    <button type="submit" class="cursor-pointer bg-indigo-900 hover:bg-indigo-500 font-bold py-3 px-6 rounded-full shadow-lg transition">
      Register
    </button>
  </form>
</section>
