# SRMPAY documentation

Store architecture notes, API references, setup guides, and product decisions
in this directory as the project evolves.

## Current API

| Endpoint | Purpose |
| --- | --- |
| `GET /health` | Returns service health status. |
| `GET /api/v1/dashboard` | Returns the dashboard's temporary sample student and fee data. |

The current dashboard response is deliberately hard-coded for UI development.
Replace it with authenticated, database-backed data before release.
