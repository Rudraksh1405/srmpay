# srmpay

SRM Pay Phase 1 backend scaffold for campus food ordering at SRM KTR.

## Modules

- **student**: vendor browsing, order placement, order history APIs
- **merchant**: menu management and incoming order management APIs
- **adminpanel**: vendor administration and global order monitoring APIs
- **core**: shared data models (user roles, vendors, menu, orders, payments, queue tokens)

## Tech

- Django + Django REST Framework
- PostgreSQL-ready configuration (falls back to SQLite for local dev/tests)

## Quick start

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## API roots

- `GET /health/`
- `/api/student/`
- `/api/merchant/`
- `/api/admin/`
