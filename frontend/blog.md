---
layout: layouts/base.njk
---

<h1 class="text-center text-xl md:text-2xl font-semibold mb-3">Welcome to our blog</h1>
<ul>
{% for post in collections.post | reverse %}
    <article>
        <h1 class="text-center text-xl md:text-2xl font-semibold mb-3">
        {{ post.data.title }}
        </h1>
      {{ post.content | safe }}
    </article>
{% endfor %}
</ul>
