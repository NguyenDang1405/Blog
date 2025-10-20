#!/bin/bash

# Script deploy Blog Backend lên OpenStack
# Sử dụng: ./deploy-openstack.sh

set -e

echo "🚀 Starting OpenStack deployment..."

# Configuration
OPENSTACK_IMAGE="ubuntu-20.04"
OPENSTACK_FLAVOR="m1.medium"
OPENSTACK_NETWORK="private"
OPENSTACK_KEYPAIR="your-keypair"
SECURITY_GROUP="blog-backend-sg"

# Create security group if not exists
echo "📋 Creating security group..."
openstack security group create $SECURITY_GROUP --description "Blog Backend Security Group" || true

# Add rules
openstack security group rule create $SECURITY_GROUP --protocol tcp --dst-port 22 --remote-ip 0.0.0.0/0 || true
openstack security group rule create $SECURITY_GROUP --protocol tcp --dst-port 80 --remote-ip 0.0.0.0/0 || true
openstack security group rule create $SECURITY_GROUP --protocol tcp --dst-port 443 --remote-ip 0.0.0.0/0 || true
openstack security group rule create $SECURITY_GROUP --protocol tcp --dst-port 3000 --remote-ip 0.0.0.0/0 || true

# Create instance
echo "🖥️ Creating OpenStack instance..."
INSTANCE_NAME="blog-backend-$(date +%s)"
openstack server create \
  --image $OPENSTACK_IMAGE \
  --flavor $OPENSTACK_FLAVOR \
  --network $OPENSTACK_NETWORK \
  --key-name $OPENSTACK_KEYPAIR \
  --security-group $SECURITY_GROUP \
  --user-data user-data.yml \
  $INSTANCE_NAME

echo "⏳ Waiting for instance to be active..."
openstack server wait $INSTANCE_NAME --status ACTIVE

# Get instance IP
INSTANCE_IP=$(openstack server show $INSTANCE_NAME -f value -c addresses | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | head -1)
echo "🌐 Instance IP: $INSTANCE_IP"

# Create floating IP if needed
echo "🔗 Creating floating IP..."
FLOATING_IP=$(openstack floating ip create public -f value -c floating_ip_address)
openstack server add floating ip $INSTANCE_NAME $FLOATING_IP

echo "✅ Deployment completed!"
echo "🔗 Access your blog at: http://$FLOATING_IP"
echo "📝 SSH access: ssh -i your-key.pem ubuntu@$FLOATING_IP"
