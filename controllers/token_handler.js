'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const jwtExpirySeconds = 600;
const jwtPrivateKey = fs.readFileSync(path.resolve('jwtCerts/private.key'), 'utf8');
const jwtPublicKey = fs.readFileSync(path.resolve('jwtCerts/public.key'), 'utf8');

exports.generateToken = async(userEmail, tokenPayload) => {
    try {
        var token = jwt.sign({
            tokenPayload
        }, jwtPrivateKey, {
            issuer: 'cazamg.com',
            subject: userEmail,
            audience: 'cazamg.com',
            algorithm: 'HS512',
            expiresIn: jwtExpirySeconds
        });
        return token;
    } catch (exception) {
        console.log(exception);
        return null;
    }
};

exports.verifyToken = async(req, res, next) => {
    try {
        var jwtToken = req.headers.authorization.replace("Bearer ", "");
        if (!jwtToken) {
            return res.status(401).send();
        } else {
            let result = jwt.verify(jwtToken, jwtPrivateKey, {
                issuer: 'cazamg.com',
                audience: 'cazamg.com'
            });

            await next();
        }
    } catch (exception) {
        console.log(exception);
        return res.status(401).send();
    }
};