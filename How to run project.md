# Myproject-accounting-system

run front-end
1) เข้า path -> accounting-system-enter
2) พิมพ์คำสั่ง npm start


run back-end
1) เข้า path -> BackEnd-accounting-system-enter
2) พิมพ์คำสั่ง nodemon server.js

run parity
1) เข้า path -> Parity
2) พิมพ์คำสั่ง sudo parity --config node0.toml --jsonrpc-hosts all --jsonrpc-interface all
** หากต้องการ new account ใหม่ ใช้คำสั่ง sudo parity account new --config node0.toml

หากจะ migrate truffle ใหม่
1) เข้า path -> BackEnd-accounting-system-enter/truffle
2) พิมพ์คำสั่ง truffle console --network development
3) พิมพ์คำสั่ง migrate --reset

0x12c2005f33b465cdbeaf88c27fb3de49dd177667


parity --config node0.toml account new
parity account new --config ./validator.json --keys-path /node0/keys