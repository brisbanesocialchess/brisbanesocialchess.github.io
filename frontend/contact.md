---
permalink: /contact/
layout: 'layouts/base.njk'
title: Contact Us | Brisbane Social Chess Club
---

<section class="section">
	<h2>Contact Us</h2>
	<p>Feel free to reach out using the form below, or through one of our other contact methods.</p>
	<form action="#" method="POST" class="form form-contact" novalidate>
		<div class="form-group">
			<label for="name">Your Name <span aria-hidden="true">*</span></label>
			<input type="text" id="name" name="name" required autocomplete="name" />
		</div>
		<div class="form-group">
			<label for="email">Your Email <span aria-hidden="true">*</span></label>
			<input type="email" id="email" name="email" required autocomplete="email" />
		</div>
		<div class="form-group">
			<label for="subject">Subject <span aria-hidden="true">*</span></label>
			<input type="text" id="subject" name="subject" required />
		</div>
		<div class="form-group">
			<label for="message">Message <span aria-hidden="true">*</span></label>
			<textarea id="message" name="message" rows="5" required></textarea>
		</div>
		<button type="submit" class="button button--main">Send Message</button>
	</form>
	<div class="button-group contact-actions">
		<a href="/register" class="button">Join Now</a>
		<a href="https://discord.com/invite/JWBKhQmzvD" class="button">Ask Questions on Discord</a>
		<a data-email-href class="button email-obfuscated">Ask Questions on E-Mail</a>
	</div>
</section>
