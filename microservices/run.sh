#!/usr/bin/env bash

#TODO:
# - create private network,
# - run hellosvc in network with no published ports
# - run gateway in network publishing port 443
#   and using volumes to give it access to your
#   cert and key files in `gateway/tls`
#   and setting environment variables
#    - CERTPATH = path to cert file in container
#    - KEYPATH = path to private key file in container
#    - HELLOADDR = net address of hellosvc container

if [ -z "$(docker network ls -q -f name=msdemonet)" ]
then
    docker network create msdemonet
fi

docker run -d --network msdemonet --name hellosvc1 wuv21/hellosvc
docker run -d --network msdemonet --name hellosvc2 wuv21/hellosvc

docker run -d -p 443:443 \
--network msdemonet \
-v $(pwd)/gateway/tls:/etc/tls:ro \
-e CERTPATH=/etc/tls/fullchain.pem \
-e KEYPATH=/etc/tls/privkey.pem \
-e HELLOSVCADDR=hellosvc1,hellosvc2 \
--name gateway \
wuv21/gateway
