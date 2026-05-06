---
layout: 'layouts/meetup.njk'
slug: 'tuesday'
heading: 'Tuesday Lunchtime Chess ♟️☕'
location: "Ambassador Specialty Coffee"
hosts:
  - 'Steve Anderson'
hosts_images:
  - src: '/assets/avatars/octoman.png'
    alt: 'Steve Anderson'
description: |
  Welcome to Tuesday chess at Ambassador Specialty Coffee. Good food, coffee and company. We usually expect 6 or more participants. <br />
  Come if you are available. Parking available nearby and on street. <br />
  Address: <a href="https://www.google.com/maps/search/?api=1&query=Ambassador+Specialty+Coffee%2C+Shop+K1%2F9+Sherwood+Rd%2C+Toowong+QLD+4066"
  target="_blank"
  rel="noopener noreferrer"
  class="text-[#a09de1] hover:text-[#b7b4ed] underline">
  Shop K1/9 Sherwood Rd, Toowong QLD 4066</a>
time: '12:30 PM – 3:30 PM AEST'
when: 'Every Tuesday'
address: 'Shop K1/9 Sherwood Rd, Toowong QLD 4066, Australia'
eleventyComputed:
  title: '{{ title }} | Brisbane Social Chess Club'
  map: 'https://maps.google.com/maps?q={{ address | url_encode }}&output=embed'
permalink: 'meetup/{{ slug }}/'
---
