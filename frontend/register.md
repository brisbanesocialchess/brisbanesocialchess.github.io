---
permalink: /register/
layout: 'layouts/base.njk'
title: Register for Membership | Brisbane Social Chess Club
---

<section class="max-w-3xl mx-auto px-6 flex flex-col gap-4">
  <h2 class="text-center text-indigo-200 text-xl uppercase tracking-wide mt-2 mb-2">
    Register
  </h2>
  <p class="text-gray-300 text-sm">
    Please fill in the form below to join Brisbane Social Chess.
  </p>
  <form action="#" method="POST" class="flex flex-col gap-5" novalidate>
    <!-- First Name -->
    <div class="flex flex-col">
      <label for="firstName" class="text-gray-200 font-semibold mb-1">
        First Name <span aria-hidden="true">*</span>
      </label>
      <input
        type="text"
        id="firstName"
        name="fname"
        required
        autocomplete="given-name"
        class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition"
      />
    </div>

    <!-- Last Name -->
    <div class="flex flex-col">
      <label for="lastName" class="text-gray-200 font-semibold mb-1">
        Last Name <span aria-hidden="true">*</span>
      </label>
      <input
        type="text"
        id="lastName"
        name="lname"
        required
        autocomplete="family-name"
        class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition"
      />
    </div>

    <!-- Birth Year -->
    <div class="flex flex-col">
      <label for="birthYear" class="text-gray-200 font-semibold mb-1">
        Birth Year <span aria-hidden="true">*</span>
      </label>
      <input
        type="number"
        id="birthYear"
        name="birthyear"
        min="1900"
        max="2025"
        oninput="if(this.value.length>4) this.value=this.value.slice(-4)"
        required
        placeholder="e.g. 1990"
        class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white placeholder-gray-400 italic focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition"
      />
    </div>

    <!-- Gender -->
    <fieldset class="flex flex-col border border-gray-400 rounded-md p-4 bg-white/5">
      <legend class="text-gray-200 font-semibold mb-2">Gender <span aria-hidden="true">*</span></legend>
      <div class="flex flex-col gap-2">
        <label class="inline-flex items-center gap-2 text-gray-200 cursor-pointer">
          <input type="radio" name="gender" value="male" required class="accent-cyan-400 w-4 h-4 cursor-pointer"/>
          Male
        </label>
        <label class="inline-flex items-center gap-2 text-gray-200 cursor-pointer">
          <input type="radio" name="gender" value="female" class="accent-cyan-400 w-4 h-4 cursor-pointer"/>
          Female
        </label>
        <label class="inline-flex items-center gap-2 text-gray-200 cursor-pointer">
          <input type="radio" name="gender" value="other" class="accent-cyan-400 w-4 h-4 cursor-pointer"/>
          Other
        </label>
      </div>
    </fieldset>

    <!-- Discord Username -->
    <div class="flex flex-col">
      <label for="discordUsername" class="text-gray-200 font-semibold mb-1">
        Discord Username (optional)
      </label>
      <input
        type="text"
        id="discordUsername"
        name="discordusername"
        placeholder="e.g. User#1234"
        class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white placeholder-gray-400 italic focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition"
      />
    </div>

    <!-- Email -->
    <div class="flex flex-col">
      <label for="email" class="text-gray-200 font-semibold mb-1">
        Email <span aria-hidden="true">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autocomplete="email"
        class="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/10 text-white placeholder-gray-400 italic focus:border-cyan-400 focus:bg-white/15 focus:ring-2 focus:ring-cyan-400 outline-none transition"
      />
    </div>

    <!-- Submit Button -->
    <button type="submit" class="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:-translate-y-1">
      Register
    </button>

</form>
</section>
