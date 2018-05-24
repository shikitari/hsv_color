module.exports = {
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "modules": true,
        "spread" : true,
        "restParams" : true,
    },
    "env" : {
        "browser" : true,
        "node" : true,
        "es6" : true
    },
    "rules" : {
        "no-unused-vars" : 2,
        "no-undef" : 2,
        "react/prop-types": 0,
        "no-console": 0
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ]
};