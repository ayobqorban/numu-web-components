# Versioning

The package follows Semantic Versioning:

- Patch: compatible bug fix or documentation correction.
- Minor: compatible component, variant, token, or optional prop.
- Major: breaking public export, prop, behavior, token meaning, or supported peer range.

Block schema versions protect persisted page JSON independently. A breaking block contract increments its integer version. Stable block keys do not change; deprecation documents the replacement, migration path, and planned removal package version.

Experimental status allows iteration but does not permit silent corruption of persisted JSON. Every breaking experimental schema change still receives a new schema version before shared environments depend on it.
