var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "js/libs/jquery-1.11.1.js",
        "js/libs/jquery.gridster.min.js",
        "js/numbers.js"
    ],
    tests: [
        "test/*-test.js"
    ]
}

// Add more configuration groups as needed
