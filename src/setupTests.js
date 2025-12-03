import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

import "fake-indexeddb/auto";
// mport {indexedDB} from "fake-indexeddb";

var Blob = require('blob-polyfill').Blob;

class MockNotification {
    permission = "default"
    
    constructor() {

    }

    static async requestPermission () {
        return "denied"
    }
}

window.Notification = MockNotification

navigator.serviceWorker = {
    ready: {
        then: vi.fn()
    }
}

navigator.geolocation = {
    getCurrentPosition: () => {
        return {
            loading: true
        }
    },
    watchPosition: () => {},
    clearWatch: () => {}
}

if (!Uint8Array.prototype.toHex) {
      Uint8Array.prototype.toHex = function () {
        return Array.from(this)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
      };
    }

expect.extend(matchers);
afterEach(cleanup);

// afterEach(async () => {
//     await indexedDB.deleteDatabase("MeshTAK")
// })