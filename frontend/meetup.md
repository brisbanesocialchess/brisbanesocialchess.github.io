---
permalink: /meetup/
layout: 'layouts/base.njk'
title: Chess Meetups & Locations | Brisbane Social Chess Club
---

<section class="py-12 px-4 max-w-3xl mx-auto flex flex-col items-center gap-6">
  <!-- Heading -->
  <h2 class="text-center text-2xl md:text-3xl font-bold text-indigo-300 uppercase mb-2">
    Weekly Meetups
  </h2>

<!-- Description -->
<p class="text-center text-white text-base md:text-lg opacity-90">
    Click on a day to view detailed meetup information:
  </p>

<!-- Button group -->
<div class="flex flex-col md:flex-row flex-wrap gap-3 mt-4 w-full max-w-lg justify-center">
    <a href="{{ '/meetup/monday/' | url }}"
       class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">
      Monday
    </a>
    <!-- <a href="{{ '/meetup/tuesday/' | url }}" class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">Tuesday</a> -->
    <a href="{{ '/meetup/wednesday/' | url }}"
       class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">
      Wednesday
    </a>
    <a href="{{ '/meetup/thursday/' | url }}"
       class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">
      Thursday
    </a>
    <a href="{{ '/meetup/friday/' | url }}"
       class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">
      Friday
    </a>
    <a href="{{ '/meetup/saturday/' | url }}"
       class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">
      Saturday
    </a>
    <a href="{{ '/meetup/sunday/' | url }}"
       class="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition transform text-center">
      Sunday
    </a>
  </div>
</section>
