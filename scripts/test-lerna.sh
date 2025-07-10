#!/usr/bin/env sh

npm ci
npx lerna run test -- --run
