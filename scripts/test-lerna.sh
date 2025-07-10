#!/bin/bash

npm ci
npx lerna run test -- --run
