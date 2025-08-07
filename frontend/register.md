---
permalink: /register/
layout: 'layouts/base.njk'
title: Register
---

<section class="section">
    <h2>Register</h2>
    <p>Please fill in the form below to join Brisbane Social Chess.</p>
    <form action="#" method="POST" class="form-registration" novalidate>
        <div class="form-group">
            <label for="firstName">First Name <span aria-hidden="true">*</span> </label>
            <input type="text" id="firstName" name="fname" required autocomplete="given-name" />
        </div>
        <div class="form-group">
            <label for="lastName">Last Name <span aria-hidden="true">*</span> </label>
            <input type="text" id="lastName" name="lname" required autocomplete="family-name" />
        </div>
        <div class="form-group">
            <label for="birthYear">Birth Year <span aria-hidden="true">*</span> </label>
            <input type="number" id="birthYear" name="birthyear" min="1900" max="2025" required placeholder="e.g. 1990" />
        </div>
        <fieldset class="form-group">
            <legend>Gender <span aria-hidden="true">*</span></legend>
            <label> <input type="radio" name="gender" value="male" required /> Male </label>
            <label> <input type="radio" name="gender" value="female" /> Female </label>
            <label> <input type="radio" name="gender" value="other" /> Other </label>
        </fieldset>
        <div class="form-group">
            <label for="discordUsername">Discord Username (optional)</label>
            <input type="text" id="discordUsername" name="discordusername" placeholder="e.g. User#1234" />
        </div>
        <div class="form-group">
            <label for="email">Email <span aria-hidden="true">*</span> </label>
            <input type="email" id="email" name="email" required autocomplete="email" />
        </div>
        <button type="submit" class="button button--main">Register</button>
    </form>
</section>
