import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

import "fake-indexeddb/auto";
import {indexedDB} from "fake-indexeddb";


expect.extend(matchers);
afterEach(cleanup);

afterEach(async () => {
    await indexedDB.deleteDatabase("MeshTAK")
})