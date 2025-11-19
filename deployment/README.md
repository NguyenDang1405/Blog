# Deployment Files

Thư mục này chứa các file liên quan đến deployment và Docker.

## Các file trong thư mục:

- **`Dockerfile.backend`** - Dockerfile để build backend image
- **`docker-compose.backend.yml`** - Docker Compose configuration cho backend
- **`deploy-openstack.sh`** - Script để deploy lên OpenStack
- **`nginx-openstack.conf`** - Nginx configuration cho OpenStack deployment

## Cách sử dụng:

### Docker:
```bash
# Build image
docker build -f deployment/Dockerfile.backend -t blog-backend .

# Run với docker-compose
docker-compose -f deployment/docker-compose.backend.yml up
```

### OpenStack:
```bash
# Chạy script deploy
bash deployment/deploy-openstack.sh
```

