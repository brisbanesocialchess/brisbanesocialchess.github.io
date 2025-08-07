---
layout: 'layouts/base.njk'
title: Home
---

# Welcome to My Eleventy Blog

## Posts

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | date("yyyy-MM-dd") }}
  </li>
{% endfor %}
</ul>

## Categories

<ul>
{% for category in collections.categories %}
  <li><a href="/categories/{{ category | slug }}/">{{ category }}</a></li>
{% endfor %}
</ul>

## Tags

<ul>
{% for tag in collections.tags %}
  <li><a href="/tags/{{ tag | slug }}/">{{ tag }}</a></li>
{% endfor %}
</ul>
