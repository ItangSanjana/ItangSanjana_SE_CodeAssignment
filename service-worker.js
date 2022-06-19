"use strict";

const cacheName = "se-v1";
const resources = [
    "/412",
    "/style.css"
]

self.oninstall = (event) => {
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => cache.addAll(resources))
        .catch(console.error)
    );
    self.skipWaiting();
};

self.onactivate = (event) => {
    event.waitUntil(
        caches.keys()
        .then((keys) => Promise.all(
            keys
            .filter((key) => key != cacheName)
            .map((key) => caches.delete(key))
        ))
        .catch(console.error)
    );
    self.clients.claim();
};

self.onfetch = (event) => {
    const request = event.request;
    const requestURL = new URL(request.url);
    if (request.method == "GET"
    && self.location.origin == requestURL.origin) {
        event.respondWith(
            caches.open(cacheName)
            .then((cache) => {
                return fetch(request.url)
                .then((response) => {
                    cache.put(request, response.clone());
                    return response;
                })
            })
            .catch(() => cache.match(request.url))
            .catch((error) => {
                console.error(error);
                return caches.match(resources[1]);
            })
        );
    }
};
