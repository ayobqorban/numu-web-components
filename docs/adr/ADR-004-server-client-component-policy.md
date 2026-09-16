# ADR-004: Server-safe by default

- Status: Accepted
- Date: 2026-09-16

## Context

Consumers use Next.js, but package-wide client boundaries would add unnecessary JavaScript and limit server rendering.

## Decision

Core contracts, registry lookup, validation, and presentational components are server-safe and contain no package-level `"use client"`. Add a client boundary only to the smallest file that requires state, effects, or browser APIs.

## Alternatives

- Mark the whole package as client code.
- Publish only static HTML helpers.
- Depend directly on Next.js server and client primitives.

## Consequences

Initial blocks require no client JavaScript from this package. Future interactive components may expose separate client entry points and must document hydration and accessibility behavior.
