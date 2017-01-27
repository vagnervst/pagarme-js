module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        "eqeqeq": "warn",
        "no-useless-escape": "warn",
        "no-undef": "error"
    },
    "globals": {
      "JSEncrypt": true,
      "XMLHttpRequest": true,
      "ActiveXObject": true,
      "alert": true
    }
}
